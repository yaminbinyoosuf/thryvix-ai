export interface Doctor {
  id: string;
  name: string;
  speciality: string;
  qualifications?: string;
  fee: number;
  workingDaysSameAsClinic?: boolean;
  days: string[];
  hoursStart: string;
  hoursEnd: string;
  photo?: string;
  languages?: string[];
}

export interface QueueItem {
  id: string;
  patientName: string;
  patientPhone: string;
  doctorName: string;
  timeSlot: string;
  status: 'waiting' | 'called' | 'completed' | 'cancelled';
  language: 'ml' | 'en' | 'ar';
  timestamp: string;
  history?: string;
  allergies?: string;
  complaint?: string;
}

export interface OnboardingData {
  clinicName: string;
  clinicType: string;
  addressLine1: string;
  city: string;
  district: string;
  pincode: string;
  googleMapsLink: string;
  clinicPhone: string;
  whatsAppNumber: string;
  ownerWhatsApp: string;
  ownerName: string;
  website: string;
  workingDays: string[];
  openingTime: string;
  closingTime: string;
  lunchBreak: boolean;
  lunchStart?: string;
  lunchEnd?: string;
  holidayNote?: string;
  avgConsultationTime: number;
  doctors: Doctor[];
  clinicLogo?: string;
  clinicPhotos?: string[];
  language: 'ml' | 'en' | 'ar';
  googleReviewLink: string;
}
