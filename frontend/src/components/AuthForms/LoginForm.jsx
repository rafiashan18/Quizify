import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';

const LoginForm = ({ onSubmit, loading, backendError }) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  
  return (
    <>
      {backendError && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-500">
          {backendError}
        </div>
      )}

      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-xs font-medium text-gray-300 mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              id="email"
              {...register("email", {
                required: "Email must not be empty.",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter a valid email address.",
                },
              })}
              className="w-full p-2.5 pl-9 rounded-3xl border shadow shadow-purple-100 border-gray-700/45 text-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent"
              placeholder="you@example.com"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-xs font-medium text-gray-300 mb-1">
            Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required.",
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
                  message: "Password must contain at least one letter, one number, and one special character.",
                },
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long.",
                },
              })}
              className="w-full p-2.5 pl-9 rounded-3xl border shadow shadow-purple-100 border-gray-700/45 text-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              className="w-3 h-3 rounded border-gray-700 bg-gray-800 text-purple-600 focus:ring-purple-500"
            />
          </div>
          <a href="#" className="text-purple-400 hover:text-purple-300">
            Forgot password?
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || loading}
          className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white p-2.5 rounded-lg hover:bg-purple-700 transition-all text-sm disabled:opacity-70"
        >
          <span>{loading ? "Signing in" : "Sign in"}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </>
  );
};

export default LoginForm;