export interface ServiceCategory {
  id: string;
  index: string;
  name: string;
  shortDescription: string;
  detailedOverview: string;
  items: string[];
  image: string;
  imageAlt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Internal Plumbing' | 'Kitchen & Bath' | 'External & Maintenance';
  relatedService: string;
  caption: string;
  image: string;
  imageAlt: string;
  isIllustrative: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const BUSINESS_INFO = {
  name: 'JTR Plumbing and Maintenance',
  shortName: 'JTR',
  tagline: 'Covering all aspects of internal and external plumbing and maintenance.',
  phoneDisplay: '07851 564381',
  phoneHref: 'tel:+447851564381',
  whatsappInternational: '447851564381',
  whatsappDefaultMessage:
    'Hello JTR Plumbing and Maintenance. I would like to enquire about your plumbing and maintenance services.',
  // Editable placeholder: replace with the verified JTR Plumbing and Maintenance Facebook profile URL.
  facebookUrl: 'https://www.facebook.com/jtr-plumbing-and-maintenance-placeholder',
  facebookIsPlaceholder: true,
  facebookLabel: 'JTR Plumbing and Maintenance on Facebook',
  brandLogoReference: '/assets/aistudio/image_c8fc1e61.png',
} as const;

export const HERO_MEDIA = {
  image: '/src/assets/images/hero_plumber_clean_1795087847683.jpg',
  alt: 'Professional plumber inspecting modern kitchen sink pipework inside a residential property',
};

export const ABOUT_MEDIA = {
  image: '/src/assets/images/about_plumber_clean_1795087847301.jpg',
  alt: 'Plumbing tradesperson tightening a brass compression joint on copper pipework in a clean residential utility room',
};

export const TRUST_VALUES = [
  {
    id: 'reliable-service',
    index: '01',
    title: 'Reliable Service',
    description: 'A dependable approach to plumbing and maintenance work.',
    icon: 'shield' as const,
  },
  {
    id: 'quality-workmanship',
    index: '02',
    title: 'Quality Workmanship',
    description: 'Attention to detail and a commitment to doing the job properly.',
    icon: 'wrench' as const,
  },
  {
    id: 'customer-focused',
    index: '03',
    title: 'Customer-Focused',
    description: 'Clear communication and solutions that address your needs.',
    icon: 'message' as const,
  },
  {
    id: 'internal-external',
    index: '04',
    title: 'Internal & External Plumbing',
    description: 'Support for a wide range of plumbing and maintenance requirements.',
    icon: 'home' as const,
  },
];

// Easily editable service categories presented for customer enquiry & confirmation.
export const SERVICES: ServiceCategory[] = [
  {
    id: 'general-plumbing',
    index: '01',
    name: 'General Plumbing',
    shortDescription:
      'Everyday plumbing repairs, dripping taps, valve maintenance and practical residential installations.',
    detailedOverview:
      'Day-to-day plumbing repairs and installations carried out neatly and methodically to keep household and property water systems operating reliably.',
    items: [
      'Plumbing repairs',
      'Leaking pipes and taps',
      'Pipework maintenance',
      'General plumbing installations',
    ],
    image: '/src/assets/images/service_general_plumbing_1795087802683.jpg',
    imageAlt: 'Newly fitted chrome basin trap, braided hoses and brass isolation valves inside a clean cabinet',
  },
  {
    id: 'bathroom-plumbing',
    index: '02',
    name: 'Bathroom Plumbing',
    shortDescription:
      'Bathroom fixture fittings, shower and tap installations, toilet repairs and ongoing maintenance.',
    detailedOverview:
      'Clean, careful plumbing work for modern and traditional bathrooms—from replacing taps, showers and toilets to resolving everyday bathroom plumbing issues.',
    items: [
      'Bathroom plumbing installations',
      'Shower and tap installations',
      'Toilet repairs and installations',
      'Bathroom plumbing maintenance',
    ],
    image: '/src/assets/images/service_bathroom_plumbing_1795087802240.jpg',
    imageAlt: 'Modern residential bathroom featuring a walk-in rainfall shower, brushed chrome controls and vanity basin',
  },
  {
    id: 'kitchen-plumbing',
    index: '03',
    name: 'Kitchen Plumbing',
    shortDescription:
      'Kitchen sink fittings, tap replacements, supply pipework and everyday kitchen plumbing repairs.',
    detailedOverview:
      'Practical kitchen plumbing solutions covering sink and tap replacements, supply connections, waste traps and dependable under-counter pipework repairs.',
    items: [
      'Kitchen sink installations',
      'Tap replacements',
      'Water supply pipework',
      'Kitchen plumbing repairs',
    ],
    image: '/src/assets/images/service_kitchen_plumbing_1795087801893.jpg',
    imageAlt: 'Contemporary residential kitchen stainless steel sink with swan-neck chrome mixer tap',
  },
  {
    id: 'pipework-leak-repairs',
    index: '04',
    name: 'Pipework & Leak Repairs',
    shortDescription:
      'Targeted leak repairs, pipe replacements, compression joints and preventative water pipe maintenance.',
    detailedOverview:
      'Identifying and addressing leaking joints, worn pipe sections and water supply issues with neat, durable pipework replacements and fittings.',
    items: [
      'Leaking pipe repairs',
      'Pipe replacements',
      'Water pipe maintenance',
      'General pipework issues',
    ],
    image: '/src/assets/images/service_pipework_repairs_1795087801143.jpg',
    imageAlt: 'Neat parallel copper water supply pipes fitted with brass compression joints along a clean wall',
  },
  {
    id: 'external-plumbing',
    index: '05',
    name: 'External Plumbing',
    shortDescription:
      'Outdoor taps, exterior pipe runs, external repairs and weather-conscious outdoor plumbing upkeep.',
    detailedOverview:
      'Reliable external plumbing solutions including outdoor taps, exterior supply and waste pipework, repairs and seasonal maintenance around your property.',
    items: [
      'External pipework',
      'Outdoor plumbing maintenance',
      'External plumbing repairs',
    ],
    image: '/src/assets/images/service_external_plumbing_1795087802210.jpg',
    imageAlt: 'Brick residential exterior wall fitted with a brass outdoor tap, insulated copper pipe and neat downpipe',
  },
  {
    id: 'property-maintenance',
    index: '06',
    name: 'Property Maintenance',
    shortDescription:
      'General property upkeep, plumbing-related maintenance, routine inspections and timely repairs.',
    detailedOverview:
      'Dependable property maintenance support to help homeowners, landlords and property managers stay ahead of wear, leaks and practical repair tasks.',
    items: [
      'General property maintenance',
      'Plumbing-related maintenance',
      'Maintenance inspections and repairs',
    ],
    image: '/src/assets/images/service_property_maintenance_1795087801748.jpg',
    imageAlt: 'Well-maintained home interior featuring a fitted vertical white radiator and chrome thermostatic valve',
  },
];

// Clearly marked illustrative photography until verified JTR completed project images are supplied.
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-bathroom-suite',
    title: 'Modern Bathroom Plumbing',
    category: 'Kitchen & Bath',
    relatedService: 'Bathroom Plumbing',
    caption: 'Freestanding bath filler, concealed pipework and clean bathroom finish.',
    image: '/src/assets/images/gallery_modern_bathroom_1795087801616.jpg',
    imageAlt: 'Illustrative example of a modern residential bathroom freestanding bath and matte black floor-mounted tap',
    isIllustrative: true,
  },
  {
    id: 'gal-kitchen-sink',
    title: 'Kitchen Sink & Tap Replacement',
    category: 'Kitchen & Bath',
    relatedService: 'Kitchen Plumbing',
    caption: 'Brushed nickel pull-out mixer tap installed cleanly on a Belfast sink.',
    image: '/src/assets/images/gallery_kitchen_tap_1795087802167.jpg',
    imageAlt: 'Illustrative example of a brushed nickel kitchen mixer tap fitted over a ceramic Belfast sink',
    isIllustrative: true,
  },
  {
    id: 'gal-copper-manifold',
    title: 'Internal Pipework & Valves',
    category: 'Internal Plumbing',
    relatedService: 'Pipework & Leak Repairs',
    caption: 'Symmetrical copper pipe runs, labelled isolation valves and neat manifold layout.',
    image: '/src/assets/images/gallery_copper_pipework_1795087801143.jpg',
    imageAlt: 'Illustrative example of organised copper water pipes and brass isolation valves inside a cupboard',
    isIllustrative: true,
  },
  {
    id: 'gal-leak-repair',
    title: 'Under-Sink Joint & Leak Repair',
    category: 'Internal Plumbing',
    relatedService: 'General Plumbing',
    caption: 'Tidy brass isolation valve and pipe joint repair carried out with floor protection.',
    image: '/src/assets/images/gallery_plumbing_repair_1795087801504.jpg',
    imageAlt: 'Illustrative example of copper pipe repair with brass compression fittings and plumbing tools on a clean cloth',
    isIllustrative: true,
  },
  {
    id: 'gal-external-pipework',
    title: 'External Waste & Drainage Pipework',
    category: 'External & Maintenance',
    relatedService: 'External Plumbing',
    caption: 'Cleanly bracketed exterior waste pipework running neatly into an outdoor gulley.',
    image: '/src/assets/images/gallery_exterior_clean_1795088052911.jpg',
    imageAlt: 'Illustrative example of black exterior waste pipework and drainage grate along a residential wall',
    isIllustrative: true,
  },
  {
    id: 'gal-utility-maintenance',
    title: 'Utility Room & Property Maintenance',
    category: 'External & Maintenance',
    relatedService: 'Property Maintenance',
    caption: 'Neatly plumbed utility valves, sink fittings and tidy property maintenance finish.',
    image: '/src/assets/images/gallery_home_maintenance_1795087801354.jpg',
    imageAlt: 'Illustrative example of a residential utility room with newly plumbed washing machine valves and sink',
    isIllustrative: true,
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Make an Enquiry',
    description: 'Tell us what plumbing or maintenance assistance you need.',
  },
  {
    number: '02',
    title: 'Discuss Your Requirements',
    description: 'We review your request and discuss the details.',
  },
  {
    number: '03',
    title: 'Arrange Your Service',
    description: 'Agree on a suitable appointment and the next steps.',
  },
  {
    number: '04',
    title: 'Get the Job Done',
    description: 'Have your plumbing or maintenance needs attended to.',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-services',
    question: 'What plumbing and maintenance services do you provide?',
    answer:
      'JTR Plumbing and Maintenance covers all aspects of internal and external plumbing and maintenance. Typical enquiries include general plumbing repairs, bathroom and kitchen plumbing, pipework and leak repairs, external pipework and general property maintenance. Contact us with your specific job so we can confirm how we can help.',
  },
  {
    id: 'faq-internal-external',
    question: 'Do you handle both internal and external plumbing?',
    answer:
      'Yes. We handle both internal and external plumbing and maintenance work—from sinks, taps, toilets, showers and internal pipework to outdoor taps and exterior pipe runs.',
  },
  {
    id: 'faq-request',
    question: 'How can I request a plumbing service?',
    answer:
      'You can complete the Service Request form on this website, message us directly on WhatsApp, or call 07851 564381. Let us know what you need and we will follow up to discuss the next steps.',
  },
  {
    id: 'faq-quote',
    question: 'Can I request a quote before booking?',
    answer:
      'Yes. You are welcome to get in touch with details of your plumbing or maintenance requirements before committing to an appointment. Sharing clear details—and photos where helpful—allows us to discuss the work properly with you.',
  },
  {
    id: 'faq-contact',
    question: 'How do I contact JTR Plumbing and Maintenance?',
    answer:
      'You can call or message JTR Plumbing and Maintenance on 07851 564381, use the direct WhatsApp buttons on this website, or submit an enquiry through our online service request or contact forms.',
  },
  {
    id: 'faq-photos',
    question: 'Can I send photographs of my plumbing problem?',
    answer:
      'Yes. Sending photos of a leaking joint, tap, fixture or pipework area is very helpful when describing an issue. You can attach reference photos in the service request form or send them directly in your WhatsApp chat with us on 07851 564381.',
  },
  {
    id: 'faq-appointment',
    question: 'How do I arrange an appointment?',
    answer:
      'Once you submit an enquiry or contact us via phone or WhatsApp, we will review your requirements, discuss the details with you, and agree on a convenient appointment time. Please note that sending an online or WhatsApp enquiry does not automatically confirm a booking until we confirm it directly with you.',
  },
];

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Our Work', href: '#our-work' },
  { label: 'FAQs', href: '#faqs' },
  { label: 'Contact', href: '#contact' },
] as const;
