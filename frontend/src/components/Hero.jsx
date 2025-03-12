import { Link } from 'react-router-dom'

const Hero = () => (
    <section className="text-center py-20">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">Master Your Interviews with AI</h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
        Practice interviews tailored to your needs, get instant feedback, and improve your skills with our AI-powered platform.
      </p>
      <Link to="/upload">
        <button className="px-8 py-3 bg-primary text-primary-foreground rounded-full text-lg font-semibold hover:bg-primary/90 transition duration-300">
          Start Your Interview
        </button>
      </Link>
    </section>
  )

export default Hero;