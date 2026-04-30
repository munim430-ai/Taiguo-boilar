function FAQ() {
  const items = [
    ["Can I apply from D-4-1 or D-4-7?",
     "Yes. The most common pathway we work on is D-4-1 / D-4-7 → D-2-2 — moving from Korean language status to a degree program. Each case is reviewed individually because length of stay, attendance record, and language history all matter."],
    ["Is IELTS 5.5 enough?",
     "5.5 is the typical English Track minimum at Sahmyook University for September 2026. It's not a guarantee of admission — universities also look at your transcripts, statement of purpose, and overall application. If you don't have IELTS yet, we'll plan around that."],
    ["Is admission guaranteed?",
     "No. No honest consultant can guarantee admission, scholarship, or visa approval. Those decisions belong to the university and Korean immigration. What's offered here is preparation that gives your application a fair shot."],
    ["What documents do I need first?",
     "Start with passport, ARC, academic certificates, transcripts, IELTS (if available), and bank solvency. The full checklist is on this page — tick off as you collect."],
    ["Is there a service charge?",
     "Per the latest intake announcement, there is no service charge for the selected Sahmyook September 2026 intake. This applies for that specific intake only and may change for other universities or future intakes."],
    ["Can I apply if I live outside Seoul?",
     "Yes. Consultations happen on WhatsApp and phone — your physical location in Korea (or Bangladesh) doesn't change eligibility. The Pocheon office is for in-person meetings if you want one."],
    ["Can I contact directly on WhatsApp?",
     `Yes, that's the preferred way. WhatsApp ${PHONE}. The first message is free and we'll know within a short conversation whether your situation fits the current intake.`],
    ["What happens after I fill the eligibility checker?",
     "You get a readiness band on screen and a prefilled WhatsApp message you can review and send. Nothing is stored on any server — it's frontend only."],
  ];

  const [open, setOpen] = React.useState(0);

  return (
    <section id="faq" className="section" style={{background: "#FFFCF6", borderTop: "1px solid var(--line)"}}>
      <div className="wrap">
        <div style={{display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 64}} className="faq-grid">
          <div style={{position: "sticky", top: 100, alignSelf: "start"}} className="faq-side">
            <div className="kicker">FAQ</div>
            <h2 className="h-section" style={{margin: "20px 0 16px"}}>
              Honest <em>answers</em>.
            </h2>
            <p className="lead">
              No marketing language. If something is uncertain, we say so.
            </p>
          </div>
          <div>
            {items.map(([q, a], i) => {
              const isOpen = open === i;
              return (
                <div key={i} style={{borderBottom: "1px solid var(--line)"}}>
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    style={{
                      width: "100%", textAlign: "left",
                      padding: "24px 0",
                      display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24,
                      background: "none", border: "none",
                      cursor: "pointer",
                    }}
                    aria-expanded={isOpen}>
                    <span style={{
                      fontFamily: "var(--sans)", fontWeight: 500,
                      fontSize: 19, color: "var(--navy)",
                      letterSpacing: "-0.01em", lineHeight: 1.35,
                    }}>{q}</span>
                    <span style={{
                      flexShrink: 0, marginTop: 4,
                      width: 28, height: 28, borderRadius: 999,
                      border: "1px solid var(--line)",
                      display: "grid", placeItems: "center",
                      background: isOpen ? "var(--navy)" : "transparent",
                      color: isOpen ? "var(--ivory)" : "var(--navy)",
                      transition: "all 0.2s",
                    }}>
                      {isOpen ? <Icon.Minus size={12}/> : <Icon.Plus size={12}/>}
                    </span>
                  </button>
                  <div style={{
                    overflow: "hidden",
                    maxHeight: isOpen ? 400 : 0,
                    transition: "max-height 0.4s ease",
                  }}>
                    <div style={{
                      paddingBottom: 24,
                      fontSize: 15,
                      color: "var(--ink-60)",
                      lineHeight: 1.65,
                      maxWidth: "60ch",
                    }}>{a}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .faq-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .faq-side { position: static !important; }
        }
      `}</style>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section" style={{
      background: "var(--navy)",
      color: "var(--ivory)",
      position: "relative",
      overflow: "hidden",
    }}>
      <div className="celluloid-tile" style={{opacity: 0.14}}/>
      <div style={{
        position: "absolute", bottom: "-30%", left: "-10%",
        width: 700, height: 700, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(245,185,66,0.12), transparent 70%)",
        pointerEvents: "none",
      }}/>

      <div className="wrap" style={{position: "relative"}}>
        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start"}} className="contact-grid">
          <div>
            <div className="kicker" style={{color: "var(--gold)"}}>Direct contact</div>
            <h2 className="h-section" style={{color: "var(--ivory)", margin: "20px 0 24px"}}>
              The fastest path is <em style={{color: "var(--gold)"}}>a message</em>.
            </h2>
            <p style={{fontSize: 17, color: "var(--on-dark-70)", lineHeight: 1.6, maxWidth: 500, marginBottom: 36}}>
              WhatsApp is the preferred channel — one number, one person. No
              forwarding, no junior staff, no offshore call center.
            </p>

            <div style={{display: "flex", flexDirection: "column", gap: 14, marginBottom: 36}}>
              <a href={waLink("Hello Sohel Rana, I'd like to ask about Korea study consultation.")} target="_blank" rel="noopener" className="btn btn-gold" style={{justifyContent: "space-between", padding: "18px 22px", fontSize: 15}}>
                <span style={{display: "inline-flex", alignItems: "center", gap: 12}}><Icon.WA size={18}/> WhatsApp now · {PHONE}</span>
                <Icon.Arrow/>
              </a>
              <a href={callLink} className="btn btn-ghost-light" style={{justifyContent: "space-between", padding: "18px 22px", fontSize: 15}}>
                <span style={{display: "inline-flex", alignItems: "center", gap: 12}}><Icon.Phone size={16}/> Call · {PHONE}</span>
                <Icon.Arrow/>
              </a>
              <a href={mailLink} className="btn btn-ghost-light" style={{justifyContent: "space-between", padding: "18px 22px", fontSize: 15}}>
                <span style={{display: "inline-flex", alignItems: "center", gap: 12}}><Icon.Mail size={16}/> Email · {EMAIL}</span>
                <Icon.Arrow/>
              </a>
              <a href="#eligibility" className="btn btn-ghost-light" style={{justifyContent: "space-between", padding: "18px 22px", fontSize: 15}}>
                <span style={{display: "inline-flex", alignItems: "center", gap: 12}}><Icon.Doc size={16}/> Send eligibility result</span>
                <Icon.Arrow/>
              </a>
            </div>
          </div>

          <div>
            {/* Address card */}
            <div style={{
              border: "1px solid rgba(248,245,239,0.15)",
              borderRadius: 16,
              padding: 32,
              background: "rgba(248,245,239,0.03)",
              marginBottom: 16,
            }}>
              <div style={{display: "flex", alignItems: "center", gap: 10, marginBottom: 20}}>
                <Icon.Pin size={16}/>
                <div className="eyebrow-light">KB Academy · Office</div>
              </div>
              <div className="k-text" style={{
                fontFamily: "var(--kr)",
                fontSize: 18, color: "var(--ivory)", lineHeight: 1.55,
                marginBottom: 14, letterSpacing: "-0.005em",
              }}>
                {ADDRESS_KO}
              </div>
              <div style={{fontSize: 13, color: "var(--on-dark-70)", lineHeight: 1.5}}>
                {ADDRESS_EN}
              </div>
              <div style={{
                marginTop: 24, paddingTop: 20,
                borderTop: "1px solid rgba(248,245,239,0.12)",
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16,
              }}>
                <div>
                  <div className="eyebrow-light" style={{marginBottom: 6}}>Hours</div>
                  <div style={{fontSize: 13, color: "var(--ivory)"}}>Mon – Sat<br/>10:00 — 19:00 KST</div>
                </div>
                <div>
                  <div className="eyebrow-light" style={{marginBottom: 6}}>Languages</div>
                  <div style={{fontSize: 13, color: "var(--ivory)"}}>English · Bangla<br/>한국어 (basic)</div>
                </div>
              </div>
            </div>

            {/* Mini map placeholder */}
            <div style={{
              borderRadius: 16,
              padding: 24,
              background: "linear-gradient(135deg, rgba(36,87,214,0.18), rgba(7,17,31,0.4))",
              border: "1px solid rgba(36,87,214,0.3)",
              fontSize: 13,
              color: "var(--on-dark-70)",
              lineHeight: 1.55,
              display: "flex", alignItems: "center", gap: 16,
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 12,
                background: "rgba(36,87,214,0.3)",
                display: "grid", placeItems: "center",
                color: "var(--gold)",
                fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 500,
                fontSize: 22,
                flexShrink: 0,
              }}>P</div>
              <div>
                <div style={{color: "var(--ivory)", fontWeight: 500, marginBottom: 4}}>Pocheon, Gyeonggi-do</div>
                북동쪽 of central Seoul · accessible by bus / 1.5 hr from Seoul Station
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      background: "var(--navy)",
      color: "var(--on-dark-70)",
      borderTop: "1px solid rgba(248,245,239,0.1)",
      padding: "48px 0 32px",
    }}>
      <div className="wrap">
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 24,
          paddingBottom: 24,
          borderBottom: "1px solid rgba(248,245,239,0.1)",
        }}>
          <Logo light/>
          <div style={{display: "flex", gap: 24, fontSize: 13, flexWrap: "wrap"}}>
            <a href="#about">About</a>
            <a href="#programs">Programs</a>
            <a href="#eligibility">Eligibility</a>
            <a href="#process">Process</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact</a>
          </div>
        </div>

        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 16,
          paddingTop: 24,
          fontSize: 12, color: "var(--on-dark-50)",
        }}>
          <div>
            © 2026 Sohel Rana · Korea Study Consultant. All rights reserved.<br/>
            Not an official university partner. Consultation does not guarantee admission or visa approval.
          </div>
          <div style={{fontSize: 11, letterSpacing: "0.12em", color: "var(--on-dark-50)"}}>
            BUILT BY <span style={{color: "var(--ivory)"}}>KEYSTONE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

window.FAQ = FAQ;
window.Contact = Contact;
window.Footer = Footer;
