const HowItWorks = () => (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
              { step: 1, title: "Upload Resume and Job Description", description: "Provide your resume, job description, and the role you're applying for to get tailored interview questions." },
              { step: 2, title: "Give the Interview", description: "Take the AI-powered interview, designed to match the job role and your experience." },
              { step: 3, title: "Get Feedback and Improve", description: "Receive instant feedback on your performance and use it to sharpen your interview skills." }
            ].map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )

export default HowItWorks