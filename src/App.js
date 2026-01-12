import React, { useState } from 'react';
import './App.css';

/* Size, Labels and Colours of the Buttons */
const section1 = "ABOUT"
const section2 = "EXPERIENCE"
const section3 = "PROJECTS"
const section4 = "CONTACT"

const pieData = [
  { label: section4, value: 14, color: '#65881A', image: 'image.png'},
  { label: section3, value: 14, color: '#D24C28', image: 'logo192.png'},
  { label: section2, value: 14, color: '#C5CF5E', image: 'logo192.png'},
  { label: section1, value: 14, color: '#E78E17', image: 'image.png'},
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

        const fillColor = isHovered ? "grey" : isActive ? slice.color : "black";

        return (
          <g key={index}>
            <path
              key={index}
              className="segment"
              d={pathData}
              fill={fillColor}
              stroke="#616161"
              strokeWidth="0.01"
              onClick={() => onSegmentClick(slice.label, slice.color)}
              onMouseEnter={() => onSegmentHover(slice.label)}
              onMouseLeave={() => onSegmentLeave()}
              style={{ cursor: 'pointer' }}
            />
          </g>
        );
      })}
    </svg>
  );
}

function App() {
  const [activeSlice, setActiveSlice] = useState("Welcome to Jamal's Portfolio");

  const [baseColor, setBaseColor] = useState('grey');
  const [hoverColor, setHoverColor] = useState('');

  var info = About();

  switch (activeSlice) {
    case section1:
      info = About();
      break;
    case section2:
      info = Experience();
      break;
    case section3:
      info = Projects();
      break;
    case section4:
      info = Contact();
      break;
    default: 
      info = Welcome();
  }


  return (
    <div className="container">
      <div className="circle" style={{ backgroundColor: baseColor }}>
        <span className="circle-text">{activeSlice}</span>
      </div>
      <PieChart 
        data={pieData} 
        activeSlice={activeSlice}
        hoverSlice={hoverColor} 
        onSegmentClick={(label, color) => {
          setActiveSlice(label);
          setBaseColor(color);
        }}
        onSegmentHover={(label) => setHoverColor(label)}
        onSegmentLeave={() => setHoverColor(null)}
      />
      <div className="info">
        {info}
      </div>
    </div>
  );
}

function Welcome() {
  return (
    <></>
  )
}

function About() {
  return (
    <div className="About">
      <h1>About Me</h1>
      <p>[ABOUT ME]</p>
    </div>
  )
}

function Experience() {
  return (
    <div>
      <h1>EXPERIENCE</h1>
      <p>[SKILLS SECTIONS]</p>
    </div>
  )
}

function Projects() {
  return (
    <div>
      <h1>PROJECTS</h1>
      <p>[PROJECTS]</p>
    </div>
  )
}

function Contact() {
  return (
    <div>
      <h1>CONTACT</h1>
      <p>[CONTACTS]</p>
    </div>
  )
}

export default App;