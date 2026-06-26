import QuoteForm from './QuoteForm';

const phone='8801941646278';
const products=[
 ['Oil & Gas Steam Boilers',
  'Dual-fuel gas/diesel boilers designed for Bangladesh factories facing severe gas shortages. Automatic switch between fuels when gas pressure drops. WNS series: 0.5 to 30 ton/hr. Wet-back structure, 92%+ efficiency.',
  'https://taiguo-boiler.com/upload/portal/20251029/5bf079c24a94553a4777cb33b50911cd.png'],
 ['Coal & Biomass Steam Boilers',
  'Rice husk, wood pellet, sawdust, and bagasse-fired boilers. Perfect for Bangladesh\'s gas crisis and EU buyer CSDDD compliance requirements. DZL series: 1 to 20 ton/hr. Chain grate combustion, 85%+ efficiency.',
  'https://taiguo-boiler.com/upload/portal/20251029/cfb7fddb67c1d424510384ababc41285.png'],
 ['Electric Boilers',
  'Zero-emission steam for factories with reliable grid access. No fuel storage, no chimney, no emissions. Ideal for small-scale operations and food processing. 100 kg/hr to 2 ton/hr capacity.',
  'https://taiguo-boiler.com/upload/portal/20251029/c434df4e662e2e13ca78e37331d60859.png'],
 ['Thermal Oil Heaters',
  'High-temperature heat transfer for dyeing, finishing, and chemical processes. Operates at up to 350°C under low pressure — safer than steam. YGL series: 120 kW to 10,000 kW. Gas, diesel, coal, or biomass options.',
  'https://taiguo-boiler.com/upload/portal/20251029/d3f8f019a4bee58da79e537b5f5d9b0f.png'],
 ['Hot Air Furnaces',
  'Combined heat and power solution for large textile complexes. Provides both thermal oil for dyeing and steam for pressing. Dual-output design maximises energy efficiency across the production floor.',
  'https://taiguo-boiler.com/upload/portal/20251030/9e9d020a4624d922d9658f114ab37dfc.png'],
 ['Pressure Vessels',
  'ASME-certified pressure vessels for steam storage, chemical processing, and industrial applications. Custom designs available. Full Bangladesh BBID registration documentation included with every unit.',
  'https://taiguo-boiler.com/static/index/images/about.jpg']
];
const projects=[
 'https://taiguo-boiler.com/upload/admin/20251201/03941dd5b208647037cfb993975e0d11.jpg',
 'https://taiguo-boiler.com/upload/admin/20251201/cabb7a43976b97430ad97ac145bd6a15.jpg',
 'https://taiguo-boiler.com/upload/admin/20250908/28f1d74cdbc458c7c6aeb43033fe0795.jpg',
 'https://taiguo-boiler.com/upload/admin/20251201/9cb77030b9d2a752690e32cc5f5bf6b6.jpg'
];
const marketStats=[
 {num:'5,000+',label:'Registered boilers in Bangladesh',sub:'National registry — active & expired'},
 {num:'4th',label:'Largest textile exporter globally',sub:'EU buyers demanding clean-energy compliance'},
 {num:'8M tons',label:'Rice husk produced annually',sub:'Lowest-cost biomass fuel in South Asia'},
 {num:'2025',label:'New Boiler Rules enforcement',sub:'BBID driving urgent upgrades across all sectors'},
];
const biomassPoints=[
 {title:'Rice husk at ৳0 cost',body:'Bangladesh mills generate millions of tons annually. Taiguo DZL/SZL grate-fired boilers run on rice husk, bagasse and jute sticks — zero fuel purchase cost for most mills.'},
 {title:'EU CBAM & buyer pressure',body:'European garment buyers now require suppliers to report Scope 2 carbon. Switching from furnace oil to biomass cuts CO₂ by up to 90%, protecting export contracts worth billions.'},
 {title:'SREDA green financing',body:'Sustainable and Renewable Energy Development Authority offers concessional loans for biomass energy projects. Taiguo equipment qualifies under ADB and IFC green frameworks.'},
 {title:'Expired certificates — urgent need',body:'Thousands of Bangladesh boilers are operating on expired BBID certificates. Factory owners face fines and shutdowns. A new Taiguo biomass boiler solves compliance and fuel cost together.'},
];
const biomassModels=[
 {model:'DZL Series',range:'0.5 – 10 T/H',fuel:'Rice husk · Bagasse · Biomass pellets',note:'Chain-grate, single-drum. Best for RMG, rice mills, small factories.'},
 {model:'SZL Series',range:'4 – 35 T/H',fuel:'Rice husk · Coal · Mixed biomass',note:'Double-drum water-tube. Ideal for large textile and jute mills.'},
 {model:'LHG Series',range:'0.1 – 2 T/H',fuel:'Biomass · Wood chip · Agricultural waste',note:'Compact vertical. Perfect for small factories, bakeries, food processing.'},
];
const complianceDocs=[
 'Chief Inspector of Boilers prior approval (Form-D)',
 'Complete BBID registration documentation package',
 'Cross-sectional construction drawings',
 'Strength and rating calculations',
 'P&ID diagrams and steam pipe plans',
 'Construction and testing certificates',
 'Government registration coordination',
 'Installation and commissioning supervision',
 'Boiler operator training and licensing support',
 'Annual maintenance contracts available',
];
const complianceLaws=[
 'Boiler Act 2022','Boiler Rules 2025','Bangladesh Labour Act 2006','RSC Fire Safety Standards'
];
const whyUs=[
 {num:'01',title:'No local competitor in biomass',body:'MEL Group and RS Boiler focus on coal and gas. We specialise in biomass boilers — the fastest-growing segment due to Bangladesh\'s gas crisis and rising fuel oil prices.'},
 {num:'02',title:'Regulatory expertise',body:'We know Boiler Rules 2025 in detail. We handle Form-D, Form-Dd, registration, and inspection — the full compliance chain. Most agents have never read the updated rules.'},
 {num:'03',title:'Local engineer on staff',body:'Our team includes a registered Electrical Engineer. Taiguo is a technical manufacturer who respects engineers. Most competing agents are traders with no qualified technical staff.'},
 {num:'04',title:'Gazipur location',body:'We are in the industrial heartland. We can visit any factory in Gazipur, Narayanganj, or Tongi within 30 minutes. Most other agents sit in Dhaka office towers.'},
 {num:'05',title:'Fuel supply included',body:'We don\'t just sell the boiler. We supply the fuel. Our biomass pellet delivery ensures consistent operation at locked prices — one supplier for equipment and energy.'},
 {num:'06',title:'TDF / Green Fund financing',body:'We help factories apply for Bangladesh Bank soft loans at 5% interest rate. Zero upfront payment options available. We guide the full application process at no charge.'},
];
const afterSalesItems=[
 'Emergency repair: 24-hour response anywhere in Dhaka Division',
 'Spare parts stocked locally — no China shipping delays',
 'Annual maintenance: scheduled inspections and water quality testing',
 'Operator training: Grade-1, Grade-2, Grade-3 licensing support',
 'Biomass fuel supply: rice husk pellet delivery to your factory',
 'Registered Electrical Engineer on team for all electrical works',
];

