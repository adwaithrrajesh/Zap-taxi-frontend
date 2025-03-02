import './global.css'
import Navbar from './components/layout/common/Navbar'
import Footer from './components/layout/common/Footer'
import { AppProviders } from './providers/AppProviders'

export default function HomePage() {
  return (
    <AppProviders>
      <Navbar />
      <h1>Welcome to Uber Clone</h1>
      <Footer />
    </AppProviders>
  )
}
