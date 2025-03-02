'use client'

import { useState } from 'react'
import { useTheme } from '@hooks/useTheme'
import { motion } from 'framer-motion'
import { FaGoogle, FaApple } from 'react-icons/fa'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { AppProviders } from '@providers/AppProviders'
import { useRouter } from 'next/navigation'

function LoginPageContent() {
  const { darkMode } = useTheme()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      alert('Logged in successfully!') // Replace with actual login logic
    }, 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`flex items-center justify-center min-h-screen px-6 ${
        darkMode ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
        className={`w-full max-w-sm p-8 rounded-xl shadow-xl ${
          darkMode ? 'bg-[#121212] border border-gray-700' : 'bg-gray-100 border border-gray-300'
        }`}
      >
        <h1 className="text-2xl font-semibold text-center mb-2">Welcome Back</h1>
        <p className="text-center text-gray-500 text-sm mb-6">Sign in to continue</p>

        {/* Email & Password Inputs */}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className={`w-full p-3 text-lg rounded-lg outline-none border ${
              darkMode
                ? 'bg-[#1E1E1E] text-white border-gray-600 focus:border-gray-400'
                : 'bg-white text-black border-gray-300 focus:border-gray-600'
            } transition`}
          />
          <input
            type="password"
            placeholder="Password"
            className={`w-full p-3 text-lg rounded-lg outline-none border ${
              darkMode
                ? 'bg-[#1E1E1E] text-white border-gray-600 focus:border-gray-400'
                : 'bg-white text-black border-gray-300 focus:border-gray-600'
            } transition`}
          />

          {/* Sign In Button with Loader */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleLogin}
            disabled={loading}
            className={`w-full flex items-center justify-center py-3 rounded-lg font-medium transition 
            ${darkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-900'}
            `}
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="mr-2"
              >
                <AiOutlineLoading3Quarters
                  className={`animate-spin ${darkMode ? 'text-black' : 'text-white'}`}
                />
              </motion.div>
            ) : (
              'Sign In'
            )}
          </motion.button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="w-full h-[1px] bg-gray-300 dark:bg-gray-700"></div>
          <p className="px-3 text-gray-500 text-sm">OR</p>
          <div className="w-full h-[1px] bg-gray-300 dark:bg-gray-700"></div>
        </div>

        {/* Social Login Buttons */}
        <div className="flex flex-col space-y-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center w-full py-3 border border-gray-300 dark:border-gray-600 rounded-lg transition"
          >
            <FaGoogle className="mr-2" /> Sign in with Google
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center w-full py-3 border border-gray-300 dark:border-gray-600 rounded-lg transition"
          >
            <FaApple className="mr-2 text-white" /> Sign in with Apple
          </motion.button>
        </div>

        {/* Forgot Password & Sign Up */}
        <div className="text-center mt-6">
          <a
            href="#"
            className="text-gray-500 text-sm hover:text-gray-700 dark:hover:text-gray-300 transition"
          >
            Forgot password?
          </a>
          <p className="text-gray-500 text-sm mt-3">
            Don't have an account?{' '}
            <button
              onClick={() => router.push('/register')}
              className="text-black dark:text-white font-medium hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Login() {
  return (
    <AppProviders>
      <LoginPageContent />
    </AppProviders>
  )
}
