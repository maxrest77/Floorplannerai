// AI Configuration for Floor Plan Generator
export const AI_CONFIG = {
  // Replace with your actual Colab API endpoint
  COLAB_API_ENDPOINT: 'https://colab.research.google.com/drive/1S_PLf5BcCkBhBi0ghrPv0q5h2YvnKcil',
  
  // Alternative: If using Google Colab's public URL
  COLAB_PUBLIC_URL: 'https://colab.research.google.com/drive/1S_PLf5BcCkBhBi0ghrPv0q5h2YvnKcil',
  
  // Fallback timeout (in milliseconds)
  TIMEOUT: 30000,
  
  // Retry attempts
  MAX_RETRIES: 3,
  
  // Default AI settings
  DEFAULT_SETTINGS: {
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 2000
  }
};

// Helper function to get the correct API endpoint
export const getAIEndpoint = () => {
  // Check if we have a deployed API endpoint
  if (AI_CONFIG.COLAB_API_ENDPOINT !== 'YOUR_COLAB_API_ENDPOINT') {
    return AI_CONFIG.COLAB_API_ENDPOINT;
  }
  
  // Fallback to public Colab URL (requires manual setup)
  return AI_CONFIG.COLAB_PUBLIC_URL;
};

// Request payload structure for your Colab notebook
export const createAIRequest = (formData) => {
  return {
    roomType: formData.roomType,
    dimensions: {
      width: parseInt(formData.width),
      height: parseInt(formData.height)
    },
    style: formData.style,
    includeFurniture: formData.includeFurniture,
    optimizeFlow: formData.optimizeFlow,
    inspirationImage: formData.inspirationImage,
    timestamp: new Date().toISOString()
  };
};

// Expected response structure from your Colab notebook
export const parseAIResponse = (response) => {
  return {
    elements: response.elements || [],
    suggestions: response.suggestions || [],
    metadata: response.metadata || {},
    success: response.success !== false
  };
};
