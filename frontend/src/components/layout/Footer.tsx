'use client'

import Link from 'next/link'
import { Anchor, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="bg-neutral text-neutral-content">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Anchor className="w-6 h-6 text-primary-content" />
              </div>
              <span className="font-bold text-neutral-content">CheckThatBoat</span>
            </div>
            <p className="text-sm text-neutral-content/70">{t.footer.tagline}</p>
          </div>
          <div>
            <h4 className="text-neutral-content font-bold mb-4">{t.footer.product}</h4>
            <ul className="space-y-2 text-sm text-neutral-content/70">
              <li><Link href="#features" className="hover:text-primary transition">{t.footer.features}</Link></li>
              <li><Link href="#pricing" className="hover:text-primary transition">{t.footer.pricing}</Link></li>
              <li><Link href="#security" className="hover:text-primary transition">{t.footer.security}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-neutral-content font-bold mb-4">{t.footer.company}</h4>
            <ul className="space-y-2 text-sm text-neutral-content/70">
              <li><Link href="#about" className="hover:text-primary transition">{t.footer.about}</Link></li>
              <li><Link href="#blog" className="hover:text-primary transition">{t.footer.blog}</Link></li>
              <li><Link href="#contact" className="hover:text-primary transition">{t.footer.contact}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-neutral-content font-bold mb-4">{t.footer.legal}</h4>
            <ul className="space-y-2 text-sm text-neutral-content/70">
              <li><Link href="#privacy" className="hover:text-primary transition">{t.footer.privacy}</Link></li>
              <li><Link href="#terms" className="hover:text-primary transition">{t.footer.terms}</Link></li>
              <li><Link href="#cookies" className="hover:text-primary transition">{t.footer.cookies}</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-neutral-content/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-neutral-content/50">{t.footer.rights}</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-neutral-content/50 hover:text-primary transition"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="text-neutral-content/50 hover:text-primary transition"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="text-neutral-content/50 hover:text-primary transition"><Linkedin className="w-5 h-5" /></a>
            <a href="#" className="text-neutral-content/50 hover:text-primary transition"><Instagram className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
