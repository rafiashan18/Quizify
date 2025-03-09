import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { addUser } from '../services/UserApi';
import { X } from 'lucide-react';
import ToastService from '../services/ToastService';
const UserAddModel = ({ onClose, onSucess }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            username: '',
            email: '',
            password: '',
            role: 'user',
            bio: ''
        }
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            setError('File size too large (max 5MB)');
            return;
        }

        if (!file.type.startsWith('image/')) {
            setError('Only image files are allowed');
            return;
        }

        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const onSubmit = async (data) => {
        setError('');
        
        try {
            setIsSubmitting(true);

            // Create FormData object
            const formData = new FormData();

            // Add all form fields to FormData
            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value);
            });

            // Add the file if selected
            if (selectedFile) {
                formData.append('profilePicture', selectedFile);
            }
            console.log("from :", formData)
            // Send the data to the API
            await addUser(formData);

            // Notify parent component about the new user
           

   
            
            ToastService.success("User added successfully");
            if (onSucess) {
                console.log("refreshinggggg")
                onSucess();
            }
            onClose();

        } catch (err) {
            ToastService.error("Failed to add user");
            console.error("Error adding user:", err);
            setError(err.response?.data?.message || 'Failed to add user. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="fixed inset-0 z-50 overflow-auto">
                <div className="min-h-screen px-4 text-center">
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />

                    <div className="inline-block rounded-2xl overflow-hidden w-full max-w-4xl my-8 text-left align-middle transition-all transform">
                        <div className="relative bg-white rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto">
                            {/* Close button */}
                            <button
                                onClick={onClose}
                                className="absolute top-5 right-5 text-gray-600 hover:text-purple-600 transition-colors"
                                aria-label="Close modal"
                            >
                                <X className="w-8 h-8" />
                            </button>

                            {/* Modal content */}
                            <div className="p-1 md:p-6">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    {/* Display error message if any */}
                                    {error && (
                                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                                            {error}
                                        </div>
                                    )}
                                    
                                    {/* Profile Picture */}
                                    <div className="mb-6 flex flex-col items-center">
                                        <div className="w-24 h-24 rounded-full overflow-hidden mb-2 bg-gray-200 flex items-center justify-center">
                                            {previewUrl ? (
                                                <img
                                                    src={previewUrl}
                                                    alt="Profile preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </div>
                                        <label className="cursor-pointer text-purple-600 hover:text-purple-800">
                                            Upload Photo
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />
                                        </label>
                                    </div>

                                    {/* Name */}
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                            Name *
                                        </label>
                                        <input
                                            id="name"
                                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500 ${errors.name ? 'border-red-500' : ''}`}
                                            {...register('name', { required: 'Name is required' })}
                                        />
                                        {errors.name && (
                                            <p className="text-red-500 text-xs italic">{errors.name.message}</p>
                                        )}
                                    </div>

                                    {/* Username */}
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                            Username
                                        </label>
                                        <input
                                            id="username"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500"
                                            {...register('username')}
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                            Email *
                                        </label>
                                        <input
                                            id="email"
                                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500 ${errors.email ? 'border-red-500' : ''}`}
                                            {...register('email', { 
                                                required: 'Email is required',
                                                pattern: {
                                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                    message: 'Please enter a valid email address'
                                                }
                                            })}
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-xs italic">{errors.email.message}</p>
                                        )}
                                    </div>

                                    {/* Password */}
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                            Password *
                                        </label>
                                        <input
                                            id="password"
                                            type="password"
                                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500 ${errors.password ? 'border-red-500' : ''}`}
                                            {...register('password', { required: 'Password is required' })}
                                        />
                                        {errors.password && (
                                            <p className="text-red-500 text-xs italic">{errors.password.message}</p>
                                        )}
                                    </div>

                                    {/* Role */}
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                                            Role
                                        </label>
                                        <select
                                            id="role"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500"
                                            {...register('role')}
                                        >
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </div>

                                    {/* Bio */}
                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">
                                            Bio
                                        </label>
                                        <textarea
                                            id="bio"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500"
                                            rows="3"
                                            {...register('bio')}
                                        />
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="mr-2 px-4 py-2 text-purple-600 border border-purple-600 rounded hover:bg-purple-50"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 focus:outline-none focus:shadow-outline disabled:bg-purple-300"
                                        >
                                            {isSubmitting ? 'Adding...' : 'Add User'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserAddModel;