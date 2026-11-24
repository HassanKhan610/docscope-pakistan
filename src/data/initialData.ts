import { ClinicProfile, ScopeItem, PricingPackage, PDFDocument } from '../types';

export const initialPDFs: PDFDocument[] = [
  {
    id: 'pdf-1',
    name: 'Apex Orthodontics Clinical Scope of Practice & Trauma Protocol (2026)',
    fileName: 'Apex_Dental_Trauma_Scope_Lahore_2026.pdf',
    fileSize: '2.8 MB',
    uploadDate: 'Nov 18, 2026',
    totalPages: 14,
    parsedScopeCount: { dos: 8, donts: 5 },
    status: 'Ready',
    summary: 'Clinical practice handbook for Lahore DHA center: outlines acute athletic impact realignment, Damon bracket systems, clear aligners, and PMDC clinical boundaries.',
    contentPages: [
      {
        page: 2,
        title: 'Section 2.1: Sports Collision & Dental Displacement Protocol',
        excerpt: 'We accept emergency and sub-acute dental malalignment resulting from contact sports collisions (e.g. football, cricket, futsal). Protocols include immediate 3D iTero repositioning mapping, tooth vitality pulp tests, and specialized bracket stabilization for displaced anterior incisors.',
        identifiedScopes: [
          { type: 'DO', text: 'Realignment of teeth shifted by sports trauma / football collision' },
          { type: 'DO', text: 'Same-day urgent bracket & archwire stabilization for athletes' }
        ]
      },
      {
        page: 4,
        title: 'Section 4.3: Clinical Exclusions & Institutional Referrals',
        excerpt: 'Apex Orthodontics DOES NOT perform inpatient maxillofacial orthognathic bone fracture surgery. Any patient presenting compound mandibular or maxillary bone fractures must be triaged at a tertiary hospital (e.g. Mayo Hospital or Shaikh Zayed Maxillofacial Unit) prior to outpatient dental braces alignment.',
        identifiedScopes: [
          { type: 'DONT', text: 'DO NOT perform inpatient jaw bone fracture reconstructive surgery (referred to Mayo / Shaikh Zayed Hospital)' },
          { type: 'DONT', text: 'DO NOT place braces on patients with active stage-3/4 untreated periodontal disease' }
        ]
      },
      {
        page: 6,
        title: 'Section 6.2: Pakistan Healthcare Coverage & Sehat Card Clarification',
        excerpt: 'Elective orthodontic realignment, cosmetic ceramic brackets, and clear aligners ARE NOT covered under the government Sehat Sahulat Card or standard national insurance. All orthodontic treatments are private fee-for-service with 0% markup monthly installment plans.',
        identifiedScopes: [
          { type: 'DONT', text: 'Government Sehat Sahulat Card DOES NOT cover elective aesthetic braces' },
          { type: 'DO', text: '0% markup monthly installment plans via Raast, Bank Alfalah, Meezan & Nayapay' }
        ]
      },
      {
        page: 9,
        title: 'Section 9.0: Consultation & 3D Imaging Workflow',
        excerpt: 'All new consultations at our DHA Phase 5 facility include an iTero Element 5D digital oral scan and panoramic digital OPG X-ray evaluation with zero upfront diagnostic commitment fees.',
        identifiedScopes: [
          { type: 'DO', text: 'Complimentary high-definition 3D iTero digital scans with outcome simulation' },
          { type: 'DO', text: 'Zero consultation penalty or hidden diagnostic lab fees' }
        ]
      }
    ]
  },
  {
    id: 'pdf-2',
    name: 'Braces Packages Catalog & Pakistan Installment Plans (2026)',
    fileName: 'Apex_Braces_Packages_PKR_2026.pdf',
    fileSize: '1.9 MB',
    uploadDate: 'Nov 20, 2026',
    totalPages: 8,
    parsedScopeCount: { dos: 6, donts: 3 },
    status: 'Ready',
    summary: 'Official PKR tariff sheet detailing Metal, Ceramic, and Sports Recovery bundles, monthly bank installment breakdown, and warranty policies.',
    contentPages: [
      {
        page: 1,
        title: 'Section 1: Tariff Schedule & In-House Installments (PKR)',
        excerpt: 'All orthodontic treatment packages are eligible for 0% markup in-house installment plans spread over 10 to 14 months. Transparent pricing covers hardware, routine monthly adjustments, retainers, and emergency bracket fixes.',
        identifiedScopes: [
          { type: 'DO', text: 'Monthly installments from Rs. 9,500 to Rs. 16,500/month (0% profit markup)' },
          { type: 'DO', text: 'Includes all monthly adjustments and 2 sets of post-treatment retainers' }
        ]
      },
      {
        page: 3,
        title: 'Section 3: Sports Impact Recovery Bundle',
        excerpt: 'Specifically tailored for football, rugby, and cricket athletes experiencing trauma misalignment. Includes reinforced brackets, dual custom thermo-fitted athletic mouthguards compatible with active braces, and 3 complimentary emergency bracket repairs.',
        identifiedScopes: [
          { type: 'DO', text: 'Includes custom dual athletic impact mouthguards for football/sports' },
          { type: 'DO', text: 'Free replacement for up to 3 trauma-loosened brackets' }
        ]
      },
      {
        page: 5,
        title: 'Section 5: Excluded Procedures in Standard Tariff',
        excerpt: 'Packages DO NOT include general anesthesia operating theatre charges or surgical wisdom tooth impaction extractions. Cosmetic veneers and composite edge bonding post-braces are billed separately.',
        identifiedScopes: [
          { type: 'DONT', text: 'Tariff DOES NOT include general anesthesia or complex surgical wisdom tooth removal' },
          { type: 'DONT', text: 'Cosmetic veneers/bonding after braces are not included in base tariff' }
        ]
      }
    ]
  }
];

export const initialScopes: ScopeItem[] = [
  // WHAT WE DO (IN-SCOPE)
  {
    id: 'scope-1',
    type: 'DO',
    title: 'Sports Collision & Trauma Teeth Realignment',
    description: 'Specialized realignment of teeth shifted, loosened, or knocked out of position during football, cricket, and athletic collisions.',
    category: 'Trauma & Emergency',
    pdfSource: 'Apex_Dental_Trauma_Scope_Lahore_2026.pdf',
    pageNumber: 2,
    highlightSnippet: 'We accept emergency and sub-acute dental malalignment resulting from contact sports collisions (e.g. football, futsal).',
    confidence: 99
  },
  {
    id: 'scope-2',
    type: 'DO',
    title: 'Self-Ligating Metal & Aesthetic Ceramic Braces',
    description: 'Comprehensive orthodontic correction using low-friction Damon metal and clear frosted ceramic aesthetic brackets.',
    category: 'Braces & Aligners',
    pdfSource: 'Apex_Braces_Packages_PKR_2026.pdf',
    pageNumber: 1,
    highlightSnippet: 'Complete Damon Q metal and Damon Clear aesthetic ceramic systems available with shortened appointment cycles.',
    confidence: 99
  },
  {
    id: 'scope-3',
    type: 'DO',
    title: '0% Markup Monthly Installment Plans (PKR)',
    description: 'Flexible payment plans starting from Rs. 9,500/month via Raast, Bank Alfalah, Meezan Bank, EasyPaisa, SadaPay, or Nayapay.',
    category: 'Financial & Billing',
    pdfSource: 'Apex_Braces_Packages_PKR_2026.pdf',
    pageNumber: 1,
    highlightSnippet: '0% markup in-house installment plans spread over 10 to 14 months with zero bank processing fee.',
    confidence: 100
  },
  {
    id: 'scope-4',
    type: 'DO',
    title: 'Complimentary iTero 5D 3D Digital Scan & Simulation',
    description: 'High-precision digital oral scan showing your projected teeth alignment before you commit to treatment.',
    category: 'Consultation',
    pdfSource: 'Apex_Dental_Trauma_Scope_Lahore_2026.pdf',
    pageNumber: 9,
    highlightSnippet: 'All new consultations include an iTero Element 5D digital oral scan with zero upfront imaging commitment fees.',
    confidence: 98
  },
  {
    id: 'scope-5',
    type: 'DO',
    title: 'Dual Custom Athletic Mouthguards for Braces',
    description: 'Precision-molded sports mouthguards that protect lips and brackets during contact football matches.',
    category: 'Trauma & Emergency',
    pdfSource: 'Apex_Braces_Packages_PKR_2026.pdf',
    pageNumber: 3,
    highlightSnippet: 'Dual custom thermo-fitted athletic mouthguards compatible with active brackets included in Sports Recovery package.',
    confidence: 97
  },
  {
    id: 'scope-6',
    type: 'DO',
    title: 'Urgent Same-Day Chair Booking via App or WhatsApp',
    description: 'Direct appointment confirmation without receptionist delay, 24-hour WhatsApp lag, or phone call queues.',
    category: 'Consultation',
    pdfSource: 'Apex_Dental_Trauma_Scope_Lahore_2026.pdf',
    pageNumber: 2,
    highlightSnippet: 'Direct chair scheduling with same-day emergency slots reserved for athletic trauma cases.',
    confidence: 100
  },

  // WHAT WE DO NOT DO (CRITICAL PAKISTAN TRANSPARENCY)
  {
    id: 'scope-7',
    type: 'DONT',
    title: 'NO Inpatient Hospital Jaw Fracture Surgery',
    description: 'We do not perform surgical jaw bone fracture open-reduction in-clinic. Fractured jaw bones are referred to Mayo Hospital or Shaikh Zayed Maxillofacial Unit.',
    category: 'Surgery & Extractions',
    pdfSource: 'Apex_Dental_Trauma_Scope_Lahore_2026.pdf',
    pageNumber: 4,
    highlightSnippet: 'Apex Orthodontics DOES NOT perform inpatient maxillofacial orthognathic bone fracture surgery.',
    confidence: 100
  },
  {
    id: 'scope-8',
    type: 'DONT',
    title: 'NO Sehat Sahulat Card Coverage for Elective Braces',
    description: 'Government Sehat Card does NOT cover private aesthetic orthodontic braces. We provide private installment plans instead.',
    category: 'Financial & Billing',
    pdfSource: 'Apex_Dental_Trauma_Scope_Lahore_2026.pdf',
    pageNumber: 6,
    highlightSnippet: 'Elective orthodontic realignment and cosmetic brackets ARE NOT covered under the government Sehat Sahulat Card.',
    confidence: 99
  },
  {
    id: 'scope-9',
    type: 'DONT',
    title: 'NO General Anesthesia Extractions in Dental Chair',
    description: 'We do not administer general anesthesia for surgical impactions. Complex cases are handled under local anesthesia or referred to hospital surgical suites.',
    category: 'Surgery & Extractions',
    pdfSource: 'Apex_Braces_Packages_PKR_2026.pdf',
    pageNumber: 5,
    highlightSnippet: 'Tariff DOES NOT include general anesthesia or complex surgical wisdom tooth operating theatre fees.',
    confidence: 96
  },
  {
    id: 'scope-10',
    type: 'DONT',
    title: 'NO Hidden Retainer or Lab Surcharges',
    description: 'Zero unexpected charges for routine wire tightenings, bracket debonding, or your first two sets of clear retainers.',
    category: 'Financial & Billing',
    pdfSource: 'Apex_Braces_Packages_PKR_2026.pdf',
    pageNumber: 1,
    highlightSnippet: 'Zero hidden retainer fees; includes 2 sets of retainers and full post-treatment maintenance.',
    confidence: 99
  }
];

