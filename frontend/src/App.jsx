import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadResumeAndJD from "./screens/UploadResumeAndJD";
import LandingPage from "./screens/LandingPage";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import ForgotPassword from "./screens/ForgotPassword";
import InterviewPage from "./screens/InterviewPage";
import InterviewResultPage from "./screens/FeedbackPage";
import AboutUs from "./screens/AboutUs";
import './index.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/upload" element={<UploadResumeAndJD />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/interview" element={<InterviewPage />} />
          <Route path="/interview-result" element={<InterviewResultPage />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
