import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Flame, Rocket, Play } from 'lucide-react';
import { BatroukhLogo } from './BatroukhLogo';

interface IntroAudioSplashProps {
  onDismiss?: () => void;
}

export const playBatroukhAudio = () => {
  try {
    // 1. Play synthesized fun Egyptian audio voice
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any pending speech

      const utterance = new SpeechSynthesisUtterance('مطعم بطروخ للمأكولات البحرية.. بطروخ هيخليك صاروووخ!');
      utterance.lang = 'ar-EG';
      utterance.rate = 0.95;
      utterance.pitch = 1.25; // Playful and lively pitch

      // Try to find Arabic Egyptian voice if available
      const voices = window.speechSynthesis.getVoices();
      const arVoice = voices.find((v) => v.lang.includes('ar') || v.lang.includes('EG'));
      if (arVoice) {
        utterance.voice = arVoice;
      }

      window.speechSynthesis.speak(utterance);
    }

    // 2. Play Web Audio API sound effect (Cartoon rocket zoom + bubbly seafood chime)
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      const ctx = new AudioContextClass();
      const now = ctx.currentTime;

      // Rocket whoosh oscillator
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.6);
      osc.frequency.exponentialRampToValueAtTime(300, now + 1.2);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.5);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 1.2);

      // Chime sparkle
      setTimeout(() => {
        const chime = ctx.createOscillator();
        const chimeGain = ctx.createGain();
        chime.type = 'sine';
        chime.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        chime.frequency.setValueAtTime(880, ctx.currentTime + 0.15); // A5
        chimeGain.gain.setValueAtTime(0.3, ctx.currentTime);
        chimeGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
        chime.connect(chimeGain);
        chimeGain.connect(ctx.destination);
        chime.start();
        chime.stop(ctx.currentTime + 0.8);
      }, 400);
    }
  } catch (err) {
    console.error('Audio playback error:', err);
  }
};

export const IntroAudioSplash: React.FC<IntroAudioSplashProps> = ({ onDismiss }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [hasPlayed, setHasPlayed] = useState<boolean>(false);

  useEffect(() => {
    // Check if already shown in this session
    const seen = sessionStorage.getItem('batroukh_splash_seen');
    if (!seen) {
      setIsVisible(true);
    }
  }, []);

  const handleEnterSite = (playSound = true) => {
    sessionStorage.setItem('batroukh_splash_seen', 'true');
    if (playSound) {
      playBatroukhAudio();
    }
    setIsVisible(false);
    if (onDismiss) onDismiss();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030712]/95 backdrop-blur-xl animate-in fade-in duration-300">
      
      {/* Background Lighting Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-b from-orange-600/30 via-red-600/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-lg bg-[#0A1128]/90 border border-white/15 rounded-[36px] p-6 sm:p-8 text-center shadow-[0_0_50px_rgba(234,88,12,0.3)] backdrop-blur-2xl flex flex-col items-center space-y-6">
        
        {/* Animated Big Logo */}
        <div className="relative animate-bounce duration-1000">
          <BatroukhLogo size="xl" showSubtitle={false} />
          <div className="absolute -bottom-2 -right-2 p-2 rounded-full bg-orange-600 text-white shadow-lg shadow-orange-600/50 animate-pulse">
            <Rocket className="w-5 h-5" />
          </div>
        </div>

        {/* Brand Headline */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>أقوى مطعم سي فود مصري في الدقي والجيزة</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-tight">
            مطعم بطروخ للمأكولات البحرية
          </h2>

          <p className="text-lg sm:text-xl font-bold text-orange-400 font-heading">
            « بطروخ هيخليك صاروخ! 🚀 »
          </p>

          <p className="text-xs sm:text-sm text-white/70 max-w-sm mx-auto leading-relaxed pt-1">
            طواجن الفسفور النارية، ساندوتشات الصاروخ، وصواني الملوك طازة من البحر للفرن على طول!
          </p>
        </div>

        {/* Interactive Action Buttons */}
        <div className="w-full space-y-3 pt-2">
          <button
            onClick={() => handleEnterSite(true)}
            className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-black text-base shadow-[0_0_30px_rgba(234,88,12,0.5)] active:scale-95 transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <Play className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
            <span>ادخل برجلك اليمين واسمع الصيحة 🚀</span>
          </button>

          <button
            onClick={() => handleEnterSite(false)}
            className="w-full py-2.5 px-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white text-xs font-bold transition-colors cursor-pointer"
          >
            دخول صامت للموقع
          </button>
        </div>

        <div className="text-[11px] text-white/40 flex items-center gap-1.5">
          <Volume2 className="w-3.5 h-3.5 text-orange-400" />
          <span>يمكنك إعادة تشغيل الصوت واللوجو في أي وقت من زر الصوت بالنافبار</span>
        </div>

      </div>
    </div>
  );
};
