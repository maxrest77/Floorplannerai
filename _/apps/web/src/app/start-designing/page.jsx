import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FloorPlanCanvas from "../../components/FloorPlanCanvas";
import AIInputPanel from "../../components/AIInputPanel";
import { Brain, PenTool } from "lucide-react";

export default function StartDesigningPage() {
  const [mode, setMode] = useState(null); // null, 'ai', 'manual'
  const [showCanvas, setShowCanvas] = useState(false);
  const [floorPlanData, setFloorPlanData] = useState(null);

  const handleAIGeneration = (inputData) => {
    // Use AI-generated elements if available, otherwise fallback to mock
    const elements = inputData.aiGeneratedElements || [
      { type: 'wall', x1: 50, y1: 50, x2: 350, y2: 50, thickness: 8, name: 'Wall' },
      { type: 'wall', x1: 350, y1: 50, x2: 350, y2: 250, thickness: 8, name: 'Wall' },
      { type: 'wall', x1: 350, y1: 250, x2: 50, y2: 250, thickness: 8, name: 'Wall' },
      { type: 'wall', x1: 50, y1: 250, x2: 50, y2: 50, thickness: 8, name: 'Wall' },
      { type: 'door', x: 150, y: 50, width: 80, height: 10, name: 'Door' },
      { type: 'window', x: 300, y: 150, width: 10, height: 60, name: 'Window' },
    ];

    const floorPlan = {
      type: inputData.roomType,
      dimensions: inputData.dimensions,
      elements: elements,
      aiSuggestions: inputData.aiSuggestions || []
    };
    
    setFloorPlanData(floorPlan);
    setShowCanvas(true);
  };

  const handleManualStart = () => {
    setMode('manual');
    setShowCanvas(true);
  };

  // If canvas is showing, render the canvas interface
  if (showCanvas) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <FloorPlanCanvas 
          initialData={floorPlanData} 
          mode={mode}
          onBack={() => {
            setShowCanvas(false);
            setMode(null);
            setFloorPlanData(null);
          }}
        />
      </div>
    );
  }

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <div className="min-h-screen bg-white">
        <Header />
        
        <main className="py-16 md:py-24 px-6 bg-gradient-to-b from-[#F8F6F1] to-white">
          <div className="max-w-[1000px] mx-auto">
            
            {/* Choice Screen */}
            {!mode && (
              <div className="text-center">
                <h1
                  className="text-4xl md:text-5xl lg:text-6xl leading-tight text-[#1C2B25] mb-6"
                  style={{
                    fontFamily: "Playfair Display, serif",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Start Designing Your{" "}
                  <em className="text-[#C2A14A]">Floor Plan</em>
                </h1>

                <p
                  className="text-lg md:text-xl text-[#2D2D2D] opacity-80 mb-12 max-w-[600px] mx-auto"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                >
                  Choose AI or Manual mode to begin creating your perfect space
                </p>

                {/* Mode selection cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[800px] mx-auto mb-12">
                  {/* AI Mode Card */}
                  <div 
                    className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-transparent hover:border-[#C2A14A]/30"
                    onClick={() => setMode('ai')}
                  >
                    <div className="w-16 h-16 bg-[#C2A14A]/20 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:bg-[#C2A14A] transition-colors duration-300">
                      <Brain size={32} className="text-[#C2A14A] group-hover:text-white transition-colors duration-300" />
                    </div>
                    
                    <h3
                      className="text-2xl font-semibold text-[#1C2B25] mb-4"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      Design with AI
                    </h3>
                    
                    <p
                      className="text-base text-[#2D2D2D] opacity-80 mb-6 leading-relaxed"
                      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                    >
                      Let our AI generate optimized floor plans based on your requirements. 
                      Perfect for getting started quickly with intelligent suggestions.
                    </p>

                    <button className="w-full px-6 py-3 bg-[#C2A14A] hover:bg-[#B8975A] text-white font-medium text-base rounded-xl transition-colors duration-150">
                      Start with AI
                    </button>
                  </div>

                  {/* Manual Mode Card */}
                  <div 
                    className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-transparent hover:border-[#1C2B25]/30"
                    onClick={handleManualStart}
                  >
                    <div className="w-16 h-16 bg-[#1C2B25]/20 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:bg-[#1C2B25] transition-colors duration-300">
                      <PenTool size={32} className="text-[#1C2B25] group-hover:text-white transition-colors duration-300" />
                    </div>
                    
                    <h3
                      className="text-2xl font-semibold text-[#1C2B25] mb-4"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      Design Manually
                    </h3>
                    
                    <p
                      className="text-base text-[#2D2D2D] opacity-80 mb-6 leading-relaxed"
                      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                    >
                      Create your floor plan from scratch with our comprehensive set of 
                      professional design tools and precise controls.
                    </p>

                    <button className="w-full px-6 py-3 bg-[#1C2B25] hover:bg-[#0F1A13] text-white font-medium text-base rounded-xl transition-colors duration-150">
                      Start Manually
                    </button>
                  </div>
                </div>

                {/* Optional illustration */}
                <div className="max-w-[400px] mx-auto opacity-30">
                  <svg viewBox="0 0 400 300" className="w-full h-auto">
                    {/* Simple floor plan preview */}
                    <rect x="50" y="50" width="300" height="200" fill="none" stroke="#C2A14A" strokeWidth="2" />
                    <rect x="80" y="80" width="80" height="60" fill="#C2A14A" fillOpacity="0.1" stroke="#C2A14A" strokeWidth="1" />
                    <rect x="200" y="80" width="80" height="60" fill="#C2A14A" fillOpacity="0.1" stroke="#C2A14A" strokeWidth="1" />
                    <rect x="80" y="170" width="200" height="60" fill="#C2A14A" fillOpacity="0.1" stroke="#C2A14A" strokeWidth="1" />
                    <line x1="150" y1="50" x2="150" y2="30" stroke="#C2A14A" strokeWidth="3" />
                    <text x="200" y="25" textAnchor="middle" fill="#C2A14A" fontSize="12" fontFamily="Inter">Preview</text>
                  </svg>
                </div>
              </div>
            )}

            {/* AI Input Panel */}
            {mode === 'ai' && (
              <AIInputPanel 
                onGenerate={handleAIGeneration}
                onBack={() => setMode(null)}
              />
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}