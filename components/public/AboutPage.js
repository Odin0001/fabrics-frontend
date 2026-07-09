'use client'
import { useLang, t, ui } from '@/contexts/LangContext'

const timeline = [
  { year: '2015', en: 'Founded with a vision to provide premium fabrics, wallpapers, and curtain solutions that blend exceptional quality with timeless design.', ar: 'انطلقت رحلتنا برؤية واضحة لتوفير الأقمشة الفاخرة، وأغطية الجدران، وحلول الستائر التي تجمع بين الجودة الاستثنائية والتصاميم الخالدة.' },
  { year: '2017', en: 'Built a strong reputation for delivering unique products, superior materials, and professional services driven by creativity, integrity, and craftsmanship.', ar: 'رسّخنا مكانتنا من خلال تقديم منتجات مميزة، ومواد عالية الجودة، وخدمات احترافية ترتكز على الإبداع، والنزاهة، وإتقان الحِرفة.' },
  { year: '2020', en: 'Expanded our expertise by embracing the latest interior design trends and sourcing high-quality materials from trusted international partners.', ar: 'وسعنا نطاق خبراتنا بمواكبة أحدث توجهات التصميم الداخلي، واختيار أجود المواد من شركاء دوليين موثوقين.' },
  { year: '2022', en: "Reinforced our commitment to supporting the ambitions of *Saudi Vision 2030* by delivering sustainable, innovative interior solutions aligned with the Kingdom's evolving standards for quality, design, and environmental responsibility.", ar: 'عززنا التزامنا بدعم من رؤية السعودية 2030 عبر تقديم حلول داخلية مستدامة ومبتكرة، تتماشى مع تطلعات المملكة نحو أعلى معايير الجودة، والتصميم، والمسؤولية البيئية.' },
  { year: '2026', en: 'Established ourselves as a trusted partner for interior designers, architects, and homeowners, delivering innovative interior solutions that enhance spaces while reducing environmental impact.', ar: 'أصبحنا شريكًا موثوقًا لمصممي الديكور الداخلي، والمهندسين المعماريين، وأصحاب المنازل، من خلال تقديم حلول داخلية مبتكرة ترتقي بجمال المساحات، وتسهم في الحد من الأثر البيئي.' },
]

const values = [
  {
    icon: '🎨',
    en: { title: 'Curated for Exceptional Interiors', body: 'A refined selection of wallcoverings and fabrics chosen to elevate distinctive spaces.' },
    ar: { title: 'التصميم أولاً', body: 'كل قماش يُختار أولاً لقيمته الجمالية. الجمال ليس قابلاً للتفاوض.' },
  },
  {
    icon: '🤝',
    en: { title: 'Built Around Design Intent', body: 'Every material recommendation is guided by the project’s vision, character, and desired experience.' },
    ar: { title: 'شراكات موثوقة', body: 'نبني علاقات طويلة الأمد مع الموردين الذين يشاركوننا الالتزام بالجودة والأخلاق.' },
  },
  {
    icon: '🌱',
    en: { title: 'Reliable From Selection to Installation', body: 'A seamless process supported by clear communication, dependable timelines, and professional execution.' },
    ar: { title: 'مصادر مسؤولة', body: 'نحاسب أنفسنا على التأثير البيئي والاجتماعي لكل مادة نتعامل بها.' },
  },
  {
    icon: '💡',
    en: { title: 'Attention to Every Detail', body: 'Because luxury is defined not only by materials, but by how they are delivered and installed.' },
    ar: { title: 'الخبرة', body: 'عقود من المعرفة بالمنسوجات في خدمتك — من التخصيص إلى توجيه التركيب.' },
  },
  {
    icon: '💡',
    en: { title: 'A Trusted Project Partner', body: 'Supporting designers, architects, and contractors with responsive service and practical solutions.' },
    ar: { title: 'الخبرة', body: 'عقود من المعرفة بالمنسوجات في خدمتك — من التخصيص إلى توجيه التركيب.' },
  },
  {
    icon: '💡',
    en: { title: 'Quality Without Compromise', body: 'Premium materials, skilled craftsmanship, and a commitment to excellence at every stage.' },
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
          <p className="text-muted text-justify text-lg leading-relaxed max-w-xl animate-fade-up animate-delay-200">
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
