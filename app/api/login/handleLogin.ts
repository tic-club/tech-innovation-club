import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { sendEmail, mailOptions } from "@/mail/nodemailer";
import bcryptjs from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function handleLogin(
  grNoOrEmail: string,
  password: string,
  isGrNoLogin: boolean
): Promise<NextResponse> {
  const whereCondition = isGrNoLogin
    ? { gr_no: Number(grNoOrEmail) }
    : { email: grNoOrEmail };

  const user = await prisma.user.findUnique({
    where: whereCondition,
  });

  if (user) {
    const validPassword = await bcryptjs.compare(password, user.password);

    if (validPassword) {
      const tokenData = {
        id: user.id,
        email: user.email,
        gr_no: user.gr_no,
      };

      const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {
        expiresIn: "100h",
      });

      const res = NextResponse.json({
        message: "Successfully Logged In",
        error: false,
      });

      res.cookies.set("tic", token, {
        httpOnly: true,
      });

      sendEmail({
        ...mailOptions,
        to: user.email,
        subject: "Login Alert",
        html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Login Alert</title>
          <style>
              /* Add your custom email styles here */
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
              }
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #fff;
                  border: 1px solid #ddd;
                  border-radius: 5px;
                  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
              }
              h1 {
                  color: #333;
              }
              p {
                  color: #555;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>Login Alert</h1>
              <p>Hello ${user.first_name} ${user.last_name},</p>
              <p>This is a login alert to inform you that a login attempt was made on your account.</p>
              <p>If this login was not authorized by you, please take immediate action to secure your account by changing your password and reviewing your account activity.</p>
              <p>If you have authorized this login, you can safely ignore this email.</p>
              <p>Thank you for using our services.</p>
          </div>
      </body>
      </html>
      `,
      });

      return res;
    } else {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
  }

  return NextResponse.json({ error: "User not found" }, { status: 404 });
}
