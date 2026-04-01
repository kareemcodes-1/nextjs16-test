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
  markers?: boolean;
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
  markers = false,
}) => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // 1. Outer split FIRST — creates the mask wrappers
      const outerSplit = new SplitText(containerRef.current, {
        type: "lines",
        linesClass: "split-outer",
      });

      // 2. Inner split SECOND — splits inside the already-wrapped lines
      const innerSplit = new SplitText(outerSplit.lines, {
        type: "lines",
        linesClass: "split-inner",
      });

      // 3. Outer lines act as overflow:hidden masks; inner lines start offscreen
      gsap.set(outerSplit.lines, { overflow: "hidden" });
      gsap.set(innerSplit.lines, { yPercent });

      // 4. ScrollTrigger fires the animation once when element enters viewport
      gsap.to(innerSplit.lines, {
        yPercent: 0,
        duration,
        stagger,
        ease,
        scrollTrigger: {
          trigger: containerRef.current,
          start,
          markers,
          once: true,
        },
      });

      return () => {
        ScrollTrigger.getAll().forEach((st) => st.kill());
        innerSplit.revert();
        outerSplit.revert();
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