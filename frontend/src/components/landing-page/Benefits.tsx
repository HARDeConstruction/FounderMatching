import React, { useEffect, useState } from "react";
import { useId } from "react";
import { FaUserPlus, FaRobot, FaHandshake, FaRocket } from "react-icons/fa";
import { IconBaseProps } from "react-icons";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../ui/button";

const features = [
  {
    title: "Display Yourself",
    description:
      "Build your professional profile, showcase your unique skills, story, and personality. Let the right people discover the real you.",
    image: "images/FMProfile.png",
  },
  {
    title: "Discover Others",
    description:
      "Swipe through a diverse pool of talent, explore profiles that align with your goals, and connect with potential co-founders in seconds.",
    image: "images/FMDiscover.png", 
  },
];

export default function Benefits() {
  const [sectionInView, setSectionInView] = useState(false);
  const [inView, setInView] = useState<boolean[]>(
    new Array(features.length).fill(false)
  );

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setSectionInView(entry.isIntersecting);
        });
      },
      { threshold: 0.5 }
    );
    const sectionElement = document.querySelector(".how-it-works-section");
    sectionElement && sectionObserver.observe(sectionElement);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          setInView((prev) => {
            const newInView = [...prev];
            newInView[index] = entry.isIntersecting;
            return newInView;
          });
        });
      },
      { threshold: 0.5 }
    );

    const elements = document.querySelectorAll(".step-card");
    elements.forEach((el) => observer.observe(el));

    return () => {
      sectionElement && sectionObserver.unobserve(sectionElement);
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 1) % features.length);
  const handlePrev = () =>
    setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);

  const current = features[currentIndex];

  return (
    <div className="min-h-screen w-full flex items-center justify-center py-10 px-4 md:px-20 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center w-full max-w-6xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold">{current.title}</h2>
            <p className="text-lg text-gray-600">{current.description}</p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handlePrev}>
                Previous
              </Button>
              <Button onClick={handleNext}>Next</Button>
            </div>
          </motion.div>

          <motion.div
            key={current.image}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <img
              src={current.image}
              alt={current.title}
              className="rounded-2xl shadow-md max-w-full w-[600px]"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
