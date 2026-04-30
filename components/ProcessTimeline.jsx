function ProcessTimeline() {
  const steps = [
    ["Initial WhatsApp consultation", "A short message-based conversation. We figure out your starting point — visa, IELTS, target intake."],
    ["Eligibility review", "Honest assessment of your readiness. If something's missing, we say so before you spend money."],
    ["Document checklist", "Walk through the full list: passport, ARC, transcripts, IELTS, solvency. You'll know what to gather first."],
    ["Subject selection", "Pick the major that fits your goals — not the one that sounds trendy. English vs Korean track decision."],
    ["Application preparation", "Personal statement, study plan, supporting documents. Reviewed before submission."],
    ["University submission guidance", "Where to send what, on what date, in what format. Nothing left to chance."],
    ["Result follow-up", "We monitor the timeline together. If a re-submission is needed, we know quickly."],
    ["D-2 pathway preparation", "Once admitted: visa change documents, financial proof, and the full immigration pack for D-2-2."],
  ];

  return (
    <section id="process" className="section" style={{background: "var(--ivory)", position: "relative"}}>
      <div className="celluloid-tile" style={{opacity: 0.06}}/>
      <div className="wrap" style={{position: "relative"}}>
        <div style={{textAlign: "center", marginBottom: 64, maxWidth: 720, margin: "0 auto 64px"}}>
          <div className="kicker" style={{justifyContent: "center"}}>The Process</div>
          <h2 className="h-section" style={{margin: "20px 0 16px"}}>
            Eight steps from <em>question to enrolled</em>.
          </h2>
          <p className="lead" style={{margin: "0 auto"}}>
            No mystery. Each step has a clear deliverable and a human checkpoint
            with Sohel before you move on.
          </p>
        </div>

        <div style={{position: "relative"}}>
          {/* Vertical line */}
          <div style={{
            position: "absolute",
            left: "50%", top: 12, bottom: 12,
            width: 1,
            background: "linear-gradient(to bottom, transparent, var(--ink-15) 8%, var(--ink-15) 92%, transparent)",
          }} className="timeline-line"/>

          <div style={{display: "grid", gap: 0}}>
            {steps.map(([title, desc], i) => {
              const right = i % 2 === 1;
              return (
                <div key={i} style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 80px 1fr",
                  alignItems: "center",
                  marginBottom: 24,
                }} className="timeline-row">
                  <div style={{
                    gridColumn: right ? 3 : 1,
                    textAlign: right ? "left" : "right",
                    paddingRight: right ? 0 : 32,
                    paddingLeft: right ? 32 : 0,
                  }} className="timeline-card-wrap">
                    <div className="card" style={{padding: 24, textAlign: "left"}}>
                      <div style={{
                        fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 400,
                        fontSize: 14, color: "var(--blue)", marginBottom: 6,
                      }}>Step {String(i + 1).padStart(2, "0")}</div>
                      <div style={{
                        fontSize: 19, fontWeight: 500, color: "var(--navy)",
                        letterSpacing: "-0.01em", lineHeight: 1.25, marginBottom: 8,
                      }}>{title}</div>
                      <div style={{fontSize: 14, color: "var(--ink-60)", lineHeight: 1.55}}>{desc}</div>
                    </div>
                  </div>
                  <div style={{display: "grid", placeItems: "center"}} className="timeline-marker">
                    <div style={{
                      width: 44, height: 44, borderRadius: 999,
                      background: "var(--ivory)",
                      border: "1.5px solid var(--blue)",
                      display: "grid", placeItems: "center",
                      fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 500,
                      fontSize: 16, color: "var(--blue)",
                      position: "relative", zIndex: 2,
                    }}>{i + 1}</div>
                  </div>
                  <div style={{gridColumn: right ? 1 : 3}}/>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .timeline-line { left: 22px !important; }
          .timeline-row { grid-template-columns: 44px 1fr !important; gap: 20px; align-items: start !important; }
          .timeline-card-wrap { grid-column: 2 !important; padding-left: 0 !important; padding-right: 0 !important; text-align: left !important; }
          .timeline-marker { grid-column: 1 !important; padding-top: 12px; }
          .timeline-row > div:nth-child(3) { display: none; }
        }
      `}</style>
    </section>
  );
}

window.ProcessTimeline = ProcessTimeline;
