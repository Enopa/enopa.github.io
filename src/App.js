import React, { useState } from 'react';
import './App.css';

function App() {
  const [baseColor, setBaseColor] = useState('grey');
  const [hoverColor, setHoverColor] = useState('');

  const currentColor = hoverColor || baseColor;

  const colors = ['red', 'orange', 'yellow', 'green'];
  const radius = 200;
  const centerX = 200;
  const centerY = 200;

  return (

    <div className="container">
      <div className="circle-container">
        <div className="circle" style={{ backgroundColor: currentColor }}>
          <span className="circle-text">Welcome to Jamal's Portfolio</span>
        </div>

        {colors.map((color, index) => {
          const angle = (Math.PI * index) / (colors.length - 1); // 0 to π radians
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);

          return (
            <button
              key={color}
              className="circle-button"
              style={{
                left: `${centerX + x}px`,
                top: `${centerY - y}px`,
              }}
              onMouseEnter={() => setHoverColor(color)}
              onMouseLeave={() => setHoverColor('')}
              onClick={() => setBaseColor(color)}
            >
              {color}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;