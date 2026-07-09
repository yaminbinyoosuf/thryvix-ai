import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function FAQAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Does THRYVIX work in Malayalam?',
      a: 'Yes. THRYVIX is built Malayalam-first. All patient communication, booking flows and reminders work in Malayalam, Arabic and English — automatically detected from the first message.'
    },
    {
      q: 'Do patients need to download an app?',
      a: 'No. Patients open your clinic booking page in their browser — no app download, no login, no new interface. After booking, THRYVIX automatically sends a confirmation and reminder.'
    },
    {
      q: 'How long does it take to go live?',
      a: 'Most clinics are live within 10 minutes. Zero IT setup required from your side. THRYVIX handles the entire configuration — booking page setup, scheduling, and testing. Your patients can start booking immediately.'
    },
    {
      q: 'Which clinics in Kerala does THRYVIX serve?',
      a: 'THRYVIX serves clinics across all of Kerala — Kozhikode, Malappuram, Thrissur, Kochi, Tirur, Manjeri, Perinthalmanna, Palakkad, Kannur, Kasaragod, and Thiruvananthapuram.'
    },
    {
      q: 'What types of clinics use THRYVIX?',
      a: 'THRYVIX works for all private clinics — dental, general medicine, specialist, Ayurvedic, diagnostic labs, physiotherapy, skin clinics and multi-specialty clinics across Kerala.'
    }
  ];

  return (
    <section id="faq" className="py-24 bg-neutral-50/20 border-b border-black/5">
      <div className="max-w-3xl mx-auto px-6">
        <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 block text-center mb-3">
          // FAQ
        </span>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-black text-center leading-none">
          Questions doctors<br />ask us most.
        </h2>

        {/* Collapsible Lists */}
        <div className="mt-12 border-t border-black/5 divide-y divide-black/5">
          {faqs.map((item, index) => {
            const isOpen = openIdx === index;
            return (
              <div key={index} className="py-4">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : index)}
                  className="w-full flex items-center justify-between text-left min-h-11 py-2 group focus:outline-none"
                >
                  <span className="font-bold text-sm sm:text-base text-black group-hover:text-black/80 transition-colors">
                    {item.q}
                  </span>
                  <span className="p-1.5 border rounded-full border-black/5 text-neutral-400 group-hover:text-black transition-colors">
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </span>
                </button>
                
                {isOpen && (
                  <div className="text-xs sm:text-sm text-black/65 leading-relaxed pr-8 pb-4 pt-2 animate-in fade-in slide-in-from-top-1 duration-200">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
