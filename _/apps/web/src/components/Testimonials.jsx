import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      quote: "FloorPlan AI has revolutionized our design process. What used to take days now takes hours, and the quality is consistently exceptional.",
      name: "Sarah Chen",
      title: "Principal Architect",
      company: "Modern Spaces Studio",
      logo: "MS"
    },
    {
      id: 2,
      quote: "The AI suggestions are incredibly intelligent. It's like having a senior architect reviewing every design decision.",
      name: "Michael Rodriguez", 
      title: "Design Director",
      company: "Urban Planning Co.",
      logo: "UP"
    },
    {
      id: 3,
      quote: "Our clients love the quick turnaround and professional results. FloorPlan AI has become an essential part of our workflow.",
      name: "Emma Thompson",
      title: "Interior Designer",
      company: "Elegant Interiors",
      logo: "EI"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentTestimonial];

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <section className="py-16 md:py-24 px-6 bg-[#1C2B25]">
        <div className="max-w-[1000px] mx-auto">
          {/* Section heading */}
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl leading-tight text-white mb-6"
              style={{
                fontFamily: "Playfair Display, serif",
                letterSpacing: "-0.02em",
              }}
            >
              What <em className="text-[#C2A14A]">Architects</em> Say
            </h2>

            <p
              className="text-lg md:text-xl text-white/80 max-w-[600px] mx-auto"
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            >
              Trusted by design professionals worldwide
            </p>
          </div>

          {/* Testimonial carousel */}
          <div className="relative">
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10">
              {/* Stars */}
              <div className="flex justify-center mb-8">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className="fill-[#C2A14A] text-[#C2A14A]"
                    />
                  ))}
                </div>
              </div>

              {/* Quote */}
              <blockquote
                className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-white text-center mb-8 max-w-[800px] mx-auto"
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontStyle: "italic",
                }}
              >
                "{current.quote}"
              </blockquote>

              {/* Author info */}
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
                {/* Company logo placeholder */}
                <div className="w-12 h-12 bg-[#C2A14A] rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{current.logo}</span>
                </div>

                <div className="text-center md:text-left">
                  <div
                    className="text-lg font-semibold text-white"
                    style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                  >
                    {current.name}
                  </div>
                  <div
                    className="text-base text-white/70"
                    style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                  >
                    {current.title}, {current.company}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-center items-center space-x-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-150 border border-white/20"
              >
                <ChevronLeft size={20} className="text-white" />
              </button>

              {/* Dots indicator */}
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-150 ${
                      index === currentTestimonial
                        ? "bg-[#C2A14A] w-8"
                        : "bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-150 border border-white/20"
              >
                <ChevronRight size={20} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}