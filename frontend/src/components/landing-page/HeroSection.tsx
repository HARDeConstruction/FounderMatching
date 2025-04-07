import { motion } from "framer-motion";
import { TypewriterEffectWithBackspace } from "@/components/ui/typewriter-effect";
import { cn } from "@/lib/utils";

const HeroSection = () => {
  return (
    <>
      <div className="relative flex min-h-screen w-full items-center justify-center bg-white dark:bg-black">
        <div
          className={cn(
            "absolute top-0 left-4 right-4 h-[80%]",
            "[background-size:60px_60px]",
            "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
            "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
          )}
        />
        {/* Radial gradient for the container to give a faded look */}
        <div className="pointer-events-none absolute inset-4 flex items-start justify-center bg-white [mask-image:radial-gradient(ellipse_at_top,transparent_20%,black)] dark:bg-black"></div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center relative z-10 bg-clip-text py-8 text-transparent"
        >
          <h1 className="text-4xl font-bold text-gray-800">
            With FounderMatching you can
          </h1>
          <TypewriterEffectWithBackspace
            words={["Connect", "Collaborate", "Create"]}
            className="text-[#2E548A]"
            cursorClassName="bg-[#2E548A]"
            typingSpeed={100}
            backspaceSpeed={50}
            delayBetweenWords={1000}
          />
          <p className="mt-4 text-lg text-gray-600 font-medium">
            And build your dream startup team effortlessly.
          </p>
          <div className="mt-6 space-x-4"></div>
        </motion.div>
      </div>
    </>
  );
};

export default HeroSection;
