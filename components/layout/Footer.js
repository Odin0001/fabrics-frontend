'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin } from 'lucide-react'
import { useLang, t, ui } from '@/contexts/LangContext'
import { CATEGORIES } from '@/lib/utils'

const INSTAGRAM_URL = 'https://www.instagram.com/artiadesign.sa?igsh=MTV3dDRjaWhpbDY5cg=='
const PHONE = '0508999109'
const EMAIL = 'rafat@artiaconsulting.com'

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

export default function Footer() {
  const { lang } = useLang()

  return (
    <footer className="bg-ink text-canvas/70" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="md:col-span-1">
          <Image
            src="/logo.jpeg"
            alt="Artia Design"
            width={160}
            height={48}
            className="h-12 w-auto object-contain mb-4"
          />
          <p className="text-sm leading-relaxed mb-4">{t(ui.footer.description, lang)}</p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="inline-flex items-center justify-center h-9 w-9 border border-canvas/20 hover:border-gold hover:text-gold transition-colors"
          >
            <InstagramIcon className="h-4 w-4" />
          </a>
        </div>

        {/* Collections */}
        <div>
          <h3 className="text-xs font-medium tracking-[0.15em] uppercase text-gold mb-4">
            {t(ui.footer.collections, lang)}
          </h3>
          <ul className="space-y-2">
            {CATEGORIES.map((cat) => (
              <li key={cat.value}>
                <Link href={`/products/${cat.slug}`} className="text-sm hover:text-canvas transition-colors">
                  {lang === 'ar' ? cat.label.ar : cat.label.en}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-xs font-medium tracking-[0.15em] uppercase text-gold mb-4">
            {t(ui.footer.company, lang)}
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about"    className="hover:text-canvas transition-colors">{t(ui.footer.aboutUs,   lang)}</Link></li>
            <li><Link href="/services" className="hover:text-canvas transition-colors">{t(ui.footer.services,  lang)}</Link></li>
            <li><Link href="/projects" className="hover:text-canvas transition-colors">{t(ui.footer.projects,  lang)}</Link></li>
            <li><Link href="/clients"  className="hover:text-canvas transition-colors">{t(ui.footer.clients,   lang)}</Link></li>
            <li><Link href="/contact"  className="hover:text-canvas transition-colors">{t(ui.footer.contact,   lang)}</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xs font-medium tracking-[0.15em] uppercase text-gold mb-4">
            {t(ui.footer.contact, lang)}
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={`tel:${PHONE}`} className="flex items-center gap-2 hover:text-canvas transition-colors">
                <Phone className="h-4 w-4 shrink-0" />
                <span dir="ltr">{PHONE}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 hover:text-canvas transition-colors">
                <Mail className="h-4 w-4 shrink-0" />
                <span dir="ltr">{EMAIL}</span>
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{t(ui.footer.address, lang)}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-canvas/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-canvas/40">
          <p>© {new Date().getFullYear()} ARTIA DESIGN. {t(ui.footer.rights, lang)}</p>
          <p>{t(ui.footer.crafted, lang)}</p>
        </div>
      </div>
    </footer>
  )
}
