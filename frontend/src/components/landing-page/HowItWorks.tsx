import React, { useEffect, useState } from "react";
import { useId } from "react";
import { FaUserPlus, FaRobot, FaHandshake, FaRocket } from "react-icons/fa";
import { IconBaseProps } from "react-icons";

const steps = [
  {
    title: "Create a Profile",
    description: "Define your skills, goals, and interests to get started.",
    icon: (props: IconBaseProps) => <FaUserPlus {...props} />,
  },
  {
    title: "Get Matched",
    description: "Our AI suggests the best co-founders based on compatibility.",
    icon: (props: IconBaseProps) => <FaRobot {...props} />,
  },
  {
    title: "Connect & Build",
    description: "Start networking and collaborating with your perfect match.",
    icon: (props: IconBaseProps) => <FaHandshake {...props} />,
  },
  {
    title: "Access Startup Tools",
    description: "Boost your journey with resources from E-lab Startup Toolkit",
    icon: (props: IconBaseProps) => <FaRocket {...props} />,
  },
];

export default function HowItWorks() {
  const [sectionInView, setSectionInView] = useState(false);
  const [inView, setInView] = useState<boolean[]>(
    new Array(steps.length).fill(false)
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

  const customPattern = Array.from({ length: 22 }, () => [
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10),
  ]);

  return (
    <section className="how-it-works-section min-h-screen flex flex-col justify-center py-16">
      <div
        className={`max-w-7xl mx-auto px-6 text-center mb-12 transition-all ${
          sectionInView
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
        style={{ transition: "all 0.6s ease-out" }}
      >
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
          How It Works
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-4">
          Find your perfect co-founder in three simple steps.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 max-w-7xl mx-auto px-6">
        {steps.map((step, index) => {
          const [pattern, setPattern] = useState(customPattern);

          const handleHover = () => {
            const newPattern = Array.from({ length: 22 }, () => [
              Math.floor(Math.random() * 10),
              Math.floor(Math.random() * 10),
            ]);
            setPattern(newPattern);
          };

          return (
            <div
              key={step.title}
              className={`step-card relative p-6 rounded-3xl overflow-hidden text-center transition-transform transform ${
                inView[index]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }  ${
                index % 2 === 1 ? "md:translate-y-12" : ""
              } bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white min-h-[240px]`}
              style={{ transition: "all 0.6s ease-out" }}
              onMouseEnter={handleHover}
            >
              <Grid size={20} pattern={pattern} />
              <div className="relative z-20 flex flex-col items-center">
                <step.icon className="text-4xl text-[#0087C3] mb-4" />
                <p className="text-xl font-semibold text-neutral-800 dark:text-white">
                  {step.title}
                </p>
                <p className="text-neutral-600 dark:text-neutral-400 mt-2 text-base">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export const Grid = ({
  pattern,
  size,
}: {
  pattern?: number[][];
  size?: number;
}) => {
  const [generatedPattern, setGeneratedPattern] = useState<number[][]>([]);

  useEffect(() => {
    const p = pattern ?? [
      [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
      [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
      [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
      [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
      [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    ];
    setGeneratedPattern(p);
  }, [pattern]);
  return (
    <div className="pointer-events-none absolute left-1/2 top-0 -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div className="absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 from-zinc-100/30 to-zinc-300/30 dark:to-zinc-900/30 opacity-100">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={generatedPattern}
          className="absolute inset-0 h-full w-full mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-black/10 fill-black/10"
        />
      </div>
    </div>
  );
};

export function GridPattern({ width, height, x, y, squares, ...props }: any) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y]: any, index: any) => (
            <rect
              strokeWidth="0"
              key={`${x}-${y}-${index}`}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}
