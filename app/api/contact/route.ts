import { NextRequest, NextResponse } from "next/server";

const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";
const NOTIFY_EMAIL = process.env.CONTACT_NOTIFY_EMAIL ?? "odedblatman@gmail.com";
const FROM_EMAIL = "register@sentrixi.com";

export async function POST(req: NextRequest) {
  let body: { email?: string; name?: string; company?: string; type?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { email, name, company, type } = body;
  if (!email || !name) {
    return NextResponse.json({ error: "email and name are required" }, { status: 400 });
  }

  const typeLabels: Record<string, string> = {
    briefing: "Technical Briefing Request",
    sandbox: "Sandbox Access Request",
    partner: "Partnership Inquiry",
  };
  const label = typeLabels[type ?? ""] ?? "Contact Form";

  if (RESEND_API_KEY) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: NOTIFY_EMAIL,
        subject: `[Sentrixi] ${label} — ${name} @ ${company ?? "Unknown"}`,
        html: `
          <div style="font-family:sans-serif;max-width:560px">
            <h2 style="color:#6366f1">New ${label}</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px;color:#555;font-weight:600">Name</td><td style="padding:8px">${name}</td></tr>
              <tr style="background:#f9f9f9"><td style="padding:8px;color:#555;font-weight:600">Email</td><td style="padding:8px"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding:8px;color:#555;font-weight:600">Company</td><td style="padding:8px">${company ?? "—"}</td></tr>
              <tr style="background:#f9f9f9"><td style="padding:8px;color:#555;font-weight:600">Type</td><td style="padding:8px">${label}</td></tr>
              <tr><td style="padding:8px;color:#555;font-weight:600">Time</td><td style="padding:8px">${new Date().toISOString()}</td></tr>
            </table>
          </div>
        `,
      }),
    });
  }

  return NextResponse.json({ ok: true });
}
