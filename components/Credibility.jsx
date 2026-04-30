function Credibility() {
  const cards = [
    {
      title: "Korea-based guidance",
      desc: "Direct consultations from Seoul region — not from a remote office overseas.",
      photo: "public/images/photo-2.jpg",
      caption: "Korean campus visit",
    },
    {
      title: "Campus relationships",
      desc: "Direct visits to International Affairs offices including Namseoul University.",
      photo: "public/images/photo-4.jpg",
      caption: "Namseoul University · International Affairs",
    },
    {
      title: "Professional credential",
      desc: "Korean Ministry of Justice (법무부) Immigrant Mentor Instructor appointment.",
      photo: "public/images/photo-3.jpg",
      caption: "법무부 · Certificate of Appointment",
    },
    {
      title: "Bangla communication",
      desc: "Conversations in Bangla and English. No mistranslated visa terms.",
      icon: "ব",
    },
    {
      title: "Document planning",
      desc: "Each student gets a personalized checklist mapped to their visa pathway.",
      icon: "✓",
    },
    {
      title: "WhatsApp-first support",
      desc: "Same number as the consultation — no chasing, no queue tickets.",
      icon: "WA",
    },
  ];

  return (
    <section className="section" style={{background: "var(--navy)", color: "var(--ivory)", position: "relative", overflow: "hidden"}}>
      <div className="celluloid-tile" style={{opacity: 0.1}}/>
      <div className="wrap" style={{position: "relative"}}>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "end", flexWrap: "wrap", gap: 24, marginBottom: 48}}>
          <div>
            <div className="kicker" style={{color: "var(--gold)"}}>Why students choose Sohel</div>
            <h2 className="h-section" style={{color: "var(--ivory)", margin: "20px 0 0", maxWidth: 720}}>
              Real proof, <em style={{color: "var(--gold)"}}>not invented testimonials</em>.
            </h2>
          </div>
          <p style={{maxWidth: 360, fontSize: 14, color: "var(--on-dark-70)"}}>
            We don't post fake reviews. Instead, here's what's verifiable —
            credentials, places, and how the work is done.
          </p>
        </div>

        <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16}} className="cred-grid">
          {cards.map((c, i) => (
            <div key={i} style={{
              border: "1px solid rgba(248,245,239,0.12)",
              borderRadius: 14,
              overflow: "hidden",
              background: "rgba(248,245,239,0.03)",
              display: "flex", flexDirection: "column",
            }}>
              {c.photo ? (
                <div style={{aspectRatio: "4/3", overflow: "hidden", position: "relative"}}>
                  <img src={c.photo} alt={c.caption} style={{width: "100%", height: "100%", objectFit: "cover"}}/>
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    padding: "10px 14px",
                    background: "linear-gradient(to top, rgba(7,17,31,0.9), transparent)",
                    fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase",
                    color: "var(--gold)",
                  }}>{c.caption}</div>
                </div>
              ) : (
                <div style={{
                  aspectRatio: "4/3",
                  background: "linear-gradient(135deg, rgba(36,87,214,0.4), rgba(7,17,31,0.6))",
                  display: "grid", placeItems: "center",
                  fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 500,
                  fontSize: 56, color: "var(--gold)",
                }}>{c.icon}</div>
              )}
              <div style={{padding: "20px 22px"}}>
                <div style={{fontSize: 17, fontWeight: 500, color: "var(--ivory)", marginBottom: 8, letterSpacing: "-0.01em"}}>{c.title}</div>
                <div style={{fontSize: 13, color: "var(--on-dark-70)", lineHeight: 1.55}}>{c.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .cred-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 580px) { .cred-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

function Gallery() {
  const items = [
    { src: "public/images/photo-1.jpg", caption: "Korean university visit", size: "tall" },
    { src: "public/images/photo-4.jpg", caption: "Namseoul University · International Affairs", size: "wide" },
    { src: "public/images/photo-3.jpg", caption: "법무부 · Mentor Instructor appointment", size: "tall" },
    { src: "public/images/photo-2.jpg", caption: "Korean campus environment", size: "square" },
    { src: "public/images/kb-card.jpg", caption: "KB Academy · Pocheon office", size: "wide" },
  ];

  return (
    <section id="gallery" className="section" style={{background: "var(--ivory)"}}>
      <div className="wrap">
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "end", flexWrap: "wrap", gap: 24, marginBottom: 40}}>
          <div>
            <div className="kicker">Gallery</div>
            <h2 className="h-section" style={{margin: "20px 0 0"}}>
              Korea, <em>documented</em>.
            </h2>
          </div>
          <p style={{fontSize: 14, color: "var(--ink-60)", maxWidth: 360}}>
            Real photos from campus visits, credential moments, and student
            guidance work — not stock photography.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gridAutoRows: "180px",
          gap: 14,
        }} className="gallery-grid">
          {items.map((it, i) => {
            const span = it.size === "wide"
              ? { gridColumn: "span 7", gridRow: "span 2" }
              : it.size === "tall"
              ? { gridColumn: "span 4", gridRow: "span 2" }
              : { gridColumn: "span 5", gridRow: "span 2" };
            // adjust the layout so it tiles cleanly
            const layouts = [
              { gridColumn: "span 5", gridRow: "span 2" },  // photo-1 tall
              { gridColumn: "span 7", gridRow: "span 2" },  // photo-4 wide
              { gridColumn: "span 4", gridRow: "span 2" },  // photo-3 tall
              { gridColumn: "span 4", gridRow: "span 2" },  // photo-2 sq
              { gridColumn: "span 4", gridRow: "span 2" },  // card
            ];
            return (
              <figure key={i} style={{
                margin: 0,
                position: "relative",
                overflow: "hidden",
                borderRadius: 12,
                border: "1px solid var(--line)",
                ...layouts[i],
                cursor: "pointer",
              }} className="gallery-item">
                <img src={it.src} alt={it.caption} loading="lazy"
                  style={{width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease"}}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.04)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}/>
                <figcaption style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  padding: "16px 18px",
                  background: "linear-gradient(to top, rgba(7,17,31,0.85), transparent)",
                  color: "var(--ivory)",
                  fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase",
                }}>{it.caption}</figcaption>
              </figure>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; grid-auto-rows: 200px !important; }
          .gallery-item { grid-column: span 1 !important; grid-row: span 1 !important; }
        }
      `}</style>
    </section>
  );
}

window.Credibility = Credibility;
window.Gallery = Gallery;
