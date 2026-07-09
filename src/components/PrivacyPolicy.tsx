import { ChevronLeft } from 'lucide-react';

interface PrivacyPolicyProps {
  setActiveView: (view: 'landing' | 'booking' | 'dashboard' | 'onboard' | 'privacy') => void;
}

export default function PrivacyPolicy({ setActiveView }: PrivacyPolicyProps) {
  const sections = [
    {
      title: '1. Introduction',
      body: 'THRYVIX AI ("THRYVIX", "we", "us") operates an AI operating system for Indian clinics, including online booking, live queue management, and patient record tools. This Privacy Policy explains how we collect, use, and protect information when clinics and patients use our services.'
    },
    {
      title: '2. Information We Collect',
      body: 'We collect clinic information (name, address, contact details, doctor schedules), patient information (name, phone number, appointment details, medical history shared during booking), and technical information (device type, browser, IP address) needed to operate the booking and queue systems.'
    },
    {
      title: '3. Why We Collect It',
      body: 'Information is collected to schedule and manage appointments, maintain live queues, send booking confirmations and reminders, generate clinic intelligence reports, and improve the reliability of our services. We do not use patient data for advertising.'
    },
    {
      title: '4. Patient Health ID',
      body: 'Each patient is assigned a unique THX Health ID that links their bookings and visit history under one identity. This ID is used only to help clinics retrieve patient history quickly and is not shared outside the clinic\'s THRYVIX account.'
    },
    {
      title: '5. WhatsApp Communications',
      body: 'With consent, THRYVIX sends appointment confirmations, queue updates, and reminders via WhatsApp. Message content includes booking details relevant to the recipient\'s own appointment. Patients and clinics can opt out of non-essential messages at any time.'
    },
    {
      title: '6. Data Sharing',
      body: 'We do not sell patient or clinic data. Information is shared only with the clinic the patient booked with, and with service providers (such as messaging and hosting infrastructure) strictly to operate THRYVIX, under confidentiality obligations.'
    },
    {
      title: '7. Data Security',
      body: 'Data is stored on servers located in India. We use industry-standard safeguards, including encryption in transit and access controls, to protect clinic and patient information from unauthorized access.'
    },
    {
      title: '8. Data Retention',
      body: 'Clinic and patient data is retained for as long as the clinic account is active and as required to meet legal and medical record-keeping obligations. Data may be deleted or anonymized upon a verified request, subject to applicable law.'
    },
    {
      title: '9. Your Rights',
      body: 'Under the Digital Personal Data Protection Act, 2023, you have the right to access, correct, or request deletion of your personal data, and to withdraw consent for non-essential communications. Contact us to exercise these rights.'
    },
    {
      title: '10. Contact Us',
      body: 'For any privacy questions or requests, reach us at hello@thryvixai.com or +91 90616 06343. THRYVIX AI is based in Kerala, India.'
    }
  ];

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <button
        onClick={() => setActiveView('landing')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-black transition-colors mb-10 min-h-11 -ml-2 px-2"
      >
        <ChevronLeft className="w-4 h-4" />
        Back
      </button>

      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-black mb-2">Privacy Policy</h1>
      <p className="text-sm text-neutral-500 mb-10">Last updated: July 2026</p>

      <div className="divide-y divide-neutral-200">
        {sections.map((section) => (
          <div key={section.title} className="py-6 first:pt-0">
            <h2 className="text-base font-semibold text-black mb-2">{section.title}</h2>
            <p className="text-sm text-neutral-600 leading-relaxed">{section.body}</p>
            {section.title === '10. Contact Us' && (
              <div className="mt-3 space-y-1 text-sm text-neutral-600">
                <div>hello@thryvixai.com</div>
                <div>+91 90616 06343</div>
                <div>Kerala, India</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
