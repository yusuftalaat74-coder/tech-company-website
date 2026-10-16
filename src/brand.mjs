import {defaultMotion} from './motion-content.mjs';
// Duplicate this file for each company, then build with BRAND_FILE=src/your-brand.mjs.
export default {
  name: 'AFRICA TECH',
  motion: defaultMotion,
  shortName: 'AT',
  portfolio: ['Queen Secret', 'Wimbi', 'Dubai Restaurant', 'OTIA Hotel', 'AAFED', 'Switx Visions', 'West Wings', 'Senior Kofta', 'APEX Concentrates'], // Clear when cloning for another company.
  accent: '#d64520',
  accentBright: '#f15a2b',
  surface: '#f5f4ef',
  ink: '#171a18',
  email: 'info@africantech.si', // Contact address displayed in the site and email brief action.
  phone: '+27780400595', // International phone number, including +.
  whatsapp: '27780400595', // International digits only, without +. Hidden until configured.
  metaPixelId: '', // Meta Pixel ID (digits). Tracking loads only when set.
  ga4Id: '', // Google Analytics 4 ID, e.g. G-XXXXXXX. Loads only when set.
  bookingUrl: '', // Optional https calendar link. Hidden until configured.
  siteUrl: 'https://africantech.si', // Your final domain, e.g. https://example.com. Enables canonical URLs and sitemap.
  defaultLocale: 'en',
  locales: ['en', 'ar', 'fr', 'pt'],
  description: {
    en: 'Websites, mobile apps, business systems and cloud infrastructure. An African perspective. A global ambition.',
    fr: 'Sites web, applications mobiles, systèmes de gestion et cloud. Une vision africaine, une ambition mondiale.',
    pt: 'Sites, aplicações móveis, sistemas de gestão e cloud. Perspetiva africana, ambição global.',
    ar: 'مواقع وتطبيقات وأنظمة أعمال وبنية سحابية. برؤية أفريقية وطموح عالمي.'
  }
};
