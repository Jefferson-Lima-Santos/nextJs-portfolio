import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactPayload = {
  name?: string;
  email?: string;
  country?: string;
  message?: string;
};

const requiredEnvVars = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "CONTACT_TO_EMAIL",
];

const isValidEmail = (value: string) => /\S+@\S+\.\S+/.test(value);

export async function POST(request: Request) {
  try {
    const missingEnv = requiredEnvVars.filter((key) => !process.env[key]);

    if (missingEnv.length > 0) {
      return NextResponse.json(
        {
          ok: false,
          message: `Missing environment variables: ${missingEnv.join(", ")}`,
        },
        { status: 500 }
      );
    }

    const body = (await request.json()) as ContactPayload;
    const name = body.name?.trim();
    const email = body.email?.trim();
    const country = body.country?.trim();
    const message = body.message?.trim();

    if (!name || !email || !country || !message) {
      return NextResponse.json(
        { ok: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, message: "Invalid email address." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `Novo contato do portfolio: ${name}`,
      text: [
        `Nome: ${name}`,
        `Email: ${email}`,
        `Pais: ${country}`,
        "",
        "Mensagem:",
        message,
      ].join("\n"),
      html: `
        <h2>Novo contato do portfolio</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Pais:</strong> ${country}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error sending contact email:", error);

    return NextResponse.json(
      { ok: false, message: "Failed to send contact email." },
      { status: 500 }
    );
  }
}
