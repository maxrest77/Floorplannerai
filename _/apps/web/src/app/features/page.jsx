import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Brain, PenTool, Zap, Download, Users, Clock, Shield, Award } from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Design Intelligence",
      description: "Our advanced machine learning algorithms analyze millions of floor plans to suggest optimal layouts that maximize space efficiency and flow.",
      image: "https://images.unsplash.com/photo-1558618644-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
      benefits: [
        "Instant layout generation",
        "Space optimization",
        "Building code compliance",
        "Energy efficiency analysis"
      ]
    },
    {
      icon: PenTool,
      title: "Professional Design Tools",
      description: "Comprehensive suite of manual design tools for precise control over every element of your floor plan, from walls to furniture placement.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
      benefits: [
        "Precise measurement tools",
        "Snap-to-grid functionality",
        "Layer management",
        "Symbol libraries"
      ]
    },
    {
      icon: Zap,
      title: "TinyML Edge Computing",
      description: "Lightning-fast performance with on-device machine learning that works offline, ensuring your designs are always accessible.",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=800&q=80",
      benefits: [
        "Offline functionality",
        "Real-time processing",
        "Privacy protection",
        "Low latency responses"
      ]
    },
    {
      icon: Download,
      title: "Universal Export Formats",
      description: "Export your designs in multiple professional formats including CAD, PDF, and high-resolution images for seamless workflow integration.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
      benefits: [
        "CAD file export",
        "High-res image formats",
        "Interactive 3D models",
        "Measurement annotations"
      ]
    },
    {
      icon: Users,
      title: "Real-Time Collaboration",
      description: "Work together with your team in real-time, share feedback, and iterate on designs with integrated commenting and version control.",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80",
      benefits: [
        "Live collaboration",
        "Comment system",
        "Version history",
        "Team permissions"
      ]
    },
    {
      icon: Clock,
      title: "Rapid Prototyping",
      description: "From concept to completion in minutes, not hours. Our streamlined workflow reduces design time by up to 70%.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      benefits: [
        "Quick iterations",
        "Template library",
        "Auto-save functionality",
        "Instant previews"
      ]
    }
  ];

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <div className="min-h-screen bg-white">
        <Header />
        
        {/* Hero Section */}
        <section className="py-20 md:py-32 px-6 bg-gradient-to-b from-[#F8F6F1] to-white">
          <div className="max-w-[1000px] mx-auto text-center">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl leading-tight text-[#1C2B25] mb-6"
              style={{
                fontFamily: "Playfair Display, serif",
                letterSpacing: "-0.02em",
              }}
            >
              Powerful Features for{" "}
              <em className="text-[#C2A14A]">Modern Architecture</em>
            </h1>
            
            <p
              className="text-lg md:text-xl text-[#2D2D2D] opacity-80 mb-12 max-w-[700px] mx-auto"
              style={{ fontFamily: "Inter, system-ui, sans-serif" }}
            >
              Discover the comprehensive suite of tools that make FloorPlan AI 
              the preferred choice for design professionals worldwide.
            </p>

            <a
              href="/start-designing"
              className="inline-flex px-8 py-4 bg-[#C2A14A] hover:bg-[#B8975A] text-white font-medium text-lg rounded-xl transition-all duration-150 shadow-lg hover:shadow-xl"
            >
              Try All Features Free
            </a>
          </div>
        </section>

        {/* Features Sections */}
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          const isReversed = index % 2 === 1;
          
          return (
            <section key={index} className={`py-16 md:py-24 px-6 ${index % 2 === 0 ? 'bg-white' : 'bg-[#F8F6F1]'}`}>
              <div className="max-w-[1200px] mx-auto">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isReversed ? 'lg:grid-flow-col-dense' : ''}`}>
                  {/* Image */}
                  <div className={`${isReversed ? 'lg:col-start-2' : ''}`}>
                    <div className="relative rounded-2xl overflow-hidden shadow-xl">
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-auto object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1C2B25]/30 to-transparent"></div>
                      
                      {/* Floating icon */}
                      <div className="absolute top-6 left-6 w-16 h-16 bg-[#C2A14A] rounded-xl flex items-center justify-center shadow-lg">
                        <IconComponent size={32} className="text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`${isReversed ? 'lg:col-start-1' : ''}`}>
                    <h2
                      className="text-3xl md:text-4xl leading-tight text-[#1C2B25] mb-6"
                      style={{
                        fontFamily: "Playfair Display, serif",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {feature.title}
                    </h2>

                    <p
                      className="text-lg text-[#2D2D2D] opacity-80 mb-8 leading-relaxed"
                      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                    >
                      {feature.description}
                    </p>

                    {/* Benefits list */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-[#C2A14A] rounded-full"></div>
                          <span
                            className="text-base text-[#2D2D2D] opacity-90"
                            style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                          >
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>

                    <a
                      href="/start-designing"
                      className="inline-flex items-center space-x-2 text-[#C2A14A] hover:text-[#B8975A] font-medium transition-colors duration-150"
                      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                    >
                      <span>Try this feature</span>
                      <span>→</span>
                    </a>
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* Stats Section */}
        <section className="py-16 md:py-24 px-6 bg-[#1C2B25]">
          <div className="max-w-[1000px] mx-auto text-center">
            <h2
              className="text-3xl md:text-4xl leading-tight text-white mb-12"
              style={{
                fontFamily: "Playfair Display, serif",
                letterSpacing: "-0.02em",
              }}
            >
              Trusted by <em className="text-[#C2A14A]">Design Leaders</em>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { number: "50K+", label: "Floor Plans Created" },
                { number: "95%", label: "Time Saved" },
                { number: "500+", label: "Enterprise Clients" },
                { number: "99.9%", label: "Uptime Guarantee" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div
                    className="text-4xl md:text-5xl font-bold text-[#C2A14A] mb-2"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    {stat.number}
                  </div>
                  <div
                    className="text-white/70 text-base"
                    style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 px-6 bg-[#F8F6F1]">
          <div className="max-w-[800px] mx-auto text-center">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl leading-tight text-[#1C2B25] mb-6"
              style={{
                fontFamily: "Playfair Display, serif",
                letterSpacing: "-0.02em",
              }}
            >
              Ready to <em className="text-[#C2A14A]">Transform</em> Your Design Process?
            </h2>

            <p
              className="text-lg md:text-xl text-[#2D2D2D] opacity-80 mb-10"
              style={{ fontFamily: "Inter, system-ui, sans-serif" }}
            >
              Join thousands of architects and designers who have revolutionized 
              their workflow with FloorPlan AI.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/start-designing"
                className="px-8 py-4 bg-[#1C2B25] hover:bg-[#0F1A13] text-white font-medium text-lg rounded-xl transition-all duration-150 shadow-lg hover:shadow-xl"
              >
                Start Free Trial
              </a>
              <a
                href="/contact"
                className="px-8 py-4 border-2 border-[#C2A14A] text-[#C2A14A] hover:bg-[#C2A14A] hover:text-white font-medium text-lg rounded-xl transition-all duration-150"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}