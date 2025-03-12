import { Link } from 'react-router-dom'

const CallToAction = () => (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Ace Your Next Interview?</h2>
        <p className="text-xl mb-8">Start practicing with InterviewAI today and boost your confidence.</p>
        <Link to="/upload">
          <button className="px-8 py-3 bg-background text-primary rounded-full text-lg font-semibold hover:bg-background/90 transition duration-300">
            Start Your Interview
          </button>
        </Link>
      </div>
    </section>
  )

export default CallToAction