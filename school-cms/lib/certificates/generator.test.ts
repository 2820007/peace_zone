import test from "node:test";
import assert from "node:assert/strict";

import { buildVerificationUrl, generateCertificateId } from "./index";

test("generateCertificateId creates the expected school format", () => {
  const id = generateCertificateId(1, 2026);
  assert.equal(id, "PZ-2026-000001");
});

test("buildVerificationUrl uses configured site URL", () => {
  const url = buildVerificationUrl("PZ-2026-000001");
  assert.match(url, /^https?:\/\/.*\/verify\/PZ-2026-000001$/);
});
