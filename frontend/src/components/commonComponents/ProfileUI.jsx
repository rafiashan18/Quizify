import React, { useRef } from 'react';
import { User, Mail, Lock, Edit, Camera, Save, AlertTriangle } from 'lucide-react';

const ProfileUI = ({
  isEditing,
  user,
  handleChange,
  handleSubmit,
  toggleEdit,
  handleImageChange,
  isUploading,
  uploadError
}) => {
  const inputRef = useRef(null);
  
  const handleButtonClick = () => {
    if (!isEditing) return;
    inputRef.current.click();
  };
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleImageChange(e.target.files[0]);
    }
  };
  console.log("profile ui",user)
  // Default profile image as fallback
  const defaultProfileImage = "/path/to/default/image.jpg";
  
  return (
    <div className="min-h-screen bg-gray-50 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Profile Settings</h1>
          <button
            onClick={toggleEdit}
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-md bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors"
          >
            {isEditing ? <Save size={18} /> : <Edit size={18} />}
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 mx-auto">
                {isUploading ? (
                  <div className="w-full h-full rounded-full flex items-center justify-center bg-gray-200">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                  </div>
                ) : (
                  <img
                    src={user.image || null}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover border-2 border-gray-200"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = defaultProfileImage;
                    }}
                  />
                )}
                {isEditing && (
                  <button
                    className="absolute bottom-0 right-0 p-2 bg-purple-600 rounded-full text-white hover:bg-purple-700 transition-colors disabled:bg-gray-400"
                    onClick={handleButtonClick}
                    disabled={isUploading}
                  >
                    <Camera size={18} />
                  </button>
                )}
                <input 
                  type="file"
                  ref={inputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  disabled={!isEditing}
                />
              </div>
              
              {uploadError && (
                <div className="mt-2 text-red-500 text-sm flex items-center gap-1">
                  <AlertTriangle size={16} />
                  <span>{uploadError}</span>
                </div>
              )}
              
              {isEditing && (
                <p className="mt-2 text-gray-500 text-sm">
                  Click the camera icon to upload a profile picture
                </p>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="md:w-2/3 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <User size={18} />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={user.name || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <User size={18} />
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={user.username || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <Mail size={18} />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={user.email || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={user.bio || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                  rows={4}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileUI;