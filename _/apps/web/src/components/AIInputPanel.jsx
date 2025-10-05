import { useState } from "react";
import { ArrowLeft, Upload, Sparkles } from "lucide-react";
import { getAIEndpoint, createAIRequest, parseAIResponse, AI_CONFIG } from "../config/aiConfig";

export default function AIInputPanel({ onGenerate, onBack }) {
  const [formData, setFormData] = useState({
    roomType: '2BHK',
    width: '',
    height: '',
    style: 'modern',
    includeFurniture: true,
    optimizeFlow: true,
    inspirationImage: null
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const roomTypes = [
    { value: '1BHK', label: '1 BHK Apartment' },
    { value: '2BHK', label: '2 BHK Apartment' },
    { value: '3BHK', label: '3 BHK Apartment' },
    { value: '4BHK', label: '4 BHK Apartment' },
    { value: 'Office', label: 'Office Space' },
    { value: 'Studio', label: 'Studio Apartment' },
    { value: 'Restaurant', label: 'Restaurant' },
    { value: 'Retail', label: 'Retail Store' },
    { value: 'Custom', label: 'Custom Layout' }
  ];

  const styles = [
    { value: 'modern', label: 'Modern' },
    { value: 'traditional', label: 'Traditional' },
    { value: 'minimalist', label: 'Minimalist' },
    { value: 'industrial', label: 'Industrial' },
    { value: 'scandinavian', label: 'Scandinavian' },
    { value: 'contemporary', label: 'Contemporary' },
    { value: 'rustic', label: 'Rustic' },
    { value: 'luxury', label: 'Luxury' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGenerate = async () => {
    if (!formData.width || !formData.height) {
      alert('Please enter room dimensions');
      return;
    }

    setIsGenerating(true);
    
    try {
      // Prepare data for your Colab notebook
      const requestData = createAIRequest(formData);
      
      // Call your local AI API when Generate Layout is clicked
      const response = await fetch('http://localhost:5001/generate_floor_plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestData),
        timeout: AI_CONFIG.TIMEOUT
      });

      if (!response.ok) {
        throw new Error(`AI generation failed: ${response.status}`);
      }

      const aiResult = await response.json();
      const parsedResult = parseAIResponse(aiResult);
      
      // Convert AI result to floor plan format
      const generationData = {
        ...formData,
        dimensions: requestData.dimensions,
        aiGeneratedElements: parsedResult.elements,
        aiSuggestions: parsedResult.suggestions,
        aiMetadata: parsedResult.metadata
      };
      
      setIsGenerating(false);
      onGenerate(generationData);

    } catch (error) {
      console.error('AI Generation Error:', error);
      
      // Fallback to mock generation if AI fails
      const generationData = {
        ...formData,
        dimensions: {
          width: parseInt(formData.width),
          height: parseInt(formData.height)
        }
      };
      
      setIsGenerating(false);
      onGenerate(generationData);
      alert('AI service temporarily unavailable. Using default layout.');
    }
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <div className="max-w-[600px] mx-auto">
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-[#1C2B25] hover:text-[#C2A14A] transition-colors duration-150 mb-8"
        >
          <ArrowLeft size={20} />
          <span style={{ fontFamily: "Inter, system-ui, sans-serif" }}>Back to Mode Selection</span>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="text-3xl md:text-4xl leading-tight text-[#1C2B25] mb-4"
            style={{
              fontFamily: "Playfair Display, serif",
              letterSpacing: "-0.02em",
            }}
          >
            AI Floor Plan <em className="text-[#C2A14A]">Generator</em>
          </h1>
          <p
            className="text-lg text-[#2D2D2D] opacity-80"
            style={{ fontFamily: "Inter, system-ui, sans-serif" }}
          >
            Tell us about your space and let AI create the perfect layout
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-[#F8F6F1]">
          <div className="space-y-6">
            {/* Room Type */}
            <div>
              <label
                className="block text-sm font-medium text-[#1C2B25] mb-3"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                Room Type / Floor Type
              </label>
              <select
                value={formData.roomType}
                onChange={(e) => handleInputChange('roomType', e.target.value)}
                className="w-full px-4 py-3 border border-[#E5E3DE] rounded-xl focus:ring-2 focus:ring-[#C2A14A] focus:border-[#C2A14A] outline-none transition-colors"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                {roomTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* Dimensions */}
            <div>
              <label
                className="block text-sm font-medium text-[#1C2B25] mb-3"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                Room Dimensions (sq ft)
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="number"
                    placeholder="Width"
                    value={formData.width}
                    onChange={(e) => handleInputChange('width', e.target.value)}
                    className="w-full px-4 py-3 border border-[#E5E3DE] rounded-xl focus:ring-2 focus:ring-[#C2A14A] focus:border-[#C2A14A] outline-none transition-colors"
                    style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Height"
                    value={formData.height}
                    onChange={(e) => handleInputChange('height', e.target.value)}
                    className="w-full px-4 py-3 border border-[#E5E3DE] rounded-xl focus:ring-2 focus:ring-[#C2A14A] focus:border-[#C2A14A] outline-none transition-colors"
                    style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                  />
                </div>
              </div>
            </div>

            {/* Style Preference */}
            <div>
              <label
                className="block text-sm font-medium text-[#1C2B25] mb-3"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                Design Style
              </label>
              <div className="grid grid-cols-2 gap-2">
                {styles.map(style => (
                  <button
                    key={style.value}
                    onClick={() => handleInputChange('style', style.value)}
                    className={`px-4 py-3 rounded-xl border transition-all duration-150 ${
                      formData.style === style.value
                        ? 'bg-[#C2A14A] text-white border-[#C2A14A]'
                        : 'bg-white text-[#2D2D2D] border-[#E5E3DE] hover:border-[#C2A14A]'
                    }`}
                    style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Preferences */}
            <div className="space-y-4">
              <label
                className="block text-sm font-medium text-[#1C2B25] mb-3"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                Preferences
              </label>
              
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="furniture"
                  checked={formData.includeFurniture}
                  onChange={(e) => handleInputChange('includeFurniture', e.target.checked)}
                  className="w-5 h-5 text-[#C2A14A] border-[#E5E3DE] rounded focus:ring-[#C2A14A]"
                />
                <label
                  htmlFor="furniture"
                  className="text-sm text-[#2D2D2D]"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                >
                  Include furniture suggestions
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="optimize"
                  checked={formData.optimizeFlow}
                  onChange={(e) => handleInputChange('optimizeFlow', e.target.checked)}
                  className="w-5 h-5 text-[#C2A14A] border-[#E5E3DE] rounded focus:ring-[#C2A14A]"
                />
                <label
                  htmlFor="optimize"
                  className="text-sm text-[#2D2D2D]"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                >
                  Optimize flow and circulation
                </label>
              </div>
            </div>

            {/* Optional Image Upload */}
            <div>
              <label
                className="block text-sm font-medium text-[#1C2B25] mb-3"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                Upload Inspiration Image (Optional)
              </label>
              <div className="border-2 border-dashed border-[#E5E3DE] rounded-xl p-6 text-center hover:border-[#C2A14A] transition-colors cursor-pointer">
                <Upload size={32} className="text-[#C2A14A] mx-auto mb-2" />
                <p
                  className="text-sm text-[#2D2D2D] opacity-70"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                >
                  Drop an image here or click to upload
                </p>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !formData.width || !formData.height}
              className="w-full px-8 py-4 bg-[#C2A14A] hover:bg-[#B8975A] disabled:bg-[#E5E3DE] disabled:text-[#2D2D2D] disabled:opacity-50 text-white font-medium text-base rounded-xl transition-all duration-150 flex items-center justify-center space-x-2"
              style={{ fontFamily: "Inter, system-ui, sans-serif" }}
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating Layout...</span>
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  <span>Generate Layout</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}