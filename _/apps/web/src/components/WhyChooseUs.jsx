import { Check } from "lucide-react";

export default function WhyChooseUs() {
  const benefits = [
    "50% faster design process with AI assistance",
    "Professional-grade precision and accuracy",
    "Seamless integration with CAD workflows", 
    "Real-time collaboration features",
    "Extensive library of architectural elements",
    "Advanced optimization algorithms"
  ];

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <section className="py-16 md:py-24 px-6 bg-[#F8F6F1]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Before/After Mockup */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {/* Before */}
                <div className="space-y-3">
                  <h4 
                    className="text-sm font-medium text-[#2D2D2D] opacity-60 uppercase tracking-wide"
                    style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                  >
                    Before AI
                  </h4>
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="space-y-3">
                      {/* Simple wireframe representation */}
                      <div className="w-full h-4 bg-gray-200 rounded"></div>
                      <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                      <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        <div className="aspect-square bg-gray-100 rounded border-2 border-dashed border-gray-300"></div>
                        <div className="aspect-square bg-gray-100 rounded border-2 border-dashed border-gray-300"></div>
                      </div>
                      <div className="text-xs text-gray-400 text-center mt-3">Basic Layout</div>
                    </div>
                  </div>
                </div>

                {/* After */}
                <div className="space-y-3">
                  <h4 
                    className="text-sm font-medium text-[#C2A14A] uppercase tracking-wide"
                    style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                  >
                    With AI
                  </h4>
                  <div className="bg-white rounded-xl p-6 shadow-xl border border-[#C2A14A]/20">
                    <div className="space-y-3">
                      {/* Enhanced wireframe representation */}
                      <div className="w-full h-4 bg-gradient-to-r from-[#C2A14A] to-[#B8975A] rounded"></div>
                      <div className="w-5/6 h-4 bg-[#C2A14A]/60 rounded"></div>
                      <div className="w-2/3 h-4 bg-[#C2A14A]/40 rounded"></div>
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        <div className="aspect-square bg-[#C2A14A]/10 rounded border-2 border-[#C2A14A] relative">
                          <div className="absolute inset-2 bg-[#C2A14A]/20 rounded"></div>
                        </div>
                        <div className="aspect-square bg-[#C2A14A]/10 rounded border-2 border-[#C2A14A] relative">
                          <div className="absolute inset-2 bg-[#C2A14A]/20 rounded"></div>
                        </div>
                      </div>
                      <div className="text-xs text-[#C2A14A] text-center mt-3 font-medium">Optimized Design</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhancement arrows */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-8 h-8 bg-[#C2A14A] rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-xs font-bold">→</span>
                </div>
              </div>
            </div>

            {/* Right Column - Benefits */}
            <div>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl leading-tight text-[#1C2B25] mb-6"
                style={{
                  fontFamily: "Playfair Display, serif",
                  letterSpacing: "-0.02em",
                }}
              >
                Why Choose{" "}
                <em className="text-[#C2A14A]">FloorPlan AI</em>?
              </h2>

              <p
                className="text-lg text-[#2D2D2D] opacity-80 mb-8"
                style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                }}
              >
                Experience the perfect blend of artificial intelligence and human creativity 
                to create exceptional floor plans.
              </p>

              {/* Benefits list */}
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    className="flex items-start space-x-4 group"
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-[#C2A14A] rounded-full flex items-center justify-center mt-0.5 group-hover:bg-[#B8975A] transition-colors duration-150">
                      <Check size={14} className="text-white" strokeWidth={2} />
                    </div>
                    <p
                      className="text-base text-[#2D2D2D] opacity-90 leading-relaxed"
                      style={{
                        fontFamily: "Inter, system-ui, sans-serif",
                      }}
                    >
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="mt-8">
                <a
                  href="/start-designing"
                  className="inline-flex px-8 py-4 bg-[#1C2B25] hover:bg-[#0F1A13] text-white font-medium text-base rounded-xl transition-all duration-150 shadow-lg hover:shadow-xl"
                >
                  Experience the Difference
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}