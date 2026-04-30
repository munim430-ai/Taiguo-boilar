/* Constants & shared icons */

const PHONE = "+82 10-6659-6219";
const PHONE_RAW = "821066596219";
const EMAIL = "sohelrana6219@gmail.com";
const ADDRESS_KO = "경기도 포천시 소흘읍 솔모루로92번길 8, 1층";
const ADDRESS_EN = "92beon-gil 8, Solmoru-ro, Soheul-eup, Pocheon, Gyeonggi-do, South Korea — 1F";

const waLink = (msg) =>
  `https://wa.me/${PHONE_RAW}?text=${encodeURIComponent(msg || "")}`;
const callLink = `tel:+821066596219`;
const mailLink = `mailto:${EMAIL}`;

/* SVG icon helpers */
const Icon = {
  Arrow: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Phone: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M2.5 3.2c0-.4.3-.7.7-.7h1.5c.3 0 .6.2.7.5l.7 2c.1.3 0 .6-.2.8L4.7 7c.7 1.4 1.9 2.6 3.3 3.3l1.2-1.2c.2-.2.5-.3.8-.2l2 .7c.3.1.5.4.5.7v1.5c0 .4-.3.7-.7.7C5.6 12.5 1.5 8.4 1.5 3.2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
    </svg>
  ),
  WA: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.9-.4-1.7-.9-2.4-1.7-.6-.6-1.1-1.4-1.5-2.2-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.6-1.5-.9-2-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.5.1-.7.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .1.2 2 3.1 4.9 4.4.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4c1.5.8 3.1 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2"/>
    </svg>
  ),
  Mail: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <rect x="1.5" y="3" width="11" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M2 4l5 4 5-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  Check: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M2.5 7.5l3 3 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Pin: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M7 1.5c2.2 0 4 1.8 4 4 0 3-4 7-4 7s-4-4-4-7c0-2.2 1.8-4 4-4z" stroke="currentColor" strokeWidth="1.2"/>
      <circle cx="7" cy="5.5" r="1.4" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  ),
  Doc: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M3 1.5h5l3 3v8a.5.5 0 0 1-.5.5h-7.5a.5.5 0 0 1-.5-.5V2a.5.5 0 0 1 .5-.5z" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M8 1.5V4.5h3" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  ),
  Plus: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  Minus: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M2 7h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  Star: ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="currentColor">
      <path d="M7 1l1.8 3.7L13 5.3l-3 2.9.7 4.1L7 10.4 3.3 12.3 4 8.2 1 5.3l4.2-.6z"/>
    </svg>
  ),
};

/* Logo (text-based) */
function Logo({ light = false, compact = false }) {
  const tone = light ? "var(--ivory)" : "var(--navy)";
  const sub = light ? "var(--gold)" : "var(--blue)";
  return (
    <div style={{display: "flex", alignItems: "baseline", gap: 14, color: tone, lineHeight: 1}}>
      <div style={{display: "flex", flexDirection: "column", gap: 3}}>
        <div style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontWeight: 500,
          fontSize: compact ? 20 : 22,
          letterSpacing: "0.005em",
          color: tone,
        }}>
          Sohel <span style={{color: sub}}>Rana</span>
        </div>
        <div style={{
          fontFamily: "var(--sans)",
          fontSize: 9,
          fontWeight: 600,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: light ? "var(--on-dark-70)" : "var(--ink-60)",
          paddingTop: 2,
          borderTop: `1px solid ${light ? "rgba(245,185,66,0.5)" : "rgba(36,87,214,0.4)"}`,
        }}>
          Korea Study Consultant
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { PHONE, PHONE_RAW, EMAIL, ADDRESS_KO, ADDRESS_EN, waLink, callLink, mailLink, Icon, Logo });
