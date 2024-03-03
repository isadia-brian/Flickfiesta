import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Create a transporter using SMTP details
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,

      auth: {
        type: "OAuth2",
        user: "developerisadia@gmail.com",
        clientId:
          "213183660332-s7lt7nbikqu6eekgemg6s1rog3ugscvk.apps.googleusercontent.com",
        clientSecret: "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",
        refreshToken:
          "1//04Vxfo-C4EUJVCgYIARAAGAQSNgF-L9Ir7I2iMvYYPiRAsDDI9MGN0fkyPuRD6wVj2inkPfu0YLnfbkPewcC3SCYyrYqJzfzw1w",
        accessToken:
          "ya29.a0AfB_byDnUjEMa4Q_eblENvxB6yZgqczkN2qFtHwD5FuYSYGMixlpdNTx7z_UbQvdiKyb5yvlM1sC2-sTl5zl23BdehIFXP4ZMSIt6_UaET7SxJsRzivpA3D6d6Qj-KCeQ9BabXEmjJfM6o-mQrK7ni4R77XjRNti1O5naCgYKASoSARMSFQHGX2MiuBaHe8sFCZhLvbND5FFtvQ0171",
      },
    });
    // Create an email message
    const mailOptions = {
      from: "Isadia <developerisadia@gmail.com>",
      to: "brianisadia94@gmail.com",
      subject: "Sending email via SMTP",
      text: "You are good",
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email Sent:", info.response);
    return NextResponse.json({
      success: true,
      message: "Your free trial request has been sent!",
    });
  } catch (error) {
    console.error("Error", error);
    return Response.json(
      {
        success: false,
        message: "Internal server error, please try again",
      },
      { status: 500 }
    );
  }
}
