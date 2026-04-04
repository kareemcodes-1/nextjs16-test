// best-sellers-heading.tsx (client component)
"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitText from 'gsap/SplitText';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(SplitText, ScrollTrigger);

const BestSellersHeading = () => {
  const bestSellersHeadingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (!bestSellersHeadingRef.current) return;

    const split = new SplitText(bestSellersHeadingRef.current, {
      type: "lines",
      mask: "lines",
      linesClass: "line",
      autoSplit: true,
    });

    gsap.set(split.lines, { yPercent: 100 });

    const tl = gsap.to(split.lines, {
      yPercent: 0,
      duration: 1,
      stagger: 0.025,
      ease: "power3.out",
      paused: true,
    });

    ScrollTrigger.create({
      trigger: bestSellersHeadingRef.current,
      start: "top 90%",
      end: "bottom top",
      onEnter: () => tl.play(),
      onLeave: () => tl.reverse(),
      onEnterBack: () => tl.play(),
      onLeaveBack: () => tl.reverse(),
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      split.revert();
    };
  }, []);

  return (
    <h2
      ref={bestSellersHeadingRef}
      className="text-[2.2rem] md:text-[3.5rem] lg:text-[5rem] mb-[1.5rem] uppercase text-center overflow-hidden leading-[1]"
    >
      Best Sellers
    </h2>
  );
};

export default BestSellersHeading;