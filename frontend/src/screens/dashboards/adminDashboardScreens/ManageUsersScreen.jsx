import React, { useState, useEffect } from 'react';
import { getAllUsers, toggleUserStatus } from '../../../services/UserApi';
import UserAddModal from '../../../modals/UserAddModel';
import UserDetailsModal from '../../../modals/UserDetailsModal';
import UserUpdateModal from '../../../modals/UserDeleteModal';
import UserDeleteModal from '../../../modals/UserDeleteModal';
import ToastService from '../../../services/ToastService';

const ManageUserScreen = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  
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
  const openDetailsModal = (user) => {
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
      <div className="bg-purple-50 px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-purple-800">User Management</h2>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
          Add New User
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-purple-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">Id</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">Created At</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-purple-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users && users.length > 0 ? (
              users.map((user, index) => {
                // Set default status as 'active' if not present
                const status = user.status || 'active';
                return (
                  <tr key={user._id} className="hover:bg-purple-50 transition-colors">
                    <td>
                      <p className='px-6'>{index+1}</p>
                    </td>
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
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={() => toggleBlockStatus(user._id, status)}
                          className={`${status === 'blocked' ? 'text-green-600 hover:text-green-900' : 'text-yellow-600 hover:text-yellow-900'} transition-colors`}
                          title={status === 'blocked' ? 'Unblock User' : 'Block User'}
                        >
                          {status === 'blocked' ? 'Unblock' : 'Block'}
                        </button>
                        <button 
                          onClick={() => openUpdateModal(user)}
                          className="text-purple-600 hover:text-purple-900 transition-colors"
                          title="Edit User"
                        >
                          Edit
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

      {/* Pagination - Can be implemented later when needed */}
      <div className="bg-purple-50 px-6 py-4 flex justify-between items-center">
        <span className="text-sm text-gray-700">
          Showing {users && users.length} users
        </span>
        {/* Will add pagination controls when backend pagination is implemented */}
      </div>

      {/* Modals */}
      {isDetailsModalOpen && (
        <UserDetailsModal 
          user={selectedUser}
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
        <UserDeleteModal
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