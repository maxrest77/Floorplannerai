export default function Footer() {
  const navigationLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Login", href: "/login" },
  ];

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <footer
        className="bg-[#1C2B25] py-16 px-6"
        style={{ fontFamily: "Inter, system-ui, sans-serif" }}
      >
        <div className="max-w-[1200px] mx-auto">
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Logo and tagline */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-[#C2A14A] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">FP</span>
                </div>
                <span 
                  className="text-white font-semibold text-xl"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  FloorPlan AI
                </span>
              </div>
              
              <p
                className="text-[#C2A14A] text-lg font-medium mb-4"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Smart Design. Timeless Living.
              </p>
              
              <p className="text-white/70 text-base leading-relaxed max-w-[400px]">
                Revolutionizing architectural design with AI-powered floor planning tools 
                that blend innovation with precision craftsmanship.
              </p>
            </div>

            {/* Navigation links */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-6">Navigation</h3>
              <nav className="space-y-3">
                {navigationLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block text-white/70 hover:text-[#C2A14A] transition-colors duration-150 text-base"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>

            {/* Contact & Support */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-6">Support</h3>
              <div className="space-y-3">
                <a
                  href="mailto:support@floorplanai.com"
                  className="block text-white/70 hover:text-[#C2A14A] transition-colors duration-150 text-base"
                >
                  Support
                </a>
                <a
                  href="/docs"
                  className="block text-white/70 hover:text-[#C2A14A] transition-colors duration-150 text-base"
                >
                  Documentation
                </a>
                <a
                  href="/api"
                  className="block text-white/70 hover:text-[#C2A14A] transition-colors duration-150 text-base"
                >
                  API
                </a>
                <a
                  href="/community"
                  className="block text-white/70 hover:text-[#C2A14A] transition-colors duration-150 text-base"
                >
                  Community
                </a>
              </div>
            </div>
          </div>

          {/* Bottom footer */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Copyright */}
              <div className="text-white/60 text-sm">
                © 2024 FloorPlan AI. All rights reserved.
              </div>

              {/* Legal links */}
              <div className="flex space-x-6">
                <a
                  href="/privacy"
                  className="text-white/60 hover:text-white transition-colors duration-150 text-sm"
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms"
                  className="text-white/60 hover:text-white transition-colors duration-150 text-sm"
                >
                  Terms of Service
                </a>
                <a
                  href="/cookies"
                  className="text-white/60 hover:text-white transition-colors duration-150 text-sm"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}