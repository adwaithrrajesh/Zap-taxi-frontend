'use client'
import { motion } from 'framer-motion'
import CarModel from '@components/Car/Car'
import { useTheme } from '@hooks/useTheme'
import { useEffect, useState } from 'react'

export default function Hero() {
  const { darkMode } = useTheme()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768)
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return (
    <section
      className={`relative w-full h-[80vh] flex items-center justify-center px-6 md:px-12 overflow-hidden transition-colors duration-500 ${
        darkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <div className="relative flex flex-col md:flex-row items-center justify-between max-w-6xl w-full">
        {/* Mobile 3D Model (Disabled) */}
        {!isMobile && (
          <motion.div
            className="absolute inset-0 flex justify-center items-center md:hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="w-[500px] h-[500px]">
              <CarModel />
            </div>
          </motion.div>
        )}

        {/* Text Content */}
        <motion.div
          className="text-center md:text-left max-w-lg z-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Move Smarter, Ride Faster.
          </h1>
          <p className="mt-4 text-lg md:text-xl">
            Get a ride in minutes with just a tap. Fast, reliable, and affordable rides at your
            fingertips.
          </p>
        </motion.div>

        {/* Desktop 3D Model (Enabled) */}
        {!isMobile && (
          <motion.div
            className="hidden md:flex relative w-[380px] h-[380px] md:w-[450px] md:h-[450px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <CarModel />
          </motion.div>
        )}
      </div>
    </section>
  )
}
