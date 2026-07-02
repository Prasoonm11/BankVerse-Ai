"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, BrainCircuit, ShieldCheck, ShieldAlert, RefreshCw, KeyRound, Info, Sun, Moon } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [pin, setPin] = useState<string>("");
  const [isVerifyingPin, setIsVerifyingPin] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [theme, setTheme] = useState("dark");

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

  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Card click helper to refocus input
  const handleCardClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Keyboard input change handler
  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Allow only numbers and max length 4
    if (/^\d*$/.test(val) && val.length <= 4 && !isVerifyingPin && !isSuccess) {
      setPin(val);
      setPinError(false);
    }
  };

  // Auto trigger verification when PIN is 4 digits
  useEffect(() => {
    if (pin.length !== 4) return;

    const verifyPIN = async () => {
      setIsVerifyingPin(true);
      setPinError(false);

      // Simulate secure enclave authentication delay
      await new Promise((resolve) => setTimeout(resolve, 1200));

      if (pin === "0357") {
        setIsVerifyingPin(false);
        setIsSuccess(true);

        // Transition to Dashboard
        await new Promise((resolve) => setTimeout(resolve, 1000));
        router.push("/dashboard");
      } else {
        setIsVerifyingPin(false);
        setPinError(true);

        // Shake animation plays for 500ms, then reset the input for retry
        setTimeout(() => {
          setPin("");
          setPinError(false);
          // Refocus input
          inputRef.current?.focus();
        }, 800);
      }
    };

    verifyPIN();
  }, [pin, router]);

  // Framer Motion shake variants for incorrect PIN
  const shakeVariants = {
    shake: {
      x: [0, -10, 10, -10, 10, -5, 5, 0],
      transition: { duration: 0.5, ease: "easeInOut" as const },
    },
  };

  // Blinking cursor component for premium feel
  const BlinkingCursor = () => (
    <motion.div
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-[2px] h-6 bg-[#7C3AED] rounded-full shadow-[0_0_8px_rgba(124,58,237,0.8)]"
    />
  );

  // Secure dot component for filled slots
  const FilledDot = () => (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-[#7C3AED] to-[#A78BFA] shadow-[0_0_10px_rgba(167,139,250,0.8)]"
    />
  );

  return (
    <div className="min-h-screen w-screen bg-[#020205] text-slate-100 flex flex-col items-center justify-center p-6 relative overflow-hidden select-none">
      
      {/* Floating Background Glows (matching landing page styling) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[10%] left-[10%] w-[350px] h-[350px] bg-[#7C3AED]/12 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, -40, 20, 0],
            y: [0, 30, -30, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[15%] right-[15%] w-[400px] h-[400px] bg-[#2563EB]/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, 20, -10, 0],
            y: [0, 15, -15, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[35%] right-[5%] w-[300px] h-[300px] bg-[#22D3EE]/8 rounded-full blur-[100px]"
        />
        <div className="absolute inset-0 grid-pattern opacity-10" />
      </div>

      {/* Floating Back to Home button */}
      <motion.button
        onClick={() => router.push("/")}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="absolute top-8 left-8 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2 text-xs z-20 cursor-pointer backdrop-blur-md"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </motion.button>

      {/* Floating Theme Toggle button */}
      <motion.button
        onClick={toggleTheme}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="absolute top-8 right-8 p-2 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all z-20 cursor-pointer backdrop-blur-md"
        title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {theme === "light" ? <Moon className="h-4 w-4 text-[#A78BFA]" /> : <Sun className="h-4 w-4 text-[#A78BFA]" />}
      </motion.button>

      {/* Main card panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        onClick={handleCardClick}
        className="w-full max-w-[420px] glass-card rounded-[32px] p-8 md:p-10 shadow-2xl relative z-10 border border-white/10 cursor-pointer"
      >
        
        {/* Brand Logo Header */}
        <div className="flex flex-col items-center gap-2.5 mb-8 mt-4 text-center">
          <div className="p-2 bg-[#7C3AED]/20 border border-[#7C3AED]/30 rounded-xl flex items-center justify-center transition-transform duration-300">
            <BrainCircuit className="h-6 w-6 text-[#A78BFA] shadow-[0_0_10px_rgba(167,139,250,0.5)]" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5 justify-center">
            BankVerse <span className="text-[#A78BFA] text-xs font-semibold bg-[#7C3AED]/10 px-2 py-0.5 rounded-full border border-[#7C3AED]/20">AI</span>
          </span>
          <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mt-1">Secure Autonomous Entry</p>
        </div>

        {/* Text descriptions */}
        <div className="text-center space-y-2 mb-8">
          <h3 className="text-base font-bold text-white">Enter Security PIN</h3>
          <p className="text-xs text-slate-400 max-w-[280px] mx-auto leading-relaxed">
            Please enter your 4-digit security credentials to authorize access to your AI portfolio.
          </p>
        </div>

        {/* Hidden Input capturing keyboard focus */}
        <input
          ref={inputRef}
          type="text"
          maxLength={4}
          pattern="\d*"
          value={pin}
          onChange={handlePinChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="absolute opacity-0 pointer-events-none w-0 h-0"
          autoComplete="one-time-code"
          inputMode="numeric"
        />

        {/* Styled 4-Digit Display Blocks */}
        <motion.div
          variants={shakeVariants}
          animate={pinError ? "shake" : ""}
          className="flex justify-center gap-4 py-2 mb-6"
        >
          {[0, 1, 2, 3].map((index) => {
            const isDigitFilled = pin.length > index;
            const isSlotActive = pin.length === index && isFocused;

            let borderClass = "border-white/10 bg-slate-950/40";
            if (isSuccess) {
              borderClass = "border-emerald-500 bg-emerald-500/5 shadow-[0_0_15px_rgba(16,185,129,0.25)]";
            } else if (pinError) {
              borderClass = "border-red-500 bg-red-500/5 shadow-[0_0_15px_rgba(239,68,68,0.25)]";
            } else if (isSlotActive) {
              borderClass = "border-[#7C3AED] bg-[#7C3AED]/5 shadow-[0_0_15px_rgba(124,58,237,0.3)]";
            } else if (isDigitFilled) {
              borderClass = "border-slate-500 bg-slate-900/60";
            }

            return (
              <div
                key={index}
                className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-200 ${borderClass}`}
              >
                {isSuccess ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"
                  />
                ) : isDigitFilled ? (
                  <FilledDot />
                ) : isSlotActive ? (
                  <BlinkingCursor />
                ) : null}
              </div>
            );
          })}
        </motion.div>

        {/* Feedback Messages */}
        <div className="h-6 flex items-center justify-center mb-6">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.span
                key="success"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-emerald-400 font-bold flex items-center gap-1.5"
              >
                <ShieldCheck className="h-4 w-4 animate-bounce" /> ACCESS GRANTED
              </motion.span>
            ) : isVerifyingPin ? (
              <motion.span
                key="verifying"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-xs text-cyan-accent font-semibold flex items-center gap-1.5"
              >
                <RefreshCw className="h-3 w-3 animate-spin text-cyan-accent" /> Decrypting Secure Enclave...
              </motion.span>
            ) : pinError ? (
              <motion.span
                key="error"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-xs text-red-400 font-bold flex items-center gap-1.5"
              >
                <ShieldAlert className="h-4 w-4" /> ACCESS DENIED: INVALID SIGNATURE
              </motion.span>
            ) : (
              <motion.span
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-1"
              >
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Info Note: Default PIN info */}
        <motion.div
          initial={{ opacity: 0.5 }}
          whileHover={{ opacity: 0.9 }}
          className="flex items-start gap-2 bg-white/5 border border-white/5 rounded-2xl p-3.5 transition-opacity"
        >
          <Info className="h-4 w-4 text-[#A78BFA] shrink-0 mt-0.5" />
          <div className="text-[10px] text-slate-400 leading-relaxed">
            <span className="font-semibold text-slate-300 block mb-0.5">Developer Testing Environment</span>
            Use the hardcoded authorization signature key <span className="font-mono text-[#A78BFA] bg-[#7C3AED]/20 px-1 py-0.5 rounded border border-[#7C3AED]/20 text-xs">0357</span> to unlock this portal session.
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
