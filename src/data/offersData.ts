import { SpecialOffer } from '../types';
import heroImg from '../assets/images/batroukh_hero_seafood_1788219274003.jpg';
import tajineImg from '../assets/images/batroukh_tajine_dish_1788219288020.jpg';
import sandwichImg from '../assets/images/batroukh_rocket_sandwich_1788219304798.jpg';

export const SPECIAL_OFFERS: SpecialOffer[] = [
  {
    id: 'offer-1',
    title: 'عرض الصاروخ المزدوج 🚀 (وفر 140 ج)',
    subtitle: 'طاجن بطروخ الملكي + 2 شوربة سي فود + 2 ساندوتش صاروخ + لتر بيبسي',
    description: 'أقوى كومبو فسفوري لشخصين بأعلى جودة وأوفر سعر في الدقي والجيزة!',
    price: 490,
    oldPrice: 630,
    image: tajineImg,
    tag: 'خصم 22% لفترة محدودة',
    expiresInHours: 6,
    couponCode: 'SAROOKH22',
    itemsIncluded: [
      'طاجن بطروخ الملكي بالكريمة والبطارخ',
      '2 شوربة بطروخ الفسفورية بالكريمة',
      '2 ساندوتش صاروخ بطروخ كرانشي',
      '2 سلطة طحينة ورنجة + عيش بلدي مقمر',
    ],
  },
  {
    id: 'offer-2',
    title: 'عرض عتاولة البحر واللمة 👑 (وفر 250 ج)',
    subtitle: 'صينية صاروخ الفسفور العائلية (4-5 أفراد) + أم علي هدية',
    description: 'وليمة عزومات كاملة تشرفك قدام ضيوفك مع سمك دنيس، جمبري، سبيط، وطواجن!',
    price: 990,
    oldPrice: 1240,
    image: heroImg,
    tag: 'الأكثر توفيراً للمات',
    expiresInHours: 12,
    couponCode: 'MALIK100',
    itemsIncluded: [
      'كيلو سمك دنيس مشوي زيت وليمون',
      'نص كيلو جمبري مشوي على الفحم',
      'نص كيلو سبيط مقلي مقرمش',
      'طاجن بطروخ كريمة عائلي',
      '4 أرز صيادية + 4 شوربات سي فود',
      '2 طاجن أم علي بالقشطة هدية 🍨',
    ],
  },
  {
    id: 'offer-3',
    title: 'بوكس ساندوتشات السهرانين 🌙 (عرض الليل 24 ساعة)',
    subtitle: '4 ساندوتشات صاروخ متنوعة + بطاطس وليمون نعناع فريش',
    description: 'جوع نص الليل؟ بطروخ فاتح 24 ساعة دليفري لحد باب بيتك في الدقي والمهندسين والجيزة!',
    price: 380,
    oldPrice: 470,
    image: sandwichImg,
    tag: 'خدمة 24 ساعة',
    expiresInHours: 18,
    couponCode: 'NIGHT24',
    itemsIncluded: [
      '2 ساندوتش صاروخ بطروخ جمبري وسبيط',
      '1 ساندوتش حواوشي سي فود بالموتزاريلا',
      '1 ساندوتش جمبري كرسبي تارتار',
      '2 عصير ليمون نعناع مثلج فريش',
    ],
  },
];
