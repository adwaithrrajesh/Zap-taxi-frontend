'use client'

import { useState } from 'react'
import { useTheme } from '@hooks/useTheme'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { AppProviders } from '@app/providers/AppProviders'
import { FcGoogle } from 'react-icons/fc'
import { FaApple } from 'react-icons/fa'

function RegisterContent() {
  const { darkMode } = useTheme()
  const router = useRouter()
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleRegister = () => {
    setError('')

    if (!form.fullName || !form.email || !form.phone || !form.password) {
      setError('All fields are required.')
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      alert('Account created successfully!')
      router.push('/dashboard')
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
        className={`w-full max-w-sm p-6 rounded-xl shadow-lg ${
          darkMode ? 'bg-[#121212] border border-gray-700' : 'bg-gray-100 border border-gray-300'
        }`}
      >
        <h1 className="text-2xl font-semibold text-center mb-3">Create an Account</h1>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        {/* Registration Inputs */}
        <div className="space-y-3">
          {[
            { type: 'text', name: 'fullName', placeholder: 'Full Name' },
            { type: 'email', name: 'email', placeholder: 'Email' },
            { type: 'tel', name: 'phone', placeholder: 'Phone Number' },
            { type: 'password', name: 'password', placeholder: 'Password' },
            { type: 'password', name: 'confirmPassword', placeholder: 'Confirm Password' },
          ].map((field) => (
            <input
              key={field.name}
              type={field.type}
              name={field.name}
              onChange={handleChange}
              placeholder={field.placeholder}
              className={`w-full p-3 text-lg rounded-lg outline-none border 
        ${darkMode ? 'bg-black text-white border-gray-700' : 'bg-white text-black border-gray-300'} 
        focus:ring-2 focus:ring-gray-500 transition`}
            />
          ))}
        </div>

        {/* Register Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleRegister}
          disabled={loading}
          className={`w-full flex items-center justify-center py-3 rounded-lg font-medium transition mt-5
            ${darkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-900'}
          `}
        >
          {loading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              className="mr-2"
            >
              🔄
            </motion.div>
          ) : (
            'Sign Up'
          )}
        </motion.button>

        <div className="flex items-center my-6">
          <div className="w-full h-[1px] bg-gray-300 dark:bg-gray-700"></div>
          <p className="px-3 text-gray-500 text-sm">OR</p>
          <div className="w-full h-[1px] bg-gray-300 dark:bg-gray-700"></div>
        </div>

        <div className="flex space-x-3 mt-4">
          {/* Google Sign-in */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex-1 flex items-center justify-center py-2 rounded-lg border transition ${
              darkMode
                ? 'bg-black text-white border-gray-600'
                : 'bg-white text-black border-gray-300'
            }`}
          >
            <FcGoogle className="mr-2 text-xl" /> Google
          </motion.button>

          {/* Apple Sign-in */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex-1 flex items-center justify-center py-2 rounded-lg border transition ${
              darkMode
                ? 'bg-black text-white border-gray-600'
                : 'bg-white text-black border-gray-300'
            }`}
          >
            <FaApple className="mr-2 text-xl" /> Apple
          </motion.button>
        </div>

        {/* Terms & Conditions */}
        <p className="text-gray-500 text-sm text-center mt-3">
          By signing up, you agree to our{' '}
          <a href="#" className="text-black dark:text-white font-medium hover:underline">
            Terms
          </a>{' '}
          &{' '}
          <a href="#" className="text-black dark:text-white font-medium hover:underline">
            Privacy Policy
          </a>
          .
        </p>

        {/* Login Redirect */}
        <div className="text-center mt-4">
          <p className="text-gray-500 text-sm">
            Already have an account?{' '}
            <button
              onClick={() => router.push('/login')}
              className="text-black dark:text-white font-medium hover:underline"
            >
              Log In
            </button>
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Register() {
  return (
    <AppProviders>
      <RegisterContent />
    </AppProviders>
  )
}
