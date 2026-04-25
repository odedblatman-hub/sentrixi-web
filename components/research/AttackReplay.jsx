"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const ACCENT = "#00d4ff";

const SCENARIOS = [
  {
    id: 0,
    label: "Credential Misuse",
    mitre: "T1078 · T1530",
    lines: [
      { delay: 0,    tag: "sys",  msg: "aegis-shield initialized · db: prod-financial-01 · baseline: 90-day active" },
      { delay: 400,  tag: "ok",   msg: "session_start · user: j.morrison@acme.com · src: 10.12.4.88 · role: analyst_ro" },
      { delay: 900,  tag: "info", msg: "SELECT account_id, balance FROM accounts WHERE region='EMEA' LIMIT 100" },
      { delay: 1300, tag: "ok",   msg: "query_ok · rows: 100 · latency: 12ms · risk_delta: +0 · baseline: NORMAL" },
      { delay: 1900, tag: "info", msg: "SELECT account_id, balance FROM accounts WHERE region='EMEA' LIMIT 100 OFFSET 100" },
      { delay: 2300, tag: "ok",   msg: "query_ok · rows: 100 · latency: 11ms · risk_delta: +0" },
      { delay: 3000, tag: "warn", msg: "SELECT ssn, credit_card_number, dob FROM customers WHERE account_id IN (SELECT account_id FROM accounts)" },
      { delay: 3500, tag: "warn", msg: "anomaly_class: FIELD_ACCESS_DEVIATION · fields [ssn, credit_card_number] outside 90-day profile · risk_delta: +38" },
      { delay: 4200, tag: "warn", msg: "SELECT ssn, credit_card_number, dob, email FROM customers LIMIT 500" },
      { delay: 4700, tag: "warn", msg: "volume_spike · query_count: 6 in 90s · user_avg: 1.2/min · percentile: 99th · risk_delta: +24" },
      { delay: 5400, tag: "warn", msg: "SELECT t.amount, t.counterparty, c.ssn FROM transactions t JOIN customers c ON t.customer_id = c.id LIMIT 500" },
      { delay: 5900, tag: "warn", msg: "cross_table_join_alert · tables: [transactions, customers] · join_on: pii_field · risk_delta: +31" },
      { delay: 6700, tag: "crit", msg: "behavioral_deviation_confirmed · user: j.morrison · score: 94/100 · category: CREDENTIAL_MISUSE" },
      { delay: 7200, tag: "crit", msg: "AEGIS ALERT · anomalous_data_access · confidence: HIGH · records_at_risk: ~1,400 · response: FLAGGED" },
      { delay: 7700, tag: "sys",  msg: "alert_dispatched → siem_webhook · slack:#security-alerts · ticket: INC-20241104-0087" },
      { delay: 8200, tag: "sys",  msg: "evidence_package: generated · compliance: SOC2 · NYDFS · session_hash: a3f9b2c1" },
    ],
    risk: [0, 0, 5, 5, 5, 5, 43, 43, 67, 91, 91, 94, 94, 94, 94, 94],
    alertIndex: 13,
  },
  {
    id: 1,
    label: "Slow Exfiltration",
    mitre: "T1020 · T1041",
    lines: [
      { delay: 0,    tag: "sys",  msg: "aegis-shield · longitudinal_monitor active · session: svc_reporting@acme.com" },
      { delay: 400,  tag: "ok",   msg: "day_01 · SELECT customer_id, email FROM customers WHERE created_at > '2024-01-01' LIMIT 500" },
      { delay: 800,  tag: "ok",   msg: "query_ok · rows: 500 · daily_total: 500 · 30d_baseline: 480/day · risk: NORMAL" },
      { delay: 1500, tag: "info", msg: "day_07 · SELECT customer_id, email FROM customers WHERE created_at > '2024-01-07' LIMIT 500" },
      { delay: 1900, tag: "info", msg: "query_ok · rows: 500 · 7d_cumulative: 3,500 · trend: FLAT · risk_delta: +0" },
      { delay: 2600, tag: "warn", msg: "day_14 · SELECT customer_id, email, phone FROM customers ORDER BY created_at LIMIT 500" },
      { delay: 3000, tag: "warn", msg: "field_expansion_detected · new_field: [phone] · not in prior 14-day pattern · risk_delta: +18" },
      { delay: 3700, tag: "warn", msg: "day_21 · SELECT customer_id, email, phone, address FROM customers ORDER BY account_value DESC LIMIT 500" },
      { delay: 4100, tag: "warn", msg: "progressive_field_growth · fields added over 21d: [email → phone → address] · pattern: ENUMERATION · risk_delta: +34" },
      { delay: 4900, tag: "warn", msg: "day_28 · cumulative_export_estimate: 14,000 records · all_fields: PII · rate: sub-DAM-threshold intentional" },
      { delay: 5400, tag: "warn", msg: "longitudinal_pattern_lock · 28-day drift confirmed · export_vector: SYSTEMATIC · risk_delta: +41" },
      { delay: 6100, tag: "crit", msg: "slow_exfil_confirmed · score: 91/100 · 28d_exposure: ~14,000 PII records · TTD vs DAM: 26 days faster" },
      { delay: 6600, tag: "crit", msg: "AEGIS ALERT · slow_and_low_exfiltration · category: CUMULATIVE_ACCESS · confidence: HIGH" },
      { delay: 7100, tag: "sys",  msg: "alert_dispatched · evidence: 28-day access log · compliance_flags: GDPR · NYDFS §500.17" },
    ],
    risk: [0, 2, 2, 4, 4, 22, 22, 56, 56, 80, 90, 91, 91, 91],
    alertIndex: 12,
  },
  {
    id: 2,
    label: "Schema Recon",
    mitre: "T1213 · T1074",
    lines: [
      { delay: 0,    tag: "sys",  msg: "aegis-shield · session_start · principal: svc_cicd@pipeline.acme.com · role: deploy_ro" },
      { delay: 400,  tag: "ok",   msg: "SELECT version() · query_ok · expected: CI pipeline health check · risk: NORMAL" },
      { delay: 1000, tag: "warn", msg: "SELECT table_name, column_name, data_type FROM information_schema.columns WHERE table_schema='public'" },
      { delay: 1500, tag: "warn", msg: "schema_recon_detected · query: information_schema access · not in svc_cicd 90d profile · risk_delta: +45" },
      { delay: 2200, tag: "warn", msg: "SELECT table_name, pg_size_pretty(pg_total_relation_size(table_name::text)) FROM information_schema.tables" },
      { delay: 2700, tag: "warn", msg: "table_sizing_query · pattern: pre-exfil_target_selection · risk_delta: +28" },
      { delay: 3400, tag: "crit", msg: "SELECT column_name FROM information_schema.columns WHERE table_name='customers' AND data_type LIKE '%char%'" },
      { delay: 3900, tag: "crit", msg: "high_value_table_probe · target: customers · field_type_filter: VARCHAR (PII indicator) · risk_delta: +35" },
      { delay: 4600, tag: "crit", msg: "SELECT column_name FROM information_schema.columns WHERE table_name='payment_cards'" },
      { delay: 5100, tag: "crit", msg: "critical_table_probe · target: payment_cards · sequential_recon_confirmed · risk_delta: +29" },
      { delay: 5800, tag: "crit", msg: "schema_recon_complete · tables_mapped: 14 · high_value: [customers, payment_cards, transactions]" },
      { delay: 6300, tag: "crit", msg: "AEGIS ALERT · schema_reconnaissance · principal: svc_cicd · score: 97/100 · confidence: CRITICAL" },
      { delay: 6800, tag: "sys",  msg: "service_account_suspended · MITRE: T1213,T1074 · ticket: INC-20241104-0091" },
    ],
    risk: [0, 2, 47, 47, 75, 75, 89, 89, 93, 97, 97, 97, 97],
    alertIndex: 11,
  },
  {
    id: 3,
    label: "Data Poisoning",
    mitre: "T1565 · T1491",
    lines: [
      { delay: 0,    tag: "sys",  msg: "aegis-shield · write_pattern_monitor active · db: prod-ledger-02 · user: ops_batch@acme.com" },
      { delay: 400,  tag: "ok",   msg: "UPDATE transactions SET status='settled' WHERE batch_id='B-20241101' · rows_affected: 847" },
      { delay: 900,  tag: "ok",   msg: "write_ok · rows: 847 · fields: [status] · drift_score: 0.02 · baseline: NORMAL" },
      { delay: 1600, tag: "info", msg: "UPDATE transactions SET amount=amount*1.0023 WHERE transaction_date='2024-11-01' · rows_affected: 312" },
      { delay: 2100, tag: "warn", msg: "amount_mutation_detected · modifier: *1.0023 (0.23% inflation) · field: amount · not in write profile · risk_delta: +38" },
      { delay: 2800, tag: "warn", msg: "UPDATE transactions SET counterparty_id=8841 WHERE counterparty_id=8840 AND amount > 50000 · rows: 7" },
      { delay: 3300, tag: "warn", msg: "counterparty_substitution · high_value_filter (>$50K) · pattern: TARGETED_REDIRECT · risk_delta: +44" },
      { delay: 4000, tag: "warn", msg: "statistical_drift · amount_field · mean_shift: +0.23% · affected_records: 312 · z_score: 4.1 · risk_delta: +20" },
      { delay: 4700, tag: "crit", msg: "UPDATE accounts SET balance=balance-0.01 WHERE account_type='dormant' · rows_affected: 1,840" },
      { delay: 5200, tag: "crit", msg: "salami_slicing_pattern · systematic_micro_debit · dormant_account_targeting · risk_delta: +38" },
      { delay: 5900, tag: "crit", msg: "data_poisoning_confirmed · write_drift_score: 89 · affected_tables: [transactions, accounts] · exposure: MATERIAL" },
      { delay: 6400, tag: "crit", msg: "AEGIS ALERT · data_integrity_violation · score: 93/100 · pattern: FINANCIAL_MANIPULATION · confidence: HIGH" },
      { delay: 6900, tag: "sys",  msg: "alert_dispatched · rollback_candidate: flagged · compliance: SOX · PCI-DSS · NYDFS §500" },
    ],
    risk: [0, 3, 3, 41, 41, 72, 72, 78, 83, 89, 89, 93, 93],
    alertIndex: 11,
  },
];

