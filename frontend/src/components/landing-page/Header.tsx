import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6 md:px-10">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="text-2xl font-bold text-blue-500 cursor-pointer"
        >
          FounderMatch
        </motion.div>

        {/* Navigation */}
        <nav className="space-x-6 text-gray-800 hidden md:flex">
          {["Home", "Features", "How It Works", "About", "Contact"].map(
            (item, index) => (
              <motion.a
                key={index}
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                whileHover={{ scale: 1.1, color: "#3B82F6" }}
                className="text-lg cursor-pointer transition-colors duration-300"
              >
                {item}
              </motion.a>
            )
          )}
        </nav>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="hidden md:block bg-blue-500 text-white px-6 py-2 rounded-lg shadow-lg"
        >
          Sign Up
        </motion.button>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-6 h-6 flex flex-col justify-between items-center cursor-pointer"
          >
            <span className="block w-full h-1 bg-gray-800"></span>
            <span className="block w-full h-1 bg-gray-800"></span>
            <span className="block w-full h-1 bg-gray-800"></span>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
