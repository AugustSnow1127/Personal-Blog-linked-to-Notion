import Link from "next/link";
import Image from "next/image";

const BRAND = {
  APP_NAME_FULL: 'CraftShorts.ai',
  TAGLINE: 'AI-powered short video creation platform',
  COPYRIGHT: '© 2025 CraftShorts.ai. All rights reserved.',
};

const SITE = 'https://craftshorts.ai';

export default function LandingFooter() {
  return (
    <footer className="border-t border-purple-600/30 bg-black">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Left: Brand Section */}
          <div className="md:col-span-2">
            <a href={SITE} target="_blank" rel="noopener noreferrer" className="flex items-center w-fit mb-4">
              <Image
                src="/logo.svg"
                alt="CraftShorts Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="ml-2 text-lg font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                {BRAND.APP_NAME_FULL}
              </span>
            </a>
            <p className="text-purple-300 text-sm max-w-md">
              {BRAND.TAGLINE}
            </p>
          </div>

          {/* Middle: Quick Links */}
          <div>
            <h3 className="text-purple-200 font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={SITE + '/pricing'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-300 hover:text-purple-100 transition-colors text-sm"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Right: Legal Links */}
          <div>
            <h3 className="text-purple-200 font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={SITE + '/privacy'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-300 hover:text-purple-100 transition-colors text-sm"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href={SITE + '/terms'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-300 hover:text-purple-100 transition-colors text-sm"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href={SITE + '/refund'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-300 hover:text-purple-100 transition-colors text-sm"
                >
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact us */}
          <div>
            <h3 className="text-purple-200 font-semibold mb-4">Contact us</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={SITE + '/report'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-300 hover:text-purple-100 transition-colors text-sm"
                >
                  Report Issue
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="mt-8 pt-8 border-t border-purple-600/30">
          <p className="text-center text-purple-400 text-sm">
            {BRAND.COPYRIGHT}
          </p>
        </div>
      </div>
    </footer>
  );
}
