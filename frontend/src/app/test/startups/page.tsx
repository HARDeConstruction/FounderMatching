"use client";

import StartupCard from "@/components/layout/Discover/StartupCard";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

import { sampleStartups } from "@/data/sampleStartups";

const animationVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

const DiscoverPage = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const startups = sampleStartups;

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % sampleStartups.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIndex(
      (prev) => (prev - 1 + sampleStartups.length) % sampleStartups.length
    );
  };

  return (
    <>
      <div className="flex-1 mt-4">
        <h1 className="text-xl font-semibold mb-4">Discover</h1>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={animationVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="pl-4 pr-8 pt-2"
          >
            {/* <StartupCard startup={startups[index]} /> */}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center items-center p-6 space-x-8">
          <Button variant="outline" onClick={handlePrev}>
            Previous
          </Button>
          <Button>Save</Button>
          <Button variant="outline" onClick={handleNext}>
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default DiscoverPage;
