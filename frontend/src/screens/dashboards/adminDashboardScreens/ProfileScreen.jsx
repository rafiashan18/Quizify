import React, { useEffect, useState } from 'react';
import ProfileUI from '../../../components/commonComponents/ProfileUI'; 
import { getUser } from '../../../services/AuthApi';
import { updateUser, uploadProfilePicture } from '../../../services/UserApi';

const ProfileScreen = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: '',
    username: '',
    email: '',
    bio: '',
    profilePicture: ''
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const getUserData = async () => {
    try {
      setIsLoading(true);
      const response = await getUser();
      console.log("User data:", response);
      setUser(response);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = async (file) => {
    if (!file || !isEditing) return;
    
   
    setUploadError('');
    
    
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size too large (max 5MB)');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setUploadError('Only image files are allowed');
      return;
    }
    
    try {
      setIsUploading(true);
      console.log("Uploading file:", file.name, file.type, file.size);
      
      const response = await uploadProfilePicture(file);
      console.log("Upload response:", response);
      
      if (response?.profilePicture) {
        setUser(prev => ({
          ...prev,
          profilePicture: response.profilePicture
        }));
      }
    } catch (error) {
      console.error("Error uploading profile image:", error);
      if (error.response?.data?.message) {
        setUploadError(error.response.data.message);
      } else {
        setUploadError('Failed to upload image. Please try again.');
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async(e) => {
    try {
      e.preventDefault();
      setIsEditing(false);
      console.log('Form submitted:', user);
      const response = await updateUser(user);
      console.log(response);
      getUserData();
    } catch(err) {
      console.log("error in profile upload ", err);
    }
  };

  const toggleEdit = () => {
    if (isEditing) {
      handleSubmit({ preventDefault: () => {} });
    }
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return user ? (
    <ProfileUI
      isEditing={isEditing}
      user={user} 
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      toggleEdit={toggleEdit}
      handleImageChange={handleImageChange}
      isUploading={isUploading}
      uploadError={uploadError}
    />
  ) : (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg text-gray-600">Failed to load profile data</p>
    </div>
  );
};

export default ProfileScreen;