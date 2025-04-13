import { motion } from "framer-motion";
import router from "next/router";
import { ChevronRightIcon } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center bg-blue-50 py-20 px-6">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <motion.h2
          className="text-4xl font-bold text-gray-900"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Ready to Find Your Co-Founder?
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Join a vibrant community of builders, thinkers, and creators. Build
          something meaningful together.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-[#35426E] text-white px-6 py-2 rounded-lg shadow-lg"
            onClick={() => {
              router.push("/sign-up");
            }}
          >
            <div className="flex flex-row items-center">
              <span>Get Started Now</span>
              <span className="flex items-center ml-2">
                <ChevronRightIcon className="-mr-1 w-5 h-5" />
                <ChevronRightIcon className="-mr-3 w-5 h-5" />
              </span>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
