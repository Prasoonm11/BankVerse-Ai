"use client";

import React from "react";
import { BrainCircuit, Send, MessageSquare } from "lucide-react";

export default function Footer() {
  const links = {
    platform: [
      { name: "Autonomous Core", href: "#features" },
      { name: "AI Agent Fleet", href: "#agents" },
      { name: "What If Engine", href: "#demo" },
      { name: "Platform Security", href: "#" },
    ],
    developers: [
      { name: "API Reference", href: "#" },
      { name: "Orchestration SDK", href: "#" },
      { name: "Security Audits", href: "#" },
      { name: "System Status", href: "#" },
    ],
    company: [
      { name: "About BankVerse", href: "#" },
      { name: "Press Kit", href: "#" },
      { name: "Careers (We're hiring)", href: "#" },
      { name: "Contact Team", href: "#contact" },
    ]
  };

  return (
    <footer id="contact" className="relative bg-navy-dark/60 border-t border-white/5 pt-20 pb-10 overflow-hidden">
      {/* Background Dots */}
      <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/5">
          
          {/* Logo & Newsletter (cols 4) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <a href="#home" className="flex items-center gap-2.5">
              <div className="p-2 bg-gradient-to-tr from-electric-blue to-cyan-accent rounded-xl shadow-lg flex items-center justify-center">
                <BrainCircuit className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white flex items-center gap-1.5">
                BankVerse <span className="text-cyan-accent text-xs font-semibold bg-cyan-accent/10 px-2 py-0.5 rounded-full border border-cyan-accent/20">AI</span>
              </span>
            </a>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
              Next-generation autonomous banking system powered by multi-agent cognitive architectures.
            </p>
            {/* Newsletter */}
            <div className="flex flex-col gap-2.5 max-w-xs">
              <label className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Subscribe to Insights</label>
              <div className="relative flex items-center">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-accent/50 pr-10"
                />
                <button className="absolute right-2 p-1.5 bg-cyan-accent/10 hover:bg-cyan-accent/20 rounded-lg text-cyan-accent border border-cyan-accent/20 flex items-center justify-center transition-colors">
                  <Send className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Links Column 1: Platform (cols 2.5) */}
          <div className="lg:col-span-2.5 lg:col-start-6 flex flex-col gap-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">Platform</h4>
            <div className="flex flex-col gap-2.5">
              {links.platform.map((l) => (
                <a key={l.name} href={l.href} className="text-xs text-slate-400 hover:text-white transition-colors duration-200">
                  {l.name}
                </a>
              ))}
            </div>
          </div>

          {/* Links Column 2: Developers (cols 2.5) */}
          <div className="lg:col-span-2.5 flex flex-col gap-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">Developers</h4>
            <div className="flex flex-col gap-2.5">
              {links.developers.map((l) => (
                <a key={l.name} href={l.href} className="text-xs text-slate-400 hover:text-white transition-colors duration-200">
                  {l.name}
                </a>
              ))}
            </div>
          </div>

          {/* Links Column 3: Company (cols 2.5) */}
          <div className="lg:col-span-2.5 flex flex-col gap-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">Company</h4>
            <div className="flex flex-col gap-2.5">
              {links.company.map((l) => (
                <a key={l.name} href={l.href} className="text-xs text-slate-400 hover:text-white transition-colors duration-200">
                  {l.name}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom copyright & legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 text-[10px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} BankVerse AI Technologies Inc. All rights reserved.
          </div>
          
          {/* Socials using custom SVGs to bypass Lucide brand icon issues */}
          <div className="flex gap-4">
            {/* Twitter / X */}
            <a href="#" className="p-2 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:text-white transition-colors flex items-center justify-center" aria-label="Twitter">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
            {/* GitHub */}
            <a href="#" className="p-2 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:text-white transition-colors flex items-center justify-center" aria-label="GitHub">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="#" className="p-2 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:text-white transition-colors flex items-center justify-center" aria-label="LinkedIn">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            {/* Discord/MessageSquare */}
            <a href="#" className="p-2 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:text-white transition-colors flex items-center justify-center" aria-label="Discord">
              <MessageSquare className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="flex gap-6 font-medium">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Security Disclosure</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
