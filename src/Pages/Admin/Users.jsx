import React, { useState } from 'react';
import { ChevronLeft, Edit, Trash2, Check, X } from 'lucide-react';

export default function UsersPage() {
  const [users, setUsers] = useState([
    {
      id: '65374b8fb1be49c3f658',
      name: 'John Doe',
      email: 'Johndoe@gmail.com',
      isAdmin: true
    },
    {
      id: '65374b8fb1be49c3f658',
      name: 'User One',
      email: 'userone@gmail.com',
      isAdmin: false
    },
    {
      id: '65374b8fb1be49c3f658',
      name: 'User two',
      email: 'usertwo@gmail.com',
      isAdmin: false
    },
    {
      id: '65374b8fb1be49c3f658',
      name: 'User Three',
      email: 'userthree@gmail.com',
      isAdmin: false
    },
    {
      id: '65374b8fb1be49c3f658',
      name: 'User four',
      email: 'userfour@gmail.com',
      isAdmin: false
    },
    {
      id: '65374b8fb1be49c3f658',
      name: 'User five',
      email: 'userfive@gmail.com',
      isAdmin: false
    }
  ]);

  const handleDeleteUser = (userEmail) => {
    setUsers(prev => prev.filter(user => user.email !== userEmail));
  };

  const handleEditUser = (userEmail) => {
    console.log('Edit user:', userEmail);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button className="flex items-center text-gray-600 hover:text-gray-800 mb-6">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </button>
          
          <h1 className="text-blue-600 text-xl font-medium">Users</h1>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 ">
                <th className="text-left py-4 px-6 font-medium text-gray-700">Id</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Name</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Email</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Admin</th>
                <th className="py-4 px-6"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className=" hover:bg-gray-50">
                  <td className="py-4 px-6 font-mono text-sm text-gray-800">
                    {user.id}
                  </td>
                  <td className="py-4 px-6 text-gray-800">
                    {user.name}
                  </td>
                  <td className="py-4 px-6 text-gray-800">
                    {user.email}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex justify-center">
                      {user.isAdmin ? (
                        <div className="bg-green-100 rounded-full p-1">
                          <Check className="w-4 h-4 text-green-600" />
                        </div>
                      ) : (
                        <div className="bg-red-100 rounded-full p-1">
                          <X className="w-4 h-4 text-red-600" />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditUser(user.email)}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.email)}
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-md transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}