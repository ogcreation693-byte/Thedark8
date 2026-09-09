"use client";

import { SiteFooter, SiteNav } from "@/components/inner-page";
import { trackEvent } from "@/lib/analytics";

const services = [["01", "Digital strategy", "A clear growth roadmap built around your commercial goals.", "digital-marketing"], ["02", "Performance marketing", "Paid acquisition designed for signal, not noise.", "performance-marketing"], ["03", "SEO and organic growth", "Search visibility, local discovery and useful content.", "seo"], ["04", "Web and e-commerce", "High-performance experiences that turn attention into action.", "web-development"], ["05", "CRM and automation", "Follow-up systems that keep valuable leads moving.", "crm-automation"], ["06", "AI and technology", "Practical automation for the work your team repeats.", "ai-solutions"]];
const journey = ["Traffic", "Content", "Advertising", "Website", "Lead capture", "CRM", "Automation", "Sales", "Retention", "Analytics"];
const process = ["Understand your market, customer and commercial context.", "Find the gaps between attention and action.", "Turn insight into a practical growth roadmap.", "Create the assets, infrastructure and flows.", "Activate the channels that fit the plan.", "Learn from the signal and improve what matters.", "Scale the parts of the system that create measurable value."];
const industries = [
  ["Real estate", "Property marketing systems and qualified enquiry flows."],
  ["Manufacturing", "B2B acquisition built around technical products and RFQs."],
  ["Healthcare", "Local visibility and clearer patient acquisition journeys."],
  ["Education", "Admission funnels designed for useful, qualified enquiries."],
  ["Retail", "E-commerce, local acquisition and customer retention systems."],
  ["Hospitality", "Direct booking, local discovery and digital acquisition."],
];
const faqs = [
  { q: "What kind of businesses do you work with?", a: "We work with service businesses, growth-stage companies and established teams that want clearer customer acquisition, better conversion and more operational discipline in marketing." },
  { q: "Do you offer one-off projects or ongoing retainers?", a: "Both are possible. Some clients need a focused project, while others prefer a retained system for strategy, execution and ongoing optimization." },
  { q: "How do you decide what to build first?", a: "We begin with the bottleneck: where attention is lost, where leads are underqualified, where the website does not support the commercial goal, or where automation can remove friction." },
  { q: "What happens after launch?", a: "We measure what matters, improve the system and tighten the loop between acquisition, conversion and operational follow-up." },
];
const marqueeItems = ["Strategy", "Creative", "Web", "Automation", "Performance", "Analytics", "Retention", "AI Systems"];
const systemPillars = [
  { title: "Acquisition systems", copy: "Intent-driven acquisition built for qualified demand, not vanity traffic." },
  { title: "Creative direction", copy: "Narratives and offers designed to feel premium, coherent and impossible to ignore." },
  { title: "Conversion infrastructure", copy: "Pages, follow-up logic and automation that move leads into predictable revenue motion." },
];

