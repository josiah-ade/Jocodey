"use client";

import React, { useEffect, useRef, useState } from "react";

interface CounterItem {
  number: string;
  suffix?: string;
  title: string;
}

const counters: CounterItem[] = [
  { number: "5", suffix: "+", title: "Years Helping Business" },
  { number: "50", suffix: "+", title: "Complete Projects" },
  { number: "40", suffix: "+", title: "Happy Customers" },
];

const CounterSection: React.FC = () => {
  const [start, setStart] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStart(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="counter-area section-padding" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {counters.map((counter, index) => (
            <CounterBox
              key={index}
              targetNumber={parseInt(counter.number)}
              suffix={counter.suffix}
              title={counter.title}
              start={start}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface CounterBoxProps {
  targetNumber: number;
  suffix?: string;
  title: string;
  start: boolean;
}

const CounterBox: React.FC<CounterBoxProps> = ({
  targetNumber,
  suffix,
  title,
  start,
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTimestamp: number | null = null;
    const duration = 2000; // 2 seconds

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * targetNumber));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [start, targetNumber]);

  return (
    <div className="counter-item">
      <div className="single-counter">
        <div className="counter-contents text-center">
          <h2 className="text-3xl font-bold">
            <span className="counter-number">{count}</span>
            {suffix && <span>{suffix}</span>}
          </h2>
          <h3 className="counter-heading text-lg font-medium mt-2">{title}</h3>
        </div>
      </div>
    </div>
  );
};

export default CounterSection;
