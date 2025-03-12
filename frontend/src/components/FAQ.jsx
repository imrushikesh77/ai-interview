import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const FAQ = () => {
    const [openItem, setOpenItem] = useState(null)
  
    const faqItems = [
      {
        question: "Can I use InterviewAI on my mobile device?",
        answer: "Yes, InterviewAI is fully responsive and works on desktop, tablet, and mobile devices. We also offer native iOS and Android apps for a seamless mobile experience."
      },
      {
        question: "Is my data secure?",
        answer: "We take data security very seriously. All your personal information and interview data is encrypted and stored securely. We never share your data with third parties."
      }
    ]
  
    return (
      <section id="faq" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            {faqItems.map((item, index) => (
              <div key={index} className="mb-4">
                <button
                  className="flex justify-between items-center w-full text-left p-4 bg-card rounded-lg focus:outline-none"
                  onClick={() => setOpenItem(openItem === index ? null : index)}
                >
                  <span className="font-semibold">{item.question}</span>
                  <ChevronDown className={`transform transition-transform ${openItem === index ? 'rotate-180' : ''}`} />
                </button>
                {openItem === index && (
                  <div className="mt-2 p-4 bg-background rounded-lg">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

export default FAQ