export const CERTIFICATE_TYPE_OPTIONS = [
  "Achievement",
  "Completion",
  "Participation",
  "Excellence",
  "Appreciation",
  "Other",
] as const;

export const CERTIFICATE_TEMPLATE_OPTIONS = ["classic", "modern"] as const;
export const CERTIFICATE_STATUS_OPTIONS = ["draft", "issued", "revoked"] as const;

export function generateCertificateId(sequence: number, year = new Date().getFullYear()) {
  const safeSequence = Math.max(1, Number(sequence) || 1);
  return `PZ-${year}-${String(safeSequence).padStart(6, "0")}`;
}

export function buildVerificationUrl(certificateId: string, baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "http://localhost:3000") {
  return new URL(`/verify/${encodeURIComponent(certificateId)}`, baseUrl).toString();
}

export function getDefaultCertificateIssueDate() {
  return new Date().toISOString().slice(0, 10);
}
