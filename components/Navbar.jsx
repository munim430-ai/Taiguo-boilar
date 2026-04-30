function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    ["Home", "#home"],
    ["About", "#about"],
    ["Programs", "#programs"],
    ["Eligibility", "#eligibility"],
    ["Process", "#process"],
    ["Gallery", "#gallery"],
    ["FAQ", "#faq"],
    ["Contact", "#contact"],
  ];

  const navStyle = {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 80,
    transition: "all 0.3s ease",
    background: scrolled ? "rgba(7,17,31,0.85)" : "transparent",
    backdropFilter: scrolled ? "blur(14px)" : "none",
    borderBottom: scrolled ? "1px solid rgba(248,245,239,0.08)" : "1px solid transparent",
  };

  return (
    <nav style={navStyle} aria-label="Primary">
      <div className="wrap" style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: scrolled ? "14px 32px" : "22px 32px",
        transition: "padding 0.3s ease",
      }}>
        <a href="#home" aria-label="Home"><Logo light /></a>
        <div style={{
          display: "flex", alignItems: "center", gap: 4,
          background: "rgba(248,245,239,0.04)",
          border: "1px solid rgba(248,245,239,0.08)",
          borderRadius: 999,
          padding: 4,
        }} className="nav-desktop">
          {links.map(([label, href]) => (
            <a key={href} href={href} style={{
              padding: "9px 14px",
              fontSize: 13,
              fontWeight: 500,
              color: "var(--on-dark-70)",
              borderRadius: 999,
              transition: "all 0.18s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(248,245,239,0.08)"; e.currentTarget.style.color = "var(--ivory)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--on-dark-70)"; }}>
              {label}
            </a>
          ))}
        </div>
        <div style={{display: "flex", alignItems: "center", gap: 10}} className="nav-cta">
          <a href={waLink("Hello Sohel Rana, I'd like to ask about Korea study guidance.")} className="btn btn-gold" target="_blank" rel="noopener">
            <Icon.WA size={14}/> WhatsApp
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="nav-mobile-toggle" aria-label="Menu" style={{
          display: "none",
          background: "rgba(248,245,239,0.06)",
          border: "1px solid rgba(248,245,239,0.12)",
          color: "var(--ivory)",
          width: 40, height: 40, borderRadius: 10,
        }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d={open ? "M4 4l10 10M14 4L4 14" : "M2 5h14M2 9h14M2 13h14"} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {open && (
        <div className="nav-mobile-panel" style={{
          background: "rgba(7,17,31,0.97)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(248,245,239,0.08)",
          padding: "20px 24px 28px",
        }}>
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} style={{
              display: "block",
              padding: "14px 0",
              borderBottom: "1px solid rgba(248,245,239,0.06)",
              color: "var(--ivory)",
              fontSize: 16,
              fontWeight: 500,
            }}>{label}</a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 1080px) {
          .nav-desktop { display: none !important; }
        }
        @media (max-width: 720px) {
          .nav-cta { display: none !important; }
          .nav-mobile-toggle { display: grid !important; place-items: center; }
        }
        @media (min-width: 721px) {
          .nav-mobile-panel { display: none !important; }
        }
      `}</style>
    </nav>
  );
}

window.Navbar = Navbar;