function Logo(){return <div className="logo"><svg viewBox="0 0 120 90"><path d="M18 72C8 53 16 23 47 6c-7 17-8 34 3 47C38 67 28 73 18 72Z" fill="#e42528"/><path d="M101 14c9 20 2 49-32 70 8-17 8-34-2-46 12-15 23-24 34-24Z" fill="#ffd21c"/><path d="M45 57c12 10 26 8 42-7-8 17-22 29-38 31-14 1-24-6-31-18 9 4 18 2 27-6Z" fill="#e42528"/><path d="M74 32c-13-9-27-6-42 9 8-18 22-29 38-31 14-1 25 6 31 18-9-4-18-3-27 4Z" fill="#ffd21c"/></svg><span><b>TGGL</b><small>TAIGUO BOILER · BANGLADESH</small></span></div>}
function Arrow(){return <span aria-hidden="true">→</span>}
function Check(){return <span className="checkIcon" aria-hidden="true">✓</span>}

export default function Page(){return <>
 <div className="top"><div className="wrap"><span>Keystone Consultancy — Bangladesh Authorized Representative for Taiguo Boiler</span><div><a href="tel:+8801941646278">+880 1941-646278</a><a href="mailto:Munimhasibul10@gmail.com">Munimhasibul10@gmail.com</a></div></div></div>
 <header><div className="wrap nav"><a href="#home"><Logo/></a><nav><a href="#products">Products</a><a href="#projects">Projects</a><a href="#market">Market</a><a href="#about">About</a><a href="/blog/boiler-lifespan-2025">Blog</a><a href="#contact">Contact</a></nav><a className="btn small" href={`https://wa.me/${phone}`} target="_blank">Get a quote</a></div></header>
 <main>

  {/* ── HERO ── */}
  <section className="hero" id="home"><div className="shade"/><div className="wrap heroGrid"><div className="heroCopy"><p className="eyebrow">INDUSTRIAL BOILER SYSTEMS FOR BANGLADESH</p><h1>Reliable heat.<br/><em>Engineered for industry.</em></h1><p className="lead">Steam boilers, biomass systems, electric boilers, thermal oil heaters and complete boiler-room solutions — with a dedicated local team in Gazipur.</p><div className="actions"><a className="btn" href="#contact">Request quotation <Arrow/></a><a className="btn ghost" href="#products">Explore products</a></div><div className="stats"><div><b>Since 1976</b><span>Manufacturing experience</span></div><div><b>150+ countries</b><span>Global export reach</span></div><div><b>Local team</b><span>Gazipur, Bangladesh</span></div></div></div><aside><span className="tag">BANGLADESH AUTHORIZED REPRESENTATIVE</span><div className="avatar">HM</div><h2>Hasibul Munim</h2><p>Director<br/><strong>Keystone Consultancy — Taiguo Bangladesh</strong></p><a href="tel:+8801941646278">+880 1941-646278</a><a href="mailto:Munimhasibul10@gmail.com">Munimhasibul10@gmail.com</a><div className="social"><a href={`https://wa.me/${phone}`} target="_blank">WhatsApp</a><span>WeChat: hasibul_munim</span></div></aside></div></section>

  {/* ── COMPLIANCE ── */}
  <section className="compliance"><div className="wrap"><div className="cmplHead"><div><p className="eyebrow red">BANGLADESH REGULATORY COMPLIANCE</p><h2>Every Taiguo boiler we supply is fully registered and legally compliant.</h2><p>We handle the entire compliance chain — from Chief Inspector approval to annual inspections. You focus on production; we manage the paperwork.</p></div><div className="cmplLaws"><p className="cmplLawsTitle">Compliant with:</p>{complianceLaws.map(l=><span key={l}>{l}</span>)}</div></div><div className="cmplGrid">{complianceDocs.map(d=><div className="cmplItem" key={d}><Check/><span>{d}</span></div>)}</div></div></section>

  {/* ── TDF FINANCING BANNER ── */}
  <div className="tdfBanner"><div className="wrap tdfInner"><div className="tdfDot"/><div><strong>TDF &amp; GREEN FUND SOFT LOANS AVAILABLE</strong><p>Bangladesh Bank offers 5% interest loans for boiler modernization. Zero upfront payment options. We help you apply — at no charge.</p></div><a className="btn" href="#contact">Ask about financing <Arrow/></a></div></div>

  {/* ── INTRO ── */}
  <section className="intro"><div className="wrap twoCol"><div><p className="eyebrow red">PRODUCT PORTFOLIO</p><h2>Industrial heating solutions matched to your process.</h2></div><p>From capacity selection and fuel choice to quotation, delivery communication and project follow-up, the Bangladesh office provides a direct local point of contact backed by 50 years of Taiguo manufacturing.</p></div></section>

  {/* ── PRODUCTS ── */}
  <section className="products" id="products"><div className="wrap cards">{products.map((p,i)=><article className="card" key={p[0]}><div className="media"><span>{String(i+1).padStart(2,'0')}</span><img src={p[2]} alt={p[0]}/></div><div className="body"><h3>{p[0]}</h3><p>{p[1]}</p><a href="#contact">Request specifications <Arrow/></a></div></article>)}</div></section>

  {/* ── WHY CHOOSE US ── */}
  <section className="whyUs"><div className="wrap"><div className="title"><p className="eyebrow red">WHY CHOOSE KEYSTONE / TAIGUO BANGLADESH?</p><h2>Six reasons factories choose us over every other Chinese boiler agent.</h2></div><div className="whyGrid">{whyUs.map(w=><div className="whyCard" key={w.num}><b>{w.num}</b><h3>{w.title}</h3><p>{w.body}</p></div>)}</div></div></section>

  {/* ── PROCESS ── */}
  <section className="process"><div className="wrap"><div className="title"><p className="eyebrow red">PROJECT WORKFLOW</p><h2>From requirement to commissioning.</h2></div><div className="steps"><article><b>01</b><h3>Requirement review</h3><p>Capacity, pressure, fuel, application and site conditions.</p></article><article><b>02</b><h3>Technical selection</h3><p>Suitable boiler type, auxiliaries and control configuration.</p></article><article><b>03</b><h3>Commercial quotation</h3><p>Clear equipment scope, lead time and delivery coordination.</p></article><article><b>04</b><h3>Project follow-up</h3><p>Local communication through installation and after-sales stages.</p></article></div></div></section>

  {/* ── PROJECTS ── */}
  <section className="work" id="projects"><div className="wrap"><div className="workHead"><div><p className="eyebrow">PROJECTS &amp; MANUFACTURING</p><h2>Built for demanding industrial environments.</h2></div><p>Industrial boiler manufacturing, shipment and installation references from Taiguo projects across 150+ countries.</p></div><div className="gallery">{projects.map((x,i)=><figure className={`g${i+1}`} key={x}><img src={x} alt="Taiguo industrial boiler project"/><figcaption>{['Boiler manufacturing','Industrial installation','Global shipment','Production facility'][i]}</figcaption></figure>)}</div></div></section>

  {/* ── AFTER-SALES ── */}
  <section className="afterSales"><div className="wrap"><div className="asHead"><div><p className="eyebrow">LOCAL SERVICE TEAM IN GAZIPUR</p><h2>Unlike other Chinese boiler suppliers, we have a LOCAL team in Bangladesh.</h2><p>When a problem arises, you don't wait weeks for a Chinese technician. Our team is in your district.</p></div><a className="btn" href="#contact">Talk to our engineer <Arrow/></a></div><div className="asGrid">{afterSalesItems.map(item=><div className="asItem" key={item}><Check/><span>{item}</span></div>)}</div></div></section>

  {/* ── MARKET ── */}
  <section className="market" id="market"><div className="wrap"><div className="title light"><p className="eyebrow yellow">BANGLADESH MARKET INTELLIGENCE</p><h2>Why Bangladesh is Taiguo's highest-priority export market right now.</h2></div><div className="mktGrid">{marketStats.map(s=><div className="mktCard" key={s.num}><b>{s.num}</b><strong>{s.label}</strong><span>{s.sub}</span></div>)}</div><div className="mktIndustries"><p className="eyebrow yellow">TARGET INDUSTRIES</p><div className="mktTags"><span>Garment &amp; RMG</span><span>Textile Dyeing</span><span>Rice Mills</span><span>Jute Mills</span><span>Pharmaceutical</span><span>Ceramic &amp; Tile</span><span>Food Processing</span><span>Leather &amp; Footwear</span><span>Paper &amp; Packaging</span><span>Cold Storage</span></div></div></div></section>

  {/* ── BIOMASS ── */}
  <section className="biomass"><div className="wrap"><div className="bmHead"><div><p className="eyebrow">BIOMASS OPPORTUNITY</p><h2>The cleanest switch a Bangladesh factory can make.</h2><p>Bangladesh sits on an abundant biomass surplus. Taiguo's grate-fired boilers are purpose-built to run on rice husk, bagasse and agricultural waste — the fuels already produced on-site at most mills.</p></div><a className="btn" href="#contact">Get biomass recommendation <Arrow/></a></div><div className="bmPoints">{biomassPoints.map(pt=><div className="bmPoint" key={pt.title}><h3>{pt.title}</h3><p>{pt.body}</p></div>)}</div><div className="bmModels"><p className="eyebrow">RECOMMENDED TAIGUO MODELS FOR BANGLADESH</p><div className="bmModelGrid">{biomassModels.map(m=><div className="bmModel" key={m.model}><b>{m.model}</b><span className="bmRange">{m.range}</span><small>Fuel: {m.fuel}</small><p>{m.note}</p></div>)}</div></div></div></section>

  {/* ── ABOUT ── */}
  <section className="about" id="about"><div className="wrap aboutGrid"><div><p className="eyebrow">ABOUT TAIGUO</p><h2>Industrial boiler engineering with global reach.</h2><p>Henan Taiguo Boiler Products Co., Ltd. manufactures industrial boilers and process-heating equipment for projects across international markets. Keystone Consultancy is the authorized Bangladesh representative — connecting local buyers with the manufacturer for product selection, quotations and project communication.</p><div className="chips"><span>ISO 9001</span><span>ASME</span><span>CE</span><span>BV</span><span>SGS</span><span>Grade A Boilers</span></div></div><div className="numbers"><div><b>1976</b><span>Founded</span></div><div><b>60,000㎡</b><span>Factory area</span></div><div><b>150+</b><span>Export countries</span></div><div><b>8</b><span>Quality systems</span></div></div></div></section>

  {/* ── CONTACT ── */}
  <section className="contact" id="contact"><div className="wrap"><div className="contactTop"><div><p className="eyebrow red">CONTACT BANGLADESH</p><h2>Get a free assessment and quotation.</h2><p>Send your application, required capacity, pressure, fuel type and factory location. We respond within 24 hours with a full technical recommendation.</p><div className="person"><div className="avatar">HM</div><div><b>Hasibul Munim</b><span>Director · Keystone Consultancy · Taiguo Bangladesh Rep</span></div></div><div className="contactDetails"><div><small>PHONE · WHATSAPP · WECHAT</small><a href="tel:+8801941646278">+880 1941-646278</a></div><div><small>WECHAT ID</small><p>hasibul_munim</p></div><div><small>EMAIL</small><a href="mailto:Munimhasibul10@gmail.com">Munimhasibul10@gmail.com</a></div><div><small>OFFICE</small><p>Gazipur, Dhaka Division, Bangladesh</p></div><a href={`https://wa.me/${phone}?text=Hello%2C%20I%20would%20like%20a%20Taiguo%20Boiler%20quotation.`} target="_blank" className="btn full" style={{marginTop:'18px'}}>Start WhatsApp enquiry <Arrow/></a></div></div><QuoteForm/></div></div></section>

 </main>
 <footer><div className="wrap foot"><div><Logo/><p>Keystone Consultancy — Bangladesh Authorized Representative for Taiguo Boiler. Industrial heating solutions with full local support.</p><div className="keystoneTag">Official Bangladesh Representative</div></div><div><h3>Products</h3><a href="#products">Steam Boilers</a><a href="#products">Biomass Boilers</a><a href="#products">Thermal Oil Heaters</a><a href="#products">Pressure Vessels</a></div><div><h3>Contact</h3><a href="tel:+8801941646278">+880 1941-646278</a><a href="mailto:Munimhasibul10@gmail.com">Munimhasibul10@gmail.com</a><a href="/blog/boiler-lifespan-2025">Boiler Lifespan Rules 2025</a></div></div><div className="wrap keystoneFooter"><span>Keystone Consultancy · Gazipur, Dhaka · Bangladesh</span><span>WhatsApp &amp; WeChat: +880 1941-646278 · hasibul_munim</span></div><div className="wrap copy"><span>© 2026 Taiguo Boiler Bangladesh · Keystone Consultancy</span><span>Authorized regional sales representative</span></div></footer>
 <a className="float" href={`https://wa.me/${phone}`} target="_blank" aria-label="WhatsApp">WA</a>
</>}
