"use client";

import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect, useState } from "react";

export const TypewriterEffectWithBackspace = ({
  words,
  className,
  cursorClassName,
  typingSpeed = 100,
  backspaceSpeed = 50,
  delayBetweenWords = 1000,
}: {
  words: string[];
  className?: string;
  cursorClassName?: string;
  typingSpeed?: number;
  backspaceSpeed?: number;
  delayBetweenWords?: number;
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const word = words[currentWordIndex];
      if (isDeleting) {
        setCurrentText((prev) => prev.slice(0, -1));
        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      } else {
        setCurrentText((prev) => word.slice(0, prev.length + 1));
        if (currentText === word) {
          setTimeout(() => setIsDeleting(true), delayBetweenWords);
        }
      }
    };

    const speed = isDeleting ? backspaceSpeed : typingSpeed;
    const timer = setTimeout(handleTyping, speed);

    return () => clearTimeout(timer);
  }, [
    currentText,
    isDeleting,
    currentWordIndex,
    words,
    typingSpeed,
    backspaceSpeed,
    delayBetweenWords,
  ]);

  return (
    <div
      className={cn(
        "text-base md:text-4xl lg:text-6xl font-bold text-center",
        className
      )}
    >
      <span className="inline-block">{currentText}</span>
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block rounded-sm w-[4px] h-5 md:h-6 lg:h-14 bg-blue-500 translate-y-1",
          cursorClassName
        )}
      ></motion.span>
    </div>
  );
};
