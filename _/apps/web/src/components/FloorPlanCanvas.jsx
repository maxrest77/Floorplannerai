import { useState, useRef, useEffect } from "react";
import { 
  ArrowLeft, Square, DoorOpen, Move, RotateCcw, Download, 
  Save, Grid, ZoomIn, ZoomOut, Undo, Redo, Home, Eraser
} from "lucide-react";

export default function FloorPlanCanvas({ initialData, mode, onBack }) {
  const canvasRef = useRef(null);
  const [selectedTool, setSelectedTool] = useState('move');
  const [elements, setElements] = useState(initialData?.elements || []);
  const [selectedElement, setSelectedElement] = useState(null);
  const [gridVisible, setGridVisible] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const tools = [
    { id: 'move', icon: Move, label: 'Select/Move', color: '#1C2B25' },
    { id: 'wall', icon: Square, label: 'Wall', color: '#C2A14A' },
    { id: 'door', icon: DoorOpen, label: 'Door', color: '#8B7355' },
    { id: 'window', icon: Square, label: 'Window', color: '#6B9BD1' },
    { id: 'furniture', icon: Home, label: 'Furniture', color: '#7D6B47' },
    { id: 'eraser', icon: Eraser, label: 'Eraser', color: '#DC2626' }
  ];

  const furnitureTypes = [
    { id: 'sofa', name: 'Sofa', color: '#8B4513' },
    { id: 'chair', name: 'Chair', color: '#654321' },
    { id: 'table', name: 'Table', color: '#8B7355' },
    { id: 'bed', name: 'Bed', color: '#4A4A4A' },
    { id: 'desk', name: 'Desk', color: '#8B4513' },
    { id: 'cabinet', name: 'Cabinet', color: '#654321' },
    { id: 'bookshelf', name: 'Bookshelf', color: '#8B7355' },
    { id: 'tv', name: 'TV', color: '#2C2C2C' },
    { id: 'refrigerator', name: 'Refrigerator', color: '#C0C0C0' },
    { id: 'stove', name: 'Stove', color: '#696969' }
  ];

  const wallOrientations = [
    { id: 'horizontal', name: 'Horizontal', description: 'Left to Right' },
    { id: 'vertical', name: 'Vertical', description: 'Top to Bottom' },
    { id: 'diagonal-45', name: 'Diagonal 45°', description: '45° Angle' },
    { id: 'diagonal-135', name: 'Diagonal 135°', description: '135° Angle' }
  ];

  const [selectedFurnitureType, setSelectedFurnitureType] = useState('sofa');
  const [selectedWallOrientation, setSelectedWallOrientation] = useState('horizontal');
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [inputValues, setInputValues] = useState({});

  // Draw canvas whenever state changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;
    drawCanvas(ctx);
  }, [elements, gridVisible, zoom, selectedElement]);

  const drawCanvas = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    if (gridVisible) drawGrid(ctx);

    elements.forEach((element, index) => {
      const isSelected = selectedElement === index;
      drawElement(ctx, element, isSelected);
    });

    if (mode === 'ai') drawAISuggestions(ctx);
  };

  const drawGrid = (ctx) => {
    const gridSize = 20;
    ctx.strokeStyle = '#E5E3DE';
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= ctx.canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, ctx.canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y <= ctx.canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(ctx.canvas.width, y);
      ctx.stroke();
    }
  };

  const drawElement = (ctx, element, isSelected) => {
    ctx.save();
    if (isSelected) {
      ctx.shadowColor = '#C2A14A';
      ctx.shadowBlur = 10;
    }

    switch (element.type) {
      case 'wall':
        ctx.strokeStyle = element.color || '#1C2B25';
        ctx.lineWidth = element.thickness ?? 8;
        if (ctx.lineWidth > 0) {
        ctx.beginPath();
        ctx.moveTo(element.x1, element.y1);
        ctx.lineTo(element.x2, element.y2);
        ctx.stroke();
        }
        break;

      case 'door':
        // Apply rotation for doors
        const doorCenterX = element.x + (element.width || 80) / 2;
        const doorCenterY = element.y + (element.height || 10) / 2;
        ctx.translate(doorCenterX, doorCenterY);
        ctx.rotate((element.rotation || 0) * Math.PI / 180);
        
        ctx.fillStyle = element.color || '#8B7355';
        ctx.fillRect(-(element.width || 80) / 2, -(element.height || 10) / 2, element.width || 80, element.height || 10);
        ctx.strokeStyle = element.color || '#8B7355';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(-(element.width || 80) / 2, 0, 60, 0, Math.PI / 2);
        ctx.stroke();
        
        // Draw door name
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 10px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const doorName = element.name || 'Door';
        ctx.fillText(doorName, 0, 0);
        
        ctx.rotate(-(element.rotation || 0) * Math.PI / 180);
        ctx.translate(-doorCenterX, -doorCenterY);
        break;

      case 'window':
        // Apply rotation for windows
        const windowCenterX = element.x + (element.width || 10) / 2;
        const windowCenterY = element.y + (element.height || 60) / 2;
        ctx.translate(windowCenterX, windowCenterY);
        ctx.rotate((element.rotation || 0) * Math.PI / 180);
        
        ctx.fillStyle = element.color || '#6B9BD1';
        ctx.fillRect(-(element.width || 10) / 2, -(element.height || 60) / 2, element.width || 10, element.height || 60);
        ctx.strokeStyle = '#4A7BA7';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, -(element.height || 60) / 2);
        ctx.lineTo(0, (element.height || 60) / 2);
        ctx.stroke();
        
        // Draw window name
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 10px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const windowName = element.name || 'Window';
        ctx.fillText(windowName, 0, 0);
        
        ctx.rotate(-(element.rotation || 0) * Math.PI / 180);
        ctx.translate(-windowCenterX, -windowCenterY);
        break;

      case 'furniture':
        // Apply rotation for furniture
        const furnitureCenterX = element.x + (element.width || 100) / 2;
        const furnitureCenterY = element.y + (element.height || 60) / 2;
        ctx.translate(furnitureCenterX, furnitureCenterY);
        ctx.rotate((element.rotation || 0) * Math.PI / 180);
        
        ctx.fillStyle = element.color || '#7D6B47';
        ctx.fillRect(-(element.width || 100) / 2, -(element.height || 60) / 2, element.width || 100, element.height || 60);
        
        // Draw furniture name
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 12px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const nameToDraw = element.name || 'Furniture';
        ctx.fillText(nameToDraw, 0, 0);
        
        ctx.rotate(-(element.rotation || 0) * Math.PI / 180);
        ctx.translate(-furnitureCenterX, -furnitureCenterY);
        break;
    }

    if (isSelected) {
      const handles = getElementHandles(element);
      ctx.fillStyle = '#C2A14A';
      handles.forEach(handle => {
        ctx.fillRect(handle.x - 4, handle.y - 4, 8, 8);
      });
    }
    
    // Reset text properties before restoring context
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.font = '12px Arial, sans-serif';
    
    ctx.restore();
  };

  const drawAISuggestions = (ctx) => {
    ctx.strokeStyle = '#C2A14A';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(140, 45, 90, 20);
    ctx.fillStyle = '#C2A14A';
    ctx.font = '12px Inter';
    ctx.fillText('AI Suggestion', 145, 40);
    ctx.setLineDash([]);
  };

  const getElementHandles = (element) => {
    switch (element.type) {
      case 'wall':
        return [
          { x: element.x1, y: element.y1 },
          { x: element.x2, y: element.y2 }
        ];
      default:
        return [
          { x: element.x, y: element.y },
          { x: element.x + (element.width || 100), y: element.y },
          { x: element.x + (element.width || 100), y: element.y + (element.height || 60) },
          { x: element.x, y: element.y + (element.height || 60) }
        ];
    }
  };

  const getCanvasCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleCanvasMouseDown = (e) => {
    const { x, y } = getCanvasCoordinates(e);

    if (selectedTool === 'move') {
      const clickedElement = elements.findIndex(el => isPointInElement(x, y, el));
      if (clickedElement !== -1) {
        setSelectedElement(clickedElement);
        setIsDragging(true);
        
        // Calculate offset from element center to mouse position
        const element = elements[clickedElement];
        let elementX, elementY;
        
        if (element.type === 'wall') {
          elementX = (element.x1 + element.x2) / 2;
          elementY = (element.y1 + element.y2) / 2;
        } else {
          elementX = element.x + (element.width || 100) / 2;
          elementY = element.y + (element.height || 60) / 2;
        }
        
        setDragOffset({
          x: x - elementX,
          y: y - elementY
        });
      } else {
        setSelectedElement(null);
      }
    } else if (selectedTool === 'eraser') {
      const clickedElement = elements.findIndex(el => isPointInElement(x, y, el));
      if (clickedElement !== -1) {
        // Remove the element
        const newElements = elements.filter((_, index) => index !== clickedElement);
        setElements(newElements);
        saveToHistory(newElements);
        
        // Clear selection if the deleted element was selected
        if (selectedElement === clickedElement) {
          setSelectedElement(null);
        } else if (selectedElement > clickedElement) {
          // Adjust selection index if an element before the selected one was deleted
          setSelectedElement(selectedElement - 1);
        }
      }
    } else {
      addElement(x, y);
    }
  };

  const handleCanvasMouseMove = (e) => {
    if (isDragging && selectedElement !== null && selectedTool === 'move') {
      const { x, y } = getCanvasCoordinates(e);
      const newX = Math.round((x - dragOffset.x) / 20) * 20;
      const newY = Math.round((y - dragOffset.y) / 20) * 20;
      
      const updatedElements = [...elements];
      const element = updatedElements[selectedElement];
      
      if (element.type === 'wall') {
        const width = element.x2 - element.x1;
        const height = element.y2 - element.y1;
        element.x1 = newX;
        element.y1 = newY;
        element.x2 = newX + width;
        element.y2 = newY + height;
      } else {
        element.x = newX;
        element.y = newY;
      }
      
      setElements(updatedElements);
    }
  };

  const handleCanvasMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      saveToHistory(elements);
    }
  };

  const isPointInElement = (x, y, element) => {
    switch (element.type) {
      case 'wall':
        return pointToLineDistance(x, y, element.x1, element.y1, element.x2, element.y2) < 10;
      default:
        // Handle rotated elements
        if (element.rotation && element.rotation !== 0) {
          return isPointInRotatedRect(x, y, element);
        }
        return x >= element.x && x <= element.x + (element.width || 100) &&
               y >= element.y && y <= element.y + (element.height || 60);
    }
  };

  const isPointInRotatedRect = (px, py, element) => {
    const centerX = element.x + (element.width || 100) / 2;
    const centerY = element.y + (element.height || 60) / 2;
    const rotation = (element.rotation || 0) * Math.PI / 180;
    
    // Translate point to origin
    const dx = px - centerX;
    const dy = py - centerY;
    
    // Rotate point back
    const cos = Math.cos(-rotation);
    const sin = Math.sin(-rotation);
    const rotatedX = dx * cos - dy * sin;
    const rotatedY = dx * sin + dy * cos;
    
    // Check if point is in unrotated rectangle
    const halfWidth = (element.width || 100) / 2;
    const halfHeight = (element.height || 60) / 2;
    
    return rotatedX >= -halfWidth && rotatedX <= halfWidth &&
           rotatedY >= -halfHeight && rotatedY <= halfHeight;
  };

  const pointToLineDistance = (px, py, x1, y1, x2, y2) => {
    const A = px - x1, B = py - y1, C = x2 - x1, D = y2 - y1;
    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = lenSq !== 0 ? dot / lenSq : -1;
    let xx, yy;
    if (param < 0) { xx = x1; yy = y1; }
    else if (param > 1) { xx = x2; yy = y2; }
    else { xx = x1 + param * C; yy = y1 + param * D; }
    return Math.sqrt((px - xx) ** 2 + (py - yy) ** 2);
  };

  const addElement = (x, y) => {
    const newElement = {
      type: selectedTool,
      x: Math.round(x / 20) * 20,
      y: Math.round(y / 20) * 20,
      width: 100,
      height: 20,
      color: '#C2A14A',
      rotation: 0
    };
    
    if (selectedTool === 'wall') {
      newElement.x1 = newElement.x;
      newElement.y1 = newElement.y;
      
      // Set wall endpoints based on orientation
      switch (selectedWallOrientation) {
        case 'horizontal':
          newElement.x2 = newElement.x + 100;
          newElement.y2 = newElement.y;
          break;
        case 'vertical':
          newElement.x2 = newElement.x;
          newElement.y2 = newElement.y + 100;
          break;
        case 'diagonal-45':
          newElement.x2 = newElement.x + 100;
          newElement.y2 = newElement.y + 100;
          break;
        case 'diagonal-135':
          newElement.x2 = newElement.x - 100;
          newElement.y2 = newElement.y + 100;
          break;
        default:
      newElement.x2 = newElement.x + 100;
      newElement.y2 = newElement.y;
    }
      
      newElement.thickness = 8;
      newElement.name = 'Wall';
    } else if (selectedTool === 'door') {
      newElement.name = 'Door';
    } else if (selectedTool === 'window') {
      newElement.name = 'Window';
    } else if (selectedTool === 'furniture') {
      const furnitureType = furnitureTypes.find(ft => ft.id === selectedFurnitureType);
      newElement.furnitureType = selectedFurnitureType;
      newElement.name = furnitureType ? furnitureType.name : 'Furniture';
      newElement.color = furnitureType ? furnitureType.color : objectProperties.color;
    }
    
    const newElements = [...elements, newElement];
    setElements(newElements);
    saveToHistory(newElements);
  };

  const updateElementProperties = (newProperties) => {
    if (selectedElement === null) return;
    
    const updatedElements = [...elements];
    updatedElements[selectedElement] = {
      ...updatedElements[selectedElement],
      ...newProperties
    };
    setElements(updatedElements);
    saveToHistory(updatedElements);
  };

  const saveToHistory = (newElements) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(newElements)));
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setElements(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setElements(history[historyIndex + 1]);
    }
  };

  const exportFloorPlan = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'floorplan.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <div className="min-h-screen bg-[#F8F6F1] flex flex-col" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
        {/* Top toolbar */}
        <div className="bg-white border-b border-[#E5E3DE] px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={onBack} className="flex items-center space-x-2 text-[#1C2B25] hover:text-[#C2A14A]">
                <ArrowLeft size={20} /><span>Back</span>
              </button>
              <div className="w-px h-6 bg-[#E5E3DE]"></div>
              <h1 className="text-xl font-semibold text-[#1C2B25]" style={{ fontFamily: "Playfair Display, serif" }}>
                Floor Plan Designer
              </h1>
            </div>

            {/* Center controls */}
            <div className="flex items-center space-x-2">
              <button onClick={undo} disabled={historyIndex <= 0}
                className="p-2 text-[#1C2B25] hover:text-[#C2A14A] disabled:opacity-50">
                <Undo size={20} />
              </button>
              <button onClick={redo} disabled={historyIndex >= history.length - 1}
                className="p-2 text-[#1C2B25] hover:text-[#C2A14A] disabled:opacity-50">
                <Redo size={20} />
              </button>
              <div className="w-px h-6 bg-[#E5E3DE]"></div>
              <button onClick={() => setGridVisible(!gridVisible)}
                className={`p-2 ${gridVisible ? 'text-[#C2A14A]' : 'text-[#1C2B25] hover:text-[#C2A14A]'}`}>
                <Grid size={20} />
              </button>
              <button onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                className="p-2 text-[#1C2B25] hover:text-[#C2A14A]">
                <ZoomOut size={20} />
              </button>
              <span className="text-sm min-w-[50px] text-center">{Math.round(zoom * 100)}%</span>
              <button onClick={() => setZoom(Math.min(2, zoom + 0.1))}
                className="p-2 text-[#1C2B25] hover:text-[#C2A14A]">
                <ZoomIn size={20} />
              </button>
            </div>

            {/* Right actions */}
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-[#F8F6F1] text-[#1C2B25] border border-[#E5E3DE] rounded-lg">
                <Save size={16} /><span>Save</span>
              </button>
              <button onClick={exportFloorPlan}
                className="px-4 py-2 bg-[#C2A14A] text-white rounded-lg hover:bg-[#B8975A] flex items-center space-x-2">
                <Download size={16} /><span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main area */}
        <div className="flex-1 flex">
          {/* Left tools */}
          <div className="w-24 bg-white border-r border-[#E5E3DE] flex flex-col items-center py-6 space-y-3">
            {tools.map(tool => {
              const IconComponent = tool.icon;
              return (
                <div key={tool.id} className="flex flex-col items-center space-y-1">
                  <button onClick={() => setSelectedTool(tool.id)}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    selectedTool === tool.id ? 'bg-[#C2A14A] text-white shadow-lg' : 'text-[#1C2B25] hover:bg-[#F8F6F1]'
                  }`} title={tool.label}>
                  <IconComponent size={20} />
                </button>
                  <span className={`text-xs text-center leading-tight ${
                    selectedTool === tool.id ? 'text-[#C2A14A] font-semibold' : 'text-[#1C2B25]'
                  }`}>
                    {tool.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Furniture type selector */}
          {selectedTool === 'furniture' && (
            <div className="w-72 bg-white border-r border-[#E5E3DE] p-4">
              <h3 className="text-sm font-semibold mb-3 text-[#1C2B25]">Furniture Types</h3>
              <div className="grid grid-cols-2 gap-3">
                {furnitureTypes.map(furniture => (
                  <button
                    key={furniture.id}
                    onClick={() => setSelectedFurnitureType(furniture.id)}
                    className={`p-3 text-sm rounded-lg border transition-colors min-h-[40px] flex items-center justify-center text-center ${
                      selectedFurnitureType === furniture.id
                        ? 'bg-[#C2A14A] text-white border-[#C2A14A]'
                        : 'bg-white text-[#1C2B25] border-[#E5E3DE] hover:bg-[#F8F6F1]'
                    }`}
                    style={{ backgroundColor: selectedFurnitureType === furniture.id ? '#C2A14A' : furniture.color + '20' }}
                  >
                    <span className="leading-tight">{furniture.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Wall orientation selector */}
          {selectedTool === 'wall' && (
            <div className="w-72 bg-white border-r border-[#E5E3DE] p-4">
              <h3 className="text-sm font-semibold mb-3 text-[#1C2B25]">Wall Orientation</h3>
              <div className="space-y-2">
                {wallOrientations.map(orientation => (
                  <button
                    key={orientation.id}
                    onClick={() => setSelectedWallOrientation(orientation.id)}
                    className={`w-full p-3 text-sm rounded-lg border transition-colors text-left ${
                      selectedWallOrientation === orientation.id
                        ? 'bg-[#C2A14A] text-white border-[#C2A14A]'
                        : 'bg-white text-[#1C2B25] border-[#E5E3DE] hover:bg-[#F8F6F1]'
                    }`}
                  >
                    <div className="font-medium">{orientation.name}</div>
                    <div className="text-xs opacity-75">{orientation.description}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Canvas */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="bg-white rounded-2xl shadow-xl border border-[#E5E3DE] p-6">
                <canvas ref={canvasRef} 
                  onMouseDown={handleCanvasMouseDown}
                  onMouseMove={handleCanvasMouseMove}
                  onMouseUp={handleCanvasMouseUp}
                  onMouseLeave={handleCanvasMouseUp}
                  className="border border-[#E5E3DE] rounded-lg"
                  style={{ 
                    transform: `scale(${zoom})`, 
                    transformOrigin: 'top left',
                    cursor: selectedTool === 'move' ? (isDragging ? 'grabbing' : 'grab') : 
                            selectedTool === 'eraser' ? 'crosshair' : 'crosshair'
                  }}/>
              </div>
            </div>
            <div className="bg-white border-t border-[#E5E3DE] px-6 py-3 text-sm flex justify-between">
              <div className="flex space-x-6">
                <span>Tool: <strong>{tools.find(t => t.id === selectedTool)?.label}</strong></span>
                <span>Elements: <strong>{elements.length}</strong></span>
                {selectedElement !== null && (
                  <span>Selected: <strong>{elements[selectedElement]?.name || elements[selectedElement]?.type}</strong></span>
                )}
              </div>
              <div className="flex space-x-6">
                <span>Canvas: 800×600</span>
                <span>Grid: {gridVisible ? 'ON' : 'OFF'}</span>
              </div>
            </div>
          </div>

          {/* Properties panel */}
          {selectedElement !== null && (
            <div className="w-80 bg-white border-l border-[#E5E3DE] p-6">
              <h3 className="text-lg font-semibold mb-6" style={{ fontFamily: "Playfair Display, serif" }}>
                Object Properties
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Name</label>
                  <input type="text" value={elements[selectedElement]?.name || ''}
                    onChange={(e) => {
                      const newName = e.target.value;
                      updateElementProperties({ name: newName });
                    }}
                    className="w-full px-3 py-2 border rounded-lg"/>
                </div>
                {elements[selectedElement]?.type === 'wall' ? (
                  <>
                    <div>
                      <label className="block text-sm mb-2">Length</label>
                      <input type="number" value={Math.sqrt(
                        Math.pow((elements[selectedElement]?.x2 || 0) - (elements[selectedElement]?.x1 || 0), 2) +
                        Math.pow((elements[selectedElement]?.y2 || 0) - (elements[selectedElement]?.y1 || 0), 2)
                      )}
                        onChange={(e) => {
                          const newLength = parseInt(e.target.value) || 0;
                          const element = elements[selectedElement];
                          if (element) {
                            const angle = Math.atan2(element.y2 - element.y1, element.x2 - element.x1);
                            const newX2 = element.x1 + newLength * Math.cos(angle);
                            const newY2 = element.y1 + newLength * Math.sin(angle);
                            updateElementProperties({ x2: newX2, y2: newY2 });
                          }
                        }}
                        className="w-full px-3 py-2 border rounded-lg"/>
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Thickness</label>
                      <input type="number" 
                        value={inputValues[`thickness-${selectedElement}`] ?? (elements[selectedElement]?.thickness ?? 8)}
                        onChange={(e) => {
                          const value = e.target.value;
                          setInputValues(prev => ({ ...prev, [`thickness-${selectedElement}`]: value }));
                        }}
                        onBlur={(e) => {
                          const value = e.target.value;
                          if (value === '') {
                            updateElementProperties({ thickness: 0 });
                          } else {
                            const numValue = parseInt(value);
                            if (!isNaN(numValue)) {
                              const clampedValue = Math.max(0, Math.min(50, numValue));
                              updateElementProperties({ thickness: clampedValue });
                            }
                          }
                          // Clear the input value from local state
                          setInputValues(prev => {
                            const newValues = { ...prev };
                            delete newValues[`thickness-${selectedElement}`];
                            return newValues;
                          });
                        }}
                        min="0" max="50"
                        className="w-full px-3 py-2 border rounded-lg"/>
                    </div>
                  </>
                ) : (
                  <>
                <div>
                  <label className="block text-sm mb-2">Width</label>
                      <input type="number" value={elements[selectedElement]?.width || 100}
                        onChange={(e) => {
                          const newWidth = parseInt(e.target.value) || 0;
                          updateElementProperties({ width: newWidth });
                        }}
                    className="w-full px-3 py-2 border rounded-lg"/>
                </div>
                <div>
                  <label className="block text-sm mb-2">Height</label>
                      <input type="number" value={elements[selectedElement]?.height || 20}
                        onChange={(e) => {
                          const newHeight = parseInt(e.target.value) || 0;
                          updateElementProperties({ height: newHeight });
                        }}
                    className="w-full px-3 py-2 border rounded-lg"/>
                </div>
                  </>
                )}
                <div>
                  <label className="block text-sm mb-2">Color</label>
                  <input type="color" value={elements[selectedElement]?.color || '#C2A14A'}
                    onChange={(e) => {
                      const newColor = e.target.value;
                      updateElementProperties({ color: newColor });
                    }}
                    className="w-full h-10 rounded-lg"/>
                </div>
                <div>
                  <label className="block text-sm mb-2">Rotation</label>
                  <input type="range" min="0" max="360" value={elements[selectedElement]?.type === 'wall' ? 
                    Math.round(Math.atan2(
                      (elements[selectedElement]?.y2 || 0) - (elements[selectedElement]?.y1 || 0),
                      (elements[selectedElement]?.x2 || 0) - (elements[selectedElement]?.x1 || 0)
                    ) * 180 / Math.PI) : (elements[selectedElement]?.rotation || 0)}
                    onChange={(e) => {
                      const newRotation = parseInt(e.target.value);
                      if (elements[selectedElement]?.type === 'wall') {
                        // For walls, rotate around the center point
                        const element = elements[selectedElement];
                        const centerX = (element.x1 + element.x2) / 2;
                        const centerY = (element.y1 + element.y2) / 2;
                        const length = Math.sqrt(
                          Math.pow(element.x2 - element.x1, 2) + 
                          Math.pow(element.y2 - element.y1, 2)
                        ) / 2;
                        
                        const radians = newRotation * Math.PI / 180;
                        const newX1 = centerX - length * Math.cos(radians);
                        const newY1 = centerY - length * Math.sin(radians);
                        const newX2 = centerX + length * Math.cos(radians);
                        const newY2 = centerY + length * Math.sin(radians);
                        
                        updateElementProperties({ x1: newX1, y1: newY1, x2: newX2, y2: newY2 });
                      } else {
                        updateElementProperties({ rotation: newRotation });
                      }
                    }}
                    className="w-full"/>
                  <div className="text-sm text-right">
                    {elements[selectedElement]?.type === 'wall' ? 
                      Math.round(Math.atan2(
                        (elements[selectedElement]?.y2 || 0) - (elements[selectedElement]?.y1 || 0),
                        (elements[selectedElement]?.x2 || 0) - (elements[selectedElement]?.x1 || 0)
                      ) * 180 / Math.PI) : (elements[selectedElement]?.rotation || 0)}°
                  </div>
                </div>
                
                {/* Delete button */}
                <div className="pt-4 border-t border-[#E5E3DE]">
                  <button
                    onClick={() => {
                      if (selectedElement !== null) {
                        const newElements = elements.filter((_, index) => index !== selectedElement);
                        setElements(newElements);
                        saveToHistory(newElements);
                        setSelectedElement(null);
                      }
                    }}
                    className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Eraser size={16} />
                    <span>Delete Element</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
