/* Document Checklist with localStorage */
function DocumentChecklist() {
  const items = [
    ["passport", "Passport", "Valid for at least 1 year beyond intake date."],
    ["arc", "ARC / Residence Card", "Korean alien registration card — both sides."],
    ["academic", "Academic Certificates", "All previous education certificates, attested if required."],
    ["transcript", "Academic Transcript", "Sealed copy from your institution."],
    ["ielts", "IELTS / English Score", "5.5+ for English Track at Sahmyook."],
    ["bank", "Bank Solvency Document", "≈ ₩20,000,000 for student visa application."],
    ["photo", "Passport Photos", "White background, recent. Korean spec preferred."],
    ["application", "University Application Form", "Filled in line with university template."],
    ["statement", "Personal Statement", "Why this university, why this major, post-study plan."],
    ["other", "Other University Documents", "Recommendation letter, study plan, etc. as required."],
  ];

  const KEY = "sr_doc_checklist_v1";
  const [checked, setChecked] = React.useState(() => {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
  });

  React.useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(checked)); } catch {}
  }, [checked]);

  const toggle = (id) => setChecked(c => ({...c, [id]: !c[id]}));
  const reset = () => setChecked({});
  const count = items.filter(([id]) => checked[id]).length;
  const pct = Math.round((count / items.length) * 100);

  return (
    <section className="section" style={{background: "#FFFCF6", borderTop: "1px solid var(--line)"}}>
      <div className="wrap">
        <div style={{display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 64}} className="doc-grid">
          <div>
            <div className="kicker">Document Checklist</div>
            <h2 className="h-section" style={{margin: "20px 0 24px"}}>
              Track every paper, <em>before</em> you apply.
            </h2>
            <p className="lead" style={{marginBottom: 32}}>
              A simple checklist that saves to your browser. Tick items off as
              you collect them. Bring this list (and your questions) to your
              consultation.
            </p>

            <div style={{
              padding: "20px 22px",
              border: "1px solid var(--line)",
              borderRadius: 14,
              background: "var(--ivory)",
              marginBottom: 20,
            }}>
              <div style={{display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12}}>
                <div style={{fontSize: 12, fontWeight: 600, letterSpacing: "0.16em", color: "var(--ink-60)", textTransform: "uppercase"}}>
                  Your progress
                </div>
                <div style={{fontVariantNumeric: "tabular-nums", fontSize: 13, color: "var(--navy)", fontWeight: 600}}>
                  {count} / {items.length}
                </div>
              </div>
              <div style={{height: 6, background: "var(--ink-08)", borderRadius: 999, overflow: "hidden"}}>
                <div style={{
                  height: "100%",
                  width: `${pct}%`,
                  background: "linear-gradient(to right, var(--blue), var(--gold))",
                  transition: "width 0.4s ease",
                }}/>
              </div>
            </div>

            <button onClick={reset} className="btn btn-ghost">Reset checklist</button>
          </div>

          <div>
            <div style={{display: "grid", gap: 8}}>
              {items.map(([id, label, hint]) => {
                const on = !!checked[id];
                return (
                  <button key={id} onClick={() => toggle(id)} type="button" style={{
                    display: "flex", alignItems: "flex-start", gap: 16,
                    width: "100%", textAlign: "left",
                    padding: "16px 18px",
                    background: on ? "rgba(36,87,214,0.04)" : "#FFFCF6",
                    border: `1px solid ${on ? "rgba(36,87,214,0.3)" : "var(--line)"}`,
                    borderRadius: 12,
                    cursor: "pointer",
                    transition: "all 0.18s",
                  }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: 6,
                      background: on ? "var(--blue)" : "transparent",
                      border: `1.5px solid ${on ? "var(--blue)" : "var(--ink-15)"}`,
                      display: "grid", placeItems: "center",
                      color: "#fff",
                      flexShrink: 0,
                      transition: "all 0.18s",
                      marginTop: 1,
                    }}>
                      {on && <Icon.Check size={12}/>}
                    </div>
                    <div style={{flex: 1}}>
                      <div style={{
                        fontSize: 15, fontWeight: 500,
                        color: "var(--navy)",
                        textDecoration: on ? "line-through" : "none",
                        textDecorationColor: "var(--ink-40)",
                        opacity: on ? 0.7 : 1,
                        marginBottom: 2,
                      }}>{label}</div>
                      <div style={{fontSize: 12, color: "var(--ink-60)", lineHeight: 1.5}}>{hint}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .doc-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}

window.DocumentChecklist = DocumentChecklist;
