import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";

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

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setSectionInView(entry.isIntersecting);
        });
      },
      { threshold: 0.5 }
    );
    const sectionElement = document.querySelector(".benefits-section");
    sectionElement && sectionObserver.observe(sectionElement);

    return () => {
      sectionElement && sectionObserver.unobserve(sectionElement);
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
    <section className="benefits-section min-h-screen flex flex-col justify-center items-center py-16">
      <div
        className={`max-w-7xl mx-auto px-4 w-full grid grid-cols-1 md:grid-cols-2 gap-8 ${
          sectionInView
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
        style={{ transition: "all 0.6s ease-out" }}
      >
        <AnimatePresence mode="wait">
          {currentIndex % 2 === 0 ? (
            <>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 1 }}
                className="space-y-6"
                drag
                dragSnapToOrigin
              >
                <h2 className="text-3xl font-bold">{current.title}</h2>
                <p className="text-lg text-gray-600">{current.description}</p>
              </motion.div>

              <motion.div
                key={current.image}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 1 }}
                className="flex justify-center"
                drag
                dragSnapToOrigin
              >
                <img
                  src={current.image}
                  alt={current.title}
                  className="rounded-2xl shadow-md max-w-full w-[600px]"
                />
              </motion.div>
            </>
          ) : (
            <>
              {" "}
              <motion.div
                key={current.image}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 1 }}
                className="flex justify-center"
                drag
                dragSnapToOrigin
              >
                <img
                  src={current.image}
                  alt={current.title}
                  className="rounded-2xl shadow-md max-w-full w-[600px]"
                />
              </motion.div>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 1 }}
                className="space-y-6"
                drag
                dragSnapToOrigin
              >
                <h2 className="text-3xl font-bold">{current.title}</h2>
                <p className="text-lg text-gray-600">{current.description}</p>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
      <div className="mt-12 flex flex-col items-center gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={handlePrev}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
          <button
            onClick={handleNext}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
