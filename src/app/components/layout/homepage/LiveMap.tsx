'use client'

import React, { useEffect, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import { motion } from 'framer-motion'
import { useTheme } from '@hooks/useTheme'

const darkModeStyles: google.maps.MapTypeStyle[] = [
  { elementType: 'geometry', stylers: [{ color: '#212121' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#212121' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#ffffff' }] },
  { featureType: 'water', stylers: [{ color: '#0f252e' }] },
  { featureType: 'road', stylers: [{ color: '#383838' }] },
]

const lightModeStyles: google.maps.MapTypeStyle[] = []

const LiveMap: React.FC = () => {
  const [, setMap] = useState<google.maps.Map | null>(null)
  const [, setMarker] = useState<google.maps.Marker | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { darkMode } = useTheme()

  useEffect(() => {
    const timeout = setTimeout(() => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        version: 'weekly',
      })

      loader
        .load()
        .then(() => {
          if (typeof window.google === 'undefined' || !navigator.geolocation) {
            setError('Google Maps failed to load or Geolocation is not supported.')
            return
          }

          navigator.geolocation.getCurrentPosition(
            (position) => {
              const userLocation = { lat: position.coords.latitude, lng: position.coords.longitude }
              const mapElement = document.getElementById('map') as HTMLElement | null
              if (!mapElement) {
                setError('Map container not found.')
                return
              }

              const mapInstance = new google.maps.Map(mapElement, {
                center: userLocation,
                zoom: 14,
                styles: darkMode ? darkModeStyles : lightModeStyles,
              })

              const userMarker = new google.maps.Marker({
                position: userLocation,
                map: mapInstance,
                title: 'Your Location',
                icon: { url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' },
              })

              setMap(mapInstance)
              setMarker(userMarker)
            },
            (err) => {
              setError('Location access denied. Please enable location services.')
              console.error('Error getting location:', err)
            },
            { enableHighAccuracy: true },
          )
        })
        .catch((err) => {
          setError('Failed to load Google Maps API.')
          console.error('Google Maps API error:', err)
        })
    }, 500)

    return () => clearTimeout(timeout)
  }, [darkMode]) // No more missing dependency warning

  return (
    <section
      className={`relative w-full py-16 px-6 md:px-12 transition-colors duration-500 ${
        darkMode ? 'bg-black text-white' : 'bg-white text-gray-900'
      }`}
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Where We Operate
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Check out our service coverage and see if we're available in your area.
        </motion.p>

        {error && <p className="text-red-500 text-lg font-semibold">{error}</p>}

        <motion.div
          className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div id="map" className="w-full h-full" />
        </motion.div>
      </div>
    </section>
  )
}

export default LiveMap
