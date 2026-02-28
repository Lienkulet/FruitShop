"use client";

import { useEffect, useRef, useState } from "react";

export default function RevealOnScroll({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  threshold = 0.2,
  rootMargin = "0px 0px -8% 0px",
}) {
  const elementRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || revealed) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [revealed, threshold, rootMargin]);

  return (
    <Tag
      ref={elementRef}
      className={`${className} reveal-on-scroll ${revealed ? "revealed" : ""}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
