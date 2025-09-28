import { useState } from "react";
import { Brain, PenTool, Zap, Download } from "lucide-react";

export default function Features() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const features = [
    {
      id: "ai-powered",
      icon: Brain,
      title: "AI-Powered Layouts",
      description: "Generate optimized designs instantly with our advanced AI algorithms.",
    },
    {
      id: "manual-tools",
      icon: PenTool,
      title: "Manual Tools",
      description: "Craft walls, doors, and spaces your way with precision tools.",
    },
    {
      id: "edge-ready",
      icon: Zap,
      title: "Edge Ready",
      description: "TinyML-powered performance anywhere, even offline.",
    },
    {
      id: "export-share",
      icon: Download,
      title: "Export & Share",
      description: "Download in CAD-ready formats and share with your team.",
    },
  ];

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <section className="py-16 md:py-24 px-6 bg-[#F8F6F1]">
        <div className="max-w-[1200px] mx-auto">
          {/* Section heading */}
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl leading-tight text-[#1C2B25] mb-6"
              style={{
                fontFamily: "Playfair Display, serif",
                letterSpacing: "-0.02em",
              }}
            >
              Powerful Features for{" "}
              <em className="text-[#C2A14A]">Modern Architects</em>
            </h2>

            <p
              className="text-lg md:text-xl text-[#2D2D2D] opacity-80 max-w-[600px] mx-auto"
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              Everything you need to create stunning floor plans with precision and speed
            </p>
          </div>

          {/* Feature cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const IconComponent = feature.icon;
              const isHovered = hoveredCard === feature.id;

              return (
                <div
                  key={feature.id}
                  className={`
                    relative p-8 rounded-2xl transition-all duration-300 cursor-pointer group
                    ${
                      isHovered
                        ? "bg-white shadow-xl transform -translate-y-2"
                        : "bg-white/50 shadow-lg hover:shadow-xl"
                    }
                  `}
                  onMouseEnter={() => setHoveredCard(feature.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Icon container */}
                  <div
                    className={`
                      w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-300
                      ${
                        isHovered
                          ? "bg-[#C2A14A] shadow-lg"
                          : "bg-[#C2A14A]/20 group-hover:bg-[#C2A14A]/30"
                      }
                    `}
                  >
                    <IconComponent
                      size={28}
                      strokeWidth={1.5}
                      className={`transition-all duration-300 ${
                        isHovered
                          ? "text-white"
                          : "text-[#C2A14A] group-hover:text-[#C2A14A]"
                      }`}
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl font-semibold text-[#1C2B25] mb-3"
                    style={{
                      fontFamily: "Playfair Display, serif",
                    }}
                  >
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-base text-[#2D2D2D] opacity-80 leading-relaxed"
                    style={{
                      fontFamily: "Inter, system-ui, sans-serif",
                    }}
                  >
                    {feature.description}
                  </p>

                  {/* Hover accent line */}
                  <div
                    className={`
                      absolute bottom-0 left-8 right-8 h-1 bg-[#C2A14A] rounded-full transition-all duration-300
                      ${isHovered ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}
                    `}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}