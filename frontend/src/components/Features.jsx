import { User, Briefcase, Book} from 'lucide-react'
import Feature from './Feature'

const Features = () => (
    <section id="features" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose InterviewAI?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Feature
            icon={<User size={48} />}
            title="Personalized Interviews"
            description="AI-generated interviews tailored to your experience, industry, and target role."
          />
          <Feature
            icon={<Briefcase size={48} />}
            title="Real-time Feedback"
            description="Get instant feedback on your responses patterns."
          />
          <Feature
            icon={<Book size={48} />}
            title="Free to use"
            description="Enjoy unlimited access to our AI-powered interview platform with no cost, helping you practice and improve without any barriers."
          />
        </div>
      </div>
    </section>
  )

export default Features;