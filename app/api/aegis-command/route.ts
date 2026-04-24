import { NextRequest, NextResponse } from "next/server";

const SECURITY_CODE = process.env.AEGIS_SECURITY_CODE ?? "0102";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? "";
const GITHUB_REPO = process.env.GITHUB_REPO ?? "odedblatman-hub/sentrixi-web";

export async function POST(req: NextRequest) {
  let body: { code?: string; command?: string; priority?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (body.code !== SECURITY_CODE) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!body.command?.trim()) {
    return NextResponse.json({ error: "command is required" }, { status: 400 });
  }

  if (!GITHUB_TOKEN) {
    return NextResponse.json({ error: "GitHub integration not configured" }, { status: 503 });
  }

  const issueTitle = `[AEGIS-CMD] ${body.command.slice(0, 72)}`;
  const issueBody = `## AEGIS Voice Command\n\n**Priority:** ${body.priority ?? "normal"}\n**Received:** ${new Date().toISOString()}\n\n### Command\n\n${body.command}\n\n---\n_Triggered via AEGIS Command Center. Implement and deploy automatically._`;

  const ghRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/issues`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
      Accept: "application/vnd.github+json",
    },
    body: JSON.stringify({
      title: issueTitle,
      body: issueBody,
      labels: ["aegis-command", "auto-deploy"],
    }),
  });

  if (!ghRes.ok) {
    const err = await ghRes.text();
    console.error("GitHub issue creation failed:", err);
    return NextResponse.json({ error: "Failed to create command issue" }, { status: 502 });
  }

  const issue = await ghRes.json();
  return NextResponse.json({
    ok: true,
    message: "Command received and queued for deployment",
    issue: issue.number,
    url: issue.html_url,
  });
}

export async function GET() {
  return NextResponse.json({ status: "AEGIS Command Center active", version: "1.0" });
}
