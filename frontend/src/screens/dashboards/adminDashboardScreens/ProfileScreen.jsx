import React, { useEffect, useState } from 'react';
import ProfileUI from '../../../components/Common/ProfileUI'; 
import { getUser } from '../../../services/AuthApi';
import { updateUser, uploadProfilePicture } from '../../../services/UserApi';
import { updateUserProfile } from '../../../redux/Slices/authSlice';
import { useDispatch } from 'react-redux';

const ProfileScreen = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: '',
    username: '',
    email: '',
    bio: '',
    profilePicture: '',
    profileImageFile: null  // New state to track file to upload
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const getUserData = async () => {
    try {
      setIsLoading(true);
      const response = await getUser();
      console.log("User data:", response);
      setUser(response);
      setIsLoading(false);
      
      dispatch(updateUserProfile(response))
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

  const handleImageChange = (file) => {
    if (!file) return;

    // Validate file
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size too large (max 5MB)');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setUploadError('Only image files are allowed');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);

    // Store the file for later upload
    setUser(prev => ({
      ...prev,
      profileImageFile: file
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setUploadError('');
    setIsUploading(true);

    try {
      // First, update user profile
      const userUpdateResponse = await updateUser({
        name: user.name,
        username: user.username,
        email: user.email,
        bio: user.bio
      });

      // If there's a file to upload, upload profile picture
      if (user.profileImageFile) {
        const imageUploadResponse = await uploadProfilePicture(user.profileImageFile);
        
        // Update user state with new profile image
        if (imageUploadResponse?.profilePicture) {
          setUser(prev => ({
            ...prev,
            profileImage: imageUploadResponse.profilePicture,
            profileImageFile: null  // Clear the file after upload
          }));
          
          // Clear preview
          setPreviewImage(null);
        }
      }

      // Refresh user data to ensure everything is in sync
      await getUserData();

      // Exit editing mode
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
      
      // Handle potential different error scenarios
      if (error.response?.data?.message) {
        setUploadError(error.response.data.message);
      } else {
        setUploadError('Failed to update profile. Please try again.');
      }
    } finally {
      setIsUploading(false);
    }
  };

  const toggleEdit = () => {
    if (isEditing) {
      handleSave({ preventDefault: () => {} });
    } else {
      // Reset preview when entering edit mode
      setPreviewImage(null);
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
      previewImage={previewImage}
      handleChange={handleChange}
      handleSubmit={handleSave}
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