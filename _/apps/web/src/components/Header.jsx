import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <header
        className="bg-[#F8F6F1] h-16 md:h-20 px-6 border-b border-[#E5E3DE]"
        style={{ fontFamily: "Inter, system-ui, sans-serif" }}
      >
        <div className="max-w-[1200px] mx-auto flex items-center justify-between h-full">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#C2A14A] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">FP</span>
            </div>
            <span
              className="text-[#1C2B25] font-semibold text-lg"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              FloorPlan AI
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-[#1C2B25] hover:text-[#C2A14A] transition-colors duration-150 font-medium text-base"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="/login"
              className="px-6 py-3 rounded-xl border border-[#1C2B25] text-[#1C2B25] font-medium text-sm hover:bg-[#1C2B25] hover:text-white transition-all duration-150"
            >
              Login
            </a>
            <a
              href="/start-designing"
              className="px-6 py-3 rounded-xl bg-[#1C2B25] hover:bg-[#0F1A13] text-white font-medium text-sm transition-colors duration-150"
            >
              Start Designing
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[#1C2B25]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-[#F8F6F1] border-b border-[#E5E3DE] z-50">
            <nav className="px-6 py-4 space-y-4">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-[#1C2B25] hover:text-[#C2A14A] transition-colors duration-150 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 space-y-3">
                <a
                  href="/login"
                  className="block w-full px-6 py-3 rounded-xl border border-[#1C2B25] text-[#1C2B25] font-medium text-sm text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </a>
                <a
                  href="/start-designing"
                  className="block w-full px-6 py-3 rounded-xl bg-[#1C2B25] text-white font-medium text-sm text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Start Designing
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
