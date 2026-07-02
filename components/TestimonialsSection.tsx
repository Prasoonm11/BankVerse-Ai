"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote, Sparkles } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Marcus Vance",
      role: "Chief Technology Officer",
      company: "Apex Global Fin",
      avatarBg: "bg-gradient-to-tr from-electric-blue to-cyan-accent",
      initials: "MV",
      quote: "BankVerse AI completely restructured our operations workflow. By deploying the Customer Acquisition and Fraud Guardian agents, we reduced KYC verification latency to under 3 seconds and cut false-positive alerts by 45%. It is absolute magic.",
      stars: 5
    },
    {
      name: "Sarah Jenkins",
      role: "Venture Partner",
      company: "BlueScale Capital",
      avatarBg: "bg-gradient-to-tr from-accent-purple to-pink-500",
      initials: "SJ",
      quote: "The Digital Twin simulator is not just a widget; it's a window into wealth creation. I plugged in my investments and expenses, and the predictive simulation gave me insights that traditional advisers took months to assemble. Groundbreaking.",
      stars: 5
    },
    {
      name: "Derrick Cole",
      role: "Founder & CEO",
      company: "Synthetix Labs",
      avatarBg: "bg-gradient-to-tr from-amber-400 to-orange-500",
      initials: "DC",
      quote: "As a business owner, managing recurring expenses and credit optimization was a full-time task. Rewards Optimizer and Finance Coach operate in the background like my personal CFO, saving me thousands of dollars completely hands-free.",
      stars: 5
    }
  ];

  return (
    <section className="relative py-32 overflow-hidden bg-navy-bg">
      {/* Background decoration */}
      <div className="absolute top-[20%] right-[-10%] w-[35%] h-[35%] bg-electric-blue/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[35%] h-[35%] bg-accent-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 z-10">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-accent/10 border border-cyan-accent/20 text-cyan-accent text-xs font-semibold uppercase tracking-wider mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Trusted by Leaders in Finance
          </h2>
          <p className="text-slate-400 mt-4 text-base sm:text-lg">
            See how forward-thinking executives, venture partners, and founders are scaling their asset management and protection using BankVerse AI.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative flex flex-col justify-between rounded-3xl glass-card p-8 md:p-10 h-full transition-all duration-300 hover:-translate-y-1 hover:border-cyan-accent/20"
            >
              {/* Quote Mark Icon */}
              <div className="absolute top-6 right-8 text-white/5 group-hover:text-cyan-accent/10 transition-colors duration-300 pointer-events-none">
                <Quote className="h-16 w-16" strokeWidth={1} />
              </div>

              <div className="relative">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-slate-300 text-sm md:text-base leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/5">
                <div className={`w-10 h-10 rounded-full ${t.avatarBg} flex items-center justify-center font-bold text-xs text-slate-900 border border-white/10 shrink-0`}>
                  {t.initials}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white tracking-tight">{t.name}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">{t.role}, <span className="text-cyan-accent font-semibold">{t.company}</span></p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
