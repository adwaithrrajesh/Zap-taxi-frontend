'use client'
import { useTheme } from '@/app/hooks/useTheme'

export default function Footer() {
  const { darkMode } = useTheme()

  return (
    <footer
      className={`p-8 md:p-12 lg:p-16 transition-colors duration-500 ${
        darkMode ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-4">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} ZAP TAXI. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
