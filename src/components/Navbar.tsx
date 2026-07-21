import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, ChevronDown } from 'lucide-react';

interface NavbarProps {
  activeView: 'landing' | 'booking' | 'dashboard' | 'onboard' | 'privacy';
  setActiveView: (view: 'landing' | 'booking' | 'dashboard' | 'onboard' | 'privacy') => void;
}

export default function Navbar({ activeView, setActiveView }: NavbarProps) {
  const [scrambleText, setScrambleText] = useState('THRYVIX');
  const [mobMenuOpen, setMobMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<string | null>(null);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobMenuOpen]);

  // Scramble animation on logo hover
  const triggerScramble = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const original = 'THRYVIX';
    let iteration = 0;
    const interval = setInterval(() => {
      setScrambleText(
        original
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return original[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      iteration += 1 / 3;
      if (iteration >= original.length) {
        setScrambleText(original);
        clearInterval(interval);
      }
    }, 30);
  };

  const navLinks = [
    {
      label: 'Products',
      dropdown: ['THRYVIX Health', 'THRYVIX Commerce', 'THRYVIX Gov', 'THRYVIX Edu', 'THRYVIX Community', 'THRYVIX Finance'],
    },
    {
      label: 'Resources',
      dropdown: ['About', 'Careers', 'Blog'],
    },
    {
      label: 'Pricing',
      href: '#pricing',
    },
  ];

  // Maps dropdown items to the section id they should scroll to
  const dropdownScrollTargets: { [key: string]: string } = {
    'THRYVIX Health': 'clinic',
    'About': 'products',
    'Careers': 'footer',
    'Blog': 'blog',
  };

  const handleDropdownItemClick = (item: string) => {
    const targetId = dropdownScrollTargets[item];
    if (targetId) {
      setActiveView('landing');
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <>
      <nav className="fixed top-0 inset-x-0 border-b z-50 backdrop-blur-xl bg-white/95 border-black/5 text-neutral-900 flex flex-col">
      {/* Top Main Row */}
      <div className="h-16 flex items-center justify-between px-4 sm:px-6 md:px-12 w-full">
        {/* Logo with 4-point Star Icon */}
        <button
          onClick={() => {
            setActiveView('landing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onMouseEnter={triggerScramble}
          className="flex items-center gap-2 font-mono text-sm font-bold tracking-wider hover:opacity-80 transition-opacity flex-shrink-0"
        >
          <img src="/thryvixlogo.png" alt="THRYVIX" className="h-8 w-auto" />
        </button>

        {/* Desktop Links (Hover Dropdowns) */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-8 text-[11px] xl:text-xs font-mono tracking-widest uppercase flex-shrink-0">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {link.dropdown ? (
                <button className="flex items-center gap-1 text-black/50 hover:text-black transition-colors py-2">
                  {link.label} <ChevronDown className="w-3 h-3 transition-transform" />
                </button>
              ) : (
                <a
                  href={link.href}
                  className="text-black/50 hover:text-black transition-colors py-2"
                >
                  {link.label}
                </a>
              )}

              {/* Dropdown Card */}
              {link.dropdown && activeDropdown === link.label && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 mt-1 border rounded bg-white border-black/5 p-2 shadow-[0_8px_30px_rgb(0,0,0,0.06)] animate-in fade-in slide-in-from-top-1 duration-150">
                  {link.dropdown.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleDropdownItemClick(item)}
                      className="w-full text-left text-[11px] px-3 py-2 text-black/60 hover:text-black hover:bg-neutral-50 rounded transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Interactive Sandbox Navigation Selectors */}
        <div className="hidden md:flex items-center gap-1 xl:gap-2 border rounded-full p-1 border-black/5 bg-neutral-100/60 max-w-full flex-shrink-0">
          <button
            onClick={() => setActiveView('landing')}
            className={`px-2.5 xl:px-4 py-1.5 text-[9px] xl:text-[10px] uppercase tracking-wider font-mono rounded-full transition-all ${
              activeView === 'landing'
                ? 'bg-black text-white font-semibold shadow-sm'
                : 'text-black/50 hover:text-black'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveView('booking')}
            className={`px-2.5 xl:px-4 py-1.5 text-[9px] xl:text-[10px] uppercase tracking-wider font-mono rounded-full transition-all flex items-center gap-1 xl:gap-1.5 ${
              activeView === 'booking'
                ? 'bg-black text-white font-semibold shadow-sm'
                : 'text-black/50 hover:text-black'
            }`}
          >
            Booking <span className="text-[7px] xl:text-[8px] bg-emerald-500/10 text-emerald-600 px-1 py-0.5 rounded font-bold uppercase whitespace-nowrap">Live Demo</span>
          </button>
          <button
            onClick={() => setActiveView('dashboard')}
            className={`px-2.5 xl:px-4 py-1.5 text-[9px] xl:text-[10px] uppercase tracking-wider font-mono rounded-full transition-all ${
              activeView === 'dashboard'
                ? 'bg-black text-white font-semibold shadow-sm'
                : 'text-black/50 hover:text-black'
            }`}
          >
            Staff Portal
          </button>
          <button
            onClick={() => setActiveView('onboard')}
            className={`px-2.5 xl:px-4 py-1.5 text-[9px] xl:text-[10px] uppercase tracking-wider font-mono rounded-full transition-all ${
              activeView === 'onboard'
                ? 'bg-black text-white font-semibold shadow-sm'
                : 'text-black/50 hover:text-black'
            }`}
          >
            Onboard
          </button>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          {/* Demo Trigger Call to Action */}
          <button
            onClick={() => setActiveView('booking')}
            className="inline-flex items-center justify-center gap-1.5 font-sans text-xs tracking-wider uppercase bg-black text-white px-3.5 sm:px-5 min-h-11 rounded-full border border-black font-bold hover:bg-black/90 transition-all shadow-md active:scale-95"
          >
            <span className="sm:hidden">Book</span>
            <span className="hidden sm:inline">Try Booking</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobMenuOpen(!mobMenuOpen)}
            className="md:hidden min-w-11 min-h-11 flex items-center justify-center border rounded-full border-black/5 text-neutral-600 hover:bg-neutral-50 active:scale-95 transition-all"
          >
            {mobMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </nav>

    {/* Mobile Drawer Overlay / Backdrop */}
      {mobMenuOpen && (
        <div 
          onClick={() => setMobMenuOpen(false)}
          className="md:hidden fixed inset-0 bg-black/40 z-[99] transition-opacity animate-in fade-in duration-300"
        />
      )}

      {/* Mobile Drawer Panel */}
      {mobMenuOpen && (
        <div 
          className="md:hidden fixed inset-y-0 right-0 w-[320px] max-w-[85vw] h-full bg-white border-l border-neutral-200 z-[100] p-6 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300"
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-black/5 pb-4 flex-shrink-0">
            <div className="flex items-center gap-2 font-mono text-sm font-bold tracking-wider">
              <img src="/thryvixlogo.png" alt="THRYVIX" className="h-8 w-auto" />
            </div>
            <button
              onClick={() => setMobMenuOpen(false)}
              className="min-w-11 min-h-11 flex items-center justify-center border border-black/5 rounded-full text-neutral-500 hover:text-black hover:bg-neutral-50 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Navigation Area */}
          <div className="flex-1 min-h-0 overflow-y-auto py-4 space-y-6">
            {/* Section 1: Standard Nav Links */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-2 font-bold whitespace-nowrap">// Navigation</span>
              {navLinks.map((link) => (
                <div key={link.label} className="border-b border-black/5 pb-2">
                  {link.dropdown ? (
                    <div>
                      <button 
                        onClick={() => setMobileActiveDropdown(mobileActiveDropdown === link.label ? null : link.label)}
                        className="w-full flex items-center justify-between min-h-11 text-xs font-mono font-bold uppercase tracking-wider text-neutral-900 gap-2"
                      >
                        <span className="truncate">{link.label}</span>
                        <ChevronDown className={`w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200 ${mobileActiveDropdown === link.label ? 'rotate-180' : ''}`} />
                      </button>
                      {mobileActiveDropdown === link.label && (
                        <div className="mt-2 pl-3 flex flex-col gap-1.5 animate-in slide-in-from-top-1 duration-150">
                          {link.dropdown.map((item) => (
                            <button
                              key={item}
                              onClick={() => {
                                setMobMenuOpen(false);
                                handleDropdownItemClick(item);
                              }}
                              className="w-full text-left text-[11px] font-mono uppercase tracking-wider min-h-11 flex items-center text-neutral-500 hover:text-black transition-colors whitespace-normal break-words"
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <a
                      href={link.href}
                      onClick={() => setMobMenuOpen(false)}
                      className="flex items-center min-h-11 text-xs font-mono font-bold uppercase tracking-wider text-neutral-900 truncate"
                    >
                      {link.label}
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Section 2: Interactive Sandbox Navigation */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-2 font-bold whitespace-nowrap">// Interactive Sandbox</span>
              <button
                onClick={() => {
                  setActiveView('landing');
                  setMobMenuOpen(false);
                }}
                className={`w-full text-left min-h-11 flex items-center px-4 rounded-full text-xs uppercase tracking-wider font-mono transition-all truncate ${
                  activeView === 'landing' ? 'bg-black text-white font-bold shadow-sm' : 'text-neutral-500 hover:bg-neutral-50'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => {
                  setActiveView('booking');
                  setMobMenuOpen(false);
                }}
                className={`w-full text-left min-h-11 px-4 rounded-full text-xs uppercase tracking-wider font-mono transition-all flex items-center justify-between gap-2 ${
                  activeView === 'booking' ? 'bg-black text-white font-bold shadow-sm' : 'text-neutral-500 hover:bg-neutral-50'
                }`}
              >
                <span className="truncate">Booking</span>
                <span className={`text-[8px] px-1.5 py-0.5 rounded font-bold uppercase flex-shrink-0 ${activeView === 'booking' ? 'bg-white/20 text-white' : 'bg-emerald-500/10 text-emerald-600'}`}>Live Demo</span>
              </button>
              <button
                onClick={() => {
                  setActiveView('dashboard');
                  setMobMenuOpen(false);
                }}
                className={`w-full text-left min-h-11 flex items-center px-4 rounded-full text-xs uppercase tracking-wider font-mono transition-all truncate ${
                  activeView === 'dashboard' ? 'bg-black text-white font-bold shadow-sm' : 'text-neutral-500 hover:bg-neutral-50'
                }`}
              >
                Staff Portal
              </button>
              <button
                onClick={() => {
                  setActiveView('onboard');
                  setMobMenuOpen(false);
                }}
                className={`w-full text-left min-h-11 flex items-center px-4 rounded-full text-xs uppercase tracking-wider font-mono transition-all truncate ${
                  activeView === 'onboard' ? 'bg-black text-white font-bold shadow-sm' : 'text-neutral-500 hover:bg-neutral-50'
                }`}
              >
                Onboard Clinic
              </button>
            </div>
          </div>

          {/* Action Button at bottom */}
          <div className="border-t border-black/5 pt-4 flex-shrink-0">
            <button
              onClick={() => {
                setActiveView('booking');
                setMobMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 min-h-11 py-3 bg-black text-white text-xs font-sans tracking-wider uppercase font-bold rounded-full border border-black hover:bg-black/90 transition-all shadow-md active:scale-95"
            >
              <span>Try Booking</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
