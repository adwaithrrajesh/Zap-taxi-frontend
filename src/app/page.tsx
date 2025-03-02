import './global.css'
import Navbar from './components/layout/common/Navbar'
import Footer from './components/layout/common/Footer'
import { AppProviders } from './providers/AppProviders'
import Hero from './components/layout/homepage/Hero'
import LiveMap from './components/layout/homepage/LiveMap'

export default function HomePage() {
  return (
    <AppProviders>
      <Navbar />
      <Hero />
      <LiveMap />
      <Footer />
    </AppProviders>
  )
}
