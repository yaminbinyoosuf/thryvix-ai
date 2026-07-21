import { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronRight, CheckCircle2, ShieldCheck, Activity, Award } from 'lucide-react';

interface HeroProps {
  setActiveView: (view: 'landing' | 'booking' | 'dashboard' | 'onboard') => void;
}

export default function Hero({ setActiveView }: HeroProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  
  // Custom Counter States
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [count4, setCount4] = useState(0);

  // Mouse Parallax effect on the interactive grid background
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (gridRef.current) {
        const rect = gridRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setCoords({ x: x * 30, y: y * 30 });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Counters Count Up animation on mount
  useEffect(() => {
    const animateCount = (target: number, setter: (val: number) => void) => {
      let current = 0;
      const step = Math.ceil(target / 40);
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(current);
        }
      }, 30);
    };

    animateCount(63, setCount1);
    animateCount(8, setCount2);
    animateCount(60, setCount3);
    animateCount(0, setCount4);
  }, []);

  return (
    <section ref={gridRef} className="relative min-h-[92vh] flex flex-col justify-center items-center text-center px-6 pt-32 pb-20 overflow-hidden border-b border-black/5 bg-white">
      {/* Elegant minimalist 4-point Star Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-20">
        <svg className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] text-neutral-100" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 100 100">
          <path d="M50 0 C50 35 65 50 100 50 C65 50 50 65 50 100 C50 65 35 50 0 50 C35 50 50 35 50 0 Z" />
        </svg>
      </div>

      {/* Dynamic Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px]"
        style={{
          transform: `translate(${coords.x}px, ${coords.y}px)`,
          maskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, black 30%, transparent 100%)',
        }}
      />

      {/* Soft Ambient Glow */}
      <div className="absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none opacity-30 bg-neutral-100 blur-[100px]" />

      {/* Trust Badges Bar */}
      <div className="relative z-10 inline-flex items-center gap-2 border px-4 py-1.5 rounded-full border-black/10 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] text-[10px] font-mono tracking-widest uppercase mb-10 select-none animate-in fade-in slide-in-from-top-2 duration-700">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-black/60 font-medium">THRYVIX Health — AI Operating System for Indian Clinics</span>
        <span className="text-black/20">|</span>
        <span className="text-black font-bold">Kerala, India</span>
      </div>

      {/* Core Display Typography */}
      <h1 className="relative z-10 max-w-4xl text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] text-black animate-in fade-in slide-in-from-bottom-3 duration-1000">
        <span className="block">The operating system for organised human activity.</span>
      </h1>

      {/* Body Subtitle */}
      <p className="relative z-10 mt-8 max-w-lg text-sm sm:text-base text-black/60 leading-relaxed font-sans font-medium animate-in fade-in slide-in-from-bottom-4 duration-1000">
        Starting with clinics. Every industry follows. THRYVIX sits underneath how organisations think, remember, and coordinate — making every organisation smarter over time without requiring technical expertise or an IT budget.
      </p>

      {/* Premium Actions */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 mt-10 w-full max-w-md justify-center select-none animate-in fade-in slide-in-from-bottom-5 duration-1000">
        <button
          onClick={() => setActiveView('booking')}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 font-sans text-xs font-bold rounded-full bg-black text-white px-8 py-4.5 hover:bg-neutral-900 transition-all shadow-[0_12px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 active:translate-y-0 duration-200"
        >
          <span>Get Started Today</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => {
            document.getElementById('clinic')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-sans text-xs font-semibold rounded-full border border-black/10 text-black bg-neutral-50/50 px-8 py-4.5 hover:bg-neutral-100/80 transition-all duration-200"
        >
          <span>Watch Demo</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Interactive Bottom Float Pill */}
      <div className="relative z-10 mt-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
        <button
          onClick={() => setActiveView('booking')}
          className="inline-flex items-center gap-3 px-5 py-2.5 min-h-11 rounded-full border border-black/5 bg-white/80 backdrop-blur-md text-xs text-black/65 hover:border-black/10 hover:bg-white transition-all shadow-[0_4px_12px_rgba(0,0,0,0.03)]"
        >
          <span className="flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-neutral-500 animate-spin-slow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c-.105-.181-.233-.357-.382-.523M18.364 5.636a9 9 0 011.636 4.364M5.636 18.364A9 9 0 013 10a9 9 0 019-9m0 0v21m0-21h9" />
              <path d="M12 2a10 10 0 0110 10c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2zm0 2a8 8 0 100 16 8 8 0 000-16z" />
            </svg>
            <span>Get started with patient simulator</span>
          </span>
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-black/5 text-black">
            <ArrowRight className="w-3 h-3 transform -rotate-45" />
          </span>
        </button>
      </div>

      {/* Metrics Banner */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 border rounded-xl mt-16 divide-y md:divide-y-0 md:divide-x divide-black/5 border-black/5 max-w-4xl w-full bg-white overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.02)] animate-in fade-in slide-in-from-bottom-7 duration-1000">
        <div className="p-6 text-center hover:bg-neutral-50/50 transition-colors">
          <div className="font-mono text-3xl font-black text-black">{count1}M</div>
          <div className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 mt-2">Million Indian SMEs running on human memory</div>
        </div>
        <div className="p-6 text-center hover:bg-neutral-50/50 transition-colors">
          <div className="font-mono text-3xl font-black text-black">{count2}L</div>
          <div className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 mt-2">Lakh private clinics with no intelligence layer</div>
        </div>
        <div className="p-6 text-center hover:bg-neutral-50/50 transition-colors">
          <div className="font-mono text-3xl font-black text-black">{count3}</div>
          <div className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 mt-2">Days to see results — free trial</div>
        </div>
        <div className="p-6 text-center hover:bg-neutral-50/50 transition-colors">
          <div className="font-mono text-3xl font-black text-black">{count4}</div>
          <div className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 mt-2">Setup cost to get started</div>
        </div>
      </div>
    </section>
  );
}
