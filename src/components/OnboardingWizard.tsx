import { useState, useRef } from 'react';
import { OnboardingData, Doctor } from '../types';
import { 
  Sparkles, 
  Check, 
  ArrowRight, 
  UserPlus, 
  Trash, 
  ChevronLeft, 
  Calendar, 
  FileText, 
  Upload, 
  Plus, 
  Minus, 
  Clock, 
  Info, 
  Clipboard, 
  Download, 
  Printer, 
  ShieldCheck, 
  HeartPulse, 
  Globe, 
  CheckCircle,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

interface OnboardingWizardProps {
  onComplete: (data: OnboardingData) => void;
  setActiveView?: (view: 'landing' | 'booking' | 'dashboard' | 'onboard' | 'privacy') => void;
}

export default function OnboardingWizard({ onComplete, setActiveView }: OnboardingWizardProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- STEP 1: Basic Info States ---
  const [clinicName, setClinicName] = useState('');
  const [clinicType, setClinicType] = useState('Multispeciality');
  const [addressLine1, setAddressLine1] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('Kozhikode');
  const [pincode, setPincode] = useState('');
  const [googleMapsLink, setGoogleMapsLink] = useState('');
  const [clinicPhone, setClinicPhone] = useState('');
  const [whatsAppNumber, setWhatsAppNumber] = useState('');
  const [whatsAppSameAsClinic, setWhatsAppSameAsClinic] = useState(false);
  const [ownerWhatsApp, setOwnerWhatsApp] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [website, setWebsite] = useState('');
  const [ownerEmail, setOwnerEmail] = useState(''); // useful for portal login

  // --- STEP 2: Clinic Timings States ---
  const [workingDays, setWorkingDays] = useState<string[]>(['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']);
  const [openingTime, setOpeningTime] = useState('09:00');
  const [closingTime, setClosingTime] = useState('18:00');
  const [lunchBreak, setLunchBreak] = useState(false);
  const [lunchStart, setLunchStart] = useState('13:00');
  const [lunchEnd, setLunchEnd] = useState('14:00');
  const [holidayNote, setHolidayNote] = useState('');
  const [avgConsultationTime, setAvgConsultationTime] = useState(7);

  // --- STEP 3: Doctors States ---
  const [doctors, setDoctors] = useState<Doctor[]>([
    {
      id: 'doc-1',
      name: 'Dr. Mohammed Ashraf',
      speciality: 'General Medicine',
      qualifications: 'MBBS, MD',
      fee: 200,
      workingDaysSameAsClinic: true,
      days: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
      hoursStart: '09:00',
      hoursEnd: '18:00',
      photo: '',
      languages: ['Malayalam', 'English']
    }
  ]);

  const [activeDoctorIdx, setActiveDoctorIdx] = useState<number>(0);
  const [customSpecialities, setCustomSpecialities] = useState<{ [key: number]: string }>({});

  // --- STEP 4: Branding States ---
  const [clinicLogo, setClinicLogo] = useState<string>('');
  const [clinicPhotos, setClinicPhotos] = useState<string[]>([]);
  const [primaryLanguage, setPrimaryLanguage] = useState<'ml' | 'en' | 'ar'>('ml');
  const [googleReviewLink, setGoogleReviewLink] = useState('');

  // Drag and Drop States
  const [dragOverLogo, setDragOverLogo] = useState(false);
  const [dragOverPhotos, setDragOverPhotos] = useState(false);

  // --- STEP 5: Review & Submit Checkboxes ---
  const [confirmAccurate, setConfirmAccurate] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // --- SUCCESS STATE ---
  const [submitError, setSubmitError] = useState('');

  // References for file uploads
  const logoInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const doctorPhotoRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  // Districts of Kerala
  const keralaDistricts = [
    'Thiruvananthapuram', 'Kollam', 'Pathanamthitta', 'Alappuzha', 'Kottayam',
    'Idukki', 'Ernakulam', 'Thrissur', 'Palakkad', 'Malappuram', 'Kozhikode',
    'Wayanad', 'Kannur', 'Kasaragod',
    'Bangalore Urban', 'Bangalore Rural', 'Mysuru', 'Tumkuru', 'Belagavi',
    'Hubli-Dharwad', 'Mangaluru', 'Shivamogga', 'Kalaburagi', 'Davangere',
    'Ballari', 'Vijayapura', 'Raichur', 'Hassan', 'Udupi', 'Kodagu',
    'Chikkamagaluru', 'Chitradurga', 'Bidar', 'Gadag', 'Koppal',
    'Ramanagara', 'Chamarajanagara', 'Mandya', 'Haveri', 'Bagalkot',
    'Yadgir', 'Chikkaballapura', 'Kolar', 'Dharwad'
  ];

  // Clinic Types dropdown list
  const clinicTypes = [
    'General Practice', 'Multispeciality', 'Dental', 'Gynaecology & IVF', 
    'Paediatrics', 'Dermatology', 'Orthopaedics', 'Eye Clinic', 'ENT', 
    'Ayurveda / Homeopathy', 'Other'
  ];

  // Doctor Specialities
  const doctorSpecialities = [
    'General Medicine', 'Gynaecology', 'Paediatrics', 'Dermatology', 
    'Cardiology', 'Orthopaedics', 'Dentistry', 'ENT', 'Ophthalmology', 
    'Neurology', 'Psychiatry', 'Radiology', 'Anaesthesiology', 'Other (type custom)'
  ];

  const availableLanguages = ['Malayalam', 'English', 'Arabic', 'Hindi', 'Tamil'];
  const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  // --- Validation Helpers ---
  const isStep1Valid = () => {
    return (
      clinicName.trim() !== '' &&
      clinicType !== '' &&
      addressLine1.trim() !== '' &&
      city.trim() !== '' &&
      district !== '' &&
      /^\d{6}$/.test(pincode) &&
      clinicPhone.trim() !== '' &&
      whatsAppNumber.trim() !== '' &&
      ownerWhatsApp.trim() !== '' &&
      ownerName.trim() !== '' &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ownerEmail.trim())
    );
  };

  const isStep2Valid = () => {
    return workingDays.length > 0 && openingTime !== '' && closingTime !== '';
  };

  const isStep3Valid = () => {
    return doctors.length > 0 && doctors.every(d => d.name.trim() !== '' && d.speciality !== '' && d.fee > 0);
  };

  const isStep4Valid = () => {
    return primaryLanguage !== undefined;
  };

  const isStep5Valid = () => {
    return confirmAccurate && agreeTerms;
  };

  // --- Dynamic Doctor CRUD Handlers ---
  const handleAddDoctor = () => {
    if (doctors.length >= 10) return;
    const newDoc: Doctor = {
      id: `doc-${Date.now()}`,
      name: '',
      speciality: 'General Medicine',
      qualifications: '',
      fee: 200,
      workingDaysSameAsClinic: true,
      days: [...workingDays],
      hoursStart: openingTime,
      hoursEnd: closingTime,
      photo: '',
      languages: ['Malayalam', 'English']
    };
    setDoctors([...doctors, newDoc]);
    setActiveDoctorIdx(doctors.length);
  };

  const handleUpdateDoctor = (index: number, key: keyof Doctor, value: any) => {
    const list = [...doctors];
    list[index] = { ...list[index], [key]: value };
    setDoctors(list);
  };

  const handleRemoveDoctor = (index: number) => {
    if (doctors.length <= 1) return;
    const list = doctors.filter((_, i) => i !== index);
    setDoctors(list);
    setActiveDoctorIdx(Math.max(0, index - 1));
  };

  // --- File Upload Base64 Handlers ---
  const handleLogoUpload = (file: File) => {
    if (file.size > 2 * 1024 * 1024) {
      alert("Clinic logo exceeds 2MB limit.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) setClinicLogo(e.target.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handlePhotosUpload = (files: FileList) => {
    const remainingSlots = 5 - clinicPhotos.length;
    if (remainingSlots <= 0) return;

    const filesToUpload = Array.from(files).slice(0, remainingSlots);
    filesToUpload.forEach(file => {
      if (file.size > 2 * 1024 * 1024) {
        alert(`${file.name} exceeds 2MB limit.`);
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setClinicPhotos(prev => [...prev, e.target?.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDoctorPhotoUpload = (index: number, file: File) => {
    if (file.size > 2 * 1024 * 1024) {
      alert("Doctor photo exceeds 2MB limit.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        handleUpdateDoctor(index, 'photo', e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const reorderPhotos = (index: number, direction: 'left' | 'right') => {
    if (direction === 'left' && index === 0) return;
    if (direction === 'right' && index === clinicPhotos.length - 1) return;

    const newPhotos = [...clinicPhotos];
    const swapTarget = direction === 'left' ? index - 1 : index + 1;
    const temp = newPhotos[index];
    newPhotos[index] = newPhotos[swapTarget];
    newPhotos[swapTarget] = temp;
    setClinicPhotos(newPhotos);
  };

  // --- Submit Handler: Connects to the live THRYVIX onboarding API ---
  const handleSubmit = async () => {
    if (!isStep5Valid()) return;
    setIsSubmitting(true);
    setSubmitError('');

    const doctorsPayload = doctors.map(doc => ({
      ...doc,
      // Override with custom specialization if applicable
      speciality: doc.speciality === 'Other (type custom)'
        ? (customSpecialities[doctors.indexOf(doc)] || 'General Specialist')
        : doc.speciality
    }));

    const requestBody = {
      clinic_name: clinicName,
      clinic_type: clinicType,
      address: `${addressLine1}, ${city}`,
      district,
      pincode,
      phone: clinicPhone,
      whatsapp_number: whatsAppNumber,
      owner_whatsapp: ownerWhatsApp,
      owner_name: ownerName,
      owner_email: ownerEmail,
      website,
      google_maps_link: googleMapsLink,
      doctors: doctorsPayload,
      opening_time: openingTime,
      closing_time: closingTime,
      working_days: workingDays,
      bot_language: primaryLanguage || 'en'
    };

    try {
      const response = await fetch('https://api.thryvixai.com/onboarding/complete-direct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        let message = 'Something went wrong while setting up your clinic. Please try again.';
        try {
          const errorBody = await response.json();
          if (errorBody?.message) message = errorBody.message;
        } catch {
          // response had no JSON body; keep default message
        }
        setSubmitError(message);
        return;
      }

      await response.json();

      const onboardingPayload: OnboardingData = {
        clinicName,
        clinicType,
        addressLine1,
        city,
        district,
        pincode,
        googleMapsLink,
        clinicPhone,
        whatsAppNumber,
        ownerWhatsApp,
        ownerName,
        website,
        workingDays,
        openingTime,
        closingTime,
        lunchBreak,
        lunchStart: lunchBreak ? lunchStart : undefined,
        lunchEnd: lunchBreak ? lunchEnd : undefined,
        holidayNote,
        avgConsultationTime,
        doctors: doctorsPayload,
        clinicLogo,
        clinicPhotos,
        language: primaryLanguage,
        googleReviewLink
      };

      onComplete(onboardingPayload);
      setStep(6); // Trigger success screen
    } catch (err) {
      setSubmitError('Could not reach THRYVIX servers. Check your connection and try again — your details have been kept.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
      {/* Wizard Progress Indicator */}
      <div className="flex items-center justify-start sm:justify-between overflow-x-auto gap-1 mb-12 select-none pb-4 border-b border-black/5">
        {[
          { num: 1, label: 'Basic Info' },
          { num: 2, label: 'Timings' },
          { num: 3, label: 'Doctors' },
          { num: 4, label: 'Branding' },
          { num: 5, label: 'Review' }
        ].map((item) => (
          <div key={item.num} className="flex items-center gap-1.5 flex-shrink-0">
            <span
              className={`w-6 h-6 rounded-full border flex items-center justify-center font-mono text-[10px] font-bold transition-all ${
                step >= item.num
                  ? 'bg-black text-white border-black'
                  : 'border-neutral-200 text-neutral-400'
              }`}
            >
              {step > item.num ? '✓' : item.num}
            </span>
            <span className={`text-[10px] font-mono tracking-wider uppercase font-bold ${step === item.num ? 'text-black' : 'text-neutral-400'}`}>
              {item.label}
            </span>
            {item.num < 5 && <span className="text-neutral-200 mx-1">/</span>}
          </div>
        ))}
      </div>

      {/* STEP 1: Basic Info Form */}
      {step === 1 && (
        <div className="space-y-6 animate-in fade-in duration-200 bg-white border border-black/5 p-6 md:p-10 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.01)]">
          <div>
            <span className="text-[9px] text-neutral-400 font-mono uppercase tracking-widest block mb-1">// thryvixai.com/onboard</span>
            <h3 className="text-3xl font-black text-black tracking-tight">Clinic Basic Info</h3>
            <p className="text-xs text-neutral-500 mt-1 font-medium leading-relaxed">Establish your public practice profile and patient routing keys.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 md:col-span-2">
              <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-2">Clinic Name *</label>
              <input
                type="text"
                required
                placeholder="Carewell Multispeciality Clinic"
                value={clinicName}
                onChange={(e) => setClinicName(e.target.value)}
                className="w-full bg-neutral-50 border border-black/5 p-3.5 min-h-12 text-sm rounded-xl focus:border-black outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-2">Clinic Type *</label>
              <select
                value={clinicType}
                onChange={(e) => setClinicType(e.target.value)}
                className="w-full bg-neutral-50 border border-black/5 p-3.5 min-h-12 text-sm rounded-xl focus:border-black outline-none transition-colors"
              >
                {clinicTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-2">Address Line 1 *</label>
              <input
                type="text"
                required
                placeholder="Building name, Street"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                className="w-full bg-neutral-50 border border-black/5 p-3.5 min-h-12 text-sm rounded-xl focus:border-black outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-2">City *</label>
              <input
                type="text"
                required
                placeholder="Manjeri"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-neutral-50 border border-black/5 p-3.5 min-h-12 text-sm rounded-xl focus:border-black outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-2">District *</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full bg-neutral-50 border border-black/5 p-3.5 min-h-12 text-sm rounded-xl focus:border-black outline-none transition-colors"
              >
                {keralaDistricts.map(dist => (
                  <option key={dist} value={dist}>{dist}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-2">Pincode (6 digits) *</label>
              <input
                type="text"
                required
                maxLength={6}
                placeholder="676121"
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                className="w-full bg-neutral-50 border border-black/5 p-3.5 min-h-12 text-sm rounded-xl focus:border-black outline-none font-mono transition-colors"
              />
            </div>

            <div>
              <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-2">Google Maps Link (Optional)</label>
              <input
                type="url"
                placeholder="maps.app.goo.gl/..."
                value={googleMapsLink}
                onChange={(e) => setGoogleMapsLink(e.target.value)}
                className="w-full bg-neutral-50 border border-black/5 p-3.5 min-h-12 text-sm rounded-xl focus:border-black outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-2">Clinic Primary Phone *</label>
              <input
                type="tel"
                required
                placeholder="Primary contact number"
                value={clinicPhone}
                onChange={(e) => {
                  setClinicPhone(e.target.value);
                  if (whatsAppSameAsClinic) setWhatsAppNumber(e.target.value);
                }}
                className="w-full bg-neutral-50 border border-black/5 p-3.5 min-h-12 text-sm rounded-xl focus:border-black outline-none font-mono transition-colors"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold">WhatsApp Number (Reminders) *</label>
                <label className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-neutral-500 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={whatsAppSameAsClinic}
                    onChange={(e) => {
                      setWhatsAppSameAsClinic(e.target.checked);
                      if (e.target.checked) setWhatsAppNumber(clinicPhone);
                    }}
                    className="rounded border-black/15 text-black focus:ring-black w-3.5 h-3.5"
                  />
                  Same as clinic phone
                </label>
              </div>
              <input
                type="tel"
                required
                disabled={whatsAppSameAsClinic}
                placeholder="WhatsApp for patient alerts"
                value={whatsAppNumber}
                onChange={(e) => setWhatsAppNumber(e.target.value)}
                className="w-full bg-neutral-50 border border-black/5 p-3.5 min-h-12 text-sm rounded-xl focus:border-black outline-none font-mono transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-2">Owner WhatsApp (Monday Intel Reports) *</label>
              <input
                type="tel"
                required
                placeholder="For weekly stats updates"
                value={ownerWhatsApp}
                onChange={(e) => setOwnerWhatsApp(e.target.value)}
                className="w-full bg-neutral-50 border border-black/5 p-3.5 min-h-12 text-sm rounded-xl focus:border-black outline-none font-mono transition-colors"
              />
            </div>

            <div>
              <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-2">Owner Full Name *</label>
              <input
                type="text"
                required
                placeholder="Dr. Sidharth Menon"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="w-full bg-neutral-50 border border-black/5 p-3.5 min-h-12 text-sm rounded-xl focus:border-black outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-2">Owner Email (For Portal Login) *</label>
              <input
                type="email"
                required
                placeholder="E.g. owner@clinic.com"
                value={ownerEmail}
                onChange={(e) => setOwnerEmail(e.target.value)}
                className="w-full bg-neutral-50 border border-black/5 p-3.5 min-h-12 text-sm rounded-xl focus:border-black outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-2">Website (Optional)</label>
              <input
                type="url"
                placeholder="https://yourclinic.com"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full bg-neutral-50 border border-black/5 p-3.5 min-h-12 text-sm rounded-xl focus:border-black outline-none transition-colors"
              />
            </div>
          </div>

          <button
            onClick={() => setStep(2)}
            disabled={!isStep1Valid()}
            className="w-full py-4 text-xs font-mono tracking-wider uppercase font-bold bg-black text-white hover:bg-neutral-800 disabled:opacity-40 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <span>Continue to Timings</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 2: Clinic Timings Form */}
      {step === 2 && (
        <div className="space-y-6 animate-in fade-in duration-200 bg-white border border-black/5 p-6 md:p-10 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.01)]">
          <div>
            <span className="text-[9px] text-neutral-400 font-mono uppercase tracking-widest block mb-1">// Operating Timings</span>
            <h3 className="text-3xl font-black text-black tracking-tight">Clinic Timings</h3>
            <p className="text-xs text-neutral-500 mt-1 font-medium leading-relaxed">Design your operational window to populate the AI slot-allocation algorithms.</p>
          </div>

          <div className="space-y-6">
            {/* Working Days Chips */}
            <div>
              <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold">Working Days *</label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setWorkingDays(['MON', 'TUE', 'WED', 'THU', 'FRI'])}
                    className="font-mono text-[9px] uppercase tracking-widest font-bold text-neutral-500 hover:text-black border border-black/5 hover:border-black/20 rounded-lg px-2.5 py-1.5 min-h-9 transition-colors"
                  >
                    Select All Weekdays
                  </button>
                  <button
                    type="button"
                    onClick={() => setWorkingDays([...weekDays])}
                    className="font-mono text-[9px] uppercase tracking-widest font-bold text-neutral-500 hover:text-black border border-black/5 hover:border-black/20 rounded-lg px-2.5 py-1.5 min-h-9 transition-colors"
                  >
                    Select All Days
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {weekDays.map(day => {
                  const isSelected = workingDays.includes(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => {
                        if (isSelected) {
                          setWorkingDays(workingDays.filter(d => d !== day));
                        } else {
                          setWorkingDays([...workingDays, day]);
                        }
                      }}
                      className={`px-4 min-h-9 text-xs font-mono font-bold rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-black text-white border-black'
                          : 'border-black/5 hover:bg-neutral-50 text-neutral-500'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time windows */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-2">Opening Time * <span className="text-neutral-300 normal-case font-normal">(HH:MM, 24-hour)</span></label>
                <input
                  type="time"
                  required
                  value={openingTime}
                  onChange={(e) => setOpeningTime(e.target.value)}
                  className="w-full bg-neutral-50 border border-black/5 p-3.5 min-h-12 text-sm rounded-xl focus:border-black outline-none font-mono transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-2">Closing Time * <span className="text-neutral-300 normal-case font-normal">(HH:MM, 24-hour)</span></label>
                <input
                  type="time"
                  required
                  value={closingTime}
                  onChange={(e) => setClosingTime(e.target.value)}
                  className="w-full bg-neutral-50 border border-black/5 p-3.5 min-h-12 text-sm rounded-xl focus:border-black outline-none font-mono transition-colors"
                />
              </div>
            </div>

            {/* Lunch Break Toggle */}
            <div className="p-4 border border-black/5 rounded-xl bg-neutral-50/40">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-black">Enable Lunch Break Block</h5>
                  <p className="text-[10px] text-neutral-500 mt-0.5">Mutes token auto-allocations during non-consultation breaks.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setLunchBreak(!lunchBreak)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none ${
                    lunchBreak ? 'bg-black' : 'bg-neutral-200'
                  }`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-200 ${
                    lunchBreak ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {lunchBreak && (
                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-black/5 animate-in fade-in duration-200">
                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-2">Break Start Time</label>
                    <input
                      type="time"
                      value={lunchStart}
                      onChange={(e) => setLunchStart(e.target.value)}
                      className="w-full bg-white border border-black/5 p-2.5 min-h-12 text-xs rounded-lg font-mono outline-none focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-2">Break End Time</label>
                    <input
                      type="time"
                      value={lunchEnd}
                      onChange={(e) => setLunchEnd(e.target.value)}
                      className="w-full bg-white border border-black/5 p-2.5 min-h-12 text-xs rounded-lg font-mono outline-none focus:border-black"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Average Consultation Interval */}
            <div>
              <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-2">Average Consultation Time *</label>
              <select
                value={avgConsultationTime}
                onChange={(e) => setAvgConsultationTime(parseInt(e.target.value))}
                className="w-full bg-neutral-50 border border-black/5 p-3.5 min-h-12 text-sm rounded-xl focus:border-black outline-none transition-colors"
              >
                {[5, 7, 10, 15, 20, 30].map(mins => (
                  <option key={mins} value={mins}>{mins} Minutes (Standard Slot interval)</option>
                ))}
              </select>
            </div>

            {/* Holiday Note */}
            <div>
              <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-2">Special Holiday Note (Optional)</label>
              <input
                type="text"
                placeholder="E.g. Second Saturday holiday, Sundays Emergency Only"
                value={holidayNote}
                onChange={(e) => setHolidayNote(e.target.value)}
                className="w-full bg-neutral-50 border border-black/5 p-3.5 min-h-12 text-sm rounded-xl focus:border-black outline-none transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-black/5">
            <button
              onClick={() => setStep(1)}
              className="w-full sm:w-auto px-6 py-4 border text-xs font-mono tracking-wider uppercase border-black/5 hover:bg-neutral-50 rounded-xl transition-colors font-bold flex items-center justify-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={!isStep2Valid()}
              className="flex-1 py-4 text-xs font-mono tracking-wider uppercase font-bold bg-black text-white hover:bg-neutral-800 disabled:opacity-40 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <span>Continue to Doctors</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Doctors Setup Form */}
      {step === 3 && (
        <div className="space-y-6 animate-in fade-in duration-200 bg-white border border-black/5 p-6 md:p-10 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.01)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[9px] text-neutral-400 font-mono uppercase tracking-widest block mb-1">// Provider Directory</span>
              <h3 className="text-3xl font-black text-black tracking-tight">Clinic Doctors</h3>
              <p className="text-xs text-neutral-500 mt-1 font-medium leading-relaxed">Add up to 10 doctors. Each doctor represents an independent consulting room.</p>
            </div>
            <div className="w-full sm:w-auto flex flex-col sm:items-end gap-2">
              <button
                onClick={handleAddDoctor}
                disabled={doctors.length >= 10}
                className="w-full sm:w-auto font-mono text-[10px] uppercase tracking-widest font-bold bg-black text-white hover:bg-neutral-800 disabled:opacity-40 min-h-12 px-4 rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <UserPlus className="w-3.5 h-3.5" /> Add Doctor
              </button>
              <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold">
                {doctors.length}/10 Doctors Added
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Doctor tab selector list */}
            <div className="lg:col-span-4 flex flex-col gap-2 max-h-[350px] overflow-y-auto pr-1">
              {doctors.map((doc, idx) => (
                <button
                  key={doc.id}
                  onClick={() => setActiveDoctorIdx(idx)}
                  className={`p-3.5 text-left border rounded-xl transition-all flex items-center justify-between ${
                    activeDoctorIdx === idx 
                      ? 'border-black bg-neutral-50/50 shadow-sm' 
                      : 'border-black/5 hover:bg-neutral-50 text-neutral-500'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center border border-black/5 flex-shrink-0 font-mono text-xs font-bold text-neutral-600 overflow-hidden">
                      {doc.photo ? (
                        <img src={doc.photo} alt={doc.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        idx + 1
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-xs truncate text-black">{doc.name || `Doctor ${idx + 1}`}</div>
                      <div className="text-[10px] text-neutral-400 truncate">{doc.speciality === 'Other (type custom)' ? (customSpecialities[idx] || 'Specialist') : doc.speciality}</div>
                    </div>
                  </div>
                  {doctors.length > 1 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveDoctor(idx);
                      }}
                      className="text-neutral-300 hover:text-red-500 p-1"
                    >
                      <Trash className="w-3.5 h-3.5" />
                    </button>
                  )}
                </button>
              ))}
            </div>

            {/* Right Column: Active Doctor detail card editor */}
            <div className="lg:col-span-8 border border-black/5 p-6 rounded-2xl bg-neutral-50/30 space-y-6">
              <div className="flex items-center justify-between border-b pb-3 border-black/5">
                <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold">Editing Profile #{activeDoctorIdx + 1}</span>
                <span className="text-xs font-bold text-black">{doctors[activeDoctorIdx]?.name || 'New Doctor'}</span>
              </div>

              {doctors[activeDoctorIdx] && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-2">Doctor Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Dr. Mohammed Ashraf"
                        value={doctors[activeDoctorIdx].name}
                        onChange={(e) => handleUpdateDoctor(activeDoctorIdx, 'name', e.target.value)}
                        className="w-full bg-white border border-black/5 p-3 min-h-12 text-sm rounded-xl focus:border-black outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-2">Qualifications (Optional)</label>
                      <input
                        type="text"
                        placeholder="MBBS, MD"
                        value={doctors[activeDoctorIdx].qualifications || ''}
                        onChange={(e) => handleUpdateDoctor(activeDoctorIdx, 'qualifications', e.target.value)}
                        className="w-full bg-white border border-black/5 p-3 min-h-12 text-sm rounded-xl focus:border-black outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-2">Specialization *</label>
                      <select
                        value={doctors[activeDoctorIdx].speciality}
                        onChange={(e) => handleUpdateDoctor(activeDoctorIdx, 'speciality', e.target.value)}
                        className="w-full bg-white border border-black/5 p-3 min-h-12 text-sm rounded-xl focus:border-black outline-none"
                      >
                        {doctorSpecialities.map(spec => (
                          <option key={spec} value={spec}>{spec}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-2">Consultation Fee (₹) *</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-sm text-neutral-400">₹</span>
                        <input
                          type="number"
                          required
                          value={doctors[activeDoctorIdx].fee}
                          onChange={(e) => handleUpdateDoctor(activeDoctorIdx, 'fee', Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-full bg-white border border-black/5 p-3 pl-8 min-h-12 text-sm rounded-xl focus:border-black outline-none font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Other / Custom specialization input fields */}
                  {doctors[activeDoctorIdx].speciality === 'Other (type custom)' && (
                    <div className="animate-in slide-in-from-top-1 duration-150">
                      <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-2">Custom Speciality Name</label>
                      <input
                        type="text"
                        placeholder="E.g. Trichology, Sleep Medicine"
                        value={customSpecialities[activeDoctorIdx] || ''}
                        onChange={(e) => setCustomSpecialities({
                          ...customSpecialities,
                          [activeDoctorIdx]: e.target.value
                        })}
                        className="w-full bg-white border border-black/5 p-3 min-h-12 text-sm rounded-xl focus:border-black outline-none"
                      />
                    </div>
                  )}

                  {/* Doctor Photo and Languages Spoken */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-2">Doctor Photo (Optional)</label>
                      <div className="flex items-center gap-3">
                        <div className="w-[60px] h-[60px] rounded-full bg-white border border-black/5 flex items-center justify-center font-mono text-[10px] text-neutral-400 overflow-hidden flex-shrink-0">
                          {doctors[activeDoctorIdx].photo ? (
                            <img src={doctors[activeDoctorIdx].photo} alt="Doctor preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          ) : (
                            'PHOTO'
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => doctorPhotoRefs.current[doctors[activeDoctorIdx].id]?.click()}
                          className="px-3.5 py-2 text-xs font-mono font-bold border border-black/10 hover:border-black rounded-lg transition-colors flex items-center gap-1 bg-white text-black"
                        >
                          <Upload className="w-3.5 h-3.5" /> Upload Photo
                        </button>
                        <input
                          type="file"
                          accept="image/png, image/jpeg"
                          ref={el => doctorPhotoRefs.current[doctors[activeDoctorIdx].id] = el}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleDoctorPhotoUpload(activeDoctorIdx, file);
                          }}
                          className="hidden"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-2">Languages Spoken</label>
                      <div className="flex flex-wrap gap-1.5">
                        {availableLanguages.map(lang => {
                          const docLangs = doctors[activeDoctorIdx].languages || [];
                          const isSelected = docLangs.includes(lang);
                          return (
                            <button
                              key={lang}
                              type="button"
                              onClick={() => {
                                const nextLangs = isSelected 
                                  ? docLangs.filter(l => l !== lang) 
                                  : [...docLangs, lang];
                                handleUpdateDoctor(activeDoctorIdx, 'languages', nextLangs);
                              }}
                              className={`px-2 py-1 text-[10px] font-mono font-bold rounded-lg border transition-all ${
                                isSelected 
                                  ? 'bg-black text-white border-black' 
                                  : 'bg-white text-neutral-400 border-black/5 hover:text-black hover:border-black'
                              }`}
                            >
                              {lang}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Timing Settings for this Doctor */}
                  <div className="pt-4 border-t border-black/5 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold">Consultation Working Schedule</div>
                      <label className="flex items-center gap-1.5 text-xs text-black cursor-pointer font-bold">
                        <input
                          type="checkbox"
                          checked={doctors[activeDoctorIdx].workingDaysSameAsClinic}
                          onChange={(e) => handleUpdateDoctor(activeDoctorIdx, 'workingDaysSameAsClinic', e.target.checked)}
                          className="rounded border-black/15 text-black focus:ring-black w-3.5 h-3.5"
                        />
                        Same as clinic
                      </label>
                    </div>

                    {!doctors[activeDoctorIdx].workingDaysSameAsClinic && (
                      <div className="space-y-4 pt-2 animate-in fade-in duration-200">
                        <div>
                          <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-2">Doctor Specific Days</label>
                          <div className="flex flex-wrap gap-1.5">
                            {workingDays.map(day => {
                              const docDays = doctors[activeDoctorIdx].days || [];
                              const isSelected = docDays.includes(day);
                              return (
                                <button
                                  key={day}
                                  type="button"
                                  onClick={() => {
                                    const nextDays = isSelected 
                                      ? docDays.filter(d => d !== day) 
                                      : [...docDays, day];
                                    handleUpdateDoctor(activeDoctorIdx, 'days', nextDays);
                                  }}
                                  className={`px-3 min-h-9 text-[11px] font-mono font-bold rounded-lg border transition-all ${
                                    isSelected 
                                      ? 'bg-black text-white border-black' 
                                      : 'bg-white text-neutral-400 border-black/5 hover:bg-neutral-50'
                                  }`}
                                >
                                  {day}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-1.5">Doctor Start Time <span className="text-neutral-300 normal-case font-normal">(HH:MM)</span></label>
                        <input
                          type="time"
                          value={doctors[activeDoctorIdx].hoursStart}
                          onChange={(e) => handleUpdateDoctor(activeDoctorIdx, 'hoursStart', e.target.value)}
                          className="w-full bg-white border border-black/5 p-2.5 min-h-12 text-xs rounded-lg font-mono outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-1.5">Doctor End Time <span className="text-neutral-300 normal-case font-normal">(HH:MM)</span></label>
                        <input
                          type="time"
                          value={doctors[activeDoctorIdx].hoursEnd}
                          onChange={(e) => handleUpdateDoctor(activeDoctorIdx, 'hoursEnd', e.target.value)}
                          className="w-full bg-white border border-black/5 p-2.5 min-h-12 text-xs rounded-lg font-mono outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-black/5">
            <button
              onClick={() => setStep(2)}
              className="w-full sm:w-auto px-6 py-4 border text-xs font-mono tracking-wider uppercase border-black/5 hover:bg-neutral-50 rounded-xl transition-colors font-bold flex items-center justify-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => setStep(4)}
              disabled={!isStep3Valid()}
              className="flex-1 py-4 text-xs font-mono tracking-wider uppercase font-bold bg-black text-white hover:bg-neutral-800 disabled:opacity-40 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <span>Continue to Branding</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Branding Setup Form */}
      {step === 4 && (
        <div className="space-y-6 animate-in fade-in duration-200 bg-white border border-black/5 p-6 md:p-10 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.01)]">
          <div>
            <span className="text-[9px] text-neutral-400 font-mono uppercase tracking-widest block mb-1">// Aesthetic Layout Configuration</span>
            <h3 className="text-3xl font-black text-black tracking-tight">Clinic Branding</h3>
            <p className="text-xs text-neutral-500 mt-1 font-medium leading-relaxed">Customize logos, clinic photos, and regional communication intelligence channels.</p>
          </div>

          <div className="space-y-6">
            {/* Logo and Photos Section */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Clinic Logo upload */}
              <div className="md:col-span-4 space-y-2">
                <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-1">Clinic Logo (Optional)</label>
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragOverLogo(true); }}
                  onDragLeave={() => setDragOverLogo(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOverLogo(false);
                    const file = e.dataTransfer.files?.[0];
                    if (file) handleLogoUpload(file);
                  }}
                  className={`border border-dashed rounded-2xl p-6 text-center flex flex-col items-center justify-center min-h-[140px] transition-colors relative cursor-pointer ${
                    dragOverLogo ? 'border-black bg-neutral-50' : 'border-black/10 hover:border-black bg-neutral-50/50'
                  }`}
                  onClick={() => logoInputRef.current?.click()}
                >
                  {clinicLogo ? (
                    <div className="space-y-2">
                      <div className="w-16 h-16 rounded-full border border-black/5 bg-white flex items-center justify-center overflow-hidden mx-auto shadow-sm">
                        <img src={clinicLogo} alt="Logo Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <span className="text-[9px] font-mono text-neutral-400 font-bold uppercase hover:text-black">Click to Replace</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-5 h-5 text-neutral-400 mx-auto" />
                      <div>
                        <span className="text-[11px] font-bold text-black block">Drag or Click</span>
                        <span className="text-[9px] text-neutral-400 block font-mono">PNG, JPG up to 2MB</span>
                      </div>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    ref={logoInputRef}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleLogoUpload(file);
                    }}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Clinic Photos upload */}
              <div className="md:col-span-8 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-1">Clinic Photos (Up to 5, Drag to reorder)</label>
                  <span className="text-[10px] font-mono text-neutral-400">{clinicPhotos.length}/5 uploaded</span>
                </div>
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragOverPhotos(true); }}
                  onDragLeave={() => setDragOverPhotos(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOverPhotos(false);
                    if (e.dataTransfer.files) handlePhotosUpload(e.dataTransfer.files);
                  }}
                  className={`border border-dashed rounded-2xl p-6 text-center flex flex-col items-center justify-center min-h-[140px] transition-colors relative cursor-pointer ${
                    dragOverPhotos ? 'border-black bg-neutral-50' : 'border-black/10 hover:border-black bg-neutral-50/50'
                  }`}
                  onClick={() => photoInputRef.current?.click()}
                >
                  <Upload className="w-5 h-5 text-neutral-400 mx-auto mb-1.5" />
                  <div>
                    <span className="text-[11px] font-bold text-black block">Upload Clinic Photos</span>
                    <span className="text-[9px] text-neutral-400 block font-mono">Exterior / Interior / Reception (PNG, JPG)</span>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/png, image/jpeg"
                    ref={photoInputRef}
                    onChange={(e) => {
                      if (e.target.files) handlePhotosUpload(e.target.files);
                    }}
                    className="hidden"
                  />
                </div>

                <div className="grid grid-cols-5 gap-2 mt-3">
                  {[0, 1, 2, 3, 4].map((idx) => {
                    const photo = clinicPhotos[idx];
                    if (photo) {
                      return (
                        <div key={idx} className="aspect-square rounded-lg bg-neutral-100 border border-black/5 relative group overflow-hidden">
                          <img src={photo} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-1 transition-opacity">
                            {idx > 0 && (
                              <button
                                onClick={(e) => { e.stopPropagation(); reorderPhotos(idx, 'left'); }}
                                className="text-white p-0.5 hover:text-neutral-200"
                                title="Move Left"
                              >
                                ←
                              </button>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setClinicPhotos(prev => prev.filter((_, i) => i !== idx));
                              }}
                              className="text-white p-0.5 hover:text-red-400"
                              title="Delete"
                            >
                              <Trash className="w-3 h-3" />
                            </button>
                            {idx < clinicPhotos.length - 1 && (
                              <button
                                onClick={(e) => { e.stopPropagation(); reorderPhotos(idx, 'right'); }}
                                className="text-white p-0.5 hover:text-neutral-200"
                                title="Move Right"
                              >
                                →
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    }
                    const isNextSlot = idx === clinicPhotos.length;
                    return (
                      <button
                        key={idx}
                        type="button"
                        disabled={!isNextSlot}
                        onClick={() => isNextSlot && photoInputRef.current?.click()}
                        className={`aspect-square rounded-lg border border-dashed flex items-center justify-center font-mono text-[9px] text-neutral-300 ${
                          isNextSlot ? 'border-black/20 hover:border-black hover:text-neutral-500 cursor-pointer' : 'border-black/5 cursor-default'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Language & Google review link */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-black/5">
              <div>
                <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-2">Primary WhatsApp Language *</label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { id: 'ml', name: '🇮🇳 Malayalam (ml)', desc: 'Recommended for Kerala practices — Malayalam AI-first messaging.' },
                    { id: 'en', name: '🇬🇧 English (en)', desc: 'Universal communication with standard English format.' },
                    { id: 'ar', name: '🇸🇦 Arabic (ar)', desc: 'Perfect for local populations with Gulf connections.' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPrimaryLanguage(item.id as 'ml' | 'en' | 'ar')}
                      className={`p-3 text-left rounded-xl border transition-all ${
                        primaryLanguage === item.id
                          ? 'border-black bg-neutral-50/50'
                          : 'border-black/5 hover:bg-neutral-50'
                      }`}
                    >
                      <div className="font-bold text-xs text-black">{item.name}</div>
                      <div className="text-[10px] text-neutral-400 mt-0.5 leading-tight">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold mb-2">Google Maps Review Link (Optional)</label>
                <input
                  type="url"
                  placeholder="https://g.page/r/your-review-link"
                  value={googleReviewLink}
                  onChange={(e) => setGoogleReviewLink(e.target.value)}
                  className="w-full bg-neutral-50 border border-black/5 p-3.5 min-h-12 text-sm rounded-xl focus:border-black outline-none transition-colors"
                />
                <span className="text-[10px] text-neutral-400 font-sans mt-1.5 block leading-normal">
                  Our system auto-detects happy patients and requests them to rate your clinic on maps via direct SMS/WhatsApp campaigns.
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-black/5">
            <button
              onClick={() => setStep(3)}
              className="w-full sm:w-auto px-6 py-4 border text-xs font-mono tracking-wider uppercase border-black/5 hover:bg-neutral-50 rounded-xl transition-colors font-bold flex items-center justify-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => setStep(5)}
              disabled={!isStep4Valid()}
              className="flex-1 py-4 text-xs font-mono tracking-wider uppercase font-bold bg-black text-white hover:bg-neutral-800 disabled:opacity-40 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <span>Review Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: Review & Submit Form */}
      {step === 5 && (
        <div className="space-y-6 animate-in fade-in duration-200 bg-white border border-black/5 p-6 md:p-10 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.01)]">
          <div>
            <span className="text-[9px] text-neutral-400 font-mono uppercase tracking-widest block mb-1">// Setup Verification</span>
            <h3 className="text-3xl font-black text-black tracking-tight">Review Details</h3>
            <p className="text-xs text-neutral-500 mt-1 font-medium leading-relaxed">Verify your clinical parameters. System compiles and provisions live endpoints instantly upon submission.</p>
          </div>

          {/* Quick specs list */}
          <div className="border border-black/5 rounded-2xl divide-y divide-black/5 overflow-hidden bg-neutral-50/20">
            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
              <span className="font-mono text-neutral-400 uppercase font-bold">Clinic Entity</span>
              <span className="md:col-span-2 font-bold text-black">{clinicName} ({clinicType})</span>
            </div>

            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
              <span className="font-mono text-neutral-400 uppercase font-bold">Address & Contact</span>
              <span className="md:col-span-2 font-bold text-black">
                {addressLine1}, {city}, {district} - {pincode} <br />
                <span className="font-mono text-[10px] text-neutral-400 font-bold block mt-1">Ph: {clinicPhone} · WhatsApp: {whatsAppNumber}</span>
              </span>
            </div>

            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
              <span className="font-mono text-neutral-400 uppercase font-bold">Hours of Operation</span>
              <span className="md:col-span-2 font-bold text-black">
                {workingDays.join(', ')} @ {openingTime} to {closingTime} <br />
                {lunchBreak && <span className="text-neutral-400 font-mono text-[10px] font-bold block mt-1">Lunch Break: {lunchStart} - {lunchEnd}</span>}
                <span className="text-neutral-400 font-sans text-[10px] block font-semibold mt-1">Average session: {avgConsultationTime} minutes</span>
              </span>
            </div>

            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
              <span className="font-mono text-neutral-400 uppercase font-bold">Listed Providers</span>
              <span className="md:col-span-2 font-bold text-black">
                {doctors.length} Doctors Registered
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {doctors.map((d, i) => (
                    <span key={i} className="font-mono text-[9px] border border-black/5 px-2 py-0.5 rounded-lg bg-white text-neutral-600 font-bold">
                      {d.name || 'Unnamed Doctor'}
                    </span>
                  ))}
                </div>
              </span>
            </div>

            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
              <span className="font-mono text-neutral-400 uppercase font-bold">Media Uploads</span>
              <span className="md:col-span-2 font-bold text-black flex items-center gap-4">
                <span>Logo: {clinicLogo ? '✅ Uploaded' : '❌ No Logo'}</span>
                <span>Photos: {clinicPhotos.length} / 5</span>
              </span>
            </div>

            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
              <span className="font-mono text-neutral-400 uppercase font-bold">Language Mode</span>
              <span className="md:col-span-2 font-bold text-black uppercase font-mono">{primaryLanguage} mode</span>
            </div>
          </div>

          {/* Guidelines checkboxes */}
          <div className="space-y-3 pt-4 border-t border-black/5">
            <label className="flex items-start gap-2.5 text-xs text-neutral-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={confirmAccurate}
                onChange={(e) => setConfirmAccurate(e.target.checked)}
                className="rounded border-black/15 text-black focus:ring-black w-4 h-4 mt-0.5"
              />
              <span className="font-medium">I confirm all information entered matches my real clinical schedule.</span>
            </label>

            <label className="flex items-start gap-2.5 text-xs text-neutral-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="rounded border-black/15 text-black focus:ring-black w-4 h-4 mt-0.5"
              />
              <span className="font-medium">
                I agree to the THRYVIX Terms of Service and{' '}
                {setActiveView ? (
                  <button
                    type="button"
                    onClick={() => setActiveView('privacy')}
                    className="text-black underline font-semibold"
                  >
                    Privacy Policy
                  </button>
                ) : (
                  <a href="#privacy" className="text-black underline font-semibold">Privacy Policy</a>
                )} (compliant with DPDP Act 2023).
              </span>
            </label>
          </div>

          {submitError && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-xs text-red-700 font-medium leading-relaxed animate-in fade-in duration-200">
              {submitError}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-black/5">
            <button
              onClick={() => setStep(4)}
              className="w-full sm:w-auto px-6 py-4 border text-xs font-mono tracking-wider uppercase border-black/5 hover:bg-neutral-50 rounded-xl transition-colors font-bold flex items-center justify-center gap-2 animate-pulse-none"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={!isStep5Valid() || isSubmitting}
              className="flex-1 py-4 text-xs font-mono tracking-wider uppercase font-bold bg-black text-white hover:bg-neutral-800 disabled:opacity-40 rounded-xl transition-all flex items-center justify-center gap-1.5"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Provisioning Live Endpoints...</span>
                </>
              ) : (
                <>
                  <span>Complete Setup & Go Live</span>
                  <Check className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* STEP 6: Application Received Screen */}
      {step === 6 && (
        <div className="space-y-8 animate-in fade-in duration-300 max-w-lg mx-auto text-center py-8">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100 shadow-lg shadow-emerald-500/5">
            <Check className="w-8 h-8" />
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-black text-black tracking-tight">Application Received!</h2>
            <p className="text-sm text-black/60 max-w-md mx-auto leading-relaxed">
              Our team will review and activate your clinic within 24 hours.
              You'll receive login details on WhatsApp and email.
            </p>
          </div>
          <p className="text-xs text-neutral-500">
            Questions? WhatsApp us:{' '}
            <a href="https://wa.me/919061606343" target="_blank" rel="noreferrer" className="font-bold text-black underline">
              +91 90616 06343
            </a>
          </p>
          {setActiveView && (
            <button
              onClick={() => setActiveView('landing')}
              className="py-3 px-6 text-xs font-mono tracking-wider uppercase font-bold border border-black/10 hover:border-black text-black bg-white rounded-xl transition-all"
            >
              Back to Home
            </button>
          )}
        </div>
      )}
    </div>
  );
}
