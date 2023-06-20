import React from "react";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-4xl p-8 mx-auto bg-white rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 md:mr-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
              Welcome to the College Students Association
            </h1>
            <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-600">
              We are a group of students who are passionate about learning,
              networking, and having fun. We organize events, workshops,
              competitions, and social activities for our members and the
              community.
            </p>
            <div className="mt-8">
              <a
                href="#"
                className="inline-block px-4 py-2 mr-2 text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Join us
              </a>
              <a
                href="#"
                className="inline-block px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-700"
              >
                Learn more
              </a>
            </div>
          </div>
          <div className="mt-8 md:mt-0 md:w-1/2 md:ml-4">
            <Image
              src="/images/students.jpg"
              alt="Students"
              width={500}
              height={333}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
