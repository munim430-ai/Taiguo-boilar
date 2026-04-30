/* Featured Intake — Sahmyook University Sept 2026 */
function IntakeSection() {
  return (
    <section id="programs" className="section" style={{
      background: "var(--navy)",
      color: "var(--ivory)",
      position: "relative",
      overflow: "hidden",
    }}>
      <div className="celluloid-tile" style={{opacity: 0.12}}/>
      <div style={{
        position: "absolute", top: "-20%", right: "-10%",
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(36,87,214,0.25), transparent 70%)",
        pointerEvents: "none",
      }}/>

      <div className="wrap" style={{position: "relative"}}>
        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "end", marginBottom: 56}} className="intake-head">
          <div>
            <div className="kicker" style={{color: "var(--gold)"}}>FEATURED INTAKE · 2026</div>
            <h2 className="h-section" style={{color: "var(--ivory)", margin: "20px 0 0"}}>
              Sahmyook University{" "}
              <em style={{color: "var(--gold)"}}>September Intake</em><br/>guidance.
            </h2>
          </div>
          <p style={{color: "var(--on-dark-70)", fontSize: 17, lineHeight: 1.55, maxWidth: 500}}>
            For students currently on D-4-1 / D-4-7 visas in Korea who want to
            move to D-2-2 and begin a degree at Sahmyook University in Seoul.
            Subjects available in both English and Korean tracks.
          </p>
        </div>

        {/* Big stat row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 0,
          border: "1px solid rgba(248,245,239,0.14)",
          borderRadius: 16,
          overflow: "hidden",
          marginBottom: 56,
          background: "rgba(248,245,239,0.02)",
        }} className="intake-stats">
          {[
            ["IELTS", "5.5", "minimum, English Track"],
            ["Tuition", "≈ ₩2.2M", "after 50% scholarship*"],
            ["Bank solvency", "₩20M", "≈ 2 crore won*"],
            ["Service charge", "₩0", "selected intake*"],
          ].map(([label, big, sub], i) => (
            <div key={label} style={{
              padding: "32px 28px",
              borderRight: i < 3 ? "1px solid rgba(248,245,239,0.1)" : "none",
            }}>
              <div style={{fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", color: "var(--gold)", textTransform: "uppercase", marginBottom: 14}}>{label}</div>
              <div style={{
                fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 400,
                fontSize: 44, color: "var(--ivory)", lineHeight: 1, marginBottom: 8,
              }}>{big}</div>
              <div style={{fontSize: 12, color: "var(--on-dark-50)"}}>{sub}</div>
            </div>
          ))}
        </div>

        {/* Tracks split */}
        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32}} className="intake-tracks">
          <div style={{
            border: "1px solid rgba(245,185,66,0.4)",
            borderRadius: 16,
            padding: 28,
            background: "rgba(245,185,66,0.05)",
          }}>
            <div style={{fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", color: "var(--gold)", textTransform: "uppercase", marginBottom: 10}}>English Track</div>
            <div style={{fontSize: 14, color: "var(--on-dark-70)", marginBottom: 18}}>Six majors taught in English. IELTS 5.5+ required.</div>
            <div style={{display: "flex", flexWrap: "wrap", gap: 8}}>
              {["Business Administration", "Global Korean Studies", "Integrative Biotechnology", "Global Liberal Studies", "Early Childhood Education", "AI Convergence"].map(s => (
                <span key={s} className="chip chip-dark" style={{borderColor: "rgba(245,185,66,0.3)"}}>{s}</span>
              ))}
            </div>
          </div>
          <div style={{
            border: "1px solid rgba(36,87,214,0.45)",
            borderRadius: 16,
            padding: 28,
            background: "rgba(36,87,214,0.08)",
          }}>
            <div className="k-text" style={{fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", color: "#7BA3FF", textTransform: "uppercase", marginBottom: 10}}>Korean Track · 한국어 트랙</div>
            <div style={{fontSize: 14, color: "var(--on-dark-70)", marginBottom: 18}}>Wide major selection across the university. TOPIK guidance available.</div>
            <div style={{display: "flex", flexWrap: "wrap", gap: 8}}>
              {["Multiple majors", "TOPIK 3+ recommended", "Scholarship by GPA*"].map(s => (
                <span key={s} className="chip chip-dark" style={{borderColor: "rgba(36,87,214,0.4)"}}>{s}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div style={{
          padding: "18px 22px",
          background: "rgba(7,17,31,0.4)",
          border: "1px solid rgba(248,245,239,0.12)",
          borderRadius: 12,
          fontSize: 13,
          color: "var(--on-dark-70)",
          lineHeight: 1.55,
        }}>
          <strong style={{color: "var(--gold)"}}>* Disclaimer.</strong> Admission, tuition, scholarship, visa, and document
          requirements may change and depend on university and immigration assessment.
          Consultation does not guarantee admission or visa approval. Please confirm current
          values directly during consultation.
        </div>

        <div style={{display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap"}}>
          <a href="#eligibility" className="btn btn-gold">Check My Eligibility <Icon.Arrow/></a>
          <a href={waLink("Hello Sohel Rana, I'm interested in Sahmyook University Sept 2026 intake. Please share details.")} target="_blank" rel="noopener" className="btn btn-ghost-light"><Icon.WA/> Ask on WhatsApp</a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .intake-head { grid-template-columns: 1fr !important; gap: 24px !important; align-items: start !important; }
          .intake-stats { grid-template-columns: repeat(2, 1fr) !important; }
          .intake-stats > div:nth-child(2) { border-right: none !important; }
          .intake-stats > div:nth-child(1), .intake-stats > div:nth-child(2) { border-bottom: 1px solid rgba(248,245,239,0.1) !important; }
          .intake-tracks { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* Subject grid */
function Subjects() {
  const subjects = [
    {
      name: "Business Administration",
      desc: "Management foundations with English-language core courses. Strong default for students aiming at multinational paths in Korea.",
      ideal: "You want a versatile degree and English instruction.",
      icon: "BA",
    },
    {
      name: "Global Korean Studies",
      desc: "Korea, taught in English. Culture, society, politics, language — useful for students who want depth on Korea itself.",
      ideal: "You want to live and work in Korea long term.",
      icon: "GK",
    },
    {
      name: "Integrative Biotechnology",
      desc: "STEM-track program with applied biotech focus. Stronger fit for students with a science background and lab interest.",
      ideal: "You have science background and a STEM goal.",
      icon: "BT",
    },
    {
      name: "Global Liberal Studies",
      desc: "Interdisciplinary humanities and social sciences in English. Flexible if you want to keep options open across fields.",
      ideal: "You want flexibility, not a narrow specialization.",
      icon: "GL",
    },
    {
      name: "Early Childhood Education",
      desc: "Theory and practical training for early-years educators. Career-relevant if you want to work with children long term.",
      ideal: "You want a clear, people-facing career path.",
      icon: "EC",
    },
    {
      name: "AI Convergence",
      desc: "Applied AI across disciplines. Demanding but timely — pick this only if you have or are willing to build coding fundamentals.",
      ideal: "You're technical and serious about AI work.",
      icon: "AI",
    },
  ];

  return (
    <section className="section" style={{background: "var(--ivory)"}}>
      <div className="wrap">
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "end", flexWrap: "wrap", gap: 24, marginBottom: 48}}>
          <div>
            <div className="kicker">English Track Subjects</div>
            <h2 className="h-section" style={{margin: "20px 0 0", maxWidth: 720}}>
              Six majors. <em>Pick the one that matches you</em> — not the trend.
            </h2>
          </div>
          <div style={{fontSize: 13, color: "var(--ink-60)", maxWidth: 320}}>
            Each card includes a quick fit description and the kind of student
            it usually suits best.
          </div>
        </div>

        <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16}} className="subjects-grid">
          {subjects.map((s, i) => (
            <div key={s.name} className="card" style={{
              display: "flex", flexDirection: "column",
              padding: 28,
              minHeight: 280,
            }}>
              <div style={{display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 24}}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: i % 2 ? "var(--navy)" : "var(--blue)",
                  color: "var(--ivory)",
                  display: "grid", placeItems: "center",
                  fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 500,
                  fontSize: 18,
                }}>{s.icon}</div>
                <div style={{fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", color: "var(--ink-40)"}}>0{i+1}</div>
              </div>
              <div style={{
                fontFamily: "var(--sans)", fontWeight: 500,
                fontSize: 20, color: "var(--navy)", lineHeight: 1.2,
                marginBottom: 12, letterSpacing: "-0.01em",
              }}>{s.name}</div>
              <div style={{fontSize: 14, color: "var(--ink-60)", lineHeight: 1.55, marginBottom: 20, flex: 1}}>
                {s.desc}
              </div>
              <div style={{
                paddingTop: 16,
                borderTop: "1px solid var(--line)",
                fontSize: 12,
                color: "var(--blue)",
                fontWeight: 500,
                lineHeight: 1.4,
              }}>
                <span style={{fontWeight: 700, letterSpacing: "0.06em"}}>FIT &nbsp;·&nbsp;</span>
                {s.ideal}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .subjects-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .subjects-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

window.IntakeSection = IntakeSection;
window.Subjects = Subjects;
