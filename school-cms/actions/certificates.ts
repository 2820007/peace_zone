
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import QRCode from "qrcode";
import * as React from "react";
import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
  pdf,
} from "@react-pdf/renderer";

import {
  buildVerificationUrl,
  generateCertificateId,
} from "@/lib/certificates";
import { getSession } from "@/lib/auth/session";
import { actionError } from "@/lib/errors";
import { connectToDatabase } from "@/lib/db/connect";
import CertificateModel from "@/models/Certificate";
import { SITE_CONFIG } from "@/config/site";

export interface CertificateFormState {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
  certificateId?: string;
}

async function requireAdmin() {
  const session = await getSession();

  if (!session) {
    throw new Error("Not authenticated");
  }

  return session;
}

export async function getCertificateById(id: string) {
  await connectToDatabase();

  const certificate = await CertificateModel.findById(id).lean();

  return certificate
    ? JSON.parse(JSON.stringify(certificate))
    : null;
}

export async function getCertificateByCertificateId(
  certificateId: string
) {
  await connectToDatabase();

  const certificate = await CertificateModel.findOne({
    certificateId,
  }).lean();

  return certificate
    ? JSON.parse(JSON.stringify(certificate))
    : null;
}

export async function listCertificates(
  search?: string,
  type?: string,
  status?: string
) {
  await connectToDatabase();

  const query: Record<string, unknown> = {};

  if (type && type !== "all") {
    query.certificateType = type;
  }

  if (status && status !== "all") {
    query.status = status;
  }

  if (search && search.trim()) {
    query.$or = [
      {
        certificateId: {
          $regex: search,
          $options: "i",
        },
      },
      {
        studentName: {
          $regex: search,
          $options: "i",
        },
      },
      {
        title: {
          $regex: search,
          $options: "i",
        },
      },
      {
        studentId: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const certificates = await CertificateModel.find(query)
    .sort({ createdAt: -1 })
    .lean();

  return JSON.parse(JSON.stringify(certificates));
}

export async function createCertificateAction(
  _prevState: CertificateFormState,
  formData: FormData
): Promise<CertificateFormState> {
  try {
    await requireAdmin();
  } catch (error) {
    return actionError(
      "createCertificateAction auth",
      error,
      "You must be signed in to manage certificates."
    );
  }

  const raw = {
    studentName: String(formData.get("studentName") || ""),
    studentId: String(formData.get("studentId") || ""),
    certificateType: String(
      formData.get("certificateType") || "Achievement"
    ),
    title: String(formData.get("title") || ""),
    description: String(formData.get("description") || ""),
    program: String(formData.get("program") || ""),
    course: String(formData.get("course") || ""),
    issueDate: String(formData.get("issueDate") || ""),
    template: String(formData.get("template") || "classic"),
    principalName: String(formData.get("principalName") || ""),
    principalSignature: String(
      formData.get("principalSignature") || ""
    ),
    coordinatorName: String(
      formData.get("coordinatorName") || ""
    ),
    coordinatorSignature: String(
      formData.get("coordinatorSignature") || ""
    ),
    status: String(formData.get("status") || "draft"),
  };

  const fieldErrors: Record<string, string> = {};

  if (!raw.studentName.trim()) {
    fieldErrors.studentName = "Student name is required.";
  }

  if (!raw.studentId.trim()) {
    fieldErrors.studentId = "Student ID is required.";
  }

  if (!raw.title.trim()) {
    fieldErrors.title = "Certificate title is required.";
  }

  if (!raw.issueDate) {
    fieldErrors.issueDate = "Issue date is required.";
  }

  if (!raw.certificateType) {
    fieldErrors.certificateType =
      "Certificate type is required.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors };
  }

  try {
    await connectToDatabase();

    const count = await CertificateModel.countDocuments({});

    const certificateId = generateCertificateId(
      count + 1,
      new Date(raw.issueDate).getFullYear() ||
        new Date().getFullYear()
    );

    const verificationUrl =
      buildVerificationUrl(certificateId);

    const qrCodeDataUrl = await QRCode.toDataURL(
      verificationUrl,
      {
        margin: 1,
        width: 180,
      }
    );

    const certificate = await CertificateModel.create({
      ...raw,
      certificateId,
      verificationUrl,
      qrCodeUrl: qrCodeDataUrl,
      issueDate: new Date(raw.issueDate),
      status: ["draft", "issued", "revoked"].includes(
        raw.status
      )
        ? raw.status
        : "draft",
    });

    revalidatePath("/admin/certificates");
    revalidatePath("/verify");

    return {
      success: true,
      certificateId: certificate.certificateId,
    };
  } catch (error) {
    return actionError(
      "createCertificateAction save",
      error,
      "The certificate could not be created. Please try again."
    );
  }
}

export async function updateCertificateAction(
  id: string,
  _prevState: CertificateFormState,
  formData: FormData
): Promise<CertificateFormState> {
  try {
    await requireAdmin();
  } catch (error) {
    return actionError(
      "updateCertificateAction auth",
      error,
      "You must be signed in to manage certificates."
    );
  }

  const raw = {
    studentName: String(formData.get("studentName") || ""),
    studentId: String(formData.get("studentId") || ""),
    certificateType: String(
      formData.get("certificateType") || "Achievement"
    ),
    title: String(formData.get("title") || ""),
    description: String(formData.get("description") || ""),
    program: String(formData.get("program") || ""),
    course: String(formData.get("course") || ""),
    issueDate: String(formData.get("issueDate") || ""),
    template: String(formData.get("template") || "classic"),
    principalName: String(formData.get("principalName") || ""),
    principalSignature: String(
      formData.get("principalSignature") || ""
    ),
    coordinatorName: String(
      formData.get("coordinatorName") || ""
    ),
    coordinatorSignature: String(
      formData.get("coordinatorSignature") || ""
    ),
    status: String(formData.get("status") || "draft"),
  };

  const fieldErrors: Record<string, string> = {};

  if (!raw.studentName.trim()) {
    fieldErrors.studentName = "Student name is required.";
  }

  if (!raw.studentId.trim()) {
    fieldErrors.studentId = "Student ID is required.";
  }

  if (!raw.title.trim()) {
    fieldErrors.title = "Certificate title is required.";
  }

  if (!raw.issueDate) {
    fieldErrors.issueDate = "Issue date is required.";
  }

  if (!raw.certificateType) {
    fieldErrors.certificateType =
      "Certificate type is required.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors };
  }

  try {
    await connectToDatabase();

    const existing = await CertificateModel.findById(id);

    if (!existing) {
      return {
        error: "Certificate not found.",
      };
    }

    existing.set({
      ...raw,
      issueDate: new Date(raw.issueDate),
      status: ["draft", "issued", "revoked"].includes(
        raw.status
      )
        ? raw.status
        : "draft",
    });

    if (!existing.verificationUrl) {
      existing.verificationUrl = buildVerificationUrl(
        existing.certificateId
      );
    }

    if (!existing.qrCodeUrl) {
      existing.qrCodeUrl = await QRCode.toDataURL(
        existing.verificationUrl,
        {
          margin: 1,
          width: 180,
        }
      );
    }

    await existing.save();

    revalidatePath("/admin/certificates");
    revalidatePath("/verify");

    return {
      success: true,
      certificateId: existing.certificateId,
    };
  } catch (error) {
    return actionError(
      "updateCertificateAction save",
      error,
      "The certificate could not be saved. Please try again."
    );
  }
}

export async function deleteCertificateAction(id: string) {
  try {
    await requireAdmin();
  } catch (error) {
    return actionError(
      "deleteCertificateAction auth",
      error,
      "You must be signed in to manage certificates."
    );
  }

  try {
    await connectToDatabase();

    await CertificateModel.findByIdAndDelete(id);

    revalidatePath("/admin/certificates");

    return {
      success: true,
    };
  } catch (error) {
    return actionError(
      "deleteCertificateAction delete",
      error,
      "The certificate could not be deleted."
    );
  }
}

export async function generateCertificatePdf(
  certificateId: string
) {
  try {
    await requireAdmin();
  } catch (error) {
    throw new Error(
      "You must be signed in to download certificates."
    );
  }

  await connectToDatabase();

  const certificate = await CertificateModel.findOne({
    certificateId,
  }).lean();

  if (!certificate) {
    throw new Error("Certificate not found.");
  }

  const styles = StyleSheet.create({
    page: {
      backgroundColor: "#f8fafc",
      padding: 32,
      fontFamily: "Helvetica",
    },

    card: {
      border: "2px solid #2E1065",
      borderRadius: 12,
      backgroundColor: "#ffffff",
      padding: 20,
      minHeight: 760,
    },

    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    schoolName: {
      fontSize: 26,
      fontWeight: 700,
      color: "#2E1065",
    },

    tagline: {
      fontSize: 12,
      color: "#475569",
      marginTop: 4,
    },

    certificateId: {
      fontSize: 12,
      color: "#475569",
    },

    title: {
      fontSize: 28,
      color: "#2E1065",
      fontWeight: 700,
      textAlign: "center",
      marginTop: 18,
      letterSpacing: 1,
    },

    subtitle: {
      fontSize: 18,
      color: "#1e293b",
      textAlign: "center",
      marginTop: 22,
    },

    studentName: {
      fontSize: 28,
      fontWeight: 700,
      color: "#111827",
      textAlign: "center",
      marginTop: 8,
    },

    description: {
      fontSize: 14,
      color: "#334155",
      textAlign: "center",
      marginTop: 14,
      lineHeight: 1.5,
    },

    metaRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 26,
    },

    metaBox: {
      width: "30%",
      borderTopWidth: 2,
      borderColor: "#cbd5e1",
      paddingTop: 8,
      alignItems: "center",
    },

    label: {
      fontSize: 9,
      color: "#64748b",
      letterSpacing: 1.2,
      textTransform: "uppercase",
    },

    value: {
      fontSize: 15,
      fontWeight: 700,
      color: "#0f172a",
      marginTop: 6,
    },

    signRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 34,
    },

    signBox: {
      width: "45%",
      borderTopWidth: 2,
      borderColor: "#cbd5e1",
      paddingTop: 8,
      alignItems: "center",
    },

    signLabel: {
      fontSize: 9,
      color: "#64748b",
      marginTop: 6,
      letterSpacing: 1.2,
      textTransform: "uppercase",
    },
  });

  const document = React.createElement(
    Document,
    null,
    React.createElement(
      Page,
      {
        size: "A4",
        orientation: "landscape",
        style: styles.page,
      },
      React.createElement(
        View,
        {
          style: styles.card,
        },
        React.createElement(
          View,
          {
            style: styles.headerRow,
          },
          React.createElement(
            View,
            null,
            React.createElement(
              Text,
              {
                style: styles.schoolName,
              },
              SITE_CONFIG.name
            ),
            React.createElement(
              Text,
              {
                style: styles.tagline,
              },
              SITE_CONFIG.tagline
            )
          ),
          React.createElement(
            Text,
            {
              style: styles.certificateId,
            },
            String(certificate.certificateId)
          )
        ),

        React.createElement(
          Text,
          {
            style: styles.title,
          },
          String(certificate.title)
        ),

        React.createElement(
          Text,
          {
            style: styles.subtitle,
          },
          "This is to certify that"
        ),

        React.createElement(
          Text,
          {
            style: styles.studentName,
          },
          String(certificate.studentName)
        ),

        React.createElement(
          Text,
          {
            style: styles.description,
          },
          String(
            certificate.description ||
              "Has successfully completed the required course and is recognized for excellence."
          )
        ),

        React.createElement(
          View,
          {
            style: styles.metaRow,
          },
          React.createElement(
            View,
            {
              style: styles.metaBox,
            },
            React.createElement(
              Text,
              {
                style: styles.label,
              },
              "Program"
            ),
            React.createElement(
              Text,
              {
                style: styles.value,
              },
              String(
                certificate.program || "General Program"
              )
            )
          ),

          React.createElement(
            View,
            {
              style: styles.metaBox,
            },
            React.createElement(
              Text,
              {
                style: styles.label,
              },
              "Course"
            ),
            React.createElement(
              Text,
              {
                style: styles.value,
              },
              String(
                certificate.course || "School Program"
              )
            )
          ),

          React.createElement(
            View,
            {
              style: styles.metaBox,
            },
            React.createElement(
              Text,
              {
                style: styles.label,
              },
              "Issue Date"
            ),
            React.createElement(
              Text,
              {
                style: styles.value,
              },
              String(
                new Date(
                  certificate.issueDate
                ).toLocaleDateString()
              )
            )
          )
        ),

        React.createElement(
          View,
          {
            style: styles.signRow,
          },
          React.createElement(
            View,
            {
              style: styles.signBox,
            },
            React.createElement(
              Text,
              {
                style: styles.value,
              },
              certificate.principalName || "Principal Name"
            ),
            React.createElement(
              Text,
              {
                style: styles.signLabel,
              },
              "Principal"
            )
          ),

          React.createElement(
            View,
            {
              style: styles.signBox,
            },
            React.createElement(
              Text,
              {
                style: styles.value,
              },
              certificate.coordinatorName ||
                "Coordinator Name"
            ),
            React.createElement(
              Text,
              {
                style: styles.signLabel,
              },
              "Coordinator"
            )
          )
        )
      )
    )
  );

  // Generate the PDF and convert its stream to a Buffer.
  // This avoids the incorrect ArrayBufferLike cast.

  const pdfStream = await pdf(document).toBuffer();

  const response = new Response(pdfStream as any);

  const arrayBuffer = await response.arrayBuffer();

  return Buffer.from(arrayBuffer);
}

export async function generateCertificateQrPng(
  verificationUrl: string
) {
  return QRCode.toDataURL(verificationUrl, {
    margin: 1,
    width: 180,
  });
}

export async function redirectToCertificateVerification(
  certificateId: string
) {
  redirect(`/verify/${certificateId}`);
}