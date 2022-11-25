import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.APP_HOST_EMAIL!,
    pass: process.env.APP_HOST_PASSWORD!,
  },
  tls: { rejectUnauthorized: false },
});

export const sendVerificationLink = (domain: string, userMail: string, token: string) => {
  transporter.sendMail({
    from: `'Mepo Af account verification' <${process.env.APP_HOST_EMAIL!}>`,
    to: userMail,
    subject: "Mepo Af account verification",
    html: `
        <div>
            <h3>Verify your mepo af account.</h3>
            <h4>Verify your email by clicking the button below.</h4>
            <a href="http://${domain}/api/auth/email_verification?token=${token}">Verify account</a>
        </div>
    `,
  });
};
export const sendResetPasswordLink = (domain: string, userMail: string, token: string) => {
  transporter.sendMail({
    from: `'Reset your password' <${process.env.APP_HOST_EMAIL!}>`,
    to: userMail,
    subject: "Mepo Af - Reset your password",
    html: `
        <div>
            <h3 style="textAlign:center">Reset password</h3>
            <h4>Reset your password by clicking the button below.</h4>
            <a href="${domain}/reset_password/${token}">Verify account</a>
        </div>
    `,
  });
};
