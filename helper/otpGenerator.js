const totp = require("totp-generator");

function getToken() {
  return parseInt(
    totp(process.env.KEY_OTP, {
      digits: 8,
      algorithm: "SHA-512",
      period: 60,
      timestamp: Date.now(),
    })
  );
}

// getToken function is used to generate a token for the user to delete his account
// Return a number of 8 digits and have to insert in the url to delete the account

module.exports = getToken;
