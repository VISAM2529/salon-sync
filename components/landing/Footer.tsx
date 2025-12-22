'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';

interface SocialIconProps {
  href: string;
  label: string;
  children: ReactNode;
}

function SocialIcon({ href, label, children }: SocialIconProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-white hover:bg-purple-600 hover:scale-110 transition"
    >
      <span className="text-lg">{children}</span>
    </a>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-2xl font-bold text-white">TrimSetGo</span>
            </div>

            <p className="text-slate-400 mb-6">
              The smart way to manage your salon. Streamline bookings, reduce calls, and delight customers.
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap gap-4">
              <SocialIcon href="https://www.facebook.com/" label="Facebook">
                <FaFacebookF />
              </SocialIcon>

              <SocialIcon href="https://x.com/" label="Twitter">
                <FaTwitter />
              </SocialIcon>

              <SocialIcon
                href="https://www.instagram.com/trimsetgo/"
                label="Instagram"
              >
                <FaInstagram />
              </SocialIcon>

              <SocialIcon href="#" label="LinkedIn">
                <FaLinkedinIn />
              </SocialIcon>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-bold mb-4">Product</h3>
            <ul className="space-y-3">
              <li><Link href="#features" className="hover:text-purple-400">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-purple-400">Pricing</Link></li>
              <li><Link href="/demo" className="hover:text-purple-400">Demo</Link></li>
              <li><Link href="#faq" className="hover:text-purple-400">FAQ</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-bold mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="hover:text-purple-400">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-purple-400">Blog</Link></li>
              <li><Link href="/careers" className="hover:text-purple-400">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-purple-400">Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-bold mb-4">Support</h3>
            <ul className="space-y-3">
              <li><Link href="/help" className="hover:text-purple-400">Help Center</Link></li>
              <li><Link href="/docs" className="hover:text-purple-400">Documentation</Link></li>
              <li><Link href="/privacy" className="hover:text-purple-400">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-purple-400">Terms</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-slate-400">
            © {currentYear} TrimSetGo. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-purple-400">Privacy</Link>
            <Link href="/terms" className="hover:text-purple-400">Terms</Link>
            <Link href="/cookies" className="hover:text-purple-400">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
