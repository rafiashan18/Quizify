import React, { useState, useEffect } from 'react';
import { getAllUsers, toggleUserStatus } from '../../../services/UserApi';
import UserAddModal from '../../../modals/UserAddModel';
import UserDetailsModal from '../../../modals/UserDetailsModal';
import UserUpdateModal from '../../../modals/DeleteConfirmation';
import DeleteConfirmation from '../../../modals/DeleteConfirmation';
import ToastService from '../../../services/ToastService';
import { getAllUserProgress, getUserProgress } from '../../../services/UserProgressApi';

const ManageUserScreen = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userProgress, setUserProgress] = useState({});
  
  // Modal states
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch users');
      ToastService.error('Failed to fetch users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  // Toggle user block status
  const toggleBlockStatus = async (userId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'blocked' ? 'active' : 'blocked';
      await toggleUserStatus(userId, newStatus);
      
      // Update local state
      setUsers(users.map(user => 
        user._id === userId ? {...user, status: newStatus} : user
      ));
      
      ToastService.success(`User ${newStatus === 'blocked' ? 'blocked' : 'unblocked'} successfully`);
    } catch (err) {
      console.error('Error updating user status:', err);
      ToastService.error('Failed to update user status');
    }
  };

  // Status color mapping
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'blocked': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Role color mapping
  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'user': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  // Modal handlers
  const openDetailsModal = async(user) => {
    const response = await getAllUserProgress(user._id)
    setUserProgress(response);
    setSelectedUser(user);
    setIsDetailsModalOpen(true);
  };

  const openUpdateModal = (user) => {
    setSelectedUser(user);
    setIsUpdateModalOpen(true);
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  if (loading) {
    return (
      <div className="bg-white shadow-md rounded-xl p-8 flex justify-center items-center">
        <div className="text-gray-600">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow-md rounded-xl p-8 flex justify-center items-center">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden">
      {/* Table Header */}
      <div className="bg-purple-50 px-2 md:px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-purple-800">User Management</h2>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 whitespace-nowrap bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
          Add New User
        </button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-purple-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">Id</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">Created At</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-purple-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users && users.length > 0 ? (
              users.map((user, index) => {
                const status = user.status || 'active';
                return (
                  <tr key={user._id} className="hover:bg-purple-50 transition-colors">
                    <td><p className='px-6'>{index+1}</p></td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        onClick={() => openDetailsModal(user)}
                        className="flex items-center hover:cursor-pointer">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img 
                            className="h-10 w-10 rounded-full" 
                            src={`${user.profilePicture || 'default.jpg'}`} 
                            alt={`${user.name}'s avatar`}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://api.dicebear.com/7.x/avataaars/svg?seed=" + user._id;
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                          <div className="text-xs text-gray-400">@{user.username || 'No username'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(status)}`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-around gap-3 space-x-2">
                        <button 
                          onClick={() => toggleBlockStatus(user._id, status)}
                          className={`${status === 'blocked' ? 'text-green-600 hover:text-green-900' : 'text-yellow-600 hover:text-yellow-900'} transition-colors`}
                          title={status === 'blocked' ? 'Unblock User' : 'Block User'}
                        >
                          {status === 'blocked' ? 'Unblock' : 'Block'}
                        </button>
                        <button 
                          onClick={() => openDeleteModal(user)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                          title="Delete User"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile List View */}
      <div className="md:hidden">
        {users && users.length > 0 ? (
          users.map((user, index) => {
            const status = user.status || 'active';
            return (
              <div 
                key={user._id} 
                className="p-4 border-b border-gray-200 hover:bg-purple-50 transition-colors"
              >
                <div className="flex items-center mb-2">
                  <div className="flex-shrink-0 h-10 w-10 mr-4">
                    <img 
                      className="h-10 w-10 rounded-full" 
                      src={`${user.profilePicture || 'default.jpg'}`} 
                      alt={`${user.name}'s avatar`}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://api.dicebear.com/7.x/avataaars/svg?seed=" + user._id;
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <span className="text-xs text-gray-600">Status:</span>
                    <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(status)}`}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-600">Role:</span>
                    <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-600">Created:</span>
                    <span className="ml-2 text-xs text-gray-500">
                      {formatDate(user.createdAt)}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between mt-3">
                  <button 
                    onClick={() => openDetailsModal(user)}
                    className="text-purple-600 hover:text-purple-900 transition-colors"
                  >
                    View Details
                  </button>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => toggleBlockStatus(user._id, status)}
                      className={`${status === 'blocked' ? 'text-green-600 hover:text-green-900' : 'text-yellow-600 hover:text-yellow-900'} transition-colors`}
                    >
                      {status === 'blocked' ? 'Unblock' : 'Block'}
                    </button>
                    <button 
                      onClick={() => openDeleteModal(user)}
                      className="text-red-600 hover:text-red-900 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-4 text-center text-gray-500">
            No users found
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="bg-purple-50 px-6 py-4 flex justify-between items-center">
        <span className="text-sm text-gray-700">
          Showing {users && users.length} users
        </span>
      </div>

      {/* Modals */}
      {isDetailsModalOpen && (
        <UserDetailsModal 
          user={selectedUser}
          userProgress={userProgress}
          onClose={() => setIsDetailsModalOpen(false)}
        />
      )}
      
      {isUpdateModalOpen && (
        <UserUpdateModal
          user={selectedUser}
          onClose={() => setIsUpdateModalOpen(false)}
          onSuccess={fetchUsers}
        />
      )} 
      
      {isDeleteModalOpen && (
        <DeleteConfirmation
          user={selectedUser}
          onClose={() => setIsDeleteModalOpen(false)}
          onSuccess={fetchUsers}
        />
      )}
      
      {isAddModalOpen && (
        <UserAddModal
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={fetchUsers}
        />
      )}
    </div>
  );
};

export default ManageUserScreen;