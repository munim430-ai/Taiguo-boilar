function Marquee() {
  const items = [
    "Korea-Based Guidance",
    "D-4 → D-2 Pathway",
    "Student Admission Support",
    "Bangla Consultation",
    "Document Readiness",
    "WhatsApp Support",
    "Sept 2026 Intake",
    "Seoul · Pocheon",
  ];
  const repeated = [...items, ...items, ...items];
  return (
    <section style={{
      background: "var(--ivory)",
      borderTop: "1px solid var(--line)",
      borderBottom: "1px solid var(--line)",
      padding: "22px 0",
      overflow: "hidden",
    }} aria-label="Service marquee">
      <div style={{
        display: "flex", gap: 0, whiteSpace: "nowrap",
        animation: "marquee 38s linear infinite",
        willChange: "transform",
      }}>
        {repeated.map((t, i) => (
          <div key={i} style={{
            display: "inline-flex", alignItems: "center", gap: 28,
            paddingRight: 28,
            fontFamily: "var(--serif)", fontStyle: "italic",
            fontSize: 26, fontWeight: 500,
            color: i % 3 === 1 ? "var(--blue)" : "var(--navy)",
            letterSpacing: "-0.01em",
          }}>
            <span>{t}</span>
            <span style={{
              display: "inline-block", width: 6, height: 6,
              borderRadius: 999, background: "var(--gold)",
            }}/>
          </div>
        ))}
      </div>
    </section>
  );
}

window.Marquee = Marquee;
