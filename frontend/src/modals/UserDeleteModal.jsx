import React, { useState } from 'react';
import { AlertCircle, Loader } from 'lucide-react';
import { deleteUser } from '../services/UserApi';
import ToastService from '../services/ToastService';

const UserDeleteModal = ({ user, onClose, onSuccess }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setError(null);
      await deleteUser(user._id);
      ToastService.success("User deleted successfully");
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      ToastService.error("Failed to delete user");
      setError(err.response?.data?.message || 'Failed to delete user');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black/50 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 max-w-2xl w-full m-4">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="mb-4">
            <AlertCircle className="w-16 h-16 text-yellow-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Confirm Deletion
          </h2>
          <p className="text-gray-600 mb-2">
            Are you sure you want to delete the user
          </p>
          <p className="text-lg font-semibold text-purple-600">
            {user.name}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            This action cannot be undone.
          </p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-center">
            {error}
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg border-2 border-gray-200 
                     text-gray-700 font-medium hover:bg-gray-50 
                     transition-colors duration-200"
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-6 py-2.5 rounded-lg bg-red-500 text-white 
                     font-medium hover:bg-red-600 transition-colors 
                     duration-200 flex items-center justify-center"
          >
            {isDeleting ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              'Delete User'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDeleteModal;