import { Link } from "react-router-dom";  

const Footer = () => (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-around">
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-muted-foreground hover:text-primary">Features</a></li>
              <li><a href="#how-it-works" className="text-muted-foreground hover:text-primary">How It Works</a></li>
              <li><a href="#faq" className="text-muted-foreground hover:text-primary">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about-us" className="text-muted-foreground hover:text-primary">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="https://in.indeed.com/career-advice/interviewing/interview-tips" className="text-muted-foreground hover:text-primary">Interview Tips</a></li>
              <li><a href="https://www.indeed.com/career-advice/career-development/career-advice-for-college-students" className="text-muted-foreground hover:text-primary">Career Advice</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-muted-foreground/10 text-center text-muted-foreground">
          <p>&copy; 2024 InterviewAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )

export default Footer