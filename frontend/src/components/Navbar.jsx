import { Link } from 'react-router-dom'

const Navbar = () => (
    <nav className="flex justify-between items-center py-4">
      <div className="text-2xl font-bold text-primary">InterviewAI</div>
      <div className="hidden md:flex space-x-4">
        <Link to="/" className="text-muted-foreground hover:text-primary">Home</Link>
        <a href="#features" className="text-muted-foreground hover:text-primary">Features</a>
        <a href="#how-it-works" className="text-muted-foreground hover:text-primary">How It Works</a>
        <Link to="/about-us" className="text-muted-foreground hover:text-primary">About Us</Link>
      </div>
      {/* <div className="space-x-2">
        <Link to="/login" className="px-4 py-2 text-primary hover:text-primary/80">Log In</Link>
        <Link to="/signup" className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90">Sign Up</Link>
      </div> */}
    </nav>
  )

export default Navbar;