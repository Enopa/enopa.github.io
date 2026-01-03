import React, { useState } from 'react';
import './App.css';

/* Size, Labels and Colours of the Buttons */
const pieData = [
  { label: 'Contact', value: 14, color: '#65881A'},
  { label: 'Work', value: 14, color: '#D24C28'},
  { label: 'Skills', value: 14, color: '#C5CF5E'},
  { label: 'About', value: 14, color: '#E78E17'},
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
          <path
            key={index}
            className="segment"
            d={pathData}
            fill={fillColor}
            stroke="white"
            strokeWidth="0.01"
            onClick={() => onSegmentClick(slice.label, slice.color)}
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
  const [activeSlice, setActiveSlice] = useState("Welcome to Jamal's Portfolio");

  const [baseColor, setBaseColor] = useState('grey');
  const [hoverColor, setHoverColor] = useState('');

  var info = About();

  switch (activeSlice) {
    case "About":
      info = About();
      break;
    case "Skills":
      info = Skills();
      break;
    case "Work":
      info = Work();
      break;
    case "Contact":
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
      <p>My name is Jamal Haruna, I'm 23 years old and live in London. I'm bisexual and he/they</p>
    </div>
  )
}

function Skills() {
  return (
    <div>
      <h1>Skills</h1>
      <p>I'm diamond rank in Street Fighter 6 </p>
    </div>
  )
}

function Work() {
  return (
    <div>
      <h1>Work</h1>
      <p>I am currently a Business Process Automation Developer at Fitch Ratings.</p>
    </div>
  )
}

function Contact() {
  return (
    <div>
      <h1>Contact</h1>
      <p>Reach me on 03harunaj@gmail.com</p>
    </div>
  )
}

export default App;