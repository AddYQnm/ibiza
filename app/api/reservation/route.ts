import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_SECURE,
      SMTP_USER,
      SMTP_PASS,
      RECEIVER_EMAIL,
    } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !RECEIVER_EMAIL) {
      return NextResponse.json(
        { error: "Variables SMTP manquantes dans .env.local" },
        { status: 500 }
      );
    }

    const htmlContent = `
      <h2>Nouvelle réservation</h2>
      <p><strong>Type :</strong> ${data.type ?? ""}</p>
      <p><strong>Nom :</strong> ${data.name ?? ""}</p>
      <p><strong>Email :</strong> ${data.email ?? ""}</p>
      <p><strong>Téléphone :</strong> ${data.phone ?? ""}</p>
      <p><strong>Message :</strong> ${data.message ?? ""}</p>
    `;

 const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: SMTP_SECURE === "true",
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});


    // utile pour debug
    // await transporter.verify();

    await transporter.sendMail({
      from: `"Ibiza Club - Réservations" <${SMTP_USER}>`,
      to: RECEIVER_EMAIL,
      replyTo: data.email, // pratique pour répondre au client
      subject: `Nouvelle réservation : ${data.type ?? "N/A"}`,
      html: htmlContent,
    });

    return NextResponse.json({ message: "Email envoyé avec succès" });
  } catch (err: any) {
    console.error("Mail error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
