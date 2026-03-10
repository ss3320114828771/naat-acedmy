import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Naats', href: '/naats' },
    { name: 'Contact', href: '/contact' },
    { name: 'Directions', href: '/directions' }
  ]

  const accountLinks = [
    { name: 'Login', href: '/login' },
    { name: 'Sign Up', href: '/signup' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Cart', href: '/cart' },
    { name: 'Wishlist', href: '/wishlist' },
    { name: 'Orders', href: '/orders' }
  ]

  const resourcesLinks = [
    { name: 'Information', href: '/information' },
    { name: 'Health Tips', href: '/health' },
    { name: 'Naat Collection', href: '/naats' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Support', href: '/support' }
  ]

  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://facebook.com/naatacademy',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
        </svg>
      )
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/naatacademy',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.05-4.55 4.55 0 .36.03.7.1 1.04-3.8-.2-7.17-2-9.42-4.78-.4.67-.63 1.45-.63 2.28 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.45-.38.1-.78.16-1.2.16-.3 0-.58-.03-.86-.08.58 1.8 2.26 3.1 4.25 3.14-1.56 1.22-3.52 1.95-5.66 1.95-.37 0-.73-.02-1.1-.07 2.03 1.3 4.44 2.06 7.04 2.06 8.44 0 13.05-7 13.05-13.05 0-.2 0-.4-.02-.6.9-.63 1.7-1.42 2.3-2.32z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/naatacademy',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      )
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com/naatacademy',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.5 6.2c-.3-1-1-1.8-2-2-1.8-.5-9-.5-9-.5s-7.2 0-9 .5c-1 .2-1.7 1-2 2-.5 1.8-.5 5.5-.5 5.5s0 3.7.5 5.5c.3 1 1 1.8 2 2 1.8.5 9 .5 9 .5s7.2 0 9-.5c1-.2 1.7-1 2-2 .5-1.8.5-5.5.5-5.5s0-3.7-.5-5.5zM9.6 15.6V8.4l6 3.6-6 3.6z"/>
        </svg>
      )
    },
    {
      name: 'WhatsApp',
      href: 'https://wa.me/1234567890',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.125.555 4.121 1.523 5.851L.047 24l6.275-1.484C7.953 22.797 9.915 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.905 0-3.683-.583-5.174-1.578l-.371-.22-3.727.881.998-3.574-.242-.395C3.318 16.075 2.75 14.09 2.75 12c0-5.1 4.15-9.25 9.25-9.25s9.25 4.15 9.25 9.25-4.15 9.25-9.25 9.25z"/>
        </svg>
      )
    }
  ]

  const paymentIcons = [
    { name: 'Visa', icon: '💳' },
    { name: 'Mastercard', icon: '💳' },
    { name: 'PayPal', icon: '📱' },
    { name: 'Apple Pay', icon: '🍎' }
  ]

  return (
    <footer className="relative mt-16 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 animate-gradient"></div>
      
      {/* Glowing stars overlay */}
      <div className="absolute inset-0">
        <div className="star-field"></div>
      </div>

      {/* Main footer content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-500 animate-pulse"></div>
              <h3 className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                  Naat Academy
                </span>
              </h3>
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed">
              Your premier destination for Islamic naats and educational products. 
              Spreading the love of Prophet Muhammad (PBUH) through beautiful voices.
            </p>
            
            {/* Administrator info */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
              <p className="text-pink-300 font-semibold">Administrator</p>
              <p className="text-white font-bold">Hafiz Sajid Syed</p>
              <a 
                href="mailto:sajid.syed@gmail.com" 
                className="text-blue-300 text-sm hover:text-pink-300 transition-colors"
              >
                sajid.syed@gmail.com
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 pb-2 border-b-2 border-pink-500 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-pink-300 transition-colors duration-300 flex items-center group"
                  >
                    <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 pb-2 border-b-2 border-blue-500 inline-block">
              My Account
            </h4>
            <ul className="space-y-2">
              {accountLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-blue-300 transition-colors duration-300 flex items-center group"
                  >
                    <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 pb-2 border-b-2 border-green-500 inline-block">
              Resources
            </h4>
            <ul className="space-y-2">
              {resourcesLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-green-300 transition-colors duration-300 flex items-center group"
                  >
                    <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Middle section with newsletter and social */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-8 border-t border-b border-white/20">
          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-white">
              Subscribe to Our Newsletter
            </h4>
            <p className="text-gray-300 text-sm">
              Get latest naats, products, and Islamic content delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-lg text-white placeholder-gray-400 border border-white/20 focus:border-pink-500 outline-none transition-all"
              />
              <button className="button-glow px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold hover:from-purple-500 hover:to-pink-500 transition-all duration-300">
                Subscribe
              </button>
            </form>
          </div>

          {/* Social & Payment */}
          <div className="space-y-4">
            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Follow Us</h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-110 hover:rotate-6"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">We Accept</h4>
              <div className="flex flex-wrap gap-3">
                {paymentIcons.map((payment) => (
                  <div
                    key={payment.name}
                    className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-lg text-white border border-white/20 hover:border-pink-500 transition-all duration-300"
                  >
                    <span className="mr-2">{payment.icon}</span>
                    {payment.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div className="text-center md:text-left mb-4 md:mb-0">
            © {currentYear} Naat Academy. All rights reserved.
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/privacy" className="hover:text-pink-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-pink-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/shipping" className="hover:text-pink-300 transition-colors">
              Shipping Info
            </Link>
            <Link href="/returns" className="hover:text-pink-300 transition-colors">
              Returns
            </Link>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 15s ease infinite;
        }
        
        .star-field {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: transparent;
          animation: starField 20s linear infinite;
        }
        
        .star-field::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: radial-gradient(2px 2px at 20px 30px, #fff, rgba(0,0,0,0)),
                            radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)),
                            radial-gradient(2px 2px at 50px 160px, #fff, rgba(0,0,0,0)),
                            radial-gradient(2px 2px at 90px 40px, #fff, rgba(0,0,0,0)),
                            radial-gradient(2px 2px at 130px 80px, #fff, rgba(0,0,0,0)),
                            radial-gradient(2px 2px at 160px 120px, #fff, rgba(0,0,0,0));
          background-repeat: repeat;
          background-size: 200px 200px;
          opacity: 0.3;
          animation: twinkle 3s ease-in-out infinite;
        }
        
        @keyframes starField {
          0% { transform: translateY(0); }
          100% { transform: translateY(-200px); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        
        .button-glow {
          position: relative;
          overflow: hidden;
        }
        
        .button-glow::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            to bottom right,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0.3) 50%,
            rgba(255,255,255,0) 100%
          );
          transform: rotate(30deg);
          animation: shine 3s infinite;
        }
        
        @keyframes shine {
          0% { transform: translateX(-100%) rotate(30deg); }
          20% { transform: translateX(100%) rotate(30deg); }
          100% { transform: translateX(100%) rotate(30deg); }
        }
      `}</style>
    </footer>
  )
}