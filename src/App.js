import React, { useState } from 'react';
import './App.css';
import { hover } from '@testing-library/user-event/dist/hover';

/* Size, Labels and Colours of the Buttons */
const pieData = [
  { label: 'About', value: 14, color: 'black' },
  { label: 'Work', value: 14, color: 'black' },
  { label: 'Skills', value: 14, color: 'black' },
  { label: 'Contact', value: 14, color: 'black' },
];


/* Gets the cooredinates for the percentage of the button on pie chart */
function getCoordinatesForPercent(percent) {
  const x = Math.cos(2 * Math.PI * percent);
  const y = Math.sin(2 * Math.PI * percent);
  return [x, y];
}

function PieChart({ data, activeSlice, hoverSlice, onSegmentClick, onSegmentHover, onSegmentLeave }) {
  let cumulativePercent = 0;

  return (
    <svg viewBox="-1 -1 2 2" style={{
      transform: 'rotate(80deg)',
      width: '200vw',
      height: '200vw',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transformOrigin: 'center',
      marginLeft: '-100vw',
      marginTop: '-100vw',
      zIndex: 0,
    }}>
      {data.map((slice, index) => {
        const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
        cumulativePercent += slice.value / 100;
        const [endX, endY] = getCoordinatesForPercent(cumulativePercent);

        const largeArcFlag = slice.value / 100 > 0.5 ? 1 : 0;

        const pathData = [
          `M ${startX} ${startY}`,
          `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
          `L 0 0`,
        ].join(' ');

        const isActive = activeSlice === slice.label;
        const isHovered = hoverSlice === slice.label;

        const fillColor = isHovered ? "grey" : isActive ? 'blue' : slice.color;

        return (
          <path
            key={index}
            className="segment"
            d={pathData}
            fill={fillColor}
            stroke="white"
            strokeWidth="0.01"
            onClick={() => onSegmentClick(slice.label)}
            onMouseEnter={() => onSegmentHover(slice.label)}
            onMouseLeave={() => onSegmentLeave()}
            style={{ cursor: 'pointer' }}
          />
        );
      })}
    </svg>
  );
}

function App() {
  const [activeSlice, setActiveSlide] = useState(null);

  const [baseColor, setBaseColor] = useState('grey');
  const [hoverColor, setHoverColor] = useState('');

  const currentColor = hoverColor || baseColor;
  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'teal'];
  const angleStep = 270 / colors.length;

  return (
    <div className="container">
      <div className="circle" style={{ backgroundColor: currentColor }}>
        <span className="circle-text">Welcome to Jamal's Portfolio</span>
      </div>
      <PieChart 
        data={pieData} 
        activeSlice={activeSlice}
        hoverSlice={hoverColor} 
        onSegmentClick={(label) => setActiveSlide(label)}
        onSegmentHover={(label) => setHoverColor(label)}
        onSegmentLeave={() => setHoverColor(null)}
      />


    </div>
  );
}

export default App;