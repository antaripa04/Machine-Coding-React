import { useState } from "react";
import "./accordion.css";

const items = [
  {
    eventKey: "0",
    title: "Accordion Item 1",
    content: "Accordion Body 1",
  },
  {
    eventKey: "1",
    title: "Accordion Item 2",
    content: "Accordion Body 2",
  },
  {
    eventKey: "2",
    title: "Accordion Item 3",
    content: "Accordion Body 3",
  },
];

export const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
     <div className="accordion">
      {items.map((item, index) => (
        <div className="accordion-item" key={item.title}>
          <button 
            className={`accordion-button ${index === activeIndex ? 'active' : ''}`}
            onClick={() => setActiveIndex(index === activeIndex ? null : index)}
          >
            {item.title}
            <span className="accordion-icon">
              {index === activeIndex ? '−' : '+'}
            </span>
          </button>
          {index === activeIndex && (
            <div className="accordion-content">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
