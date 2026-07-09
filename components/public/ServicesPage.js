'use client'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLang, t, ui } from '@/contexts/LangContext'

const services = [
  {
    en: 'Wallcoverings',
    ar: 'ورق الجدران',
    descEn: 'Premium wallcovering solutions that enrich interiors with texture, elegance, and character. We supply and install a wide range of natural, vinyl, acoustic, fabric, and custom wallcoverings for luxury residential and commercial projects.',
    descAr: 'نوفر ونركب مختلف أنواع ورق الجدران الفاخر، بما يشمل الطبيعي، والفينيل، والصوتي، والقماشي، والحلول المخصصة، لنمنح كل مساحة طابعاً مميزاً يعكس هوية المشروع.',
  },
  {
    en: 'Curtains',
    ar: 'الستائر',
    descEn: "Custom-made curtain solutions designed to balance aesthetics, privacy, light control, and functionality. Manufactured with precision and tailored to each project's unique requirements.",
    descAr: 'تصميم وتصنيع وتركيب الستائر حسب الطلب، بما يحقق التوازن بين الجمال، والخصوصية، والتحكم بالإضاءة، مع تنفيذ دقيق يناسب مختلف المشاريع الفاخرة.',
  },
  {
    en: 'Upholstery',
    ar: 'التنجيد',
    descEn: 'Premium upholstery fabrics and professional furniture restoration that combine lasting durability with refined comfort and timeless elegance.',
    descAr: 'توريد أقمشة التنجيد الفاخرة وتجديد الأثاث بحرفية عالية، مع الجمع بين الجودة، والمتانة، والأناقة في كل قطعة.',
  },
  {
    en: 'Project Supply',
    ar: 'توريد المشاريع',
    descEn: 'Reliable supply solutions for hotels, villas, palaces, offices, restaurants, and commercial developments, supported by efficient logistics and professional project coordination.',
    descAr: 'حلول متكاملة لتوريد المواد الداخلية للمشاريع السكنية والتجارية، بما في ذلك الفلل، والقصور، والفنادق، والمكاتب، والمطاعم، مع إدارة احترافية لعمليات التوريد والتنفيذ.',
  },
]

export default function ServicesPage() {
  const { lang } = useLang()
  const rtl = lang === 'ar'

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden" dir={rtl ? 'rtl' : 'ltr'}>
        <div className="absolute inset-0 bg-canvas">
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'repeating-linear-gradient(0deg,#1C1917 0,transparent 1px,transparent 79px,#1C1917 80px),repeating-linear-gradient(90deg,#1C1917 0,transparent 1px,transparent 79px,#1C1917 80px)' }}
          />
        </div>
        <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-gold to-transparent opacity-60" />
        <div className="relative max-w-7xl mx-auto px-6">
          <p className="section-label mb-6 animate-fade-up">{t(ui.services.eyebrow, lang)}</p>
          <h1 className="font-display text-6xl md:text-7xl font-light text-ink leading-none mb-8 animate-fade-up animate-delay-100 whitespace-pre-line">
            {t(ui.services.heading, lang)}
          </h1>
          <p className="text-muted text-lg leading-relaxed max-w-xl animate-fade-up animate-delay-200">
            {t(ui.services.sub, lang)}
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-24 bg-surface" dir={rtl ? 'rtl' : 'ltr'}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((svc) => (
              <div key={svc.en} className="border border-border p-8 hover:border-gold transition-all duration-300 group bg-canvas">
                <h3 className="font-display text-2xl font-light text-ink group-hover:text-gold transition-colors mb-4">
                  {rtl ? svc.ar : svc.en}
                </h3>
                <p className="text-muted leading-relaxed">
                  {rtl ? svc.descAr : svc.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-ink" dir={rtl ? 'rtl' : 'ltr'}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="section-label text-gold mb-4">{t(ui.services.ctaLabel, lang)}</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-canvas mb-6">
            {t(ui.services.ctaHead, lang)}
          </h2>
          <p className="text-canvas/60 max-w-lg mx-auto mb-10 leading-relaxed">
            {t(ui.services.ctaBody, lang)}
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/contact" className="btn-primary">
              {t(ui.services.ctaContact, lang)} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/products" className="btn-secondary border-canvas/30 text-canvas hover:bg-canvas hover:text-ink">
              {t(ui.services.ctaBrowse, lang)}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
