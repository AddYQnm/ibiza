'use server';

import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Crée le contenu du mail en HTML
    const htmlContent = `
      <h2>Nouvelle réservation</h2>
      <p><strong>Type :</strong> ${data.type}</p>
      <h3>Informations personnelles</h3>
      <ul>
        <li><strong>Nom :</strong> ${data.name}</li>
        <li><strong>Email :</strong> ${data.email}</li>
        <li><strong>Téléphone :</strong> ${data.phone}</li>
        ${data.company ? `<li><strong>Entreprise :</strong> ${data.company}</li>` : ""}
      </ul>
      <h3>Détails de la réservation / événement</h3>
      <ul>
        ${data.date ? `<li><strong>Date :</strong> ${new Date(data.date).toLocaleDateString()}</li>` : ""}
        ${data.time ? `<li><strong>Heure :</strong> ${data.time}</li>` : ""}
        ${data.startTime ? `<li><strong>Heure début :</strong> ${data.startTime}</li>` : ""}
        ${data.endTime ? `<li><strong>Heure fin :</strong> ${data.endTime}</li>` : ""}
        ${data.guests ? `<li><strong>Nombre de personnes :</strong> ${data.guests}</li>` : ""}
        ${data.typeReservation ? `<li><strong>Type :</strong> ${data.typeReservation}</li>` : ""}
        ${data.eventType ? `<li><strong>Événement :</strong> ${data.eventType}</li>` : ""}
        ${data.location ? `<li><strong>Lieu :</strong> ${data.location}</li>` : ""}
        ${data.extras ? `<li><strong>Extras :</strong> ${data.extras}</li>` : ""}
        ${data.services ? `<li><strong>Services :</strong> ${data.services}</li>` : ""}
        ${data.message ? `<li><strong>Message :</strong> ${data.message}</li>` : ""}
      </ul>
    `;

    // Configurer NodeMailer
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
      from: `"Site Réservations" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: `Nouvelle réservation: ${data.type}`,
      html: htmlContent,
    });

    return NextResponse.json({ message: "Email envoyé avec succès" });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
