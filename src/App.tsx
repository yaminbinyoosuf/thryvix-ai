import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BookingSimulator from './components/BookingSimulator';
import DashboardPreview from './components/DashboardPreview';
import OnboardingWizard from './components/OnboardingWizard';
import StickyFeatures from './components/StickyFeatures';
import OSGrid from './components/OSGrid';
import Blog from './components/Blog';
import FAQAccordion from './components/FAQAccordion';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import { Doctor, QueueItem, OnboardingData } from './types';
import { AlertTriangle, Sparkles, Activity, ShieldCheck, HeartPulse, ChevronRight, FileText } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<'landing' | 'booking' | 'dashboard' | 'onboard' | 'privacy'>('landing');

  // Initial Doctors List
  const [doctors, setDoctors] = useState<Doctor[]>([
    {
      id: 'doc-1',
      name: 'Dr. Anjana Dev',
      speciality: 'Dental',
      fee: 300,
      hoursStart: '09:00',
      hoursEnd: '13:00',
      days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat']
    },
    {
      id: 'doc-2',
      name: 'Dr. Sidharth Menon',
      speciality: 'General Medicine',
      fee: 200,
      hoursStart: '09:00',
      hoursEnd: '18:00',
      days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat']
    },
    {
      id: 'doc-3',
      name: 'Dr. Fatima Zahra',
      speciality: 'Skin / Dermatology',
      fee: 400,
      hoursStart: '14:00',
      hoursEnd: '18:00',
      days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat']
    }
  ]);

  // Initial Queue list to pre-populate the dashboard
  const [queue, setQueue] = useState<QueueItem[]>([
    {
      id: 'tx-194',
      patientName: 'Jishnu K.P.',
      patientPhone: '+91 94472 09485',
      doctorName: 'Dr. Anjana Dev',
      timeSlot: '09:30 AM',
      status: 'waiting',
      language: 'ml',
      timestamp: '09:12 AM',
      complaint: 'Severe Toothache & swelling on lower left jaw.',
      allergies: 'No known drug allergies.',
      history: 'Root canal treatment on upper molar 6 months ago.'
    },
    {
      id: 'tx-821',
      patientName: 'Aarif Al-Farsi',
      patientPhone: '+91 85939 12345',
      doctorName: 'Dr. Fatima Zahra',
      timeSlot: '11:00 AM',
      status: 'waiting',
      language: 'ar',
      timestamp: '10:05 AM',
      complaint: 'Skin allergy rash around wrists and back.',
      allergies: 'Penicillin allergy warning.',
      history: 'Suffered from eczema in childhood.'
    },
    {
      id: 'tx-043',
      patientName: 'Sara Elizabeth',
      patientPhone: '+91 98450 67890',
      doctorName: 'Dr. Sidharth Menon',
      timeSlot: '11:30 AM',
      status: 'waiting',
      language: 'en',
      timestamp: '10:20 AM',
      complaint: 'Running nose, dry cough and mild body aches since yesterday.',
      allergies: 'Lactose intolerance.',
      history: 'Regular checkups.'
    }
  ]);

  // Handle Light/Dark Mode HTML Tag update - Always remove dark class to force pristine light/white theme
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('dark');
  }, []);

  const handleAddQueueItem = (item: QueueItem) => {
    setQueue((prevQueue) => [item, ...prevQueue]);
  };

  const handleUpdateStatus = (id: string, status: QueueItem['status']) => {
    setQueue((prevQueue) =>
      prevQueue.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const handleCompleteOnboarding = (data: OnboardingData) => {
    if (data.doctors && data.doctors.length > 0) {
      setDoctors(data.doctors);
    }
    // Pre-populate clinic info alerts optionally
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-neutral-150">
      {/* Premium Floating Header */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
      />

      <main className="relative pt-16 font-sans">
        
        {/* LANDING PAGE ROUTE */}
        {activeView === 'landing' && (
          <div className="animate-in fade-in duration-300">
            {/* Hero Banner */}
            <Hero setActiveView={setActiveView} />

            {/* Trust Badges Compliance Row */}
            <section className="py-12 border-b border-neutral-100 bg-neutral-50/40 select-none">
              <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
                <div className="flex flex-col items-center justify-center space-y-1">
                  <ShieldCheck className="w-5 h-5 text-neutral-400" />
                  <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold">AWS Mumbai Server</span>
                  <p className="text-[10px] text-neutral-500 font-bold">Data stays in India</p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-1">
                  <Activity className="w-5 h-5 text-neutral-400" />
                  <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold">DPDP Act 2023</span>
                  <p className="text-[10px] text-neutral-500 font-bold">Privacy Compliant</p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-1">
                  <HeartPulse className="w-5 h-5 text-neutral-400" />
                  <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold">KSWIFT Reg</span>
                  <p className="text-[10px] text-neutral-500 font-bold">State Verified</p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-1">
                  <FileText className="w-5 h-5 text-neutral-400" />
                  <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold">MSME Registered</span>
                  <p className="text-[10px] text-neutral-500 font-bold">Govt Recognized</p>
                </div>
                <div className="col-span-2 md:col-span-1 flex flex-col items-center justify-center space-y-1">
                  <Sparkles className="w-5 h-5 text-neutral-400" />
                  <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold">Quick Setup</span>
                  <p className="text-[10px] text-neutral-500 font-bold">Live same day</p>
                </div>
              </div>
            </section>

            {/* Problem / Solution Grid Segment */}
            <section className="py-24 max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-b border-black/5 bg-white">
              <div className="lg:col-span-5 space-y-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 block mb-2">// The Problem</span>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-black leading-none">
                  Indian clinics<br />run on chaos.<br /><span className="text-neutral-400">THRYVIX ends that.</span>
                </h2>
                <p className="text-sm text-black/60 max-w-md mt-4 leading-relaxed font-sans font-medium">
                  63M businesses across India run on paper, phone calls, and guesswork. Missed calls equal missed patients, and no-shows eat up to ₹40,000+ monthly.
                </p>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 border border-black/5 rounded-2xl bg-neutral-50/30">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 font-bold">01 — Leakage</div>
                  <h4 className="font-black text-sm text-black mt-2">Missed Calls = Lost Income</h4>
                  <p className="text-xs text-black/60 mt-2 leading-relaxed">
                    30% of clinic calls go unanswered. Each missed call is a patient who walked to the next clinic instead.
                  </p>
                </div>
                <div className="p-6 border border-black/5 rounded-2xl bg-neutral-50/30">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 font-bold">02 — No Shows</div>
                  <h4 className="font-black text-sm text-black mt-2">No-Shows Kill Productivity</h4>
                  <p className="text-xs text-black/60 mt-2 leading-relaxed">
                    15-22% standard no-show rate. For a mid-size clinic, that equates to ₹40,000+ lost every single month.
                  </p>
                </div>
                <div className="p-6 border border-black/5 rounded-2xl bg-neutral-50/30">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 font-bold">03 — blind consulting</div>
                  <h4 className="font-black text-sm text-black mt-2">Doctors Walk In Blind</h4>
                  <p className="text-xs text-black/60 mt-2 leading-relaxed">
                    A simple name on a register. No medical history, no medication log, no allergies. Every consultation starts cold.
                  </p>
                </div>
                <div className="p-6 border border-black/5 rounded-2xl bg-neutral-50/30">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 font-bold">04 — poor localized fit</div>
                  <h4 className="font-black text-sm text-black mt-2">Legacy Apps Don't Fit</h4>
                  <p className="text-xs text-black/60 mt-2 leading-relaxed">
                    Existing systems cost ₹10k-₹25k monthly and weren't built for Malayalam reminders, WhatsApp briefs, or midnight bookings.
                  </p>
                </div>
              </div>
            </section>

            {/* Sticky Features Showcase Section */}
            <StickyFeatures />

            {/* Comprehensive Vertical OS Product Suite Grid */}
            <OSGrid />

            {/* Blog Section */}
            <Blog />

            {/* Premium Quote block */}
            <section className="py-24 bg-neutral-50 text-center relative overflow-hidden border-b border-black/5">
              <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-6">
                <span className="text-7xl font-serif text-neutral-200 leading-none">"</span>
                <p className="text-2xl sm:text-3xl md:text-4xl font-black text-neutral-950 tracking-tight leading-snug">
                  Every other system stops when the patient books.<br />THRYVIX starts there.
                </p>
                <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
                  — Built in Kerala. Thinking for India.
                </div>
              </div>
            </section>

            {/* Q&A Accordion */}
            <FAQAccordion />

            {/* Final Call To Action */}
            <section className="py-24 bg-neutral-50 text-center relative overflow-hidden border-b border-black/5">
              <div className="absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.1),transparent_80%)]" />
              <div className="max-w-3xl mx-auto px-6 relative z-10 space-y-6">
                <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 block mb-2 font-bold">// Ready to automate?</span>
                <h3 className="text-4xl md:text-6xl font-black tracking-tight leading-none text-black">
                  Your clinic.<br />Automated.
                </h3>
                <p className="text-sm text-black/60 max-w-sm mx-auto leading-relaxed font-medium">
                  Live in Kerala now. Try booking an appointment right now using the live patient interactive sandbox.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                  <button
                    onClick={() => setActiveView('booking')}
                    className="w-full sm:w-auto font-sans text-xs font-bold rounded-full bg-black text-white px-8 py-4 hover:bg-neutral-800 transition-colors shadow-md"
                  >
                    Launch Patient Demo Link
                  </button>
                  <button
                    onClick={() => setActiveView('onboard')}
                    className="w-full sm:w-auto font-sans text-xs font-bold rounded-full border border-black/10 text-black bg-black/5 px-8 py-4 hover:bg-black/10 transition-colors"
                  >
                    Onboard New Clinic
                  </button>
                </div>
              </div>
            </section>

            {/* Footer */}
            <Footer setActiveView={setActiveView} />
          </div>
        )}

        {/* INTERACTIVE PATIENT SIMULATOR VIEW */}
        {activeView === 'booking' && (
          <BookingSimulator
            doctors={doctors}
            onAddQueueItem={handleAddQueueItem}
            setActiveView={setActiveView}
          />
        )}

        {/* CLINIC STAFF/DOCTOR DASHBOARD VIEW */}
        {activeView === 'dashboard' && (
          <DashboardPreview
            queue={queue}
            onUpdateStatus={handleUpdateStatus}
          />
        )}

        {/* ONBOARDING CLINIC WIZARD VIEW */}
        {activeView === 'onboard' && (
          <OnboardingWizard onComplete={handleCompleteOnboarding} setActiveView={setActiveView} />
        )}

        {/* PRIVACY POLICY VIEW */}
        {activeView === 'privacy' && (
          <PrivacyPolicy setActiveView={setActiveView} />
        )}

      </main>
    </div>
  );
}
