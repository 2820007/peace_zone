import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { normalizeRecipientList, resolveResendSender } from "./email";

describe("email helper", () => {
  it("prefers the configured Resend sender address", () => {
    const previous = process.env.RESEND_FROM_EMAIL;
    process.env.RESEND_FROM_EMAIL = "Peace Zone Academy <peacezoneacademy9@gmail.com>";
    process.env.CONTACT_EMAIL_FROM = "legacy@example.com";

    assert.equal(resolveResendSender(), "Peace Zone Academy <peacezoneacademy9@gmail.com>");

    if (previous === undefined) delete process.env.RESEND_FROM_EMAIL;
    else process.env.RESEND_FROM_EMAIL = previous;
  });

  it("deduplicates and trims teacher email recipients", () => {
    assert.deepEqual(
      normalizeRecipientList(["teacher1@example.com", " teacher1@example.com ", "", "teacher2@example.com"]),
      ["teacher1@example.com", "teacher2@example.com"]
    );
  });
});
