import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { bannerSchema, normalizeBannerInput } from "./content";

describe("normalizeBannerInput", () => {
  it("cleans blank optional fields and converts form values to the correct types", () => {
    const result = normalizeBannerInput({
      title: "Welcome to Peace Zone",
      subtitle: "   ",
      buttonLabel: "",
      buttonHref: "   ",
      displayOrder: "3",
      published: "true",
      image: "https://example.com/banner.jpg",
    });

    assert.deepEqual(result, {
      title: "Welcome to Peace Zone",
      subtitle: "",
      buttonLabel: "",
      buttonHref: "",
      displayOrder: 3,
      published: true,
      image: "https://example.com/banner.jpg",
    });
  });
});

describe("bannerSchema", () => {
  it("accepts valid banner values", () => {
    const parsed = bannerSchema.safeParse({
      title: "School Admissions",
      subtitle: "Enroll today",
      image: "https://example.com/banner.jpg",
      displayOrder: 1,
      published: true,
    });

    assert.equal(parsed.success, true);
  });
});
