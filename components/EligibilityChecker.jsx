/* Multi-step Eligibility Checker — frontend only */
function EligibilityChecker() {
  const [step, setStep] = React.useState(0);
  const [data, setData] = React.useState({
    name: "",
    visa: "",
    location: "",
    ielts: "",
    subject: "",
    bank: "",
    docs: "",
    phone: "",
  });

  const steps = [
    { key: "name", label: "Your name", type: "text", placeholder: "Full name" },
    { key: "visa", label: "Current visa type", type: "radio", options: ["D-4-1", "D-4-7", "D-2", "Other"] },
    { key: "location", label: "Where are you in Korea?", type: "text", placeholder: "e.g. Seoul, Bucheon, Daejeon…" },
    { key: "ielts", label: "IELTS score", type: "radio", options: ["Below 5.0", "5.0", "5.5", "6.0+", "No IELTS yet"] },
    { key: "subject", label: "Preferred subject", type: "radio", options: ["Business Admin", "Global Korean Studies", "Integrative Biotech", "Global Liberal Studies", "Early Childhood Ed.", "AI Convergence", "Korean Track / Other"] },
    { key: "bank", label: "Bank solvency (₩20M)", type: "radio", options: ["Yes, ready", "In progress", "No, not yet"] },
    { key: "docs", label: "Documents ready?", type: "radio", options: ["Yes, all set", "In progress", "Not yet"] },
    { key: "phone", label: "Your WhatsApp number", type: "text", placeholder: "e.g. +880 1xxx-xxxxxx" },
  ];

  const total = steps.length;
  const current = steps[step];
  const isLast = step === total - 1;

  /* Result logic */
  const computeResult = (d) => {
    let score = 0;
    if (d.visa === "D-4-1" || d.visa === "D-4-7") score += 25;
    else if (d.visa === "D-2") score += 15;
    if (d.ielts === "5.5") score += 25;
    else if (d.ielts === "6.0+") score += 30;
    else if (d.ielts === "5.0") score += 12;
    if (d.bank === "Yes, ready") score += 25;
    else if (d.bank === "In progress") score += 12;
    if (d.docs === "Yes, all set") score += 20;
    else if (d.docs === "In progress") score += 10;

    let band, badge, color, summary;
    if (d.visa === "Other") {
      band = "Manual Review Required";
      badge = "—";
      color = "var(--blue)";
      summary = "Your visa type needs a direct review with Sohel before recommending a path.";
    } else if (score >= 75) {
      band = "Ready for Review";
      badge = "✓";
      color = "#1F9D55";
      summary = "You look prepared. The next move is a focused consultation to lock the application timeline.";
    } else if (score >= 45) {
      band = "Almost Ready";
      badge = "≈";
      color = "var(--gold-2)";
      summary = "You're close. A few items need to be finalized before applying — Sohel can prioritize them with you.";
    } else {
      band = "Needs Preparation";
      badge = "!";
      color = "var(--blue)";
      summary = "There's preparation to do first. Don't worry — most students start here. The checklist below shows next steps.";
    }
    return { score, band, badge, color, summary };
  };

  const result = step === total ? computeResult(data) : null;

  const buildWAMessage = () => {
    return `Hello Sohel Rana, I checked my Korea study eligibility.

Name: ${data.name || "—"}
Visa: ${data.visa || "—"}
Location: ${data.location || "—"}
IELTS: ${data.ielts || "—"}
Preferred Subject: ${data.subject || "—"}
Bank Solvency: ${data.bank || "—"}
Documents: ${data.docs || "—"}
Phone: ${data.phone || "—"}
Result: ${result?.band || "—"}

Please guide me for admission.`;
  };

  const set = (key, val) => setData(d => ({...d, [key]: val}));
  const canAdvance = !!data[current?.key];

  const next = () => { if (canAdvance) setStep(s => Math.min(total, s + 1)); };
  const back = () => setStep(s => Math.max(0, s - 1));
  const reset = () => { setData({name:"",visa:"",location:"",ielts:"",subject:"",bank:"",docs:"",phone:""}); setStep(0); };

  return (
    <section id="eligibility" className="section" style={{background: "var(--ivory)", position: "relative"}}>
      <div className="wrap">
        <div style={{textAlign: "center", marginBottom: 48}}>
          <div className="kicker" style={{justifyContent: "center"}}>Eligibility Checker · 90 seconds</div>
          <h2 className="h-section" style={{margin: "20px 0 16px"}}>
            Find out where you <em>actually stand</em>.
          </h2>
          <p className="lead" style={{margin: "0 auto"}}>
            Eight quick questions. No account, no email collection. You'll get a
            readiness band and a prefilled WhatsApp message you can send Sohel.
          </p>
        </div>

        <div style={{
          maxWidth: 720,
          margin: "0 auto",
          background: "#FFFCF6",
          border: "1px solid var(--line)",
          borderRadius: 20,
          boxShadow: "0 30px 60px -30px rgba(7,17,31,0.2)",
          overflow: "hidden",
        }}>
          {/* Progress bar */}
          <div style={{
            display: "flex", alignItems: "center",
            padding: "20px 28px",
            borderBottom: "1px solid var(--line)",
            background: "var(--ivory)",
            gap: 16,
          }}>
            <div style={{
              fontSize: 11, fontWeight: 700, letterSpacing: "0.16em",
              color: "var(--ink-60)", textTransform: "uppercase",
              fontVariantNumeric: "tabular-nums",
              minWidth: 64,
            }}>
              {step === total ? `Result` : `${String(step+1).padStart(2,"0")} / ${String(total).padStart(2,"0")}`}
            </div>
            <div style={{flex: 1, height: 3, background: "var(--ink-08)", borderRadius: 999, overflow: "hidden"}}>
              <div style={{
                height: "100%",
                width: `${((step) / total) * 100 + (step === total ? 0 : (1/total)*100)}%`,
                background: "var(--gold)",
                transition: "width 0.4s ease",
              }}/>
            </div>
            <button onClick={reset} style={{
              fontSize: 11, fontWeight: 600, letterSpacing: "0.12em",
              color: "var(--ink-60)", textTransform: "uppercase",
              background: "none", border: "none",
            }}>Reset</button>
          </div>

          <div style={{padding: "44px 36px"}}>
            {step < total && (
              <div key={step} style={{animation: "fadeUp 0.4s ease"}}>
                <div style={{
                  fontFamily: "var(--serif)", fontStyle: "italic",
                  fontSize: 14, color: "var(--blue)", marginBottom: 6,
                }}>Question {step + 1}</div>
                <h3 style={{
                  fontFamily: "var(--sans)", fontWeight: 400,
                  fontSize: 28, color: "var(--navy)", lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                  margin: "0 0 28px",
                }}>{current.label}</h3>

                {current.type === "text" && (
                  <input
                    autoFocus
                    className="input"
                    type="text"
                    placeholder={current.placeholder}
                    value={data[current.key]}
                    onChange={(e) => set(current.key, e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && canAdvance) next(); }}
                    style={{fontSize: 18, padding: "16px 20px"}}
                  />
                )}

                {current.type === "radio" && (
                  <div className="radio-group">
                    {current.options.map((opt) => (
                      <button key={opt}
                        className={`radio-pill ${data[current.key] === opt ? "active" : ""}`}
                        onClick={() => set(current.key, opt)}
                        type="button">
                        {data[current.key] === opt && <Icon.Check size={12}/>}
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {/* Hint per question */}
                <div style={{
                  marginTop: 20,
                  fontSize: 12,
                  color: "var(--ink-40)",
                  lineHeight: 1.5,
                }}>
                  {current.key === "visa" && "Your D-status determines which pathway applies. D-4-1 / D-4-7 → D-2-2 is the most common route."}
                  {current.key === "ielts" && "5.5 is the typical English Track minimum at Sahmyook. If you don't have IELTS yet, that's fine — we'll plan around it."}
                  {current.key === "bank" && "Roughly ₩20,000,000 (around 2 crore won) per the latest intake info. The exact figure is confirmed at consultation."}
                  {current.key === "docs" && "Passport, ARC, transcripts, IELTS — we'll go through every item together."}
                  {current.key === "phone" && "We'll prefill a WhatsApp message you can review before sending. Nothing is stored anywhere."}
                </div>
              </div>
            )}

            {step === total && (
              <div style={{animation: "fadeUp 0.5s ease"}}>
                <div style={{
                  display: "inline-grid", placeItems: "center",
                  width: 56, height: 56, borderRadius: 999,
                  background: result.color, color: "#fff",
                  fontSize: 28, fontWeight: 600,
                  marginBottom: 20,
                }}>{result.badge}</div>
                <div className="eyebrow" style={{color: result.color, marginBottom: 8}}>YOUR READINESS</div>
                <h3 style={{
                  fontFamily: "var(--sans)", fontWeight: 300,
                  fontSize: 44, color: "var(--navy)", lineHeight: 1.05,
                  letterSpacing: "-0.025em",
                  margin: "0 0 16px",
                }}>{result.band}</h3>
                <p style={{fontSize: 16, color: "var(--ink-60)", lineHeight: 1.6, marginBottom: 28, maxWidth: 540}}>
                  {result.summary}
                </p>

                {/* Recap */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 0,
                  border: "1px solid var(--line)",
                  borderRadius: 12,
                  overflow: "hidden",
                  marginBottom: 28,
                }}>
                  {[
                    ["Visa", data.visa],
                    ["IELTS", data.ielts],
                    ["Subject", data.subject],
                    ["Bank solvency", data.bank],
                    ["Documents", data.docs],
                    ["Location", data.location],
                  ].map(([k, v], i) => (
                    <div key={k} style={{
                      padding: "12px 16px",
                      background: i % 2 === 0 ? "#FFFCF6" : "var(--ivory)",
                      borderRight: i % 2 === 0 ? "1px solid var(--line)" : "none",
                      borderBottom: i < 4 ? "1px solid var(--line)" : "none",
                      display: "flex", justifyContent: "space-between", gap: 12,
                    }}>
                      <span style={{fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", color: "var(--ink-40)", textTransform: "uppercase"}}>{k}</span>
                      <span style={{fontSize: 13, color: "var(--navy)", fontWeight: 500, textAlign: "right"}}>{v || "—"}</span>
                    </div>
                  ))}
                </div>

                <div style={{display: "flex", flexWrap: "wrap", gap: 10}}>
                  <a
                    href={waLink(buildWAMessage())}
                    target="_blank" rel="noopener"
                    className="btn btn-gold">
                    <Icon.WA/> Send result to Sohel
                  </a>
                  <button onClick={reset} className="btn btn-ghost">Start over</button>
                </div>

                <div style={{
                  marginTop: 28,
                  padding: "14px 16px",
                  background: "rgba(36,87,214,0.06)",
                  borderRadius: 10,
                  fontSize: 12,
                  color: "var(--ink-60)",
                  lineHeight: 1.5,
                }}>
                  This is a self-assessment, not an admission decision. Final
                  decisions belong to the university and Korean immigration.
                </div>
              </div>
            )}
          </div>

          {/* Footer controls */}
          {step < total && (
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "20px 28px",
              borderTop: "1px solid var(--line)",
              background: "var(--ivory)",
            }}>
              <button onClick={back} disabled={step === 0} className="btn btn-ghost" style={{
                opacity: step === 0 ? 0.4 : 1,
                cursor: step === 0 ? "not-allowed" : "pointer",
              }}>Back</button>
              <button onClick={next} disabled={!canAdvance} className="btn btn-primary" style={{
                opacity: canAdvance ? 1 : 0.4,
                cursor: canAdvance ? "pointer" : "not-allowed",
              }}>
                {isLast ? "See my result" : "Continue"} <Icon.Arrow/>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

window.EligibilityChecker = EligibilityChecker;
