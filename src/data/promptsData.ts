import { PromptItem } from '../types';

export const PROMPT_CATEGORIES = [
  { id: 'all', nameAr: 'جميع البرومبتات (All Prompts)' },
  { id: 'البرومبت الرئيسي', nameAr: 'البرومبت الرئيسي الشامل 🌟' },
  { id: 'البناء والأساسات', nameAr: 'البناء والأساسات التقنية 🛠️' },
  { id: 'التصميم والهوية', nameAr: 'التصميم والهوية البصرية 🎨' },
  { id: 'الواجهة الرئيسية', nameAr: 'الواجهة الرئيسية والهيرو 🚀' },
  { id: 'التسويق والإعلانات', nameAr: 'التسويق وحملات السوشيال 📱' },
];

export const PROMPTS_LIST: PromptItem[] = [
  {
    id: 'master-prompt',
    title: '🌟 Master Prompt: Google Flow Studio / AI Studio (الشامل)',
    category: 'البرومبت الرئيسي',
    isMaster: true,
    description: 'البرومبت الكامل لبناء منصة مطعم بطروخ للمأكولات البحرية بهويتها الشبابية المصرية ومنظومة الطلب المباشر عبر الواتساب.',
    promptText: `Act as a world-class Full-Stack Web Developer, UI/UX Designer, and Marketing Strategist specialized in Egyptian F&B and high-converting restaurant landing pages.

Build a high-performance, mobile-first, conversion-focused web application for "بطروخ | Batroukh Seafood Restaurant" (بطروخ هيخليك صاروخ) located in Dokki, Giza.

Key Brand Identity:
- Brand Name: بطروخ للمأكولات البحرية (Batroukh Seafood)
- Slogan: "بطروخ هيخليك صاروخ" 🚀
- Tone: Energetic, youthful, authentic Egyptian street vibes, bold seafood humor (فسفور، صواريخ، طواجن نارية).
- Color Palette: Deep marine navy (#030712, #0f172a), glowing saffron/amber (#f59e0b, #fbbf24), fiery coral-red (#ef4444), fresh emerald green accents (#10b981).

Core Features & Pages:
1. RTL Arabic First (Cairo / Alexandria Typography).
2. Hero Section with dynamic punchlines, 24/7 delivery badge in Dokki & Giza, instant CTA buttons (WhatsApp + Call).
3. "احسب جرعة الفسفور" (Interactive Phosphorus Booster Meal Calculator).
4. Interactive Live Menu with category filters, instant keyword search, cooking styles selection (سنجاري، مقلي، مشوي زيت وليمون، طاجن بالكريمة), and add-to-cart.
5. High-converting Deals & Offers section with countdown timers and promo code support.
6. Seamless Cart & Checkout Drawer calculating totals and dispatching formatted structured orders directly to WhatsApp.
7. Local SEO Architecture targeting Dokki, Mohandessin, and Giza keywords with Schema.org Restaurant JSON-LD.
8. Interactive Google Maps location preview with 1-click directions & location sharing.
9. Floating sticky WhatsApp & Call action bar with pulsating micro-animations for mobile.
10. Built-in Prompt Kit & Marketing Ad Journey Integration.`,
  },
  {
    id: 'prompt-project-setup',
    title: '1. Prompt بناء وهيكل المشروع (Project Setup)',
    category: 'البناء والأساسات',
    description: 'إعداد البيئة التقنية React + Vite + Tailwind CSS + TypeScript مع دعم RTL والأيقونات والخطوط العربية.',
    promptText: `Create a modern React 18+ Vite TypeScript project configured with Tailwind CSS v4 and RTL layout.
- Configure index.html with <html lang="ar" dir="rtl">.
- Embed Google Fonts: "Cairo" and "Alexandria" with weights 400, 600, 700, 800, 900.
- Install lucide-react for iconography and motion for smooth transitions.
- Configure structured metadata for local SEO (Dokki, Giza Seafood restaurant).
- Set up a clean modular architecture: /src/components, /src/data, /src/types.`,
  },
  {
    id: 'prompt-ui-design',
    title: '2. Prompt تصميم واجهة المستخدم (UI/UX Design)',
    category: 'التصميم والهوية',
    description: 'توجيهات الهوية البصرية، تناسق الألوان البحرية العميقة مع الإضاءات الذهبية والفوسفورية وتجربة المستخدم.',
    promptText: `Design a bold, appetizing, dark-themed seafood UI.
- Use deep oceanic dark slate (#020617, #0f172a) as base canvas.
- Accent with warm golden amber (#f59e0b) and energetic coral red (#ef4444).
- Apply high-contrast cards with subtle border highlights (border-slate-800/80).
- Incorporate playful badges: "قنبلة فسفور ⚡", "الأعلى طلباً 🔥", "طازة صيد اليوم 🎣", "صاروخ أصلي 🚀".
- Ensure minimum touch targets of 44px on mobile devices and 100% responsive grids.`,
  },
  {
    id: 'prompt-home-hero',
    title: '3. Prompt الهيدر والهيرو سيكشن (Home & Hero Section)',
    category: 'الواجهة الرئيسية',
    description: 'صناعة انطباع أول فوري ينقل جو المطعم الكوميدي مع زر الاتصال والواتساب وتقييمات العملاء.',
    promptText: `Build the Hero Section for Batroukh Seafood.
- Large playful headline: "بطروخ هيخليك صاروخ! 🚀" with animated rocket micro-interactions.
- Subtitle emphasizing fresh daily catch, Alexandria seasoning, and 24/7 delivery in Dokki and Giza.
- Prominent direct WhatsApp order button styled in official green with pulsating glow.
- Quick Phosphorus Calculator and Menu jump CTA buttons.
- Sticky Top Navbar with Dokki branch address, live 24h status, cart counter badge, and direct call button.`,
  },
  {
    id: 'prompt-marketing-ads',
    title: '4. Prompt الحملات الإعلانية ومحتوى السوشيال ميديا (Social Media & Ads)',
    category: 'التسويق والإعلانات',
    description: 'كتابة إعلانات فيسبوك، تيك توك، وانستجرام بلهجة مصرية جريئة تناسب شباب الدقي والجامعات.',
    promptText: `Generate high-converting social media ad copy and TikTok video scripts for Batroukh Seafood Restaurant in Dokki.
- Hook: "مفلس ومحتاج طاقة تعدل الدماغ؟ بطروخ هيخليك صاروخ! 🚀🦐"
- Tone: Humorous Egyptian slang, relatable college and work-life situations.
- Features: "طواجن الفسفور اللي بتولع، ساندوتش الصاروخ المقرمش، ودليفري شغال معاك لحد الصبح 24 ساعة".
- Direct Call to Action (CTA): Click to order on WhatsApp with code SAROOKH22 for 22% discount!`,
  },
];

export const PROMPT_STUDIO_ITEMS = PROMPTS_LIST;
