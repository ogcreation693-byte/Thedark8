"use client";

import Link from "next/link";
import { useState } from "react";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  return <div className="mobile-menu"><button className="menu-button" type="button" aria-expanded={open} aria-controls="mobile-links" onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}</button>{open && <div className="mobile-links" id="mobile-links"><Link onClick={() => setOpen(false)} href="/services">Services</Link><Link onClick={() => setOpen(false)} href="/industries">Industries</Link><Link onClick={() => setOpen(false)} href="/work">Work</Link><Link onClick={() => setOpen(false)} href="/process">Process</Link><Link onClick={() => setOpen(false)} href="/about">About</Link><Link onClick={() => setOpen(false)} href="/pricing">Pricing</Link><Link onClick={() => setOpen(false)} href="/resources">Resources</Link><Link onClick={() => setOpen(false)} href="/contact">Contact</Link></div>}</div>;
}
