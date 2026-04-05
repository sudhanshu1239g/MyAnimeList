import React from 'react';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8 bg-black p-10 rounded-xl shadow-lg">
        
        {/* Header Section */}
        <button
            onClick={() => navigate('/')}
            className="group relative flex justify-center py-3 px-6 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Back to Home
          </button>
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-pink-700 mb-2">
            MyAnimeList Clone
          </h1>
          <p className="text-gray-500 italic text-lg">
            Your ultimate companion in the world of Anime and Manga.
          </p>
        </div>

        {/* Content Section */}
        <div className="mt-8 space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Our Mission</h2>
            <p>
              We aim to provide a seamless platform for fans to discover, track, and 
              review their favorite series. From the latest seasonal hits to timeless 
              classics, we bring the global anime community together in one place.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Key Features</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Comprehensive Database of Anime and Manga.</li>
              <li>Personalized lists to track your "Watching" and "Completed" series.</li>
              <li>Up-to-date rankings and seasonal updates.</li>
              <li>User-driven reviews and community insights.</li>
            </ul>
          </section>

          <p className="border-l-4 border-blue-500 pl-4 italic text-gray-600">
            "Whether you're a casual viewer or a dedicated collector, we're here to 
            help you organize your journey through the incredible world of animation."
          </p>
        </div>

        {/* Action Section */}
        <div className="flex justify-center pt-8">
          
        </div>
      </div>
      
      {/* Footer-style tag */}
      <footer className="mt-8 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} MyAnimeList Clone Project
      </footer>
    </div>
  );
};

export default AboutUs;