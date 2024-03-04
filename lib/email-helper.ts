import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import { ConfirmUserEmail } from "@/components/confirm-email";
import { ResetPassword } from "@/components/reset-password";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: process.env.SMTP_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    accessToken: process.env.GOOGLE_ACCESS_TOKEN,
  },
});

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmationLink = `https://flickfiesta-seven.vercel.app/auth/new-verification?token=${token}`;

  const mailOptions = {
    from: "FilmSasa <filmsasa.movies@gmail.com>",
    to: email,
    subject: "Verify your email",
    html: render(ConfirmUserEmail({ url: confirmationLink })),
  };

  await transporter.sendMail(mailOptions);
};

export const sendResetPasswordEmail = async (email: string, token: string) => {
  const resetLink = `https://flickfiesta-seven.vercel.app/auth/new-password?token=${token}`;
  const mailOptions = {
    from: "FilmSasa <filmsasa.movies@gmail.com>",
    to: email,
    subject: "Reset your password",
    html: render(ResetPassword({ url: resetLink })),
  };

  await transporter.sendMail(mailOptions);
};
