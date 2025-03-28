const nodemailer = require( "nodemailer");
const dotenv = require( "dotenv");

dotenv.config(); // Load environment variables

// Create a transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // Using Gmail service
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail
    pass: process.env.EMAIL_PASS, // Your App Password (Not your real password)
  },
});

/**
 * Sends an email notification
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} text - Plain text email body
 * @param {string} html - HTML email body (optional)
 */
 const sendEmail = async (to, subject, text, html = "") => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Sender email
      to,
      subject,
      text,
      html,
    });
    console.log("✅ Email sent successfully!");
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};

module.exports={sendEmail}