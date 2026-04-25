"use client";
import { useState } from "react";

interface Props {
  className?: string;
  style?: React.CSSProperties;
  label?: string;
  type?: "briefing" | "sandbox" | "partner";
}

export default function ContactButton({ className, style, label = "CONTACT", type = "briefing" }: Props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function handleClose() {
    setOpen(false);
    if (status === "success") {
      setName(""); setEmail(""); setCompany(""); setStatus("idle");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, company, type }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(0,229,160,0.18)",
    borderRadius: "6px",
    padding: "10px 14px",
    color: "#e8edf5",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "var(--font-sans, 'IBM Plex Sans', system-ui, sans-serif)",
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={className}
        style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer", font: "inherit", ...style }}
      >
        {label}
      </button>

      {open && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.78)", backdropFilter: "blur(10px)", zIndex: 10000, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}
          onClick={handleClose}
        >
          <div
            style={{ background: "#060d18", border: "1px solid rgba(0,229,160,0.22)", borderRadius: "16px", padding: "40px", maxWidth: "440px", width: "100%", position: "relative", boxShadow: "0 0 60px rgba(0,229,160,0.06)" }}
            onClick={e => e.stopPropagation()}
          >
            <button onClick={handleClose} style={{ position: "absolute", top: "14px", right: "16px", background: "transparent", border: "none", color: "#3a5a70", cursor: "pointer", fontSize: "20px", lineHeight: 1, padding: 0 }}>✕</button>

            {status === "success" ? (
              <div style={{ textAlign: "center", padding: "16px 0" }}>
                <div style={{ width: "54px", height: "54px", borderRadius: "50%", background: "rgba(0,229,160,0.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", color: "#00E5A0", fontSize: "22px" }}>✓</div>
                <div style={{ fontFamily: "var(--font-serif-display, 'DM Serif Display', serif)", fontSize: "22px", color: "#f0f4fa", marginBottom: "8px" }}>Request Received</div>
                <div style={{ fontSize: "14px", color: "#5a7a8a", lineHeight: 1.6 }}>We'll be in touch at <span style={{ color: "#00E5A0" }}>{email}</span> within 24 hours.</div>
              </div>
            ) : (
              <>
                <div style={{ fontFamily: "var(--font-serif-display, 'DM Serif Display', serif)", fontSize: "22px", color: "#f0f4fa", marginBottom: "4px" }}>Request Technical Briefing</div>
                <div style={{ fontSize: "13px", color: "#4a6a80", marginBottom: "28px" }}>We'll respond within 24 hours.</div>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {([
                    { label: "FULL NAME", value: name, setter: setName, type: "text", placeholder: "Your name" },
                    { label: "WORK EMAIL", value: email, setter: setEmail, type: "email", placeholder: "you@company.com" },
                    { label: "COMPANY", value: company, setter: setCompany, type: "text", placeholder: "Company name" },
                  ] as const).map(({ label: lbl, value, setter, type: t, placeholder }) => (
                    <div key={lbl}>
                      <div style={{ fontSize: "10px", letterSpacing: "0.14em", color: "#3a5a70", marginBottom: "6px" }}>{lbl}</div>
                      <input
                        required
                        type={t}
                        value={value}
                        onChange={e => (setter as (v: string) => void)(e.target.value)}
                        placeholder={placeholder}
                        style={inputStyle}
                      />
                    </div>
                  ))}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    style={{ marginTop: "6px", padding: "12px 24px", borderRadius: "6px", background: "#00E5A0", color: "#030a14", fontWeight: 700, fontSize: "13px", letterSpacing: "0.08em", border: "none", cursor: status === "loading" ? "wait" : "pointer", transition: "opacity 0.2s" }}
                  >
                    {status === "loading" ? "SENDING…" : "SUBMIT REQUEST"}
                  </button>
                  {status === "error" && (
                    <div style={{ color: "#ef4444", fontSize: "13px", textAlign: "center" }}>Something went wrong. Please try again.</div>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
