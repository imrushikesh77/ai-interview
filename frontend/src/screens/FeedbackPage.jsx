import { Link, useLocation } from "react-router-dom";

export default function FeedbackPage() {
  const location = useLocation();
  const { similarity, summary, confidence } = location.state || { similarity: 0 };
  console.log(similarity, summary, confidence);
  calculateConfidence(similarity);
  let feedback = {
    userName: "Rushikesh",
    score: similarity,
    confidence: Math.max(similarity - 13, 75),
    strengths: ["Good technical knowledge", "Confident coding"],
    areasForImprovement: ["Conceptual Understanding", "More focus on problem explanation"],
    feedbackDate: new Date().toLocaleDateString(),
    detailedFeedback: summary || "The candidate demonstrates a basic understanding of data structures, including arrays, linked lists, and hash maps. They correctly identify the purpose of data structures and their importance in efficient data management. They can articulate the differences between arrays and linked lists, highlighting the trade-offs between fixed-size memory allocation and dynamic growth. They also mention insertion, deletion, and traversal properties. However, their explanations lack depth and precision. Their understanding of hash map lookup and collision resolution is vague and inaccurate. The responses are somewhat fragmented and contain grammatical errors, impacting clarity."
  }

  function calculateConfidence(similarity) {
    return confidence;
  }
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full lg:w-3/4 xl:w-2/3">
        <h2 className="text-center text-3xl font-extrabold text-foreground">
          System-Generated Interview Feedback
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Based on your performance, here&apos;s the detailed feedback.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full lg:w-3/4 xl:w-2/3">
        <div className="bg-white py-8 px-6 shadow-lg rounded-lg border border-gray-200">
          <div className="space-y-6">
            {/* Overall Score */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Overall Score
              </label>
              <p className="mt-1 text-2xl font-semibold text-indigo-600">{feedback.score.toFixed(2)}/100</p>
              <p className="text-gray-500 text-sm">This score is based on technical skills, communication, and problem-solving abilities.</p>
            </div>

            {/* Confidence Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confidence Level
              </label>
              <p className="mt-1 text-xl text-indigo-600">{feedback.confidence}%</p>
              <p className="text-gray-500 text-sm">Measured based on how correctly you have approached and answered the interview questions.</p>
            </div>

            {/* Strengths */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Strengths
              </label>
              <ul className="mt-1 list-disc list-inside text-gray-600">
                {feedback.strengths.map((strength, index) => (
                  <li key={index}>{strength}</li>
                ))}
              </ul>
            </div>

            {/* Areas for Improvement */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Areas for Improvement
              </label>
              <ul className="mt-1 list-disc list-inside text-gray-600">
                {feedback.areasForImprovement.map((area, index) => (
                  <li key={index}>{area}</li>
                ))}
              </ul>
            </div>

            {/* Detailed Feedback */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Detailed Feedback
              </label>
              <p className="mt-1 text-gray-600">{feedback.detailedFeedback}</p>
            </div>

            {/* Feedback Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Feedback Date
              </label>
              <p className="mt-1 text-gray-600">{feedback.feedbackDate}</p>
            </div>

            {/* Button */}
            <div>
              <Link to="/" className="text-primary hover:text-primary/80">
                <button
                  type="button"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Go to Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
