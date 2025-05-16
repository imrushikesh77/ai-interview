import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Custom Button component
const Button = ({ children, className, ...props }) => (
  <button
    className={`px-4 py-2 bg-transparent text-primary-foreground rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition duration-300 ${className}`}
    {...props}
  >
    {children}
  </button>
)

// Form Component (updated)
export default function UploadResumeAndJD() {
  const [resume, setResume] = useState(null)
  const [resumeName, setResumeName] = useState('')  // To store the selected file name
  const [jobTitle, setJobTitle] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate();

  const handleResumeChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const fileType = file.type
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      if (validTypes.includes(fileType)) {
        setResume(file)
        setResumeName(file.name)  // Update the resume name to display it
      } else {
        alert("Please upload a PDF or DOC/DOCX file.")
        e.target.value = null
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData()
    if (resume) formData.append('resume', resume)
    formData.append('jobTitle', jobTitle)
    formData.append('jobDescription', jobDescription)

    try {
      const response = await fetch('http://localhost:5000/api/v1/file/upload', {
        method: 'POST',
        body: formData,
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      console.log(data);
      navigate('/interview?sessionId=' + data.sessionId);
    } catch (error) {
      console.error('Error uploading data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = resume && jobTitle.trim() && jobDescription.trim()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-gray-900">Master Your Interviews with AI</h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 text-center">
            Upload your resume and job description, and we&#39;ll extract key details to help you ace your interviews.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="resume" className="block text-sm font-medium text-gray-700">Upload Resume (PDF or DOC)</label>
              <input
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition"
              />
              {resumeName && <p className="text-sm text-gray-600 mt-2">Selected file: {resumeName}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">Job Title</label>
              <input
                id="jobTitle"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                required
                placeholder="Enter job title"
                className="w-full px-3 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700">Job Description</label>
              <textarea
                id="jobDescription"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                required
                placeholder="Enter job description"
                className="w-full px-3 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition"
                rows={4}
              />
            </div>
            <div className="flex justify-around items-center">
              <Link to="/interview" className='w-40 bg-black rounded-full flex justify-center'>
                <Button
                  type="submit"
                  className={`w-40 bg-transparent text-white transition-colors duration-300 ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={!isFormValid || isLoading}
                  onClick={handleSubmit}
                >
                  Proceed
                </Button>
              </Link>
              <Link to='/' className='w-40 bg-red-600 rounded-full flex justify-center'>
                <Button
                  className="w-40 bg-transparent text-white transition-colors duration-300"
                >
                  Back
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
