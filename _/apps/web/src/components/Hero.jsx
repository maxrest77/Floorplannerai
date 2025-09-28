export default function Hero() {
  const scrollToWorkflow = () => {
    const workflowSection = document.getElementById('workflow');
    if (workflowSection) {
      workflowSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <section
        className="relative py-20 md:py-32 px-6 bg-gradient-to-b from-[#F8F6F1] to-[#F5F3EE]"
        style={{ fontFamily: "Inter, system-ui, sans-serif" }}
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl leading-tight text-[#1C2B25] mb-6"
                style={{
                  fontFamily: "Playfair Display, serif",
                  letterSpacing: "-0.02em",
                }}
              >
                Floor Planning, Redefined with{" "}
                <em className="font-medium text-[#C2A14A]">AI & Precision</em>{" "}
                Design
              </h1>

              <p className="text-lg md:text-xl text-[#2D2D2D] opacity-80 mb-8 max-w-[500px]">
                Seamlessly blend AI innovation with manual craftsmanship to create 
                timeless floor plans.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <a
                  href="/start-designing"
                  className="px-8 py-4 bg-[#1C2B25] hover:bg-[#0F1A13] text-white font-medium text-base rounded-xl transition-all duration-150 text-center"
                >
                  Start Designing
                </a>
                <button
                  onClick={scrollToWorkflow}
                  className="px-8 py-4 border-2 border-[#C2A14A] text-[#C2A14A] hover:bg-[#C2A14A] hover:text-white font-medium text-base rounded-xl transition-all duration-150"
                >
                  See How It Works
                </button>
              </div>
            </div>

            {/* Right Column - Hero Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden bg-white shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <img
                  src="https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80"
                  alt="Floor plan on tablet showing architectural design"
                  className="w-full h-auto object-cover"
                />
                {/* Overlay with subtle gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C2B25]/20 to-transparent"></div>
                
                {/* Floating UI elements */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg">
                  <span className="text-sm font-medium text-[#1C2B25]">AI Generated</span>
                </div>
                
                <div className="absolute bottom-4 left-4 bg-[#C2A14A]/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg">
                  <span className="text-sm font-medium text-white">2,500 sq ft</span>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#C2A14A]/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#1C2B25]/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}