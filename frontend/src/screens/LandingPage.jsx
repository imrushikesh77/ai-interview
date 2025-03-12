import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import FAQ from '../components/FAQ'
import CallToAction from '../components/CallToAction'
import Footer from '../components/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4">
        <Navbar />
        <Hero />
      </div>
      <Features />
      <HowItWorks />
      {/* <Testimonials /> */}
      {/* <Pricing /> */}
      <FAQ />
      <CallToAction />
      <Footer />
    </div>
  )
}