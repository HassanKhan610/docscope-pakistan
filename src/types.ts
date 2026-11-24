export interface ScopeItem {
  id: string;
  type: 'DO' | 'DONT';
  title: string;
  description: string;
  category: 'Trauma & Emergency' | 'Braces & Aligners' | 'Surgery & Extractions' | 'Financial & Billing' | 'Consultation';
  pdfSource: string;
  pageNumber: number;
  highlightSnippet: string;
  confidence: number;
}

export interface PricingPackage {
  id: string;
  name: string;
  badge?: string;
  popular?: boolean;
  idealFor: string;
  currency: 'PKR';
  totalPrice: number;
  monthlyPrice: number;
  durationMonths: number;
  deposit: number;
  includes: string[];
  doesNotInclude: string[];
  pdfSource: string;
  pageNumber: number;
}

export interface PDFDocument {
  id: string;
  name: string;
  fileName: string;
  fileSize: string;
  uploadDate: string;
  totalPages: number;
  parsedScopeCount: { dos: number; donts: number };
  status: 'Ready' | 'Processing' | 'Indexed';
  summary: string;
  contentPages: {
    page: number;
    title: string;
    excerpt: string;
    identifiedScopes: { type: 'DO' | 'DONT'; text: string }[];
  }[];
}

export interface ClinicProfile {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  address: string;
  city: string;
  country: string;
  phone: string;
  whatsappNumber: string;
  hours: string;
  pmdcRegistration: string;
  avatarUrl: string;
  coverImage: string;
  heroHeadline: string;
  heroDescription: string;
  verifiedBadge: boolean;
  emergencyAccepted: boolean;
  docs: PDFDocument[];
  scopes: ScopeItem[];
  packages: PricingPackage[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  statusTag?: 'DO_VERIFIED' | 'DONT_WARNING' | 'PACKAGE_INFO' | 'BOOKING_READY';
  sources?: {
    docName: string;
    page: number;
    snippet: string;
  }[];
  recommendedPackageId?: string;
  canBookDirectly?: boolean;
  appointmentIntent?: boolean;
}

export interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  reason: string;
  selectedPackage?: string;
  doctorName: string;
  date: string;
  time: string;
  status: 'Confirmed' | 'Completed' | 'Pending';
  source: 'DocuScope Instant Booking' | 'WhatsApp Auto-Bot';
  createdAt: string;
}

export interface WhatsAppMessage {
  id: string;
  sender: 'patient' | 'clinic_bot';
  text: string;
  time: string;
  status: 'sent' | 'delivered' | 'read';
  actionCard?: {
    title: string;
    price: string;
    buttonText: string;
    buttonAction: string;
  };
}
