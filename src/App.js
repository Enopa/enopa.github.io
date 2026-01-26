import React, { useState } from 'react';
import './App.css';

/* Size, Labels and Colours of the Buttons */
const section1 = "ABOUT"
const section2 = "EXPERIENCE"
const section3 = "PROJECTS"
const section4 = "CONTACT"

const pieData = [
  { label: section4, value: 14, color: '#65881A', image: 'image.png' },
  { label: section3, value: 14, color: '#D24C28', image: 'image.png' },
  { label: section2, value: 14, color: '#C5CF5E', image: 'image.png' },
  { label: section1, value: 14, color: '#E78E17', image: 'logo.png' },
];


/* Gets the cooredinates for the percentage of the button on pie chart */
function getCoordinatesForPercent(percent) {
  const x = Math.cos(2 * Math.PI * percent);
  const y = Math.sin(2 * Math.PI * percent);
  return [x, y];
}

function getTextCoordinatesForPercent(percent, radius) {
  const angle = 2 * Math.PI * percent;
  return [
    Math.cos(angle) * radius,
    Math.sin(angle) * radius,
  ];
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

        const startPercent = cumulativePercent

        const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
        cumulativePercent += slice.value / 100;

        const endPercent = cumulativePercent
        const [endX, endY] = getCoordinatesForPercent(cumulativePercent);

        const midPercent = (startPercent + endPercent) / 2;
        const midAngle = (midPercent * 360) + 180;

        const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const scaleFactor = Math.min(1, 1200 / vw); // clamp growth

        const BASE_TEXT_RADIUS = 0.3;
        const textRadius = BASE_TEXT_RADIUS * scaleFactor;

        const [textX, textY] = getTextCoordinatesForPercent(midPercent, textRadius);

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
              stroke="#ffffff"
              strokeWidth="0.001"
              onClick={() => onSegmentClick(slice.label, slice.color, slice.image)}
              onMouseEnter={() => onSegmentHover(slice.label)}
              onMouseLeave={() => onSegmentLeave()}
              style={{ cursor: 'pointer' }}
            />

            <text
              x={textX}
              y={textY}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize="0.02"
              pointerEvents="none"
              transform={`rotate(${midAngle} ${textX} ${textY})`}
              style={{ userSelect: 'none' }}
            >{slice.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

function App() {
  const [activeSlice, setActiveSlice] = useState("WELCOME");
  const [baseColor, setBaseColor] = useState('#b95a00');
  const [hoverColor, setHoverColor] = useState('');

  const [bgToggle, setBG] = useState(true);
  const [firstImage, setFirstImage] = useState({});
  const [secondImage, setSecondImage] = useState({});

  const sectionDictionary = {
    "ABOUT": About(),
    "EXPERIENCE": Experience(),
    "PROJECTS": Projects(),
    "CONTACT": Contact(),
    "WELCOME": Welcome()
  }

  const imageDictionary = {
    "ABOUT": "about.png",
    "EXPERIENCE": "experience.png",
    "PROJECTS": "projects.png",
    "CONTACT": "contact.png",
  }


  return (
    <div>
      <div className={`bg-layer ${bgToggle ? "active" : ""}`} style={firstImage} />
      <div className={`bg-layer ${!bgToggle ? "active" : ""}`} style={secondImage} />
      <div className="container">

        <div className="circle" style={{ backgroundColor: baseColor }}>
          <img src={imageDictionary[activeSlice]} height="150" alt="Symbol of Section" />
        </div>
        <PieChart
          data={pieData}
          activeSlice={activeSlice}
          hoverSlice={hoverColor}
          onSegmentClick={(label, color, image) => {
            setActiveSlice(label);
            setBaseColor(color);
            setBG(!bgToggle);
            bgToggle ? setSecondImage({ backgroundImage: `url(${image})` }) : setFirstImage({ backgroundImage: `url(${image})` });
          }}
          onSegmentHover={(label) => setHoverColor(label)}
          onSegmentLeave={() => setHoverColor(null)}
        />
        <div className="info" pointerEvents="none" style={{ userSelect: 'none' }}>
          {sectionDictionary[activeSlice]}
        </div>
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
      <p>
        I’m a <span class="highlight">computer science graduate</span> with experience in
        <span class="highlight"> software engineering</span> and I am currently an
        <span class="highlight"> automation developer </span> at
        <strong> Fitch</strong>.
      </p>

      <p>
        I was <span class="highlight">born and raised in London</span>, with
        <span class="highlight"> Ghanaian </span> and
        <span class="highlight"> Indian </span> roots, which means I grew up around a
        mix of perspectives and ideas. It’s shaped how I approach problems,
        <span class="highlight"> open-minded</span>,<span class="highlight"> adaptable</span>, and always thinking
        about the human side of things.
      </p>

      <p>
        Outside of work, you’ll usually find me <span class="highlight">at the gym </span>
        or deep into a <span class="highlight">fighting game</span>, obsessing over
        the mechanics, and getting a little bit better each time. Both have
        taught me the same lesson: progress comes from
        <span class="highlight"> patience</span> and learning from
        every loss.
      </p>

      <p>
        Right now, I’m focused on improving my skills and completing work that feels
        <span class="highlight"> practical</span> and <span class="highlight">genuinely exciting</span>,
        building on what I already know while staying curious about what’s next.
      </p>
    </div>
  )
}

function Experience() {
  return (
    <div>
      <h1>EXPERIENCE</h1>
      <section id="experience" class="timeline">
        <div class="timeline-item">
          <div class="timeline-marker"></div>
          <div class="timeline-content">
            <span class="timeline-date highlight">2020 - 2023</span>
            <h3>Education</h3>
            <p>
              Graduated from <span class="highlight">Queen Mary’s University of London </span>
              with a <span class="highlight">First-Class BSc (Hons) in Computer Science</span>.
              Covered a wide range of modules including software engineering, web development, neural networks and security engineering.
            </p>
          </div>
        </div>

        <div class="timeline-item">
          <div class="timeline-marker"></div>
          <div class="timeline-content">
            <span class="timeline-date highlight">September 2023 - October 2024</span>
            <h3>Software Engineering · Fitch</h3>
            <p>
              Joined Fitch in a <span class="highlight">rotational software engineering role</span>,
              working across front-end and back-end systems using
              <span class="highlight"> React</span>,
              <span class="highlight"> TypeScript</span>,
              <span class="highlight"> Spring Boot</span>, and
              <span class="highlight"> Jest</span>.
            </p>
          </div>
        </div>

        <div class="timeline-item">
          <div class="timeline-marker"></div>
          <div class="timeline-content">
            <span class="timeline-date highlight">October 2024 - Present </span>
            <h3>Automation Development · Fitch</h3>
            <p>
              Pivoted into an <span class="highlight">automation development role</span>,
              working across a wide range of tools and technologies and building a
              <span class="highlight"> horizontal skill set</span> focused on adaptability
              and workflow improvement.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Projects() {
  return (
    <div>
      <h1>PROJECTS</h1>
      <p>
        A selection of personal and academic projects where I’ve explored ideas
        through hands-on building. More projects can be found on my GitHub.
      </p>

      <div class="projects-grid">
        <div class="project-card">
          <h3>PPO Street Fighter II RL Agent</h3>
          <p>
            A <span class="highlight">reinforcement learning</span> agent trained to
            play <span class="highlight">Street Fighter II</span>, built as a final
            year research project driven by curiosity around decision-making in
            complex environments.
          </p>
          <p class="tech">
            PyTorch · Gym · Gym Retro · Stable-Baselines3 · Optuna
          </p>
          <a
            href="https://github.com/Enopa/StreetFighterRL"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub →
          </a>
        </div>

        <div class="project-card">
          <h3>Indie Game Development (Unity)</h3>
          <p>
            A collection of small games built in
            <span class="highlight"> Unity</span>, experimenting with different genres
            and mechanics. Created independently for fun and creative exploration.
          </p>
          <p class="tech">
            Unity · C# · Game Design · Creative Tooling
          </p>
          <a
            href="https://enopa.itch.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            View games →
          </a>
        </div>

        <div class="project-card">
          <h3>Mentor Matcher Platform</h3>
          <p>
            A group-built platform matching
            <span class="highlight"> mentors and mentees</span> using a
            <span class="highlight"> Dijkstra-inspired algorithm</span> based on shared
            interests and tags.
          </p>
          <p class="tech">
            React · JavaScript · Firebase · Bootstrap
          </p>
          <a
            href="https://github.com/Dil02/mentor-matcher"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub →
          </a>
        </div>
      </div>

      <p class="projects-footer">
        More experiments and side projects live on my
        <a href="https://github.com/Enopa" target="_blank" rel="noopener noreferrer"> GitHub</a>.
      </p>
    </div>
  );
}

function Contact() {
  return (
    <div>
      <h1>CONTACT</h1>
      <section id="contact">


        <p>
          If you’d like to get in touch to discuss an opportunity, ask a
          question, or just say hello, you can reach me using the details below.
        </p>

        <ul class="contact-list">
          <li>
            <span class="highlight">Email: </span>
            <a href="mailto:03harunaj@gmail.com">03harunaj@gmail.com</a>
          </li>
          <li>
            <span class="highlight">LinkedIn: </span>
            <a
              href="https://www.linkedin.com/in/jamal-haruna-73007b214/"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin.com/in/jamal-haruna
            </a>
          </li>
          <li>
            <span class="highlight">CV: </span>
            <a href="CV.pdf" target="_blank" rel="noopener noreferrer">
              View my CV
            </a>
          </li>
        </ul>
      </section>

    </div>
  )
}

export default App;