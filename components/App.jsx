function App() {
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "accent": "gold",
    "showBangla": true,
    "showPricing": true,
    "patternIntensity": 55,
    "subjectDensity": "spacious",
    "heroVariant": "globe"
  }/*EDITMODE-END*/;

  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply tweak side-effects via CSS vars + body classes
  React.useEffect(() => {
    document.documentElement.style.setProperty("--celluloid-tile-opacity", String(t.patternIntensity / 100));
    if (t.accent === "cream") {
      document.documentElement.style.setProperty("--gold", "#E8D5A8");
      document.documentElement.style.setProperty("--gold-2", "#C9B380");
    } else {
      document.documentElement.style.setProperty("--gold", "#F5B942");
      document.documentElement.style.setProperty("--gold-2", "#E0A52F");
    }
    document.body.classList.toggle("hide-bangla", !t.showBangla);
    document.body.classList.toggle("hide-pricing", !t.showPricing);
  }, [t]);

  return (
    <React.Fragment>
      <Preloader/>
      <Navbar/>
      <main>
        <Hero heroVariant={t.heroVariant}/>
        <Marquee/>
        <About/>
        <IntakeSection/>
        <Subjects/>
        <EligibilityChecker/>
        <DocumentChecklist/>
        <ProcessTimeline/>
        <Credibility/>
        <Gallery/>
        <FAQ/>
        <Contact/>
      </main>
      <Footer/>

      {/* Mobile sticky CTA */}
      <div className="mobile-cta">
        <a href={callLink} className="btn btn-ghost-light"><Icon.Phone/> Call</a>
        <a href={waLink("Hello Sohel Rana, I'd like to ask about Korea study consultation.")} target="_blank" rel="noopener" className="btn btn-gold"><Icon.WA/> WhatsApp</a>
      </div>

      <TweaksPanel title="Tweaks" subtitle="Adjust this design" defaultOpen={false}>
        <TweakSection title="Visual">
          <TweakRadio label="Accent color" value={t.accent} onChange={(v) => setTweak("accent", v)} options={[{value:"gold",label:"Gold"},{value:"cream",label:"Cream"}]}/>
          <TweakSlider label="Pattern intensity" value={t.patternIntensity} min={0} max={100} step={5} onChange={(v) => setTweak("patternIntensity", v)}/>
        </TweakSection>
        <TweakSection title="Content">
          <TweakToggle label="Show Bangla text" value={t.showBangla} onChange={(v) => setTweak("showBangla", v)}/>
          <TweakToggle label="Show pricing numbers" value={t.showPricing} onChange={(v) => setTweak("showPricing", v)}/>
        </TweakSection>
        <TweakSection title="Layout">
          <TweakRadio label="Subject card density" value={t.subjectDensity} onChange={(v) => setTweak("subjectDensity", v)} options={[{value:"compact",label:"Compact"},{value:"spacious",label:"Spacious"}]}/>
        </TweakSection>
      </TweaksPanel>

      <style>{`
        body.hide-bangla .bn-text { display: none !important; }
        body.hide-pricing [data-pricing] { display: none !important; }
      `}</style>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
