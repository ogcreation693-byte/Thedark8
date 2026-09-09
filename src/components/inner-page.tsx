import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { MobileMenu } from "@/components/mobile-menu";

export function SiteNav() {
  return <header className="site-header"><div className="nav-meta shell"><span>Independent digital systems studio</span><span className="nav-meta-status"><i /> Available for select partnerships <b>Coimbatore / IST</b></span></div><nav className="nav shell"><Link aria-label="TheDark8 Tech home" className="brand" href="/"><Image alt="" height={120} src="/logo.png" width={120} /><span className="brand-copy">TheDark8 <b>Tech</b></span></Link><div className="nav-links"><Link href="/services">Services</Link><Link href="/industries">Industries</Link><Link href="/work">Work</Link><Link href="/process">Process</Link><Link href="/about">About</Link><Link href="/pricing">Pricing</Link><Link href="/resources">Resources</Link><Link href="/contact">Contact</Link></div><Link className="button button-small nav-cta" href="/free-growth-audit"><span>Get growth audit</span><i>-&gt;</i></Link><MobileMenu /></nav><div className="nav-rule" /></header>;
}

export function SiteFooter() {
  return <footer className="site-footer"><div className="footer-cta shell"><div><p className="eyebrow"><span className="pulse" /> The next move</p><h2>Make the system <em>work harder.</em></h2></div><Link className="footer-arrow" href="/free-growth-audit" aria-label="Start a free growth audit"><span>Start a conversation</span><b>-&gt;</b></Link></div><div className="footer shell"><div className="footer-main"><Link aria-label="TheDark8 Tech home" className="brand" href="/"><span className="brand-mark"><Image alt="" height={120} src="/logo.png" width={120} /></span><span className="brand-copy">TheDark8 <b>Tech</b></span></Link><p>Digital Growth x Technology x Automation</p></div><div className="footer-bottom"><div className="footer-links"><Link href="/privacy-policy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/cookie-policy">Cookies</Link><Link href="/intellectual-property">IP</Link></div><small>Coimbatore / Tamil Nadu / India</small><small>Copyright 2026 TheDark8 Tech. All rights reserved.</small></div></div></footer>;
}

export function InnerPage({ eyebrow, title, intro, introClassName = "", children }: { eyebrow: string; title: ReactNode; intro: string; introClassName?: string; children: ReactNode }) {
  return <main className="inner-page"><SiteNav /><header className={`inner-hero shell ${introClassName ? `inner-hero-${introClassName}` : ""}`}><div className="inner-hero-glow" /><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className={`lede ${introClassName}`.trim()}>{intro}</p></header>{children}<section className="cta shell"><div><p className="eyebrow">Start with clarity</p><h2>Build a better <em>growth system.</em></h2><p>Tell us where your business is today and we will identify the highest-value opportunities.</p></div><Link className="button" href="/free-growth-audit">Get free growth audit <i>-&gt;</i></Link></section><SiteFooter /></main>;
}

export const serviceGroups = {
  Growth: ["Digital Marketing", "SEO", "Local SEO", "Social Media", "Content Marketing", "Performance Marketing", "Lead Generation"],
  Technology: ["Website Development", "E-commerce", "Landing Pages", "Business Software", "API Integrations"],
  Automation: ["CRM", "WhatsApp Automation", "Email Automation", "Workflow Automation", "AI Agents", "Lead Qualification"],
  Creative: ["Branding", "Graphic Design", "Video", "Reels", "Ad Creatives", "Copywriting"],
};
