"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
// import { SplitLines } from "../../components/animations/SplitLines";




const Hero = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const heroHeadings = useRef<(HTMLHeadingElement | null)[]>([]);
  const heroImage = useRef<HTMLImageElement | null>(null);
  const heroLink = useRef<HTMLAnchorElement | null>(null);

  return (
    <div
      ref={container}
      className="w-full h-screen sticky top-0"
    >
      <section className="relative h-full w-full">
        <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none overlay" />
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <Image
            src="/hero.webp"
            alt="hero-bg"
            fill

            quality={100}
            ref={heroImage}
            sizes="100vw"
            className="object-cover object-[60%] lg:object-top"
          />
        </div>

        <div className="flex flex-col justify-end w-full h-full px-[1.5rem] lg:px-8 pb-[2rem] lg:pb-[1rem] relative z-[15]">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-[1.5rem] lg:gap-0">
            <div>
              {/* <SplitLines
                tag="h1"
                text="JEWELLERY MADE TO"
                className="block text-white uppercase tracking-[0.03em] text-[2rem] lg:text-[6rem] leading-none"
                duration={0.8}
              />
              <SplitLines
                tag="h1"
                text="BE REMEMBERED"
                className="block text-white uppercase tracking-[0.03em] text-[2rem] lg:text-[6rem] leading-none"
                duration={0.8}
                delay={0.1}
              /> */}
            </div>

            <div className="overflow-hidden h-[3.5rem] lg:h-[4.5rem]">
              <Link
                ref={heroLink}
                href={'/collections/mens'}
                className="btn btn--light btn--icon-right cursor-pointer"
              >
                Shop now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
