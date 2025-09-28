# 🤖 Google Colab Integration Guide

This guide will help you connect your Google Colab notebook to your floor planner's AI functionality.

## 📋 **Current Setup**

Your Colab notebook: [https://colab.research.google.com/drive/1S_PLf5BcCkBhBi0ghrPv0q5h2YvnKcil?usp=sharing](https://colab.research.google.com/drive/1S_PLf5BcCkBhBi0ghrPv0q5h2YvnKcil?usp=sharing)

## 🚀 **Integration Options**

### **Option 1: Deploy as Web Service (Recommended)**

#### **Step 1: Modify Your Colab Notebook**

Add this code to your Colab notebook to create a web API:

```python
from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for your React app

@app.route('/generate_floor_plan', methods=['POST'])
def generate_floor_plan():
    try:
        # Get input data from your React app
        data = request.get_json()
        
        room_type = data.get('roomType', '2BHK')
        dimensions = data.get('dimensions', {})
        style = data.get('style', 'modern')
        include_furniture = data.get('includeFurniture', True)
        optimize_flow = data.get('optimizeFlow', True)
        
        # Your existing AI logic here
        # ... your floor plan generation code ...
        
        # Return the generated floor plan
        result = {
            "success": True,
            "elements": [
                # Your generated elements here
                {"type": "wall", "x1": 50, "y1": 50, "x2": 350, "y2": 50, "thickness": 8, "name": "Wall"},
                {"type": "wall", "x1": 350, "y1": 50, "x2": 350, "y2": 250, "thickness": 8, "name": "Wall"},
                {"type": "door", "x": 150, "y": 50, "width": 80, "height": 10, "name": "Door"},
                # Add more elements as needed
            ],
            "suggestions": [
                "Consider adding a window for natural light",
                "Place furniture away from doorways for better flow"
            ],
            "metadata": {
                "generation_time": "2.3s",
                "model_used": "your_model_name"
            }
        }
        
        return jsonify(result)
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
```

#### **Step 2: Deploy Your Colab**

1. **Use ngrok** (easiest for testing):
   ```python
   !pip install flask-ngrok
   from flask_ngrok import run_with_ngrok
   
   # Replace the last line in your Colab with:
   run_with_ngrok(app)
   ```

2. **Or use Google Cloud Run** (for production):
   - Save your notebook as a Python file
   - Deploy to Google Cloud Run
   - Get the public URL

#### **Step 3: Update Your Config**

In `src/config/aiConfig.js`, replace:
```javascript
COLAB_API_ENDPOINT: 'YOUR_COLAB_API_ENDPOINT'
```

With your actual endpoint:
```javascript
COLAB_API_ENDPOINT: 'https://your-ngrok-url.ngrok.io/generate_floor_plan'
```

### **Option 2: Direct Colab Integration**

If you want to keep using Colab directly:

#### **Step 1: Make Your Colab Public**

1. Go to your Colab notebook
2. Click "Share" → "Change to anyone with the link"
3. Copy the public URL

#### **Step 2: Update the Config**

In `src/config/aiConfig.js`:
```javascript
COLAB_PUBLIC_URL: 'https://colab.research.google.com/drive/1S_PLf5BcCkBhBi0ghrPv0q5h2YvnKcil'
```

## 📊 **Expected Data Format**

### **Input Format (from React to Colab):**
```json
{
  "roomType": "2BHK",
  "dimensions": {
    "width": 1200,
    "height": 800
  },
  "style": "modern",
  "includeFurniture": true,
  "optimizeFlow": true,
  "inspirationImage": null,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### **Output Format (from Colab to React):**
```json
{
  "success": true,
  "elements": [
    {
      "type": "wall",
      "x1": 50,
      "y1": 50,
      "x2": 350,
      "y2": 50,
      "thickness": 8,
      "name": "Wall"
    },
    {
      "type": "door",
      "x": 150,
      "y": 50,
      "width": 80,
      "height": 10,
      "name": "Door"
    }
  ],
  "suggestions": [
    "Consider adding a window for natural light"
  ],
  "metadata": {
    "generation_time": "2.3s",
    "model_used": "your_model_name"
  }
}
```

## 🔧 **Testing Your Integration**

1. **Start your React app**: `npm run dev`
2. **Go to Design with AI**
3. **Fill in the form** and click "Generate Layout"
4. **Check browser console** for any errors
5. **Verify the API call** in Network tab

## 🐛 **Troubleshooting**

### **CORS Errors**
- Make sure you have `CORS(app)` in your Flask app
- Check that your Colab is accessible from your React app

### **API Not Found**
- Verify your endpoint URL is correct
- Check that your Colab is running and accessible

### **Timeout Issues**
- Increase `TIMEOUT` in `aiConfig.js`
- Optimize your AI model for faster generation

## 📝 **Next Steps**

1. **Implement your AI logic** in the Colab notebook
2. **Test the integration** with your React app
3. **Deploy to production** using Google Cloud Run or similar
4. **Add error handling** and user feedback
5. **Optimize performance** for better user experience

## 🎯 **Features to Add**

- **Image upload** for inspiration images
- **Real-time generation** progress
- **Multiple AI models** selection
- **Save/load** AI-generated designs
- **Export** to different formats

---

**Need help?** Check the console logs and network requests in your browser's developer tools to debug any issues.

