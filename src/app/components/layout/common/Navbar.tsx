"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import useDarkMode from "@/app/hooks/useDarkMode";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <nav
      className={`px-6 py-4 shadow-md transition-colors duration-500 ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-semibold">ZAP TAXI</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-lg font-medium">
          {["Ride", "Drive", "Business", "Help"].map((item) => (
            <li key={item} className="hover:text-gray-400 cursor-pointer">
              {item}
            </li>
          ))}
        </ul>

        {/* Right Side - Login/Signup & Dark Mode Toggle */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="border px-4 py-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition">
            Login
          </button>
          <button className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-700 transition dark:bg-white dark:text-black dark:hover:bg-gray-300">
            Sign Up
          </button>

          {/* Dark Mode Toggle */}
          <motion.button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-colors duration-300 ${
              darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
            }`}
            whileTap={{ scale: 0.8 }}
          >
            <AnimatePresence mode="wait">
              {darkMode ? (
                <motion.div
                  key="sun"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  <Sun size={22} />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  <Moon size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden flex flex-col p-4 mt-2 space-y-4 ${
              darkMode ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            {["Ride", "Drive", "Business", "Help"].map((item) => (
              <li key={item} className="hover:text-gray-400 cursor-pointer">
                {item}
              </li>
            ))}
            <li>
              <button className="border px-4 py-2 w-full rounded-full hover:bg-gray-200 dark:hover:bg-gray-800">
                Login
              </button>
            </li>
            <li>
              <button className="bg-black text-white px-4 py-2 w-full rounded-full hover:bg-gray-700 transition dark:bg-white dark:text-black dark:hover:bg-gray-300">
                Sign Up
              </button>
            </li>
            {/* Dark Mode Toggle for Mobile */}
            <li className="flex justify-center">
              <motion.button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition-colors duration-300"
                whileTap={{ scale: 0.8 }}
              >
                <AnimatePresence mode="wait">
                  {darkMode ? (
                    <motion.div
                      key="sun"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Sun size={22} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Moon size={22} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}