import { motion } from "framer-motion";

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
          Connect. Collaborate. Create.
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Build your dream startup team effortlessly.
        </p>
        <div className="mt-6 space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg"
          >
            Sign Up Now
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="border border-blue-500 text-blue-500 px-6 py-3 rounded-lg shadow-lg"
          >
            Learn More
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