const TAG_STYLES = {
  sys:  { bg: "rgba(100,100,120,0.2)",  color: "#6a7a90" },
  ok:   { bg: "rgba(52,211,153,0.12)",  color: "#34d399" },
  info: { bg: "rgba(0,212,255,0.12)",   color: "#00d4ff" },
  warn: { bg: "rgba(245,158,11,0.15)",  color: "#f59e0b" },
  crit: { bg: "rgba(255,68,68,0.15)",   color: "#ff4444" },
};

const MSG_COLORS = { sys: "#6a7a90", ok: "#34d399", info: "#8090a0", warn: "#f59e0b", crit: "#ff4444" };
const RISK_COLOR = (v) => v < 40 ? "#34d399" : v < 70 ? "#f59e0b" : "#ff4444";

function nowTs() {
  const n = new Date();
  return n.toTimeString().slice(0, 8) + "." + String(n.getMilliseconds()).padStart(3, "0");
}

export default function AttackReplay() {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [lines, setLines] = useState([]);
  const [riskScore, setRiskScore] = useState(0);
  const [running, setRunning] = useState(false);
  const [detected, setDetected] = useState(false);
  const bodyRef = useRef(null);
  const timersRef = useRef([]);

  const clearTimers = useCallback(() => { timersRef.current.forEach(clearTimeout); timersRef.current = []; }, []);

  const runScenario = useCallback((idx) => {
    clearTimers();
    setLines([]);
    setRiskScore(0);
    setDetected(false);
    setRunning(true);
    const s = SCENARIOS[idx];
    s.lines.forEach((line, i) => {
      const t = setTimeout(() => {
        const ts = nowTs();
        setLines(prev => [...prev, { ...line, ts, id: Date.now() + i }]);
        setRiskScore(s.risk[i] ?? 0);
        if (i === s.alertIndex) setDetected(true);
        if (i === s.lines.length - 1) setRunning(false);
      }, line.delay);
      timersRef.current.push(t);
    });
  }, [clearTimers]);

  useEffect(() => { runScenario(0); return clearTimers; }, [runScenario, clearTimers]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  const riskColor = RISK_COLOR(riskScore);
  const s = SCENARIOS[scenarioIdx];

  return (
    <section style={{ position: "relative", zIndex: 1, padding: "6rem 2rem", background: "rgba(0,5,12,0.7)", borderTop: "1px solid rgba(0,210,255,0.06)" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ fontSize: "0.68rem", letterSpacing: "0.2em", color: ACCENT, opacity: 0.7, marginBottom: "0.75rem" }}>SIMULATION 02 · LIVE DETECTION REPLAY</div>
          <h2 style={{ fontFamily: "var(--font-serif-display, 'DM Serif Display', serif)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, lineHeight: 1.2, color: "#f0f4fa", marginBottom: "0.75rem" }}>
            What AEGIS sees — at the query layer.
          </h2>
          <p style={{ color: "#5a7a8a", fontSize: "0.9rem", lineHeight: 1.6, maxWidth: "580px" }}>
            Each scenario replays a real attack pattern using the field names, query structures, and behavioral signals AEGIS Shield detects in production environments.
          </p>
        </div>

        <div style={{ background: "#04080f", border: "1px solid rgba(0,212,255,0.15)", borderRadius: "12px", overflow: "hidden", fontFamily: "'IBM Plex Mono', 'Courier New', monospace" }}>
          {/* Header bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", background: "#060c14", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ display: "flex", gap: "6px" }}>
                {["#ff5f57", "#febc2e", "#28c840"].map(c => (
                  <div key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c }} />
                ))}
              </div>
              <span style={{ fontSize: "11px", color: "#3a5a70", letterSpacing: "0.08em" }}>aegis-shield · behavioral-monitor · v2.4.1</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: detected ? "#ff4444" : "#34d399", animation: running && !detected ? "ar-pulse 1.5s infinite" : "none" }} />
              <span style={{ fontSize: "10px", letterSpacing: "0.1em", color: detected ? "#ff4444" : "#34d399" }}>
                {detected ? "THREAT DETECTED" : running ? "MONITORING" : "IDLE"}
              </span>
            </div>
          </div>

          {/* Scenario tabs */}
          <div style={{ display: "flex", gap: "6px", padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.04)", flexWrap: "wrap" }}>
            {SCENARIOS.map((sc, i) => (
              <button key={sc.id} onClick={() => { setScenarioIdx(i); runScenario(i); }} disabled={running && i !== scenarioIdx}
                style={{ padding: "4px 12px", fontSize: "10px", letterSpacing: "0.08em", borderRadius: "3px", border: i === scenarioIdx ? "1px solid rgba(0,212,255,0.4)" : "1px solid rgba(255,255,255,0.07)", background: i === scenarioIdx ? "rgba(0,212,255,0.06)" : "transparent", color: i === scenarioIdx ? "#00d4ff" : "#4a6a80", cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s", opacity: running && i !== scenarioIdx ? 0.4 : 1 }}>
                {sc.label.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Terminal output */}
          <div ref={bodyRef} style={{ padding: "16px", height: "340px", overflowY: "auto", scrollBehavior: "smooth" }}>
            {lines.map(line => {
              const tagStyle = TAG_STYLES[line.tag] || TAG_STYLES.info;
              return (
                <div key={line.id} style={{ display: "flex", gap: "8px", margin: "3px 0", fontSize: "12px", lineHeight: 1.5, alignItems: "flex-start", animation: "ar-fadeIn 0.15s ease" }}>
                  <span style={{ color: "#2a4a5a", minWidth: "86px", flexShrink: 0, fontSize: "11px", marginTop: "1px" }}>{line.ts}</span>
                  <span style={{ fontSize: "10px", padding: "1px 6px", borderRadius: "2px", fontWeight: 700, letterSpacing: "0.08em", minWidth: "44px", textAlign: "center", flexShrink: 0, marginTop: "1px", background: tagStyle.bg, color: tagStyle.color }}>{line.tag.toUpperCase()}</span>
                  <span style={{ color: MSG_COLORS[line.tag] || "#8090a0", flex: 1, wordBreak: "break-all" }}>{line.msg}</span>
                </div>
              );
            })}
            {running && (
              <div style={{ display: "flex", gap: "8px", margin: "3px 0", alignItems: "center" }}>
                <span style={{ minWidth: "86px", color: "#2a4a5a", fontSize: "11px" }}>{nowTs()}</span>
                <span style={{ display: "inline-block", width: "7px", height: "13px", background: "#00d4ff", animation: "ar-blink 1s infinite", marginLeft: "2px" }} />
              </div>
            )}
          </div>

          {/* Risk bar footer */}
          <div style={{ padding: "10px 16px", background: "#060c14", borderTop: "1px solid rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", flex: 1 }}>
              <span style={{ fontSize: "10px", color: "#2a4a5a", letterSpacing: "0.08em", flexShrink: 0 }}>RISK SCORE</span>
              <div style={{ height: "3px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", flex: 1, overflow: "hidden", maxWidth: "180px" }}>
                <div style={{ height: "100%", width: `${riskScore}%`, background: riskColor, borderRadius: "2px", transition: "width 0.7s ease, background 0.4s ease" }} />
              </div>
              <span style={{ fontSize: "12px", fontWeight: 700, color: riskColor, minWidth: "28px" }}>{riskScore}</span>
              <span style={{ fontSize: "10px", color: "#2a4a5a", letterSpacing: "0.06em" }}>{s.mitre}</span>
            </div>
            <button onClick={() => runScenario(scenarioIdx)} disabled={running} style={{ padding: "6px 14px", background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.25)", borderRadius: "4px", color: "#00d4ff", fontSize: "10px", letterSpacing: "0.1em", cursor: running ? "default" : "pointer", fontFamily: "inherit", opacity: running ? 0.5 : 1, transition: "all 0.2s" }}>
              {running ? "RUNNING..." : "REPLAY"}
            </button>
          </div>
        </div>

        <p style={{ marginTop: "1.25rem", fontSize: "0.75rem", color: "#2a4a5a", textAlign: "center", letterSpacing: "0.04em" }}>
          Field names, query structures, and anomaly signatures reflect real AEGIS Shield detection logic. Each replay runs against a 90-day behavioral baseline model.
        </p>
      </div>

      <style>{`
        @keyframes ar-blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes ar-fadeIn { from{opacity:0;transform:translateY(2px)} to{opacity:1;transform:none} }
        @keyframes ar-pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
      `}</style>
    </section>
  );
}
