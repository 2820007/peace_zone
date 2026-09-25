import { NextResponse } from "next/server";
import * as React from "react";
import { Document, Page, StyleSheet, Text, View, pdf } from "@react-pdf/renderer";
import { connectToDatabase } from "@/lib/db/connect";
import Certificate from "@/models/Certificate";
import { SITE_CONFIG } from "@/config/site";

export async function GET(_: Request, { params }: { params: { certificateId: string } }) {
  const { certificateId } = params;

  await connectToDatabase();
  const certificate = await Certificate.findOne({ certificateId }).lean();

  if (!certificate) {
    return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
  }

  const styles = StyleSheet.create({
    page: { backgroundColor: "#f8fafc", padding: 32, fontFamily: "Helvetica" },
    card: { border: "2px solid #2E1065", borderRadius: 12, backgroundColor: "#ffffff", padding: 20, minHeight: 760 },
    headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    schoolName: { fontSize: 26, fontWeight: 700, color: "#2E1065" },
    tagline: { fontSize: 12, color: "#475569", marginTop: 4 },
    certificateId: { fontSize: 12, color: "#475569" },
    title: { fontSize: 28, color: "#2E1065", fontWeight: 700, textAlign: "center", marginTop: 18, letterSpacing: 1 },
    subtitle: { fontSize: 18, color: "#1e293b", textAlign: "center", marginTop: 22 },
    studentName: { fontSize: 28, fontWeight: 700, color: "#111827", textAlign: "center", marginTop: 8 },
    description: { fontSize: 14, color: "#334155", textAlign: "center", marginTop: 14, lineHeight: 1.5 },
    metaRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 26 },
    metaBox: { width: "30%", borderTopWidth: 2, borderColor: "#cbd5e1", paddingTop: 8, alignItems: "center" },
    label: { fontSize: 9, color: "#64748b", letterSpacing: 1.2, textTransform: "uppercase" },
    value: { fontSize: 15, fontWeight: 700, color: "#0f172a", marginTop: 6 },
    signRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 34 },
    signBox: { width: "45%", borderTopWidth: 2, borderColor: "#cbd5e1", paddingTop: 8, alignItems: "center" },
    signLabel: { fontSize: 9, color: "#64748b", marginTop: 6, letterSpacing: 1.2, textTransform: "uppercase" },
  });

  const document = React.createElement(
    Document,
    null,
    React.createElement(
      Page,
      { size: "A4", orientation: "landscape", style: styles.page },
      React.createElement(
        View,
        { style: styles.card },
        React.createElement(
          View,
          { style: styles.headerRow },
          React.createElement(
            View,
            null,
            React.createElement(Text, { style: styles.schoolName }, SITE_CONFIG.name),
            React.createElement(Text, { style: styles.tagline }, SITE_CONFIG.tagline)
          ),
          React.createElement(Text, { style: styles.certificateId }, String(certificate.certificateId))
        ),
        React.createElement(Text, { style: styles.title }, String(certificate.title)),
        React.createElement(Text, { style: styles.subtitle }, "This is to certify that"),
        React.createElement(Text, { style: styles.studentName }, String(certificate.studentName)),
        React.createElement(
          Text,
          { style: styles.description },
          String(certificate.description || "Has successfully completed the required course and is recognized for excellence.")
        ),
        React.createElement(
          View,
          { style: styles.metaRow },
          React.createElement(
            View,
            { style: styles.metaBox },
            React.createElement(Text, { style: styles.label }, "Program"),
            React.createElement(Text, { style: styles.value }, String(certificate.program || "General Program"))
          ),
          React.createElement(
            View,
            { style: styles.metaBox },
            React.createElement(Text, { style: styles.label }, "Course"),
            React.createElement(Text, { style: styles.value }, String(certificate.course || "School Program"))
          ),
          React.createElement(
            View,
            { style: styles.metaBox },
            React.createElement(Text, { style: styles.label }, "Issue Date"),
            React.createElement(Text, { style: styles.value }, String(new Date(certificate.issueDate).toLocaleDateString()))
          )
        ),
        React.createElement(
          View,
          { style: styles.signRow },
          React.createElement(
            View,
            { style: styles.signBox },
            React.createElement(Text, { style: styles.value }, certificate.principalName || "Principal Name"),
            React.createElement(Text, { style: styles.signLabel }, "Principal")
          ),
          React.createElement(
            View,
            { style: styles.signBox },
            React.createElement(Text, { style: styles.value }, certificate.coordinatorName || "Coordinator Name"),
            React.createElement(Text, { style: styles.signLabel }, "Coordinator")
          )
        )
      )
    )
  );

  const pdfBuffer = await pdf(document).toBuffer();
  const rawPdfBytes = pdfBuffer as any;
  let normalizedBytes: Uint8Array;

  if (rawPdfBytes instanceof Uint8Array) {
    normalizedBytes = rawPdfBytes;
  } else if (rawPdfBytes instanceof ArrayBuffer) {
    normalizedBytes = new Uint8Array(rawPdfBytes);
  } else if (rawPdfBytes && typeof rawPdfBytes.arrayBuffer === "function") {
    normalizedBytes = new Uint8Array(await rawPdfBytes.arrayBuffer());
  } else if (typeof rawPdfBytes === "string") {
    normalizedBytes = new TextEncoder().encode(rawPdfBytes);
  } else {
    normalizedBytes = new Uint8Array(rawPdfBytes as unknown as ArrayBufferLike);
  }

  return new NextResponse(Buffer.from(normalizedBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="certificate-${certificate.certificateId}.pdf"`,
    },
  });
}
