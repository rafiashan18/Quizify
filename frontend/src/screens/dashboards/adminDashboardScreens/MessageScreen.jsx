import React, { useState, useEffect } from 'react'
import { 
  Eye, 
  Trash2, 
  Check, 
  RefreshCw, 
  Mail, 
  Filter 
} from 'lucide-react'
import { 
  sendReply, 
  deleteMessage, 
  resolveMessage, 
  showAllMessages 
} from '../../../services/MessageApi'

const MessageScreen = () => {
  const [messages, setMessages] = useState([])
  const [filteredMessages, setFilteredMessages] = useState([])
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [replyText, setReplyText] = useState('')
  const [filter, setFilter] = useState('all')

  // Fetch messages on component mount
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await showAllMessages()
        // Extract the data array from the response
        const fetchedMessages = response.data || []
        setMessages(fetchedMessages)
        setFilteredMessages(fetchedMessages)
      } catch (error) {
        console.error('Failed to fetch messages:', error)
      }
    }
    fetchMessages()
  }, [])

  // Filter messages based on status
  useEffect(() => {
    if (filter === 'all') {
      setFilteredMessages(messages)
    } else {
      const filtered = messages.filter(msg => msg.status === filter)
      setFilteredMessages(filtered)
    }
  }, [filter, messages])

  // Handle message reply
  const handleReply = async () => {
    if (selectedMessage && replyText.trim()) {
      try {
        await sendReply(selectedMessage._id, replyText)
        // Update local state or refetch messages
        setSelectedMessage(null)
        setReplyText('')
        // Optionally refresh messages
        const response = await showAllMessages()
        setMessages(response.data || [])
      } catch (error) {
        console.error('Failed to send reply:', error)
      }
    }
  }

  // Handle message deletion
  const handleDelete = async (messageId) => {
    try {
      await deleteMessage(messageId)
      // Remove message from local state
      setMessages(messages.filter(msg => msg._id !== messageId))
    } catch (error) {
      console.error('Failed to delete message:', error)
    }
  }

  // Handle message resolution toggle
  const handleResolveToggle = async (messageId) => {
    try {
      // Get the current message
      const currentMessage = messages.find(msg => msg._id === messageId)
      
      // Determine the new status (toggle between 'resolved' and 'pending')
      const newStatus = currentMessage.status === 'resolved' ? 'pending' : 'resolved'
      
      // Call resolve API with the new status
      await resolveMessage(messageId, newStatus)
      
      // Update local state
      const updatedMessages = messages.map(msg => 
        msg._id === messageId ? { ...msg, status: newStatus } : msg
      )
      setMessages(updatedMessages)
    } catch (error) {
      console.error('Failed to toggle message status:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-purple-700 mb-6">
          Message Management
        </h1>

        {/* Filter Section */}
        <div className="flex items-center space-x-4 mb-6">
          <Filter className="text-purple-600" />
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Messages</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        {/* Messages List */}
        <div className="grid gap-4">
          {filteredMessages.map((message) => (
            <div 
              key={message._id} 
              className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center hover:bg-gray-50 transition"
            >
              <div className="flex-grow">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-purple-800">{message.name}</h3>
                  <span className={`
                    px-2 py-1 rounded-full text-xs font-medium
                    ${message.status === 'resolved' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                    }
                  `}>
                    {message.status || 'pending'}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mt-2">{message.subject}</p>
                <p className="text-gray-500 text-sm">{message.email}</p>
                <p className="mt-2 text-gray-700">{message.message}</p>
              </div>

              <div className="flex space-x-2 ml-4">
                {/* View Details Button */}
                <button 
                  onClick={() => setSelectedMessage(message)}
                  className="text-purple-600 hover:bg-purple-100 p-2 rounded-full"
                >
                  <Eye size={20} />
                </button>

                {/* Resolve/Unresolve Toggle Button */}
                <button 
                  onClick={() => handleResolveToggle(message._id)}
                  className={`
                    p-2 rounded-full 
                    ${message.status === 'resolved' 
                      ? 'text-yellow-600 hover:bg-yellow-100' 
                      : 'text-green-600 hover:bg-green-100'
                    }
                  `}
                >
                  <Check size={20} />
                </button>

                {/* Delete Button */}
                <button 
                  onClick={() => handleDelete(message._id)}
                  className="text-red-600 hover:bg-red-100 p-2 rounded-full"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Reply Modal */}
        {selectedMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-purple-700 mb-4">
                Reply to {selectedMessage.name}
              </h2>
              <textarea 
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your reply here..."
                className="w-full h-32 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div className="flex justify-end space-x-4 mt-4">
                <button 
                  onClick={() => setSelectedMessage(null)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleReply}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  Send Reply
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MessageScreen