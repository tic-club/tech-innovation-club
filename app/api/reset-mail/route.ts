import prisma from "@/db/client";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail, mailOptions } from "@/mail/nodemailer";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  console.log(email, "api");

  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user)
    return NextResponse.json({ messsage: "User Not Found" }, { status: 404 });

  const hashedResetToken = await bcryptjs.hash(user?.email.toString(), 10);

  try {
    await prisma.user.update({
      where: { email: email },
      data: { forgotPasswordToken: hashedResetToken },
    });
  } catch (error) {
    console.error("Error updating forgotPasswordToken:", error);
    return NextResponse.json(
      { message: "Password reset token update failed" },
      { status: 500 }
    );
  }

  sendEmail({
    ...mailOptions,
    to: email,
    subject: "Reset Mail",
    html: `
    <html>
      <head>
        <style>
          /* Add your email styling here */
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 5px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #333;
          }
          p {
            font-size: 16px;
          }
          .reset-button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Password Reset</h1>
          <p>You have requested to reset your password. Click the button below to proceed:</p>
          <a class="reset-button" href="${
            process.env.DOMAIN
          }/reset-pass/${encodeURIComponent(hashedResetToken)}"
          >Reset Password</a>
          <p>If you did not request this, please ignore this email.</p>
        </div>
      </body>
    </html>
  `,
  });
  return NextResponse.json({ messsage: "Mail sent" }, { status: 200 });
}
