const { CHANNEL_REWARDS, ELIGIBILITY } = require("./constant");

function rewardsService({
  customerAccountNumber,
  portfolio,
  eligibilityService,
}) {
  try {
    const eligibility = eligibilityService(customerAccountNumber);

    if (eligibility === ELIGIBILITY.CUSTOMER_ELIGIBLE) {
      const data = portfolio
        .map((channel) => CHANNEL_REWARDS[channel])
        .filter(Boolean);
      return { data };
    } else {
      return { data: [] };
    }
  } catch (error) {
    if (error.message === "InvalidAccountNumber") {
      return { data: [], error: "Invalid account number" };
    }
    return { data: [] };
  }
}
module.exports = { rewardsService };
