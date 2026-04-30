function Hero({ heroVariant = "globe" }) {
  const heroPhoto = "public/images/photo-1.jpg";

  return (
    <section id="home" style={{
      position: "relative",
      minHeight: "100vh",
      background: "linear-gradient(180deg, #07111F 0%, #0C1A2E 60%, #07111F 100%)",
      color: "var(--ivory)",
      overflow: "hidden",
      paddingTop: 120,
      paddingBottom: 80,
      display: "flex",
      alignItems: "center",
    }}>
      {/* Celluloid backdrop */}
      <div className="celluloid-tile" style={{opacity: 0.13}}/>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 80% 30%, rgba(36,87,214,0.22), transparent 55%), radial-gradient(ellipse at 10% 90%, rgba(245,185,66,0.06), transparent 50%)",
        pointerEvents: "none",
      }}/>

      <div className="wrap" style={{position: "relative", zIndex: 2, width: "100%"}}>
        <div className="hero-grid" style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: 80,
          alignItems: "center",
        }}>
          {/* LEFT */}
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "8px 14px",
              borderRadius: 999,
              border: "1px solid rgba(245,185,66,0.35)",
              background: "rgba(245,185,66,0.08)",
              fontSize: 12, fontWeight: 600, letterSpacing: "0.06em",
              color: "var(--gold)",
              marginBottom: 36,
            }}>
              <span style={{width: 6, height: 6, borderRadius: 999, background: "var(--gold)", boxShadow: "0 0 0 4px rgba(245,185,66,0.25)"}}/>
              KOREA-BASED · ACCEPTING SEPT 2026 INTAKE
            </div>

            <h1 style={{
              fontFamily: "var(--sans)",
              fontWeight: 200,
              fontSize: "clamp(44px, 6.2vw, 88px)",
              lineHeight: 1.0,
              letterSpacing: "-0.038em",
              color: "var(--ivory)",
              margin: "0 0 28px",
              textWrap: "balance",
            }}>
              Your Korea study<br/>
              pathway starts with{" "}
              <span style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontWeight: 400,
                color: "var(--gold)",
              }}>clear guidance</span>.
            </h1>

            <p style={{
              fontSize: 18,
              lineHeight: 1.55,
              color: "var(--on-dark-70)",
              maxWidth: 560,
              margin: "0 0 18px",
            }}>
              D-4 to D-2 pathway, Korean university admission guidance, document
              readiness, and direct consultation — from Seoul.
            </p>

            <p className="bn-text" style={{
              fontSize: 15,
              color: "var(--on-dark-50)",
              maxWidth: 560,
              margin: "0 0 40px",
              fontFamily: "var(--bn)",
            }}>
              বাংলাদেশী এবং আন্তর্জাতিক স্টুডেন্টদের জন্য কোরিয়া ভিত্তিক স্টাডি গাইডেন্স।
            </p>

            <div style={{display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 44}}>
              <a href="#eligibility" className="btn btn-gold">
                Check My Eligibility
                <Icon.Arrow/>
              </a>
              <a href={waLink("Hello Sohel Rana, I'd like consultation on Korea study and admission.")} target="_blank" rel="noopener" className="btn btn-ghost-light">
                <Icon.WA size={14}/> WhatsApp Sohel Rana
              </a>
            </div>

            <div style={{display: "flex", flexWrap: "wrap", gap: 8}}>
              {["Korea-Based Consultant", "D-4 → D-2 Guidance", "Student Admission Support", "WhatsApp Consultation", "No Service Charge · Selected Intake"].map((b) => (
                <span key={b} className="chip chip-dark">{b}</span>
              ))}
            </div>
          </div>

          {/* RIGHT — layered photo */}
          <div style={{position: "relative", aspectRatio: "4/5", maxWidth: 540, justifySelf: "end", width: "100%"}} className="hero-photo-stack">
            {/* Backplate frame */}
            <div style={{
              position: "absolute",
              inset: "20px -20px 60px 30px",
              border: "1px solid rgba(245,185,66,0.35)",
              borderRadius: 4,
              background: "linear-gradient(160deg, rgba(36,87,214,0.18), rgba(7,17,31,0))",
            }}/>
            {/* Main photo */}
            <div style={{
              position: "absolute", inset: 0,
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 30px 80px -20px rgba(0,0,0,0.6)",
            }}>
              <img src={heroPhoto} alt="Sohel Rana on a Korean university campus, holding a brochure"
                style={{width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%"}}/>
              {/* Bottom caption strip */}
              <div style={{
                position: "absolute", left: 0, right: 0, bottom: 0,
                padding: "16px 18px 14px",
                background: "linear-gradient(to top, rgba(7,17,31,0.95), transparent)",
                display: "flex", justifyContent: "space-between", alignItems: "flex-end",
                color: "var(--ivory)",
                fontSize: 11,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
              }}>
                <span>SOHEL RANA · SEOUL, KR</span>
                <span style={{color: "var(--gold)"}}>EST. 2024</span>
              </div>
            </div>

            {/* Floating card 1 — D-4 to D-2 */}
            <div style={{
              position: "absolute",
              top: "8%",
              left: "-18%",
              animation: "float-1 6s ease-in-out infinite",
              background: "rgba(248,245,239,0.97)",
              backdropFilter: "blur(16px)",
              borderRadius: 12,
              padding: "14px 18px",
              boxShadow: "0 24px 60px -20px rgba(0,0,0,0.5)",
              border: "1px solid rgba(36,87,214,0.2)",
              minWidth: 190,
              transform: "rotate(-2deg)",
            }} className="float-card-1">
              <div style={{fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", color: "var(--blue)", textTransform: "uppercase", marginBottom: 6}}>VISA PATHWAY</div>
              <div style={{display: "flex", alignItems: "center", gap: 10}}>
                <div style={{
                  fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 500,
                  fontSize: 28, color: "var(--navy)", lineHeight: 1,
                }}>D-4</div>
                <Icon.Arrow size={16}/>
                <div style={{
                  fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 500,
                  fontSize: 28, color: "var(--blue)", lineHeight: 1,
                }}>D-2</div>
              </div>
              <div style={{fontSize: 11, color: "var(--ink-60)", marginTop: 4}}>Language → Degree</div>
            </div>

            {/* Floating card 2 — Sahmyook */}
            <div style={{
              position: "absolute",
              right: "-16%",
              top: "38%",
              animation: "float-2 7s ease-in-out infinite",
              background: "var(--navy)",
              borderRadius: 12,
              padding: "14px 18px",
              boxShadow: "0 24px 60px -20px rgba(0,0,0,0.7)",
              border: "1px solid rgba(245,185,66,0.4)",
              minWidth: 200,
              color: "var(--ivory)",
              transform: "rotate(3deg)",
            }} className="float-card-2">
              <div style={{fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", color: "var(--gold)", textTransform: "uppercase", marginBottom: 6}}>FEATURED INTAKE</div>
              <div style={{fontSize: 16, fontWeight: 600, lineHeight: 1.2}}>Sahmyook University</div>
              <div style={{fontSize: 12, color: "var(--on-dark-70)", marginTop: 2}}>September 2026 · IELTS 5.5</div>
            </div>

            {/* Floating card 3 — credential */}
            <div style={{
              position: "absolute",
              bottom: "-2%",
              left: "5%",
              animation: "float-1 8s ease-in-out infinite",
              background: "rgba(248,245,239,0.97)",
              borderRadius: 10,
              padding: "10px 14px",
              boxShadow: "0 20px 40px -16px rgba(0,0,0,0.5)",
              border: "1px solid rgba(7,17,31,0.1)",
              display: "flex", alignItems: "center", gap: 12,
              transform: "rotate(-1.5deg)",
            }} className="float-card-3">
              <div style={{
                width: 36, height: 36, borderRadius: 8,
                background: "var(--blue)",
                display: "grid", placeItems: "center",
                color: "var(--ivory)",
                fontSize: 9, fontWeight: 700, letterSpacing: "0.06em",
                textAlign: "center", lineHeight: 1.1,
              }}>법무부</div>
              <div>
                <div style={{fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: "var(--blue)", textTransform: "uppercase"}}>Credential</div>
                <div style={{fontSize: 12, color: "var(--navy)", fontWeight: 500}}>Immigrant Mentor Instructor</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row: meta */}
        <div style={{
          marginTop: 80,
          paddingTop: 28,
          borderTop: "1px solid rgba(248,245,239,0.1)",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 32,
        }} className="hero-meta">
          {[
            ["08+", "Years in Korea", null],
            ["2", "Languages spoken", "EN · BN"],
            ["100%", "Korea-based guidance", null],
            ["Free", "First WhatsApp consultation", null],
          ].map(([n, label, sub]) => (
            <div key={label}>
              <div style={{
                fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 400,
                fontSize: 36, color: "var(--gold)", lineHeight: 1, marginBottom: 6,
              }}>{n}</div>
              <div style={{fontSize: 13, color: "var(--on-dark-70)"}}>{label}</div>
              {sub && <div style={{fontSize: 11, color: "var(--on-dark-50)", marginTop: 2, letterSpacing: "0.1em"}}>{sub}</div>}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 64px !important; }
          .hero-photo-stack { max-width: 420px !important; margin: 0 auto !important; justify-self: center !important; }
          .hero-meta { grid-template-columns: repeat(2, 1fr) !important; gap: 24px !important; }
        }
        @media (max-width: 560px) {
          .float-card-1 { left: -8% !important; min-width: 160px !important; }
          .float-card-2 { right: -8% !important; min-width: 170px !important; }
          .float-card-3 { left: 0 !important; }
        }
      `}</style>
    </section>
  );
}

window.Hero = Hero;
