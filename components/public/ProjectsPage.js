'use client'
import { useLang, t, ui } from '@/contexts/LangContext'

const projects = [
  {
    id: 1,
    en: { title: 'Furnishing House Co.', body: 'Under the Supervision of SELA Consulting Co., Via Riyadh Project.' },
    ar: { title: 'منزل التجهيز', body: 'تحت إشراف شركة SELA Consulting Co., مشروع في الرياض.' },
  },
  {
    id: 2,
    en: { title: 'Buthaina Humaidy Interiors', body: 'Supply and Apply the High Quality of Fabrics & Install Curtains.' },
    ar: { title: 'ديكورات بوثينة حميدي', body: 'توفير وتطبيق أعلى جودة من الأقمشة وتركيب الستائر.' },
  },
  {
    id: 3,
    en: { title: 'Modern Building Leaders Co. MBL', body: 'Private complex – Curtains & Furniture.' },
    ar: { title: 'البناء الحديث قيادة شركات MBL', body: 'مجموعة مخصصة من الأقمشة والستائر والديكورات السكنية الخاصة.' },
  },
  {
    id: 4,
    en: { title: 'D9 Design', body: 'Private Royal Complex: Supply & Apply the High Quality of Fabrics & Install Curtains.' },
    ar: { title: 'تصميم D9', body: 'مجموعة مخصصة من الأقمشة والستائر والديكورات السكنية الخاصة.' },
  },
  {
    id: 5,
    en: { title: 'Bonafida ADV. Co.', body: 'Horse Track Event: Furniture, Fixtures, & Equipment (FF&E).' },
    ar: { title: 'شركة Bonafida ADV.', body: 'حدث ملعب الخيل: أثاث، وديكورات، ومعدات (FF&E).' },
  },
  {
    id: 6,
    en: { title: 'Craft Company AL Aula Royal Co.', body: 'Furniture, Fixtures, & Equipment. (FF&E)' },
    ar: { title: 'شركة Craft Company AL Aula Royal Co.', body: 'أثاث، وديكورات، ومعدات (FF&E).' },
  },
]

export default function ProjectsPage() {
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
          <p className="section-label mb-6 animate-fade-up">{t(ui.projects.eyebrow, lang)}</p>
          <h1 className="font-display text-6xl md:text-7xl font-light text-ink leading-none mb-8 animate-fade-up animate-delay-100 whitespace-pre-line">
            {t(ui.projects.heading, lang)}
          </h1>
          <p className="text-muted text-lg leading-relaxed max-w-xl animate-fade-up animate-delay-200">
            {t(ui.projects.sub, lang)}
          </p>
        </div>
      </section>

      {/* Projects grid */}
      <section className="py-16 bg-surface" dir={rtl ? 'rtl' : 'ltr'}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => {
              const content = rtl ? project.ar : project.en
              return (
                <div key={project.id} className="group border border-border hover:border-gold transition-all duration-300 overflow-hidden bg-canvas">
                  <div className="p-6">
                    <h3 className="font-display text-xl font-light text-ink mb-3 group-hover:text-gold transition-colors">
                      {content.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">{content.body}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
