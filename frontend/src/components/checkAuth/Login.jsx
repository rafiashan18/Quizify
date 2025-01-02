import React from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate()
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className=" flex items-center justify-center p-2 md:py-10  ">
      <div className="w-full max-w-6xl bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex">
          {/* Left Side - Form */}
          <div className="w-full lg:w-1/2 p-8">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-purple-200">Welcome Back</h1>
                <p className="text-sm text-gray-400">Sign in to continue your journey</p>
              </div>

              {/* Social Login */}
              <button className="w-full flex items-center justify-center gap-2 bg-white text-gray-800 p-2.5 rounded-lg hover:bg-gray-50 transition-all mb-4 text-sm">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google logo" className="w-5 h-5" />
                <span>Continue with Google</span>
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-800"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-gray-900 text-gray-400">Or sign in with</span>
                </div>
              </div>

              {/* Login Form */}
              <form className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Email address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      className="w-full p-2.5 pl-9 bg-gray-800 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-gray-100 text-sm"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full p-2.5 pl-9 bg-gray-800 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-gray-100 text-sm"
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
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center">
                    <input
                      id="remember"
                      type="checkbox"
                      className="w-3 h-3 rounded border-gray-700 bg-gray-800 text-purple-600 focus:ring-purple-500"
                    />
                    <label htmlFor="remember" className="ml-2 text-gray-400">Remember me</label>
                  </div>
                  <a href="#" className="text-purple-400 hover:text-purple-300">Forgot password?</a>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white p-2.5 rounded-lg hover:bg-purple-700 transition-all text-sm"
                
                > 
                  <span>Sign in</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <p className="mt-4 text-center text-xs text-gray-400">
                Don't have an account?{' '}
                <button 
                onClick={()=>navigate('/signup')}
                className="text-purple-400 hover:text-purple-300">Sign up</button>
              </p>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-purple-900/20 to-purple-900/5 relative">
            <img
              src="/api/placeholder/800/600"
              alt="Login illustration"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 max-w-xl">
              <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-sm text-gray-200">Continue your quiz journey and explore new challenges!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
