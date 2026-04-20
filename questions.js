// questions.js
// Add your own study questions here.
// Tip: keep the meaning the same as your exam prep, but
//      rephrase into your OWN words so nothing is copied verbatim.

const QUESTIONS = [
  {
    id: 1,
    text: "When a company buys Apple products directly from Apple, which ID does Apple give the company to track those purchases?",
    options: [
      "Organization ID",
      "Reseller Number",
      "D-U-N-S Number",
      "Apple Customer Number"
    ],
    correctIndex: 3,
    explanation:
      "Apple uses the Apple Customer Number as the unique identifier for organizations that purchase hardware and software directly from Apple."
  },
  {
    id: 2,
    text: "On a managed Mac, which feature keeps the local user account password in step with the password from the cloud identity provider?",
    options: [
      "VPN client",
      "LDAP binding",
      "Kerberos tickets only",
      "Platform SSO"
    ],
    correctIndex: 3,
    explanation:
      "Platform SSO is designed so that the Mac user account password stays aligned with the identity provider, reducing password drift and extra prompts."
  }

  // TODO: Add the rest of your questions here.
  // Example approach:
  // 1) Read the original question from your notes.
  // 2) Write it again in your own simpler words.
  // 3) Keep the same concept and correct answer, but change the phrasing.
  // 4) Add a short explanation for why the correct answer is right.
];
