import React from 'react';
import { useForm } from "react-hook-form";
import { 
  User, Mail, Badge, BookOpen, Linkedin, Twitter, 
  Save, AlertCircle 
} from "lucide-react";

const UserUpdateModal = ({ user, onSuccess }) => {
 
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      status: user.status,
      bio: user.bio,
      linkedin: user.socialLinks.linkedin,
      twitter: user.socialLinks.twitter
    }
  });

  const handleFormSubmit = (data) => {
    const updatedUser = {
      ...user,
      name: data.name,
      email: data.email,
      status: data.status,
      bio: data.bio,
      socialLinks: {
        linkedin: data.linkedin,
        twitter: data.twitter
      }
    };
    console.log(updatedUser)
    onSuccess();
  };

  return (
    <div className="w-full   mx-auto bg-white  ">
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-6 text-purple-800 flex items-center gap-2">
          <User className="w-6 h-6 text-purple-600" />
          Update User Profile
        </h2>
        
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <User className="w-4 h-4 text-purple-500" />
              Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-purple-50/30"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Mail className="w-4 h-4 text-purple-500" />
              Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-purple-50/30"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Badge className="w-4 h-4 text-purple-500" />
              Status
            </label>
            <select
              {...register("status")}
              className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-purple-50/30"
            >
              <option value="Active" className="bg-green-100">Active</option>
              <option value="Inactive" className="bg-yellow-100">Inactive</option>
              <option value="Pending" className="bg-orange-100">Pending</option>
              <option value="Suspended" className="bg-red-100">Suspended</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-500" />
              Bio
            </label>
            <textarea
              {...register("bio")}
              rows={4}
              className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-purple-50/30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Linkedin className="w-4 h-4 text-purple-500" />
              LinkedIn URL
            </label>
            <input
              {...register("linkedin", {
                pattern: {
                  value: /^https?:\/\/(?:www\.)?linkedin\.com\/.*$/,
                  message: "Invalid LinkedIn URL"
                }
              })}
              className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-purple-50/30"
            />
            {errors.linkedin && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.linkedin.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Twitter className="w-4 h-4 text-purple-500" />
              Twitter URL
            </label>
            <input
              {...register("twitter", {
                pattern: {
                  value: /^https?:\/\/(?:www\.)?twitter\.com\/.*$/,
                  message: "Invalid Twitter URL"
                }
              })}
              className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-purple-50/30"
            />
            {errors.twitter && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.twitter.message}
              </p>
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserUpdateModal;