'use client'

import Link from 'next/link'
import { Anchor, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <Anchor className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-white">BoatCheckPro</span>
            </div>
            <p className="text-sm">Professional boat inspection platform for marine enthusiasts.</p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#features" className="hover:text-primary-400 transition">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-primary-400 transition">Pricing</Link></li>
              <li><Link href="#security" className="hover:text-primary-400 transition">Security</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#about" className="hover:text-primary-400 transition">About Us</Link></li>
              <li><Link href="#blog" className="hover:text-primary-400 transition">Blog</Link></li>
              <li><Link href="#contact" className="hover:text-primary-400 transition">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#privacy" className="hover:text-primary-400 transition">Privacy Policy</Link></li>
              <li><Link href="#terms" className="hover:text-primary-400 transition">Terms of Service</Link></li>
              <li><Link href="#cookies" className="hover:text-primary-400 transition">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">© 2026 BoatCheckPro. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary-400 transition"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="hover:text-primary-400 transition"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="hover:text-primary-400 transition"><Linkedin className="w-5 h-5" /></a>
            <a href="#" className="hover:text-primary-400 transition"><Instagram className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
