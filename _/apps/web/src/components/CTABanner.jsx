export default function CTABanner() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <section className="py-16 md:py-20 px-6 bg-[#F8F6F1]">
        <div className="max-w-[800px] mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl leading-tight text-[#1C2B25] mb-6"
            style={{
              fontFamily: "Playfair Display, serif",
              letterSpacing: "-0.02em",
            }}
          >
            Bring your vision to life with{" "}
            <em className="text-[#C2A14A]">AI-driven design</em>
          </h2>

          <p
            className="text-lg md:text-xl text-[#2D2D2D] opacity-80 mb-10 max-w-[600px] mx-auto"
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
            }}
          >
            Join thousands of architects and designers who are already creating stunning 
            floor plans with our intelligent platform.
          </p>

          {/* CTA Button */}
          <div className="relative inline-block">
            <a
              href="/start-designing"
              className="inline-flex px-10 py-5 bg-[#1C2B25] hover:bg-[#0F1A13] text-white font-medium text-lg rounded-2xl transition-all duration-150 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              style={{
                background: "linear-gradient(135deg, #1C2B25 0%, #0F1A13 100%)",
              }}
            >
              <span className="mr-2">Try Live Demo</span>
              <span className="text-[#C2A14A]">→</span>
            </a>
            
            {/* Decorative elements */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#C2A14A] rounded-full opacity-60"></div>
            <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-[#C2A14A] rounded-full opacity-40"></div>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 pt-8 border-t border-[#E5E3DE]">
            <p
              className="text-sm text-[#2D2D2D] opacity-60 mb-4"
              style={{ fontFamily: "Inter, system-ui, sans-serif" }}
            >
              Trusted by professionals at
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
              {/* Company logos placeholder */}
              {['Gensler', 'HOK', 'SOM', 'Perkins&Will'].map((company, index) => (
                <div
                  key={index}
                  className="text-[#2D2D2D] font-medium text-sm tracking-wide"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                >
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}