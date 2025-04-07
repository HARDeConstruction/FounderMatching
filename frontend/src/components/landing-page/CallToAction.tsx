import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"; // or wherever your Button is

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
          <Button
            size="lg"
            className="bg-blue-600 text-white hover:bg-blue-700 rounded-xl px-8 py-4 text-lg"
          >
            Get Started Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
