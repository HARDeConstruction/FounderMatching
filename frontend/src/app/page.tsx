"use client";

import Benefits from "@/components/landing-page/Benefits";
import Header from "@/components/landing-page/Header";
import HeroSection from "@/components/landing-page/HeroSection";
import HowItWorks from "@/components/landing-page/HowItWorks";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>
        <Header />
        <HeroSection />
        <HowItWorks />
        <Benefits />
      </div>
    </>
  );
}
