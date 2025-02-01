// src/components/Invitations.js
import React from 'react';

const Invitations = () => {
  return (
    <div>
      <h2 className="text-2xl text-white font-bold mb-4">Invitations</h2>
      <ul>
        {/* Example invitations */}
        <li className="bg-gray-700 text-white p-2 rounded mb-2 flex justify-between items-center">
          Room 1
          <div>
            <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded mr-2">Accept</button>
            <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">Decline</button>
          </div>
        </li>
        <li className="bg-gray-700 text-white p-2 rounded mb-2 flex justify-between items-center">
          Room 2
          <div>
            <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded mr-2">Accept</button>
            <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">Decline</button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Invitations;