export const initialPackages: PricingPackage[] = [
  {
    id: 'pkg-sports',
    name: 'Sports Impact Realignment & Ortho Bundle',
    badge: '★ Best Match for Hamza',
    popular: true,
    idealFor: 'Teeth alignment knocked off during football, cricket, or sports collision',
    currency: 'PKR',
    totalPrice: 145000,
    monthlyPrice: 14500,
    durationMonths: 10,
    deposit: 20000,
    includes: [
      'Comprehensive trauma assessment & pulp vitality diagnostic test',
      'High-impact Damon stainless steel or clear aesthetic brackets',
      'iTero 5D digital scan & continuous 3D outcome projection',
      'Dual custom athletic mouthguards engineered specifically for brackets',
      'Up to 3 free emergency replacements for sports-loosened brackets',
      'All monthly archwire adjustments & tooth repositioning visits',
      'Final clear retention retainers (2 sets) + sports bite guard'
    ],
    doesNotInclude: [
      'Hospital maxillofacial bone reconstruction (if jaw is fractured)',
      'Cosmetic composite veneers after treatment'
    ],
    pdfSource: 'Apex_Braces_Packages_PKR_2026.pdf',
    pageNumber: 3
  },
  {
    id: 'pkg-ceramic',
    name: 'Pro Aesthetic Frosted Ceramic Braces',
    badge: 'Most Discreet',
    popular: false,
    idealFor: 'Subtle, tooth-colored aesthetic brackets for working professionals & adults',
    currency: 'PKR',
    totalPrice: 165000,
    monthlyPrice: 16500,
    durationMonths: 10,
    deposit: 25000,
    includes: [
      'Stain-resistant frosted translucent ceramic brackets',
      'Aesthetic white-coated archwires for maximum discretion',
      '3D digital smile simulation before bonding',
      'Emergency wire clipping & smoothing visits',
      'Complete set of clear retention retainers',
      '0% markup bank installment facility'
    ],
    doesNotInclude: [
      'Athletic contact mouthguards (available as add-on for Rs. 6,500)',
      'Surgical jaw bone realignment'
    ],
    pdfSource: 'Apex_Braces_Packages_PKR_2026.pdf',
    pageNumber: 2
  },
  {
    id: 'pkg-metal',
    name: 'Essential Damon Precision Metal Braces',
    badge: 'Best Value',
    popular: false,
    idealFor: 'Reliable, powerful alignment correction with proven Damon low-friction brackets',
    currency: 'PKR',
    totalPrice: 95000,
    monthlyPrice: 9500,
    durationMonths: 10,
    deposit: 15000,
    includes: [
      'Low-profile medical-grade stainless steel Damon brackets',
      'Color band customization (custom football team colors)',
      'All monthly tightenings & wire progression',
      'Post-treatment clear retainers included',
      'Zero hidden diagnostic charges'
    ],
    doesNotInclude: [
      'Ceramic frosted bracket upgrade',
      'Surgical jaw bone realignment'
    ],
    pdfSource: 'Apex_Braces_Packages_PKR_2026.pdf',
    pageNumber: 1
  }
];