export default function Home() {
  return <main className="motion-page">
    <SiteNav />
    <section className="hero shell" id="top">
      <div className="hero-copy">
        <p className="eyebrow"><span className="pulse" /> Digital growth x technology x automation</p>
        <h1>Turn digital presence into <em>business growth.</em></h1>
        <p className="lede">TheDark8 Tech combines digital marketing, technology and automation to help businesses attract customers, generate qualified leads and build scalable digital systems.</p>
        <div className="hero-actions">
          <a className="button" href="/free-growth-audit" onClick={() => trackEvent("cta_click", { location: "hero_primary", page: "home" })}>Get your free growth audit <i>-&gt;</i></a>
          <a className="text-link" href="#services" onClick={() => trackEvent("cta_click", { location: "hero_secondary", page: "home" })}>Explore services <i>-&gt;</i></a>
        </div>
      </div>

      <div className="hero-visual" aria-label="Connected customer acquisition system">
        <div className="visual-noise" /><div className="visual-scan" />
        <div className="visual-header"><span>THE DARK8 SYSTEM</span><span>LIVE / 01</span></div>
        <div className="orb orb-one" />
        <div className="orb orb-two" />
        <div className="orb orb-three" />
        <div className="orbit orbit-one" /><div className="orbit orbit-two" />
        <div className="signal-line signal-line-one" /><div className="signal-line signal-line-two" />
        <div className="core"><small>GROWTH</small><strong>ENGINE</strong><span>connected by design</span></div>
        <div className="node node-top">ATTRACT <b>01</b></div>
        <div className="node node-right">CONVERT <b>04</b></div>
        <div className="node node-bottom">RETAIN <b>08</b></div>
        <div className="node node-left">MEASURE <b>10</b></div>
        <div className="floating-card card-top"><span>System layer</span><strong>Traffic to retention</strong></div>
        <div className="floating-card card-bottom"><span>Proof status</span><strong>Metrics added when verified</strong></div>
        <div className="live-readout"><span className="readout-dot" /> Signal quality <strong>98.4%</strong></div>
        <div className="visual-footer"><span>System status</span><strong>Optimizing the journey</strong></div>
      </div>
    </section>
    <section className="signal-band"><div className="shell signal-inner"><span>Most agencies manage channels.</span><strong>We build systems.</strong><span>01 / 04</span></div></section>
    <section className="marquee-shell"><div className="marquee-track">{marqueeItems.concat(marqueeItems).map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}</div></section>
    <section className="section shell" id="system"><div className="section-heading"><p className="eyebrow">01 / The connected advantage</p><h2>One partner for your <em>digital ecosystem.</em></h2><p>Your website should not operate separately from your marketing. Your leads should not disappear after submitting a form. We connect the journey from first impression to repeat business.</p></div><div className="pillars-grid">{systemPillars.map((pillar, index) => <article className="pillar-card" key={pillar.title}><span>0{index + 1}</span><h3>{pillar.title}</h3><p>{pillar.copy}</p></article>)}</div><div className="journey">{journey.map((item, index) => <div className="journey-step" key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong>{index < journey.length - 1 && <b>-&gt;</b>}</div>)}</div></section>
    <section className="section section-dark" id="services"><div className="shell"><div className="section-heading split"><div><p className="eyebrow">02 / Capabilities</p><h2>Built for the whole <em>growth problem.</em></h2></div><p>Choose the capability you need today. Build the system you need next.</p></div><div className="service-grid">{services.map(([number, title, copy, slug]) => <article className="service-card" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p><a href={`/services/${slug}`} aria-label={`Explore ${title}`}>Explore <i>-&gt;</i></a></article>)}</div></div></section>
    <section className="section shell" id="process"><div className="section-heading"><p className="eyebrow">03 / How we work</p><h2>Clear thinking. <em>Useful momentum.</em></h2></div><div className="process-grid">{["Discover", "Diagnose", "Strategize", "Build", "Launch", "Optimize", "Scale"].map((step, index) => <div className="process-step" key={step}><span>{String(index + 1).padStart(2, "0")}</span><h3>{step}</h3><p>{process[index]}</p></div>)}</div></section>
    <section className="section section-dark" id="industries"><div className="shell"><div className="section-heading split"><div><p className="eyebrow">04 / Industry context</p><h2>Built around how <em>businesses buy.</em></h2></div><p>Useful growth systems respect the decision cycle, language and constraints of each market.</p></div><div className="service-grid industry-home-grid">{industries.map(([name, copy], index) => <article className="service-card" key={name}><span>{String(index + 1).padStart(2, "0")}</span><h3>{name}</h3><p>{copy}</p><a href={`/industries/${name.toLowerCase().replaceAll(" ", "-")}`}>Explore <i>-&gt;</i></a></article>)}</div></div></section>
    <section className="section proof-section"><div className="shell proof-grid"><div><p className="eyebrow">05 / Selected work</p><h2>Proof belongs to <em>real projects.</em></h2><p>Case studies are being added as projects are completed. We will publish challenges, implementation and verified outcomes only.</p></div><div className="proof-preview"><article className="proof-card"><span>CASE STUDIES / TO BE ADDED</span><h3>Public project library in progress.</h3><p>No invented clients, testimonials or performance numbers. Verified evidence will appear here as it becomes available.</p></article></div></div></section>
    <section className="section shell faq-section"><div className="section-heading"><p className="eyebrow">05 / FAQs</p><h2>Common questions before the first conversation.</h2></div><div className="faq-grid">{faqs.map((item) => <article className="faq-item" key={item.q}><h3>{item.q}</h3><p>{item.a}</p></article>)}</div></section>
    <section className="cta shell" id="contact"><div><p className="eyebrow">Start with clarity</p><h2>Ready to build a better <em>growth system?</em></h2><p>Tell us where your business is today. We will identify the highest-value opportunities across your digital presence and customer journey.</p></div><div className="cta-actions"><a className="button" href="/free-growth-audit" onClick={() => trackEvent("cta_click", { location: "footer_audit", page: "home" })}>Get free growth audit <i>-&gt;</i></a><a className="text-link" href="/contact" onClick={() => trackEvent("cta_click", { location: "strategy_call", page: "home" })}>Book a strategy call <i>-&gt;</i></a></div></section>
    <SiteFooter />
  </main>;
}
