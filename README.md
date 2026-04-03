This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


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