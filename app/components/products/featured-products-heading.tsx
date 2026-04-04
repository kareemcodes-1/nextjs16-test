"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

const FeaturedProductsHeading = () => {
  const productHeadingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (!productHeadingRef.current) return;

    const split = new SplitText(productHeadingRef.current, {
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
      trigger: productHeadingRef.current,
      start: "top 90%",
      end: "bottom top",
      onEnter: () => tl.play(),
      onLeave: () => tl.reverse(),
      onEnterBack: () => tl.play(),
      onLeaveBack: () => tl.reverse(),
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      split.revert();
    };
  }, []);

  return (
    <h1
      ref={productHeadingRef}
      className="text-[2.2rem] md:text-[3.5rem] lg:text-[5rem] telegraf font-[200] overflow-hidden lg:leading-[1] mb-[1.5rem] lg:mb-0"
    >
      Featured Products
    </h1>
  );
};

export default FeaturedProductsHeading;