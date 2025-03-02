'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { useTheme } from '@hooks/useTheme'
import { useRouter } from 'next/navigation'

const navItems = ['Ride', 'Drive', 'Business', 'Help']

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { darkMode, toggleDarkMode } = useTheme()

  useEffect(() => {
    setIsOpen(false)
  }, [darkMode])

  return (
    <nav
      className={`relative px-6 py-4 shadow-md transition-colors duration-500 ${
        darkMode ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-semibold">ZAP TAXI</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-lg font-medium">
          <MenuItems onClick={() => setIsOpen(false)} />
        </ul>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center space-x-4">
          <AuthButtons />
          <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden z-50" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden absolute top-full left-0 w-full py-4 px-6 z-50 ${
              darkMode ? 'bg-black text-white' : 'bg-white text-black'
            } shadow-md`}
          >
            <ul className="flex flex-col space-y-4 text-lg font-medium">
              <MenuItems onClick={() => setIsOpen(false)} />
            </ul>

            <div className="mt-4 flex flex-col space-y-2">
              <AuthButtons />
            </div>

            {/* Dark Mode Toggle (Mobile) */}
            <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} isMobile />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

/* --------------------------------
 * REUSABLE COMPONENTS
 * -------------------------------- */

function MenuItems({ onClick }: { onClick: () => void }) {
  return (
    <>
      {navItems.map((item) => (
        <li key={item} className="hover:text-gray-400 cursor-pointer" onClick={onClick}>
          {item}
        </li>
      ))}
    </>
  )
}

function AuthButtons() {
  const { darkMode } = useTheme()
  const router = useRouter()

  return (
    <>
      <button
        onClick={() => router.push('/login')}
        className={`px-4 py-2 rounded-full transition border ${
          darkMode
            ? 'bg-black text-white border-white hover:bg-white hover:text-black hover:border-black'
            : 'bg-white text-black border-black hover:bg-black hover:text-white hover:border-white'
        }`}
      >
        Login
      </button>
      <button
        onClick={() => router.push('/register')}
        className={`px-4 py-2 rounded-full transition border ${
          darkMode
            ? 'bg-black text-white border-white hover:bg-white hover:text-black hover:border-black'
            : 'bg-white text-black border-black hover:bg-black hover:text-white hover:border-white'
        }`}
      >
        Sign Up
      </button>
    </>
  )
}

function DarkModeToggle({
  darkMode,
  toggleDarkMode,
  isMobile = false,
}: {
  darkMode: boolean
  toggleDarkMode: () => void
  isMobile?: boolean
}) {
  return (
    <motion.button
      onClick={toggleDarkMode} // This now closes the menu too
      className={`p-2 rounded-full transition-colors duration-300 ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'
      } ${isMobile ? 'mt-4 w-full flex justify-center' : ''}`}
      whileTap={{ scale: 0.8 }}
    >
      <AnimatePresence mode="wait">
        {darkMode ? (
          <motion.div
            key={isMobile ? 'sun-mobile' : 'sun'}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.3 }}
          >
            <Sun size={22} />
          </motion.div>
        ) : (
          <motion.div
            key={isMobile ? 'moon-mobile' : 'moon'}
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
  )
}
