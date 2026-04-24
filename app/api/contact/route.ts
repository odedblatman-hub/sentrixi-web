import { NextRequest, NextResponse } from "next/server";

const BREVO_API_KEY = process.env.BREVO_API_KEY ?? "";
const NOTIFY_EMAIL = process.env.CONTACT_NOTIFY_EMAIL ?? "odedblatman@gmail.com";
const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK_URL ?? "";
const FROM_EMAIL = "register@sentrixi.com";
const FROM_NAME = "Sentrixi AEGIS";

export async function POST(req: NextRequest) {
  try {
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

    const html = `<div style="font-family:sans-serif;max-width:560px;background:#0a0e1a;color:#e2e8f0;padding:32px;border-radius:12px"><h2 style="color:#a5b4fc;font-size:20px;margin:0 0 20px">New ${label}</h2><table style="width:100%;border-collapse:collapse;background:#111827;border-radius:8px;overflow:hidden"><tr><td style="padding:12px 16px;color:#64748b;font-size:13px;width:100px">Name</td><td style="padding:12px 16px;color:#e2e8f0;font-size:13px">${name}</td></tr><tr style="background:#1e293b"><td style="padding:12px 16px;color:#64748b;font-size:13px">Email</td><td style="padding:12px 16px;font-size:13px"><a href="mailto:${email}" style="color:#a5b4fc">${email}</a></td></tr><tr><td style="padding:12px 16px;color:#64748b;font-size:13px">Company</td><td style="padding:12px 16px;color:#e2e8f0;font-size:13px">${company ?? "-"}</td></tr><tr style="background:#1e293b"><td style="padding:12px 16px;color:#64748b;font-size:13px">Type</td><td style="padding:12px 16px;color:#6ee7b7;font-size:13px;font-weight:600">${label}</td></tr><tr><td style="padding:12px 16px;color:#64748b;font-size:13px">Time</td><td style="padding:12px 16px;color:#64748b;font-size:13px">${new Date().toISOString()}</td></tr></table></div>`;

    if (BREVO_API_KEY) {
      const res = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": BREVO_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: { name: FROM_NAME, email: FROM_EMAIL },
          to: [{ email: NOTIFY_EMAIL, name: "Oded Blatman" }],
          subject: `[Sentrixi] ${label} - ${name} @ ${company ?? "Unknown"}`,
          htmlContent: html,
        }),
      });
      if (!res.ok) {
        const err = await res.text();
        console.error("Brevo error:", err);
      }
    }

    if (SLACK_WEBHOOK) {
      const typeIcon = type === "sandbox" ? "[SANDBOX]" : type === "partner" ? "[PARTNER]" : "[BRIEFING]";
      await fetch(SLACK_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `${typeIcon} *New ${label}* on sentrixi.com\n*Name:* ${name}\n*Email:* ${email}\n*Company:* ${company ?? "-"}`,
        }),
      }).catch((e) => console.error("Slack error:", e));
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
