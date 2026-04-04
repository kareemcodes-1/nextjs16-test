"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

export interface SplitLinesProps {
  tag?: keyof React.JSX.IntrinsicElements;
  text: string;
  className?: string;
  duration?: number;
  stagger?: number;
  ease?: string;
  yPercent?: number;
  start?: string;
  delay?: number;
}

export const SplitLines: React.FC<SplitLinesProps> = ({
  tag: Tag = "p",
  text,
  className = "",
  duration = 1,
  stagger = 0.1,
  ease = "power3.out",
  yPercent = 100,
  start = "top 90%",
  delay = 0,
}) => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const outerSplit = new SplitText(containerRef.current, {
        type: "lines",
        linesClass: "split-outer",
      });

      const innerSplit = new SplitText(outerSplit.lines, {
        type: "lines",
        linesClass: "split-inner",
      });

      gsap.set(outerSplit.lines, { overflow: "hidden" });
      gsap.set(innerSplit.lines, { yPercent });

      gsap.to(innerSplit.lines, {
        yPercent: 0,
        duration,
        stagger,
        ease,
        delay,
        scrollTrigger: {
          trigger: containerRef.current,
          start,         // e.g. "top 90%" — when top of element hits 90% of viewport
          toggleActions: "play none none none", // plays once, doesn't reverse
        },
      });

      return () => {
        innerSplit.revert();
        outerSplit.revert();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { scope: containerRef }
  );

  const Component = Tag as React.ElementType;

  return (
    <Component ref={containerRef} className={className}>
      {text}
    </Component>
  );
};