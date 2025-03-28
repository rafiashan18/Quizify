import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import loginImage from "../../assets/images/loginImage.jpg";
import { useNavigate } from 'react-router-dom';
import SignUpForm from '../../components/AuthForms/SignUpForm';
import { signup } from '../../services/AuthApi';

const SignUpScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (data) => {
    setLoading(true);
    setError("");
    try {
      const response = await signup(data);
      console.log("successful sign up", response);
      navigate('/login');
    }
    catch (err) {
      console.error("Signup Error:", err);
      setError(err.message || "Something went wrong");
    }
    console.log("Form Data: ", data);
    setLoading(false);
  };

  return (
    <div className="mt-16  mb-24 relative flex items-start justify-center p-2 md:pt-2">
      <div className="w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex">
          {/* Form Section */}
          <div className="w-full lg:w-1/2 p-8">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-purple-700">Create an Account</h1>
                <p className="text-sm text-gray-400">
                  Join our community of quiz enthusiasts
                </p>
              </div>

              {/* <button
                className="w-full flex items-center justify-center gap-2 rounded-3xl bg-white border border-yellow-600 p-2.5 hover:bg-gray-50 transition-all mb-4 text-sm"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google logo"
                  className="w-5 h-5"
                />
                <span>Continue with Google</span>
              </button> */}

              {/* <div className="relative my-4">
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-white border-purple-400 rounded-md font-semibold text-purple-800/70">
                    Or continue with
                  </span>
                </div>
              </div> */}

              {/* Form component */}
              <SignUpForm 
                onSubmit={handleSubmit} 
                loading={loading} 
                error={error} 
              />

              <p className="mt-4 text-center text-xs text-gray-400">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-purple-700 hover:text-purple-500"
                  disabled={loading}
                >
                  Log In
                </button>
              </p>
            </div>
          </div>

          {/* Image Section */}
          <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-purple-900/20 to-purple-900/5 relative">
            <img
              src={loginImage}
              alt="Quiz illustration"
              className="absolute inset-0 w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 to-transparent"></div>
            <div className="absolute top-52 p-8 left-4 rounded-xl max-w-[350px] backdrop-blur-md bg-purple-100/5 border border-white/20 shadow-lg before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/10 before:to-transparent/5 before:rounded-xl before:pointer-events-none">
              <div className="relative z-10">
                <Sparkles className="w-6 h-6 absolute -top-10 text-purple-200 right-0 " />
                <h2 className="text-2xl font-bold text-white mb-2">
                  Join the Quiz Revolution 
                </h2>
                <p className="text-sm text-gray-200">
                  Create, share, and challenge yourself with our growing community
                  of quiz enthusiasts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpScreen;