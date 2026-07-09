import React, { useState } from 'react';
import { Doctor, QueueItem } from '../types';
import { CheckCircle, Phone, Globe, Calendar, Clock, Sparkles, Send, RefreshCw } from 'lucide-react';

interface BookingSimulatorProps {
  doctors: Doctor[];
  onAddQueueItem: (item: QueueItem) => void;
  setActiveView: (view: 'landing' | 'booking' | 'dashboard' | 'onboard') => void;
}

export default function BookingSimulator({ doctors, onAddQueueItem, setActiveView }: BookingSimulatorProps) {
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(doctors[0]?.name || '');
  const [complaint, setComplaint] = useState('');
  const [language, setLanguage] = useState<'ml' | 'en' | 'ar'>('en');
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM');
  const [isBooked, setIsBooked] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<QueueItem | null>(null);

  const slots = ['09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '02:30 PM', '03:00 PM', '03:30 PM'];

  const getDoctorFee = () => {
    const doc = doctors.find(d => d.name === selectedDoctor);
    return doc ? doc.fee : 200;
  };

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !patientPhone.trim()) return;

    const newBooking: QueueItem = {
      id: 'tx-' + Math.random().toString(36).substring(2, 7),
      patientName: patientName.trim(),
      patientPhone: '+91 ' + patientPhone.trim(),
      doctorName: selectedDoctor,
      timeSlot: selectedSlot,
      status: 'waiting',
      language,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      complaint: complaint.trim() || 'General Checkup',
      allergies: 'No known allergies',
      history: 'First time visiting'
    };

    onAddQueueItem(newBooking);
    setCurrentBooking(newBooking);
    setIsBooked(true);
  };

  const getLocalizedWhatsAppMessage = () => {
    const docName = selectedDoctor;
    const time = selectedSlot;
    if (language === 'ml') {
      return `ഹലോ ${patientName || 'രോഗി'}, നിങ്ങളുടെ അപ്പോയിന്റ്മെന്റ് സ്ഥിരീകരിച്ചു! ✅\n\n🏥 ക്ലിനിക്ക്: THRYVIX ഹെൽത്ത്\n👨‍⚕️ ഡോക്ടർ: ${docName}\n⏰ സമയം: ${time}\n\nക്യൂ നില തത്സമയം അറിയാൻ ഈ ലിങ്ക് ഉപയോഗിക്കുക: https://live.thryvixai.com/q/${currentBooking?.id || 't92b'}\n\nTHRYVIX AI വഴി ഓട്ടോമേറ്റ് ചെയ്തത്.`;
    }
    if (language === 'ar') {
      return `مرحباً ${patientName || 'المريض'}، تم تأكيد موعدك بنجاح! ✅\n\n🏥 العيادة: ثريفيكس هيلث\n👨‍⚕️ الطبيب: ${docName}\n⏰ الوقت: ${time}\n\nلمتابعة طابور الانتظار المباشر: https://live.thryvixai.com/q/${currentBooking?.id || 't92b'}\n\nبواسطة ثريفيكس ذكاء اصطناعي.`;
    }
    return `Hello ${patientName || 'Patient'}, your appointment has been confirmed! ✅\n\n🏥 Clinic: THRYVIX Health\n👨‍⚕️ Doctor: ${docName}\n⏰ Time: ${time}\n\nTrack your live queue position here: https://live.thryvixai.com/q/${currentBooking?.id || 't92b'}\n\nAutomated by THRYVIX AI.`;
  };

  const handleReset = () => {
    setPatientName('');
    setPatientPhone('');
    setComplaint('');
    setIsBooked(false);
    setCurrentBooking(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
      {/* Upper header */}
      <div className="mb-12 text-center">
        <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-2">// Patient Interface Sandbox</span>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-black">90-Second Patient Booking</h2>
        <p className="text-sm text-black/60 max-w-lg mx-auto mt-3 leading-relaxed">
          Experience exactly how a patient books an appointment in Kozhikode or Malappuram under 90 seconds. No login, no app required.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Hand: The Booking Form Card */}
        <div className="lg:col-span-7 bg-white border border-black/5 p-6 md:p-8 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
          {!isBooked ? (
            <form onSubmit={handleBook} className="space-y-6">
              <div className="flex items-center justify-between border-b pb-4 border-black/5">
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-black" />
                  Fill Clinic Slip
                </span>
                <span className="text-xs font-mono text-neutral-400">Step 1 of 1</span>
              </div>

              {/* Language toggler */}
              <div>
                <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400 mb-2.5 font-bold">
                  Preferred Communication Language
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'ml', name: 'മലയാളം' },
                    { id: 'en', name: 'English' },
                    { id: 'ar', name: 'العربية' }
                  ].map((lang) => (
                    <button
                      key={lang.id}
                      type="button"
                      onClick={() => setLanguage(lang.id as 'ml' | 'en' | 'ar')}
                      className={`py-2.5 px-3 text-xs font-semibold rounded-lg border transition-all ${
                        language === lang.id
                          ? 'border-black bg-black text-white font-semibold'
                          : 'border-black/5 bg-neutral-50/50 hover:border-black/10 hover:bg-neutral-50 text-black/60'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Patient Name */}
              <div>
                <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400 mb-2 font-bold">
                  Patient Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter patient full name"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full bg-neutral-50/60 border border-black/5 p-3.5 text-sm rounded-xl focus:border-black focus:bg-white outline-none transition-all"
                />
              </div>

              {/* Phone and Complaint */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400 mb-2 font-bold">
                    WhatsApp Phone Number *
                  </label>
                  <div className="flex">
                    <span className="bg-neutral-100/80 text-black/60 px-3.5 py-3 border border-r-0 border-black/5 text-xs font-mono rounded-l-xl flex items-center">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      placeholder="90616 06343"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value.replace(/\D/g, '').substring(0, 10))}
                      className="w-full bg-neutral-50/60 border border-black/5 p-3.5 text-sm rounded-r-xl focus:border-black focus:bg-white outline-none transition-all font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400 mb-2 font-bold">
                    Consultation Complaint / Notes
                  </label>
                  <input
                    type="text"
                    placeholder="E.g. Toothache, Regular Fever"
                    value={complaint}
                    onChange={(e) => setComplaint(e.target.value)}
                    className="w-full bg-neutral-50/60 border border-black/5 p-3.5 text-sm rounded-xl focus:border-black focus:bg-white outline-none transition-all"
                  />
                </div>
              </div>

              {/* Doctor Selection */}
              <div>
                <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400 mb-2.5 font-bold">
                  Select Specialist Doctor *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {doctors.map((doc) => (
                    <button
                      key={doc.id}
                      type="button"
                      onClick={() => setSelectedDoctor(doc.name)}
                      className={`p-4 border text-left rounded-xl transition-all flex flex-col justify-between ${
                        selectedDoctor === doc.name
                          ? 'border-black bg-neutral-50/60'
                          : 'border-black/5 hover:bg-neutral-50/60'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-xs text-black leading-tight">{doc.name}</div>
                        <div className="text-[10px] text-neutral-400 mt-1 uppercase font-mono">{doc.speciality}</div>
                      </div>
                      <div className="text-xs font-mono font-bold text-black/70 mt-3">
                        ₹{doc.fee}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Slots Selection */}
              <div>
                <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400 mb-2 font-bold">
                  Pick Available Time Slot
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {slots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2.5 text-[11px] font-mono border rounded-lg transition-all ${
                        selectedSlot === slot
                          ? 'border-black bg-black text-white font-semibold'
                          : 'border-black/5 bg-neutral-50/50 hover:border-black/10 text-black/70'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Confirm Button */}
              <button
                type="submit"
                className="w-full bg-black text-white rounded-full font-sans py-4 text-xs tracking-wider uppercase font-bold hover:bg-neutral-900 transition-all shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] active:scale-[0.99] duration-200"
              >
                Book Appointment (Under 90 Seconds)
              </button>
            </form>
          ) : (
            <div className="text-center py-10 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100 animate-bounce">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-black">Appointment Secured!</h3>
              <p className="text-sm text-black/60 max-w-sm mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-black">{patientName}</span>. Your booking slip has been compiled, stored in India, and dispatched.
              </p>

              {/* Highlight dynamic loop */}
              <div className="border p-4 bg-neutral-50/50 border-black/5 text-xs text-left space-y-2 rounded-xl">
                <div className="font-semibold uppercase text-[9px] text-neutral-400 font-mono flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-emerald-500" />
                  Live Dynamic Link
                </div>
                <p className="text-black/60">
                  This patient was automatically pushed to the <strong>Staff Portal Dashboard Queue</strong>.
                </p>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setActiveView('dashboard')}
                    className="bg-black text-white px-4 py-2 rounded-full font-sans text-[11px] font-bold tracking-wider uppercase shadow-sm"
                  >
                    View Staff Portal →
                  </button>
                  <button
                    onClick={handleReset}
                    className="border border-black/10 hover:bg-neutral-50 px-4 py-2 rounded-full font-sans text-[11px] font-bold tracking-wider uppercase text-black/60"
                  >
                    Book Another
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Hand: The Mock WhatsApp Smartphone Simulator */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-[310px] h-[580px] bg-neutral-950 rounded-[40px] border-[8px] border-neutral-800 shadow-2xl relative overflow-hidden flex flex-col ring-1 ring-neutral-700/30">
            {/* Phone Speaker/Camera notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-neutral-950 rounded-b-2xl z-30 flex items-center justify-center">
              <div className="w-12 h-1 bg-neutral-800 rounded-full" />
            </div>

            {/* Phone Header */}
            <div className="bg-[#075e54] text-white px-4 pt-8 pb-3 flex items-center gap-2 select-none relative z-10">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold font-mono">
                TX
              </div>
              <div>
                <div className="text-[11px] font-bold">THRYVIX Reminders</div>
                <div className="text-[8px] text-emerald-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Verified Business Bot
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 bg-[#ece5dd] p-3 overflow-y-auto space-y-3 flex flex-col justify-end">
              {/* Previous Mock Context message */}
              <div className="bg-white text-neutral-800 p-2.5 rounded-lg shadow-sm text-[10px] leading-relaxed max-w-[85%] self-start relative border border-neutral-200/50">
                Welcome to THRYVIX Clinic OS. All booking receipts and queue numbers will arrive here automatically.
                <span className="block text-right text-[8px] text-neutral-400 mt-1">09:00 AM</span>
              </div>

              {/* Dynamic Incoming Live Slip Message */}
              {isBooked && (
                <div className="bg-[#dcf8c6] text-neutral-800 p-2.5 rounded-lg shadow-sm text-[10.5px] leading-relaxed max-w-[85%] self-start relative border border-emerald-200/30 animate-in slide-in-from-bottom-2 duration-300">
                  <div className="font-mono text-[8px] font-bold text-emerald-700 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    New Booking Receipt
                  </div>
                  <p className="whitespace-pre-line font-sans">{getLocalizedWhatsAppMessage()}</p>
                  <span className="block text-right text-[8px] text-neutral-400 mt-1">{currentBooking?.timestamp}</span>
                </div>
              )}

              {!isBooked && (
                <div className="flex flex-col items-center justify-center flex-1 opacity-40 select-none pb-12">
                  <Phone className="w-10 h-10 text-neutral-400 animate-pulse mb-2" />
                  <p className="text-[10px] font-mono tracking-widest text-neutral-500 text-center uppercase">
                    Awaiting Booking...
                  </p>
                </div>
              )}
            </div>

            {/* Phone Footer Input bar */}
            <div className="bg-[#f4f4f4] p-2.5 flex items-center gap-2 border-t border-neutral-200">
              <input
                disabled
                placeholder="Reply stopped by sandbox..."
                className="flex-1 bg-white border border-neutral-200 rounded-full px-3 py-1.5 text-[10px] focus:outline-none text-neutral-400"
              />
              <button disabled className="p-1.5 rounded-full bg-[#075e54] text-white opacity-40">
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
