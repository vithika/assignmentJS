const assert = require("assert");
const { describe, it } = require("node:test");
const { rewardsService } = require("./redeemService");
const { ELIGIBILITY } = require("./constant");

describe("RewardsService", () => {
  it("should return rewards for eligible customer", () => {
    const mockEligibilityService = () => ELIGIBILITY.CUSTOMER_ELIGIBLE;
    const result = rewardsService({
      customerAccountNumber: "123",
      portfolio: ["SPORTS", "KIDS", "MUSIC"],
      eligibilityService: mockEligibilityService,
    });
    assert.deepStrictEqual(result, {
      data: ["CHAMPIONS_LEAGUE_FINAL_TICKET", "KARAOKE_PRO_MICROPHONE"],
    });
  });

  it("should return empty rewards for ineligible customer", () => {
    const mockEligibilityService = () => ELIGIBILITY.CUSTOMER_INELIGIBLE;
    const result = rewardsService({
      customerAccountNumber: "123",
      portfolio: ["MOVIES", "MUSIC"],
      eligibilityService: mockEligibilityService,
    });
    assert.deepStrictEqual(result, { data: [] });
  });

  it("should return empty rewards on technical failure", () => {
    const mockEligibilityService = () => {
      throw new Error("TechnicalFailureException");
    };
    const result = rewardsService({
      customerAccountNumber: "123",
      portfolio: ["SPORTS", "MOVIES"],
      eligibilityService: mockEligibilityService,
    });
    assert.deepStrictEqual(result, { data: [] });
  });

  it("should notify client on invalid account number", () => {
    const mockEligibilityService = () => {
      throw new Error("InvalidAccountNumber");
    };
    const result = rewardsService({
      customerAccountNumber: "000",
      portfolio: ["NEWS"],
      eligibilityService: mockEligibilityService,
    });
    assert.deepStrictEqual(result, {
      data: [],
      error: "Invalid account number",
    });
  });
});
