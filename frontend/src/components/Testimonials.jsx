import Testimonial from './Testimonial'

const Testimonials = () => (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Testimonial
            quote="InterviewAI helped me land my dream job! The personalized feedback was invaluable."
            author="Sarah Johnson"
            role="Software Engineer"
          />
          <Testimonial
            quote="As a career coach, I recommend InterviewAI to all my clients. It's a game-changer."
            author="Michael Chen"
            role="Career Coach"
          />
          <Testimonial
            quote="The AI-generated interviews are incredibly realistic. Great preparation for the real thing!"
            author="Emily Rodriguez"
            role="Marketing Manager"
          />
        </div>
      </div>
    </section>
  )

export default Testimonials