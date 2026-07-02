"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Features", href: "#features" },
    { name: "Agents", href: "#agents" },
    { name: "Architecture", href: "#architecture" },
    { name: "Demo", href: "#demo" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy-bg/75 backdrop-blur-md border-b border-white/5 py-4 shadow-lg shadow-navy-dark/20"
          : "bg-transparent py-6 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5 group">
            <div className="p-2 bg-gradient-to-tr from-electric-blue to-cyan-accent rounded-xl shadow-lg shadow-electric-blue/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <BrainCircuit className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white flex items-center gap-1.5">
              BankVerse <span className="text-cyan-accent text-xs font-semibold bg-cyan-accent/10 px-2 py-0.5 rounded-full border border-cyan-accent/20">AI</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-cyan-accent transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop Action */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#demo"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Log in
            </a>
            <a
              href="#demo"
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-white rounded-xl group bg-gradient-to-br from-electric-blue to-cyan-accent group-hover:from-electric-blue group-hover:to-cyan-accent hover:text-white focus:ring-2 focus:outline-none focus:ring-cyan-800 transition-all duration-300"
            >
              <span className="relative px-5 py-2 transition-all ease-in duration-200 bg-navy-bg rounded-[10px] group-hover:bg-opacity-0 flex items-center gap-1.5 font-semibold">
                Launch Demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white focus:outline-none flex items-center justify-center transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-navy-bg/95 border-b border-white/5 backdrop-blur-lg"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-semibold text-slate-300 hover:text-cyan-accent transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <hr className="border-white/5 my-2" />
              <div className="flex flex-col gap-4">
                <a
                  href="#demo"
                  onClick={() => setIsOpen(false)}
                  className="text-center py-2.5 rounded-xl border border-white/10 text-slate-300 font-semibold"
                >
                  Log in
                </a>
                <a
                  href="#demo"
                  onClick={() => setIsOpen(false)}
                  className="text-center py-3 rounded-xl bg-gradient-to-r from-electric-blue to-cyan-accent text-white font-semibold flex items-center justify-center gap-2"
                >
                  Launch Demo
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
