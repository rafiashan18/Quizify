import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/Slices/authSlice';
import { login } from '../../services/AuthApi';
import loginImage from "../../assets/images/loginImage.jpg";
import LoginForm from '../../components/CheckAuth/LoginForm'; 

const LoginScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [backendError, setBackendError] = useState('');
  const dispatch = useDispatch();
  
  const handleSubmit = async (data) => {
    setLoading(true);
    setBackendError('');
    
    try {
        const response = await login(data);
        dispatch(setUser({
            user: response.user,
            accessToken: response.accessToken
        }));
        
        const userRole = response.user.role;
        if (userRole === 'user') {
            navigate('/user');
        } else {
            navigate('/admin');
        }
    } catch (error) {
      console.log(error);
      
      if (error === "Your account is blocked") {
          setBackendError("Your account has been blocked. Please contact support.");
      }
      else if(error == "User not found"){
        setBackendError("User not found. Please enter correct credentials.");
      }
      else if(error == "Incorrect password"){
        setBackendError("Password is incorrect. Please enter correct credentials.");
      }
      else {
          setBackendError(error || 'Failed to login. Please check your credentials and try again.');
      }
    } finally {
        setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen relative md:mt-28 flex items-start justify-center p-2 md:pt-2">
      <div className="w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex">
          {/* Form Section */}
          <div className="w-full lg:w-1/2 p-8">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-purple-700">Welcome Back</h1>
                <p className="text-sm text-gray-400">
                  Sign in to continue your journey
                </p>
              </div>

              <button className="w-full flex items-center justify-center gap-2 rounded-3xl bg-white border border-yellow-600 p-2.5 hover:bg-gray-50 transition-all mb-4 text-sm">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google logo"
                  className="w-5 h-5"
                />
                <span>Continue with Google</span>
              </button>

              <div className="relative my-4">
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-white border-purple-400 rounded-md font-semibold text-purple-800/70">
                    Or continue with
                  </span>
                </div>
              </div>

              
              <LoginForm 
                onSubmit={handleSubmit} 
                loading={loading} 
                backendError={backendError} 
              />

              <p className="mt-4 text-center text-xs text-gray-400">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/signup")}
                  className="text-purple-700 hover:text-purple-500"
                  disabled={loading}
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>

          {/* Image Section */}
          <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-purple-900/70 to-purple-900/5 relative opacity-80">
            <img
              src={loginImage}
              alt="Login illustration"
              className="absolute inset-0 w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 max-w-xl">
              <h2 className="text-2xl font-bold text-white mb-2">
                Welcome Back
              </h2>
              <p className="text-sm text-gray-200">
                Continue your quiz journey and explore new challenges!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;