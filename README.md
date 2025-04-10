# 🎁 Rewards Service

This project implements a `rewardsService` in Node.js that determines the available rewards for a customer based on their channel subscriptions and eligibility status.

---

## How to Run

Make sure you have Node.js 18+ installed.

```bash
cd assignmentJS
npm test
```

### Design

1. Built-in Test Runner: The Node.js core node:test module is used instead of any third-party test frameworks like Jest or Mocha, to comply with the instruction of not using external libraries.

2. Strict Equality Checks: assert.deepStrictEqual is used for robust object and array comparison to avoid false positives in tests due to type coercion.

3. Error Handling:

- For "InvalidAccountNumber" errors, an additional error field is returned to the caller.

- All other errors (e.g., technical failures) return an empty rewards list without additional metadata.

### Assumptions

1. Eligibility Service is a stubbed function that may return values or throw errors.

2. Channels without rewards (e.g., KIDS, NEWS) are ignored.

3. Invalid account numbers are detected by the thrown error having the message "InvalidAccountNumber".

### Test Cases Covered

1. Customer eligible and receives all applicable rewards
2. Customer not eligible receives no rewards
3. Technical failures return no rewards silently
4. Invalid account number returns an error flag

   <img width="540" alt="Screenshot 2025-04-10 at 9 54 54 PM" src="https://github.com/user-attachments/assets/fe3de3b7-23fc-4a74-ac98-4e4d3ee31fca" />

