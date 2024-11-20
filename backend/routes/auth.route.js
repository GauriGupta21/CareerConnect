const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = require('../models/User');

router.post('/request-password-reset', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  user.resetToken = resetToken;
  user.resetTokenExpiration = Date.now() + 3600000; // 1 hour
  await user.save();

  const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset Request",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  });

  res.json({ message: "Password reset link sent successfully." });
});
router.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() }
    });
  
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
  
    user.password = newPassword;  // Hash password before saving
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();
  
    res.json({ message: "Password reset successfully" });
  });
  