function About() {
  return (
    <section id="about" className="section" style={{position: "relative"}}>
      <div className="celluloid-tile" style={{opacity: 0.08}}/>
      <div className="wrap" style={{position: "relative"}}>
        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start"}} className="about-grid">
          {/* LEFT: photos */}
          <div style={{position: "relative", aspectRatio: "1/1.05"}} className="about-photos">
            {/* Big photo: credential */}
            <div style={{
              position: "absolute", top: 0, left: 0, width: "70%", height: "78%",
              borderRadius: 4, overflow: "hidden",
              boxShadow: "0 30px 60px -20px rgba(7,17,31,0.3)",
              border: "1px solid var(--line)",
            }}>
              <img src="public/images/photo-3.jpg" alt="Sohel Rana holding Korean Ministry of Justice (법무부) certificate of appointment as Immigrant Mentor Instructor" style={{width: "100%", height: "100%", objectFit: "cover"}}/>
            </div>
            {/* Small photo: campus */}
            <div style={{
              position: "absolute", bottom: 0, right: 0, width: "62%", height: "55%",
              borderRadius: 4, overflow: "hidden",
              boxShadow: "0 30px 60px -20px rgba(7,17,31,0.4)",
              border: "1px solid var(--line)",
            }}>
              <img src="public/images/photo-4.jpg" alt="Sohel Rana with International Affairs staff at Namseoul University" style={{width: "100%", height: "100%", objectFit: "cover"}}/>
            </div>
            {/* Floating credential card */}
            <div style={{
              position: "absolute",
              top: "55%", left: "55%",
              background: "var(--navy)",
              color: "var(--ivory)",
              borderRadius: 12,
              padding: "16px 18px",
              boxShadow: "0 24px 60px -20px rgba(7,17,31,0.5)",
              border: "1px solid rgba(245,185,66,0.4)",
              maxWidth: 240,
              transform: "rotate(-2deg)",
              zIndex: 3,
            }}>
              <div className="k-text" style={{fontSize: 11, color: "var(--gold)", letterSpacing: "0.1em", marginBottom: 4}}>대한민국 법무부</div>
              <div style={{fontSize: 13, fontWeight: 600, lineHeight: 1.3}}>
                Ministry of Justice<br/>Immigrant Mentor Instructor
              </div>
              <div style={{fontSize: 11, color: "var(--on-dark-70)", marginTop: 6}}>Republic of Korea</div>
            </div>
          </div>

          {/* RIGHT: copy */}
          <div>
            <div className="kicker">About Sohel Rana</div>
            <h2 className="h-section" style={{margin: "20px 0 28px"}}>
              A Korea-based guide for{" "}
              <em>students who can't afford guesswork</em>.
            </h2>
            <p className="lead" style={{marginBottom: 20}}>
              Sohel Rana works directly from Korea, helping Bangladeshi and
              international students understand admission, prepare documents,
              and plan the visa pathway from D-4 language status to D-2 degree
              status — in plain English and Bangla.
            </p>
            <p className="lead" style={{marginBottom: 36}}>
              He also serves as <strong style={{color: "var(--navy)"}}>Immigrant Mentor Instructor</strong> with
              the Korean Ministry of Justice (법무부), and runs <strong style={{color: "var(--navy)"}}>KB Academy</strong>,
              an education and learning practice based in Pocheon, Gyeonggi-do.
            </p>

            {/* Credential strip */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 0,
              border: "1px solid var(--line)",
              borderRadius: 14,
              overflow: "hidden",
              marginBottom: 32,
            }}>
              {[
                ["Role", "Korea Study Consultant"],
                ["Affiliation", "KB Academy · Founder"],
                ["Credential", "법무부 Mentor Instructor"],
                ["Based in", "Pocheon · Seoul region"],
              ].map(([k, v], i) => (
                <div key={k} style={{
                  padding: "18px 20px",
                  background: i % 2 === 0 ? "#FFFCF6" : "var(--ivory)",
                  borderRight: i % 2 === 0 ? "1px solid var(--line)" : "none",
                  borderBottom: i < 2 ? "1px solid var(--line)" : "none",
                }}>
                  <div style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: "0.16em",
                    color: "var(--blue)", textTransform: "uppercase", marginBottom: 6,
                  }}>{k}</div>
                  <div style={{fontSize: 14, color: "var(--navy)", fontWeight: 500}}>{v}</div>
                </div>
              ))}
            </div>

            {/* Honest disclaimer */}
            <div style={{
              padding: "16px 18px",
              background: "rgba(36,87,214,0.06)",
              border: "1px solid rgba(36,87,214,0.18)",
              borderRadius: 12,
              fontSize: 13,
              color: "var(--ink-60)",
              lineHeight: 1.55,
            }}>
              <strong style={{color: "var(--navy)"}}>What this isn't.</strong> This
              practice is not an official university partner and does not
              guarantee admission, scholarship, or visa approval — those decisions
              rest with the university and Korean immigration. What you get is a
              Korea-based guide who can answer questions in your language.
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 56px !important; }
          .about-photos { max-width: 480px; margin: 0 auto; }
        }
      `}</style>
    </section>
  );
}

window.About = About;
