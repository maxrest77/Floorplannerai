import { FileText, Brain, Edit3, Settings, Download } from "lucide-react";

export default function Workflow() {
  const steps = [
    {
      id: 1,
      icon: FileText,
      title: "Requirements",
      description: "Define your space needs and preferences"
    },
    {
      id: 2,
      icon: Brain,
      title: "AI Generation",
      description: "Our AI creates optimized floor plan options"
    },
    {
      id: 3,
      icon: Edit3,
      title: "Manual Edit",
      description: "Fine-tune and customize every detail"
    },
    {
      id: 4,
      icon: Settings,
      title: "Optimization",
      description: "Smart suggestions for better design"
    },
    {
      id: 5,
      icon: Download,
      title: "Export",
      description: "Download in your preferred format"
    }
  ];

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <section id="workflow" className="py-16 md:py-24 px-6 bg-white">
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
              How It <em className="text-[#C2A14A]">Works</em>
            </h2>

            <p
              className="text-lg md:text-xl text-[#2D2D2D] opacity-80 max-w-[600px] mx-auto"
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              From concept to completion in five simple steps
            </p>
          </div>

          {/* Workflow timeline */}
          <div className="relative">
            {/* Timeline line - Desktop */}
            <div className="hidden md:block absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-[#C2A14A] via-[#C2A14A] to-[#C2A14A] opacity-30"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                
                return (
                  <div key={step.id} className="relative">
                    {/* Step card */}
                    <div className="text-center">
                      {/* Icon circle */}
                      <div className="relative mx-auto mb-6">
                        <div className="w-16 h-16 bg-[#C2A14A] rounded-full flex items-center justify-center shadow-lg relative z-10">
                          <IconComponent size={24} className="text-white" strokeWidth={1.5} />
                        </div>
                        
                        {/* Step number */}
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#1C2B25] rounded-full flex items-center justify-center z-20">
                          <span className="text-white text-xs font-bold">{step.id}</span>
                        </div>
                        
                        {/* Pulse animation for first step */}
                        {index === 0 && (
                          <div className="absolute inset-0 w-16 h-16 bg-[#C2A14A] rounded-full animate-pulse opacity-30"></div>
                        )}
                      </div>

                      {/* Step content */}
                      <h3
                        className="text-xl font-semibold text-[#1C2B25] mb-3"
                        style={{
                          fontFamily: "Playfair Display, serif",
                        }}
                      >
                        {step.title}
                      </h3>

                      <p
                        className="text-sm text-[#2D2D2D] opacity-80 leading-relaxed max-w-[200px] mx-auto"
                        style={{
                          fontFamily: "Inter, system-ui, sans-serif",
                        }}
                      >
                        {step.description}
                      </p>
                    </div>

                    {/* Connector arrow - Mobile */}
                    {index < steps.length - 1 && (
                      <div className="md:hidden flex justify-center mt-6 mb-2">
                        <div className="w-1 h-8 bg-[#C2A14A] opacity-30"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <a
              href="/start-designing"
              className="inline-flex px-8 py-4 bg-[#C2A14A] hover:bg-[#B8975A] text-white font-medium text-base rounded-xl transition-all duration-150 shadow-lg hover:shadow-xl"
            >
              Start Your Design Journey
            </a>
          </div>
        </div>
      </section>
    </>
  );
}