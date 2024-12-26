import { motion } from "framer-motion";
import { TypewriterEffectWithBackspace } from "@/components/ui/typewriter-effect";

const HeroSection = () => {
  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
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
        <div className="mt-6 space-x-4">
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
