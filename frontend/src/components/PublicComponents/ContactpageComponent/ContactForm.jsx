import React from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors , isSubmitting},
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset(); 
  };

  return (
    <div className="container mx-auto px-4 py-10 md:py-28">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-8">
          <div>
            <h1 className=" md:text-4xl text-3xl max-w-[500px] text-purple-700 font-bold leading-tight mb-4">
              We are Always Ready to Help You and Answer Your Questions
            </h1>
            <p className="text-lg text-gray-600">
              Get in touch with our team for any inquiries about our quiz platform. We're here to assist you with creating, playing, and sharing quizzes.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {/* Contact Info */}
            <div className="bg-white md:p-4 p-2 rounded-lg shadow">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-700 md:block hidden" />
                <div>
                  <p className="font-medium">Call Us</p>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
            <div className="bg-white md:p-4 p-2 rounded-lg shadow">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-yellow-600 md:block hidden" />
                <div>
                  <p className="font-medium">Email Us</p>
                  <p className="text-gray-600 break-all">support@quizapp.com</p>
                </div>
              </div>
            </div>
            <div className="bg-white md:p-4 p-2 rounded-lg shadow">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-purple-500 md:block hidden" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-gray-600">123 Quiz Street, NY</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow ">
              <div className="space-y-2">
                <p className="font-medium">Social Media</p>
                <div className="flex space-x-4">
                  <Facebook className="h-5 w-5 text-yellow-500 cursor-pointer" />
                  <Twitter className="h-5 w-5 text-blue-500 cursor-pointer" />
                  <Instagram className="h-5 w-5 text-purple-500 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Contact Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Your Name"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Invalid email address',
                    },
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  {...register('subject', { required: 'Subject is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="How can we help?"
                />
                {errors.subject && <p className="text-red-500 text-sm">{errors.subject.message}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  {...register('message', { required: 'Message is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Your message..."
                  rows={5}
                />
                {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-800 to-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={isSubmitting}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
