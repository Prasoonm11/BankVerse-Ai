"use client";

import React from "react";
import Link from "next/link";
import { BrainCircuit, ArrowLeft } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import AgentsSection from "@/components/AgentsSection";
import WorkflowSection from "@/components/WorkflowSection";
import DashboardPreview from "@/components/DashboardPreview";
import DigitalTwinSimulation from "@/components/DigitalTwinSimulation";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#020205]">
      {/* Custom Clean Header without Anchor Shortcut Links */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#020205]/75 backdrop-blur-md border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="p-2 bg-gradient-to-tr from-electric-blue to-cyan-accent rounded-xl shadow-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <BrainCircuit className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white flex items-center gap-1.5">
              BankVerse <span className="text-cyan-accent text-xs font-semibold bg-cyan-accent/10 px-2 py-0.5 rounded-full border border-cyan-accent/20">AI</span>
            </span>
          </Link>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs font-semibold text-slate-300 hover:text-white px-4 py-2 border border-white/10 hover:border-white/20 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
            </Link>
            <Link
              href="/login"
              className="text-xs font-semibold text-[#020205] bg-white hover:bg-slate-100 px-4 py-2 rounded-xl transition-all cursor-pointer"
            >
              Login
            </Link>
          </div>
        </div>
      </header>

      {/* Main Sections with Matched Color Combinations */}
      <main className="flex-1 bg-gradient-to-br from-[#d9f99d]/4 via-[#020205] to-[#7c3aed]/6 text-slate-100 relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-[#d9f99d]/3 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[5%] w-[450px] h-[450px] bg-[#7c3aed]/5 rounded-full blur-[130px]" />
          <div className="absolute inset-0 grid-pattern opacity-10" />
        </div>

        <div className="relative z-10">
          <HeroSection />
          <AgentsSection />
          <WorkflowSection />
          <DashboardPreview />
          <DigitalTwinSimulation />
        </div>
      </main>

      {/* Footer layout spacing */}
      <div className="h-8 bg-[#020205] border-t border-white/5 shrink-0 relative z-20 flex items-center justify-center" >
        <p className="text-slate-600 text-[10px] leading-relaxed">
           &copy; 2026 BankVerse AI Technologies Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
}
