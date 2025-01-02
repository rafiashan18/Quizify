import React from 'react';
import { Sparkles } from 'lucide-react';

const CTA = () => {
  return (
    <section className="body-font bg-gradient-to-r from-purple-50 to-white">
      <div className="container px-5 py-20 mx-auto">
        <div className="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto bg-white p-8 rounded-2xl shadow-xl border border-purple-100">
          <div className="flex-grow sm:pr-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              Ready to Create Your First Quiz?
            </h1>
            <p className="text-gray-600 text-lg">
              Join thousands of quiz creators and start sharing your knowledge today!
            </p>
          </div>
          <button className="flex items-center gap-2 flex-shrink-0 text-white bg-purple-800 border-0 py-3 px-8 focus:outline-none hover:bg-purple-700 rounded-lg text-lg mt-6 sm:mt-0 transition-all duration-300 hover:translate-y-[-2px]">
            <Sparkles className="w-5 h-5" />
            <span>Get Started</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;