function Preloader() {
  const [progress, setProgress] = React.useState(0);
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 12 + 4;
      if (p >= 100) {
        p = 100;
        clearInterval(id);
        setTimeout(() => setDone(true), 400);
      }
      setProgress(Math.min(100, p));
    }, 90);
    return () => clearInterval(id);
  }, []);

  if (done) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "var(--navy)",
      display: "grid", placeItems: "center",
      transition: "opacity 0.5s ease",
      opacity: progress >= 100 ? 0 : 1,
    }}>
      <div className="celluloid-tile" style={{opacity: 0.18}}/>
      <div style={{textAlign: "center", position: "relative"}}>
        <div style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: 64,
          fontWeight: 500,
          color: "var(--ivory)",
          letterSpacing: "-0.02em",
          marginBottom: 8,
        }}>
          Sohel <span style={{color: "var(--gold)"}}>Rana</span>
        </div>
        <div style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.32em",
          color: "var(--on-dark-70)",
          textTransform: "uppercase",
          marginBottom: 32,
        }}>
          Korea Study Consultant
        </div>
        <div style={{
          width: 280, height: 1,
          background: "rgba(248,245,239,0.15)",
          margin: "0 auto",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", left: 0, top: 0, bottom: 0,
            width: `${progress}%`,
            background: "var(--gold)",
            transition: "width 0.2s ease",
          }}/>
        </div>
        <div style={{
          fontSize: 10,
          letterSpacing: "0.3em",
          color: "var(--on-dark-50)",
          marginTop: 14,
          fontVariantNumeric: "tabular-nums",
        }}>
          {String(Math.floor(progress)).padStart(3, "0")} / 100
        </div>
      </div>
    </div>
  );
}

window.Preloader = Preloader;
