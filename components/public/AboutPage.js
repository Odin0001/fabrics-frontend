'use client'
import { useLang, t, ui } from '@/contexts/LangContext'

const timeline = [
  { year: '2015', en: 'Founded with a vision to provide premium fabrics, wallpapers, and curtain solutions that blend exceptional quality with timeless design.', ar: 'تأسست مع رؤية لتقديم أقمشة وورق جدران وحلول أ demanding أن تجمع بين الجودة الاستثنائية والتصميم العصرية.' },
  { year: '2017', en: 'Built a strong reputation for delivering unique products, superior materials, and professional services driven by creativity, integrity, and craftsmanship.', ar: 'بنى سمعة قوية لتقديم منتجات فريدة، مواد عالية الجودة، وخدمات احترافية تُشغّلها الإبداع والنزاهة والحرفية.' },
  { year: '2020', en: 'Expanded our expertise by embracing the latest interior design trends and sourcing high-quality materials from trusted international partners.', ar: 'وسّعنا خبراتنا بتمثيل أحدث توجهات تصميم الداخلية وتوظيف مواد عالية الجودة من الشركاء الدوليين الموثوقين.' },
  { year: '2022', en: "Reinforced our commitment to supporting the ambitions of *Saudi Vision 2030* by delivering sustainable, innovative interior solutions aligned with the Kingdom's evolving standards for quality, design, and environmental responsibility.", ar: 'أكّدنا التزامنا بدعم أحلام *رؤية السعودية 2030* من خلال تقديم حلول ديكور داخلية مستدامة ومبتكرة تتماشى مع معايير المملكة المتقدمة في الجودة والتصميم والمسؤولية البيئية.' },
  { year: '2026', en: 'Established ourselves as a trusted partner for interior designers, architects, and homeowners, delivering innovative interior solutions that enhance spaces while reducing environmental impact.', ar: 'أقمنا أنفسنا كشريك موثوق لتصميمات الداخلية، والمهندسين، والمساكن، من خلال تقديم حلول ديكور داخلية مبتكرة تحسن المساحات وتقلل من التأثير البيئي.' },
]

const values = [
  {
    icon: '🎨',
    en: { title: 'Design First', body: 'Every fabric is selected for its aesthetic merit before anything else. Beauty is non-negotiable.' },
    ar: { title: 'التصميم أولاً', body: 'كل قماش يُختار أولاً لقيمته الجمالية. الجمال ليس قابلاً للتفاوض.' },
  },
  {
    icon: '🤝',
    en: { title: 'Trusted Partnerships', body: 'We build long-term relationships with mills who share our commitment to quality and ethics.' },
    ar: { title: 'شراكات موثوقة', body: 'نبني علاقات طويلة الأمد مع الموردين الذين يشاركوننا الالتزام بالجودة والأخلاق.' },
  },
  {
    icon: '🌱',
    en: { title: 'Responsible Sourcing', body: 'We hold ourselves accountable for the environmental and social impact of every material we carry.' },
    ar: { title: 'مصادر مسؤولة', body: 'نحاسب أنفسنا على التأثير البيئي والاجتماعي لكل مادة نتعامل بها.' },
  },
  {
    icon: '💡',
    en: { title: 'Expertise', body: 'Decades of textile knowledge at your service — from specification to installation guidance.' },
    ar: { title: 'الخبرة', body: 'عقود من المعرفة بالمنسوجات في خدمتك — من التخصيص إلى توجيه التركيب.' },
  },
]

const stats = [
  { num: '500+', key: 'statsDesign' },
  { num: '15+',  key: 'statsYears' },
  { num: '2,000+', key: 'statsProducts' },
  { num: '20+',  key: 'statsPartners' },
]

export default function AboutPage() {
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
          <p className="section-label mb-6 animate-fade-up">{t(ui.about.eyebrow, lang)}</p>
          <h1 className="font-display text-6xl md:text-7xl font-light text-ink leading-none mb-8 animate-fade-up animate-delay-100 whitespace-pre-line">
            {t(ui.about.heading, lang)}
          </h1>
          <p className="text-muted text-lg leading-relaxed max-w-xl animate-fade-up animate-delay-200">
            {t(ui.about.sub, lang)}
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-ink" dir={rtl ? 'rtl' : 'ltr'}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="section-label text-gold mb-4">{t(ui.about.missionLabel, lang)}</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-canvas mb-6">
              {t(ui.about.missionHead, lang)}
            </h2>
            <p className="text-canvas/70 leading-relaxed mb-4">{t(ui.about.missionP1, lang)}</p>
            <p className="text-canvas/70 leading-relaxed">{t(ui.about.missionP2, lang)}</p>
          </div>
          <div className="grid grid-cols-2 gap-px bg-canvas/10">
            {stats.map((s) => (
              <div key={s.num} className="bg-ink p-8 text-center">
                <p className="font-display text-5xl font-light text-gold mb-2">{s.num}</p>
                <p className="text-xs tracking-widest uppercase text-canvas/50">{t(ui.about[s.key], lang)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24" dir={rtl ? 'rtl' : 'ltr'}>
        <div className="max-w-7xl mx-auto px-6">
          <p className="section-label mb-4">{t(ui.about.journeyLabel, lang)}</p>
          <h2 className="font-display text-4xl font-light text-ink mb-16">{t(ui.about.journeyHead, lang)}</h2>
          <div className="relative">
            <div className="absolute left-16 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-12">
              {timeline.map((item) => (
                <div key={item.year} className="flex gap-8 items-start">
                  <div className="w-32 shrink-0 text-right">
                    <span className="font-display text-2xl text-gold">{item.year}</span>
                  </div>
                  <div className="w-3 h-3 rounded-full bg-gold shrink-0 mt-2 relative z-10" />
                  <p className="text-muted leading-relaxed pt-0.5">{rtl ? item.ar : item.en}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-surface" dir={rtl ? 'rtl' : 'ltr'}>
        <div className="max-w-7xl mx-auto px-6">
          <p className="section-label mb-4">{t(ui.about.valuesLabel, lang)}</p>
          <h2 className="font-display text-4xl font-light text-ink mb-16">{t(ui.about.valuesHead, lang)}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v) => (
              <div key={v.en.title} className="border border-border p-8 hover:border-gold transition-colors duration-300 group">
                <span className="text-3xl mb-4 block">{v.icon}</span>
                <h3 className="font-display text-xl text-ink mb-3 group-hover:text-gold transition-colors">
                  {rtl ? v.ar.title : v.en.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">{rtl ? v.ar.body : v.en.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
