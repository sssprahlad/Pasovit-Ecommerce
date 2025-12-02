const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendOrderMail = (toEmail, orderId) => {
  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: "Order Placed Successfully",
    html: `<h2>Your Order has been placed!</h2>
           <p>Order ID: <b>${orderId}</b></p>
           <p>Thank you for shopping with us.</p>`,
  });
};
