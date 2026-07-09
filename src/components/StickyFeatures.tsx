import { useState } from 'react';
import { Calendar, Heart, Layers, Activity, FileSpreadsheet, BellRing, CreditCard, BarChart4, ClipboardList, Sparkles } from 'lucide-react';

export default function StickyFeatures() {
  const [activeIdx, setActiveIdx] = useState(0);

  const features = [
    {
      num: '01',
      title: 'Online Booking Page',
      desc: 'Your clinic gets a unique booking URL and QR code. Patients open it in any browser, pick their doctor and slot, and confirm in under 2 minutes. No app needed. No missed calls.',
      icon: <Calendar className="w-5 h-5 text-black" />,
      tag: 'Live Now'
    },
    {
      num: '02',
      title: 'Patient Health IDs',
      desc: 'Every patient gets a unique THX Health ID. Full history, records, and bookings under one permanent identity — accessible in seconds.',
      icon: <Heart className="w-5 h-5 text-black" />,
      tag: 'Live Now'
    },
    {
      num: '03',
      title: 'Live Queue Management',
      desc: 'Patients join from home. Staff sees real-time queue. Position updates sent automatically. Your waiting room stays calm.',
      icon: <Layers className="w-5 h-5 text-black" />,
      tag: 'Live Now'
    },
    {
      num: '04',
      title: 'AI Doctor Brief',
      desc: 'Before the patient arrives, the doctor gets a full summary — history, allergies, last complaint, medications. Every consultation starts with full context.',
      icon: <Sparkles className="w-5 h-5 text-black" />,
      tag: 'AI Feature'
    },
    {
      num: '05',
      title: 'Electronic Medical Records',
      desc: 'Prescriptions, lab results, visit notes — all linked to patient Health ID. Full history retrievable in under 3 seconds.',
      icon: <ClipboardList className="w-5 h-5 text-black" />,
      tag: 'Coming Soon'
    },
    {
      num: '06',
      title: 'Smart Reminders',
      desc: 'Appointment reminders 24 hours before. Follow-up after visit. Review requests at exactly the right moment. All automated, zero manual effort.',
      icon: <BellRing className="w-5 h-5 text-black" />,
      tag: 'Live Now'
    },
    {
      num: '07',
      title: 'Online Payment',
      desc: 'Payment link sent after booking. Patient pays via UPI. Invoice auto-generated and delivered instantly. Zero paperwork.',
      icon: <CreditCard className="w-5 h-5 text-black" />,
      tag: 'Coming Soon'
    },
    {
      num: '08',
      title: 'Analytics Dashboard',
      desc: 'Daily, weekly, monthly revenue and queue reports delivered to the clinic owner every morning before the first patient arrives.',
      icon: <BarChart4 className="w-5 h-5 text-black" />,
      tag: 'Live Now'
    },
    {
      num: '09',
      title: 'Multi-Doctor Scheduling',
      desc: 'Separate schedules per doctor. Patients choose their doctor. Slot availability managed automatically — no conflicts, no double bookings.',
      icon: <FileSpreadsheet className="w-5 h-5 text-black" />,
      tag: 'Live Now'
    }
  ];

  return (
    <section id="clinic" className="border-t border-b border-black/5 bg-neutral-50/20 py-20">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Hand: Sticky Panel Detail Showcase */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6 bg-white border p-6 md:p-8 rounded-2xl border-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
          <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">// THRYVIX Health Features</span>
          
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-black">{features[activeIdx].num}</span>
            <span className="text-black/20">/</span>
            <span className="text-neutral-400 font-mono">09</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[9px] font-mono tracking-widest uppercase border-black/5 text-neutral-500 bg-neutral-50/50">
            {features[activeIdx].tag}
          </div>

          <h3 className="text-3xl font-black text-black tracking-tight leading-none animate-in fade-in duration-200" key={features[activeIdx].title}>
            {features[activeIdx].title}
          </h3>

          <p className="text-sm text-black/65 leading-relaxed font-sans animate-in fade-in duration-200" key={features[activeIdx].desc}>
            {features[activeIdx].desc}
          </p>

          {/* Animated Progress bar line */}
          <div className="h-1 bg-neutral-100 w-full rounded-full overflow-hidden">
            <div
              className="h-full bg-black rounded-full transition-all duration-300"
              style={{ width: `${((activeIdx + 1) / 9) * 100}%` }}
            />
          </div>
        </div>

        {/* Right Hand: Actionable Scrolling Feature Lists */}
        <div className="lg:col-span-7 space-y-4">
          {features.map((feat, index) => (
            <button
              key={feat.num}
              onClick={() => setActiveIdx(index)}
              className={`w-full text-left p-6 border rounded-2xl transition-all flex items-start gap-4 hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(0,0,0,0.01)] ${
                activeIdx === index
                  ? 'border-black bg-white shadow-[0_8px_30px_rgba(0,0,0,0.03)]'
                  : 'border-black/5 bg-white/50 hover:bg-white'
              }`}
            >
              <div className={`p-3 border rounded-xl transition-all ${activeIdx === index ? 'border-black' : 'border-black/5 bg-neutral-50/50'}`}>
                {feat.icon}
              </div>
              <div className="flex-1">
                <div className="font-bold text-sm text-black flex items-center gap-2">
                  <span>{feat.title}</span>
                  <span className="font-mono text-[10px] text-neutral-400 font-normal">({feat.num})</span>
                </div>
                <p className="text-xs text-black/60 mt-2 leading-relaxed">
                  {feat.desc.substring(0, 110)}...
                </p>
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
