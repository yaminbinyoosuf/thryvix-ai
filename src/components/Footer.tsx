import { Sparkles, Linkedin, Instagram, X, MessageCircle } from 'lucide-react';

interface FooterProps {
  setActiveView: (view: 'landing' | 'booking' | 'dashboard' | 'onboard' | 'privacy') => void;
}

export default function Footer({ setActiveView }: FooterProps) {
  return (
    <footer className="bg-neutral-50 text-neutral-600 text-xs border-t border-black/5">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Brand block */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-mono text-sm font-bold tracking-wider text-black select-none">
            <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="100" height="100" rx="22" fill="black" />
              <text x="50" y="68" fontFamily="Arial Black, sans-serif" fontSize="52" fontWeight="900" fill="white" textAnchor="middle">TX</text>
            </svg>
            <div className="flex items-center">
              <span>THRYVIX</span>
              <span className="text-neutral-400"> AI</span>
            </div>
          </div>
          <p className="text-[11px] leading-relaxed text-neutral-500">
            The operating system for organised human activity. Starting with clinics. Every industry follows.
          </p>
          <div className="flex flex-wrap gap-1.5 pt-2">
            {['KSWIFT', 'MSME', 'DPDP', 'AWS Mumbai'].map((badge) => (
              <span key={badge} className="font-mono text-[8px] tracking-wider uppercase border border-black/5 px-2 py-0.5 rounded-sm bg-neutral-100 text-neutral-500 font-bold">
                {badge}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 pt-2">
            <a
              href="https://linkedin.com/company/thryvixai"
              target="_blank"
              rel="noreferrer"
              aria-label="THRYVIX AI on LinkedIn"
              className="w-11 h-11 flex items-center justify-center rounded-full border border-black/5 text-neutral-500 hover:text-black hover:border-black/20 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com/thryvixai"
              target="_blank"
              rel="noreferrer"
              aria-label="THRYVIX AI on Instagram"
              className="w-11 h-11 flex items-center justify-center rounded-full border border-black/5 text-neutral-500 hover:text-black hover:border-black/20 transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://x.com/thryvixai"
              target="_blank"
              rel="noreferrer"
              aria-label="THRYVIX AI on X"
              className="w-11 h-11 flex items-center justify-center rounded-full border border-black/5 text-neutral-500 hover:text-black hover:border-black/20 transition-colors"
            >
              <X className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Product routes */}
        <div className="space-y-3">
          <h5 className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold">Products</h5>
          <ul className="space-y-1 text-[11px]">
            <li>
              <button onClick={() => setActiveView('landing')} className="block py-2 hover:text-black transition-colors font-semibold">
                THRYVIX Health — Live
              </button>
            </li>
            <li><span className="block py-2 text-neutral-300 select-none font-medium">Ecommerce OS</span></li>
            <li><span className="block py-2 text-neutral-300 select-none font-medium">Kirana OS</span></li>
            <li><span className="block py-2 text-neutral-300 select-none font-medium">Salon OS</span></li>
          </ul>
        </div>

        {/* Company information */}
        <div className="space-y-3">
          <h5 className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold">Company</h5>
          <ul className="space-y-1 text-[11px]">
            <li>
              <button
                onClick={() => {
                  document.getElementById('clinic')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="block py-2 hover:text-black transition-colors font-semibold"
              >
                Why THRYVIX
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="block py-2 hover:text-black transition-colors font-semibold"
              >
                FAQ Help
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveView('privacy')}
                className="block py-2 hover:text-black transition-colors font-semibold"
              >
                Privacy Policy
              </button>
            </li>
          </ul>
        </div>

        {/* Contact info */}
        <div className="space-y-3">
          <h5 className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold">Contact</h5>
          <ul className="space-y-1 text-[11px]">
            <li>
              <a
                href="https://wa.me/919061606343"
                target="_blank"
                rel="noreferrer"
                className="py-2 flex items-center gap-1.5 hover:text-black transition-colors font-semibold"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Chat with us
              </a>
            </li>
            <li>
              <a href="tel:+919061606343" className="block py-2 hover:text-black transition-colors font-semibold">
                +91 90616 06343
              </a>
            </li>
            <li>
              <a href="mailto:hello@thryvixai.com" className="block py-2 hover:text-black transition-colors font-semibold">
                hello@thryvixai.com
              </a>
            </li>
            <li className="block py-2 text-neutral-300">Kerala, India</li>
          </ul>
        </div>

      </div>

      {/* District index list */}
      <div className="max-w-6xl mx-auto px-6 py-4 border-t border-black/5 text-center select-none">
        <p className="font-mono text-[8px] text-neutral-400 leading-relaxed uppercase tracking-wider font-medium">
          Clinic Management Software Kerala · Kozhikode · Malappuram · Thrissur · Kochi · Calicut · Tirur · Manjeri · Perinthalmanna · Palakkad · Kannur · Kasaragod · Thiruvananthapuram · All Kerala Districts
        </p>
      </div>

      {/* Operational parameters */}
      <div className="max-w-6xl mx-auto px-6 py-6 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-mono text-[9px] text-neutral-400 uppercase font-bold">
          THRYVIX AI © 2026 · Kerala, India
        </span>
        <span className="font-mono text-[9px] text-neutral-400 uppercase">
          AI Operating System
        </span>
      </div>
    </footer>
  );
}
