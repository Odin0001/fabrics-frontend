'use client'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLang, t, ui } from '@/contexts/LangContext'

const services = [
  { en: 'Creative Design', ar: 'تصميم إبداعي' },
  { en: 'Efficient & Effective Planning', ar: 'تخطيط فعّال وكفؤ' },
  { en: 'Attention to details with quality materials', ar: 'الاهتمام بالتفاصيل مع مواد عالية الجودة' },
  { en: 'Upholstery', ar: 'التنجيد' },
  { en: 'All kinds of curtains', ar: 'جميع أنواع الستائر' },
  { en: 'Wallpaper installation', ar: 'تركيب ورق الجدران' },
  { en: 'Contract – Residential - Fabrics', ar: 'عقود – سكني – أقمشة' },
  { en: 'Furniture – Wallpaper – Stretch Fabrics', ar: 'أثاث – ورق جدران – أقمشة مشدودة' },
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc) => (
              <div key={svc.en} className="border border-border p-8 hover:border-gold transition-all duration-300 group bg-canvas">
                <h3 className="font-display text-2xl font-light text-ink group-hover:text-gold transition-colors">
                  {rtl ? svc.ar : svc.en}
                </h3>
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