export const sampleClinicProfile: ClinicProfile = {
  id: 'clinic-apex-lahore',
  name: 'Apex Orthodontics & Dental Aesthetics',
  slug: 'apex-dental-lahore',
  tagline: 'Specialized Sports Dental Realignment, Damon Braces & Instant Scope Verification',
  specialty: 'Orthodontics & Sports Dental Trauma Center',
  rating: 4.9,
  reviewCount: 384,
  address: 'Plaza 28-CCA, Sector C, Phase 5 DHA',
  city: 'Lahore',
  country: 'Pakistan',
  phone: '+92 42 3718 2900',
  whatsappNumber: '+92 300 4829100',
  hours: 'Mon-Sat: 11:00 AM - 9:00 PM (Emergency Sports Slots Daily)',
  pmdcRegistration: 'PMDC Reg #43219-D (Verified Specialist)',
  avatarUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=400&q=80',
  coverImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80',
  heroHeadline: 'Know Exactly What We Treat In 1 Second. No 24-Hour WhatsApp Waiting.',
  heroDescription: 'Ground-truth practice guidelines extracted from official clinic PDFs. Instant answers on sports trauma braces, PKR packages with 0% installments, and direct appointment booking.',
  verifiedBadge: true,
  emergencyAccepted: true,
  docs: initialPDFs,
  scopes: initialScopes,
  packages: initialPackages
};
