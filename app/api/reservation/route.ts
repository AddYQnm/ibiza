/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const escapeHtml = (v: any) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const formatType = (t: string) => {
  const s = (t || "").toLowerCase();
  if (s.includes("priva")) return "Privatisation";
  if (s.includes("resa") || s.includes("reserv")) return "Réservation";
  return t || "Demande";
};

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

    const typeLabel = formatType(data.type);
    const name = escapeHtml(data.name);
    const email = escapeHtml(data.email);
    const phone = escapeHtml(data.phone);
    const message = escapeHtml(data.message).replace(/\n/g, "<br/>");

    const createdAt = new Date().toLocaleString("fr-FR", {
      timeZone: "Europe/Paris",
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    const previewText = `${typeLabel} — ${name || "Nouveau client"} • ${createdAt}`;

    const htmlContent = `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <meta name="color-scheme" content="dark"/>
  <meta name="supported-color-schemes" content="dark"/>
  <title>${typeLabel} — Ibiza Club</title>
  <style>
    body{margin:0;padding:0;background:#0b0f14}
    table{border-spacing:0}
    a{color:#b7c7ff;text-decoration:none}
    .container{width:100%;background:#0b0f14;padding:28px 16px}
    .card{max-width:640px;margin:0 auto;background:#0f1722;border:1px solid rgba(255,255,255,.08);border-radius:18px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.35)}
    .top{padding:22px 22px 16px;background:linear-gradient(180deg, rgba(124,58,237,.18), rgba(15,23,34,0))}
    .brand{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial;letter-spacing:.08em;text-transform:uppercase;font-size:12px;color:rgba(255,255,255,.72)}
    .title{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial;font-size:22px;line-height:1.25;color:#fff;margin:10px 0 0;font-weight:700}
    .badge{display:inline-block;margin-top:12px;padding:7px 10px;border-radius:999px;font-size:12px;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial;color:rgba(255,255,255,.86);border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.06)}
    .content{padding:18px 22px 22px}
    .row{padding:12px 0;border-top:1px solid rgba(255,255,255,.08)}
    .label{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial;font-size:12px;color:rgba(255,255,255,.60);text-transform:uppercase;letter-spacing:.06em;margin:0 0 6px}
    .value{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial;font-size:15px;line-height:1.55;color:rgba(255,255,255,.90);margin:0}
    .footer{padding:16px 22px 22px;color:rgba(255,255,255,.55);font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial;font-size:12px;border-top:1px solid rgba(255,255,255,.08)}
    .muted{color:rgba(255,255,255,.55)}
    .pill{display:inline-block;padding:6px 10px;border-radius:999px;background:rgba(183,199,255,.12);border:1px solid rgba(183,199,255,.22);color:#dbe4ff;font-size:12px;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial}
    a[x-apple-data-detectors]{color:inherit!important;text-decoration:none!important}
  </style>
</head>
<body>
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    ${escapeHtml(previewText)}
  </div>

  <table role="presentation" width="100%" class="container">
    <tr><td>
      <table role="presentation" width="100%" class="card">
        <tr><td class="top">
          <div class="brand">IBIZA CLUB</div>
          <h1 class="title">${typeLabel} reçue</h1>
          <span class="badge">⟡ ${escapeHtml(createdAt)} • <span class="pill">${escapeHtml(typeLabel)}</span></span>
        </td></tr>

        <tr><td class="content">
          <div class="row" style="border-top:none;padding-top:0;">
            <p class="label">Client</p>
            <p class="value"><strong>${name || "—"}</strong></p>
          </div>

          <div class="row">
            <p class="label">Contact</p>
            <p class="value">
              ${email ? `<a href="mailto:${email}">${email}</a>` : "—"}
              ${phone ? ` • <a href="tel:${phone}">${phone}</a>` : ""}
            </p>
          </div>

          <div class="row">
            <p class="label">Message</p>
            <p class="value">${message || "<span class='muted'>Aucun message</span>"}</p>
          </div>

          <div class="row">
            <p class="label">Actions rapides</p>
            <p class="value">
              ${email ? `↳ Répondre : <a href="mailto:${email}?subject=${encodeURIComponent(
                `Re: ${typeLabel} — Ibiza Club`
              )}">${email}</a><br/>` : ""}
              ${phone ? `↳ Appeler : <a href="tel:${phone}">${phone}</a>` : ""}
            </p>
          </div>
        </td></tr>

        <tr><td class="footer">
          <div>Message envoyé depuis le formulaire <span class="muted">Réservation / Privatisation</span>.</div>
          <div style="margin-top:8px;">Tu peux répondre directement à cet email (reply-to configuré).</div>
        </td></tr>
      </table>

      <div style="max-width:640px;margin:14px auto 0;color:rgba(255,255,255,.40);font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial;font-size:11px;text-align:center;">
        Ibiza Club — Réservations & Privatisations
      </div>
    </td></tr>
  </table>
</body>
</html>`;

    const textContent = `
Nouvelle demande — ${typeLabel}
Date : ${createdAt}

Client : ${data.name ?? "-"}
Email : ${data.email ?? "-"}
Téléphone : ${data.phone ?? "-"}

Message :
${data.message ?? "-"}
`.trim();

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: SMTP_SECURE === "true",
      auth: { user: SMTP_USER, pass: SMTP_PASS },
      tls: { rejectUnauthorized: false },
    });

    await transporter.sendMail({
      from: `"Ibiza Club - Réservations" <${SMTP_USER}>`,
      to: RECEIVER_EMAIL,
      replyTo: data.email,
      subject: `Nouvelle ${typeLabel} : ${data.name ?? "N/A"}`,
      html: htmlContent,
      text: textContent,
    });

    return NextResponse.json({ message: "Email envoyé avec succès" });
  } catch (err: any) {
    console.error("Mail error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}