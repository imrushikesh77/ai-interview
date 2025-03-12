import { Users, UserCheck } from "lucide-react";
import TargetImage from "../assets/target.png";
import OpportunityImage from "../assets/opportunity.png";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div> {/* Overlay for better contrast */}
      <div className="relative max-w-7xl mx-auto z-10"> {/* Ensure content is above overlay */}
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-base text-indigo-300 font-semibold tracking-wide uppercase">
            About Us
          </h2>
          <p className="mt-4 text-4xl leading-10 font-bold text-white">
            Our Mission and Vision
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-200 mx-auto">
            We aim to transform the way interviews are conducted by providing an AI-powered platform that helps users improve their interview skills through personalized feedback and insights.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mt-16 bg-white shadow-md rounded-lg p-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div className="mb-10 lg:mb-0">
              <h3 className="text-3xl font-bold text-gray-900">Our Mission</h3>
              <p className="mt-4 text-lg text-gray-700">
                Our mission is to leverage AI to provide instant and actionable feedback on interviews, helping individuals enhance their performance and secure their dream jobs. We strive to create an environment where learning from mistakes and improving becomes second nature.
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <img
                src={TargetImage}
                alt="Target"
                className="w-80 h-auto max-w-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="mt-16 bg-white shadow-md rounded-lg p-8">
          <div className="lg:flex lg:justify-between lg:items-center">
            <div className="lg:w-5/12 mb-8 lg:mb-0">
              <img
                src={OpportunityImage}
                alt="Opportunity"
                className="w-80 h-auto max-w-full object-contain"
              />
            </div>
            <div className="lg:w-6/12">
              <h3 className="text-3xl font-bold text-gray-900">Our Vision</h3>
              <p className="mt-4 text-lg text-gray-700">
                We envision a world where technology assists individuals in reaching their full potential, particularly in professional development. By making interview feedback instant, accurate, and personalized, we help people build confidence and achieve success in their careers.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-bold text-white">Meet Our Team</h3>
          <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
            A passionate team committed to excellence.
          </p>

          {/* Guide */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
            <div className="flex flex-col items-center text-center bg-white shadow-lg rounded-lg p-8 col-span-full">
              <UserCheck className="w-20 h-20 text-indigo-600 mb-4" />
              <h4 className="text-xl font-semibold text-gray-900">Dr. R. R. Rathod</h4>
              <p className="mt-2 text-sm text-gray-500">Guide</p>
            </div>
          </div>

          {/* Team Members */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center bg-white shadow-lg rounded-lg p-8">
              <Users className="w-16 h-16 text-indigo-600 mb-4" />
              <h4 className="text-xl font-semibold text-gray-900">Ashish Sutar</h4>
              <p className="mt-2 text-sm text-gray-500">Team Member</p>
            </div>

            <div className="flex flex-col items-center text-center bg-white shadow-lg rounded-lg p-8">
              <Users className="w-16 h-16 text-indigo-600 mb-4" />
              <h4 className="text-xl font-semibold text-gray-900">Siddhesh Kumbhar</h4>
              <p className="mt-2 text-sm text-gray-500">Team Member</p>
            </div>

            <div className="flex flex-col items-center text-center bg-white shadow-lg rounded-lg p-8">
              <Users className="w-16 h-16 text-indigo-600 mb-4" />
              <h4 className="text-xl font-semibold text-gray-900">Sanmeet Shah</h4>
              <p className="mt-2 text-sm text-gray-500">Team Member</p>
            </div>

            <div className="flex flex-col items-center text-center bg-white shadow-lg rounded-lg p-8">
              <Users className="w-16 h-16 text-indigo-600 mb-4" />
              <h4 className="text-xl font-semibold text-gray-900">Rushikesh Jawale</h4>
              <p className="mt-2 text-sm text-gray-500">Team Member</p>
            </div>

            <div className="flex flex-col items-center text-center bg-white shadow-lg rounded-lg p-8">
              <Users className="w-16 h-16 text-indigo-600 mb-4" />
              <h4 className="text-xl font-semibold text-gray-900">Shantanu Bhusari</h4>
              <p className="mt-2 text-sm text-gray-500">Team Member</p>
            </div>

            <div className="flex flex-col items-center text-center bg-white shadow-lg rounded-lg p-8">
              <Users className="w-16 h-16 text-indigo-600 mb-4" />
              <h4 className="text-xl font-semibold text-gray-900">Anuj Khedekar</h4>
              <p className="mt-2 text-sm text-gray-500">Team Member</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
