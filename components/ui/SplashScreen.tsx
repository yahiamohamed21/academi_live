"use client";

import React, { useState, useEffect } from "react";
import { GraduationCap } from "lucide-react";

export default function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Smooth progress animation
    const progressTimer = setTimeout(() => {
      setProgress(100);
    }, 100);

    // Keep the splash screen for 1.8 seconds, then start fading out
    const timer = setTimeout(() => {
      setFadeOut(true);
      // Remove from DOM after fade out transition
      setTimeout(() => {
        setIsLoading(false);
      }, 700);
    }, 1800);

    return () => {
      clearTimeout(timer);
      clearTimeout(progressTimer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div 
      className={`fixed inset-0 w-screen h-[100dvh] z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-[#000a1f] via-[#001c56] to-[#002a7a] transition-all duration-700 ease-in-out ${fadeOut ? 'opacity-0 scale-105 blur-md' : 'opacity-100 scale-100 blur-0'}`}
      dir="rtl"
    >
      {/* Decorative background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[50vh] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className={`relative flex flex-col items-center z-10 transition-all duration-1000 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        
        {/* Glow behind logo */}
        <div className="absolute top-8 w-32 h-32 bg-blue-400/20 blur-2xl rounded-full animate-pulse" />

        {/* Logo Container */}
        <div className="w-28 h-28 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] flex items-center justify-center text-white shadow-2xl mb-8 relative">
          <GraduationCap size={56} className="drop-shadow-lg" />
          
          {/* Animated Rings */}
          <div className="absolute inset-0 rounded-[2rem] border-2 border-white/40 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
          <div className="absolute inset-0 rounded-[2rem] border-2 border-blue-300/30 animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite_0.5s]"></div>
        </div>
        
        {/* App Name */}
        <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200 tracking-tight mb-3 drop-shadow-md">
          أكاديميا
        </h1>
        <p className="text-blue-200/80 font-medium text-lg tracking-wide">
          نظام الإدارة الذكي
        </p>
        
        {/* Loading bar */}
        <div className="w-56 h-1 bg-blue-900/40 rounded-full mt-10 overflow-hidden relative backdrop-blur-sm border border-blue-800/30">
          <div 
            className="h-full bg-gradient-to-r from-blue-400 to-white rounded-full absolute right-0 top-0 bottom-0 transition-all duration-[1700ms] ease-out shadow-[0_0_10px_rgba(96,165,250,0.8)]"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
