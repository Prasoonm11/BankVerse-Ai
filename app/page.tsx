"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BrainCircuit, Sun, Moon } from "lucide-react";

export default function Home() {
  const [theme, setTheme] = useState("dark");
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.className = savedTheme === "light" ? "theme-light" : "";
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.className = newTheme === "light" ? "theme-light" : "";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const x = (clientX - width / 2) / (width / 2); // -1 to 1
    const y = (clientY - height / 2) / (height / 2); // -1 to 1
    setRotateX(-y * 10); // Tilt up/down
    setRotateY(x * 10);  // Tilt left/right
    setMouseX(clientX);
    setMouseY(clientY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const isLight = theme === "light";

  const wrapperStyle = isLight
    ? {
        backgroundColor: "#F8FAFC",
        backgroundImage: "linear-gradient(to bottom right, rgba(217, 249, 157, 0.15), #F8FAFC, rgba(124, 58, 237, 0.12))",
      }
    : {};

  const imageStyle = isLight 
    ? { 
        filter: "invert(0.95) hue-rotate(220deg) brightness(1.06) contrast(1.05)", 
        opacity: 0.85 
      }
    : {};

  const overlayStyle = isLight
    ? {
        backgroundImage: "linear-gradient(to right, #F8FAFC 0%, rgba(248, 250, 252, 0.85) 30%, rgba(248, 250, 252, 0.2) 70%, transparent 100%)"
      }
    : {};

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={wrapperStyle}
      className={`h-screen w-screen bg-[#020205] ${isLight ? 'text-slate-800' : 'text-slate-100'} font-sans flex flex-col justify-between overflow-hidden relative select-none transition-colors duration-500`}
    >
      
      {/* Interactive Spotlight Cursor Glow */}
      <div 
        className="absolute pointer-events-none rounded-full blur-[120px] opacity-[0.25] w-72 h-72 bg-gradient-to-r from-[#7C3AED] to-[#22D3EE] z-0 transition-opacity duration-300"
        style={{
          left: `${mouseX - 144}px`,
          top: `${mouseY - 144}px`,
          display: mouseX ? 'block' : 'none'
        }}
      />

      {/* Floating Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -50, 30, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[5%] left-[5%] w-[400px] h-[400px] bg-[#7C3AED]/12 rounded-full blur-[110px]"
        />
        <motion.div
          animate={{
            x: [0, -30, 40, 0],
            y: [0, 40, -40, 0],
            scale: [1, 0.85, 1.1, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[10%] right-[15%] w-[450px] h-[450px] bg-[#2563EB]/10 rounded-full blur-[130px]"
        />
        <motion.div
          animate={{
            x: [0, 20, -30, 0],
            y: [0, 30, -10, 0],
            scale: [1, 1.05, 0.95, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[35%] right-[5%] w-[320px] h-[320px] bg-[#22D3EE]/8 rounded-full blur-[100px]"
        />
        <div className="absolute inset-0 grid-pattern opacity-10" />
      </div>

      {/* Top Navbar */}
      <motion.header 
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className="relative z-20 flex items-center justify-between px-6 md:px-16 py-6 w-full shrink-0"
      >
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="p-2 bg-[#7C3AED]/20 border border-[#7C3AED]/30 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <BrainCircuit className="h-5 w-5 text-[#A78BFA] shadow-[0_0_10px_rgba(167,139,250,0.5)]" />
          </div>
          <span className={`font-bold text-xl tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            BankVerse <span className="text-[#A78BFA] text-xs font-semibold bg-[#7C3AED]/10 px-2 py-0.5 rounded-full border border-[#7C3AED]/20">AI</span>
          </span>
        </Link>

        {/* Right: View Features button (in place of book a demo) */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-full text-slate-400 hover:text-white hover:bg-white/5 border border-white/10 transition-colors cursor-pointer relative z-30"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === "light" ? <Moon className="h-4 w-4 text-[#A78BFA]" /> : <Sun className="h-4 w-4 text-[#A78BFA]" />}
          </button>
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(124, 58, 237, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <Link
              href="/features"
              className="px-5 py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-semibold rounded-full shadow-lg shadow-[#7C3AED]/20 transition-all duration-300 inline-block"
            >
              View Features
            </Link>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Section */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-16 flex items-center relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full items-center">
          
          {/* Left Column: Heading, description, and Login button (in place of get started) */}
          <div className="md:col-span-6 flex flex-col items-start text-left max-w-lg md:max-w-xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, type: "spring", stiffness: 90, delay: 0.1 }}
              className={`text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-none mb-6 ${isLight ? 'text-slate-900' : 'text-white'}`}
            >
              BankVerse <span className="bg-gradient-to-r from-electric-blue via-cyan-accent to-accent-purple bg-clip-text text-transparent">AI</span>
            </motion.h1>
            
            <motion.h4
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, type: "spring", stiffness: 90, delay: 0.25 }}
              className={`text-xl sm:text-2xl md:text-[30px] font-bold tracking-tight leading-[1.1] mb-6 ${isLight ? 'text-slate-800' : 'text-white'}`}
            >
              The Future of Autonomous Banking with Agentic AI
            </motion.h4>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, type: "spring", stiffness: 90, delay: 0.4 }}
              className={`text-sm sm:text-base mb-8 leading-relaxed max-w-md ${isLight ? 'text-slate-600' : 'text-slate-400'}`}
            >
              Experience intelligent banking powered by multiple AI agents that acquire customers, drive digital adoption, optimize finances, detect fraud, and deliver hyper-personalized engagement.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, type: "spring", stiffness: 90, delay: 0.55 }}
            >
              {/* Login button (in place of get started) */}
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 255, 255, 0.25)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="inline-block"
              >
                <Link
                  href="/login"
                  className="px-8 py-3 bg-white hover:bg-slate-100 text-[#020205] text-sm font-semibold rounded-full shadow-xl transition-all duration-300 inline-block"
                >
                  Login
                </Link>
              </motion.div>
            </motion.div>
          </div>
          
        </div>
      </div>

      {/* Right side: 3D Conveyor Image */}
      <motion.div
        initial={{ opacity: 0, x: 60, scale: 0.95 }}
        animate={{ 
          opacity: 1, 
          x: 0, 
          scale: 1,
          rotateX,
          rotateY
        }}
        style={{ perspective: 1000, transformStyle: "preserve-3d" }}
        transition={{ duration: 0.8, type: "spring", stiffness: 85, damping: 20 }}
        className="absolute right-0 top-0 bottom-0 w-full md:w-[60%] h-full z-0 pointer-events-none overflow-hidden select-none"
      >
        <div className="relative w-full h-full animate-float-slow">
          <Image
            src="/bankverse_conveyor_3d.png"
            alt="BankVerse AI Conveyor 3D"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 60vw"
            style={imageStyle}
            className="object-cover md:object-contain object-right-bottom md:object-right transition-all duration-500"
          />
          {/* Subtle dark gradient overlay to blend left side text with the image */}
          <div 
            style={overlayStyle}
            className="absolute inset-0 bg-gradient-to-r from-[#020205] via-[#020205]/80 to-transparent" 
          />
        </div>
      </motion.div>

      {/* Footer layout spacing */}
      <div className="h-8 shrink-0 relative z-20" >
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className={`text-xs sm:text-xs mb-2 leading-relaxed max-w-md ml-38 ${isLight ? 'text-slate-500' : 'text-slate-600'}`}
        >
           © 2026 All rights reserved by Bankverse AI.
        </motion.p>
      </div>
    </div>
  );
}
