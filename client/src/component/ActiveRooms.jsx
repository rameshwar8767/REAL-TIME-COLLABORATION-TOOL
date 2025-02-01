/* eslint-disable react/prop-types */
// src/components/ActiveRooms.js

const ActiveRooms = ({ rooms }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold">Active Rooms</h2>
      <ul className="my-4">
        {rooms.map((room, index) => (
          <li key={index} className="p-2 border-b border-gray-600">
            {room.name} (ID: {room.id})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActiveRooms;
