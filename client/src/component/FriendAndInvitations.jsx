// src/components/Sidebar.js

import  { useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { AiOutlineUser, AiOutlineUserAdd } from 'react-icons/ai';

const FriendAndInvitations = () => {
  const [isOpenFriends, setIsOpenFriends] = useState(true);
  const [isOpenInvitations, setIsOpenInvitations] = useState(true);

  return (
    <div className="bg-gray-800 text-white  p-4  shadow-md">
      <h2 className="text-xl font-bold mb-4"></h2>
      <div>
        <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsOpenFriends(!isOpenFriends)}>
          <div className="flex items-center">
            <AiOutlineUser className="mr-2" />
            <span>Friends</span>
          </div>
          {isOpenFriends ? <FaAngleUp /> : <FaAngleDown />}
        </div>

        {isOpenFriends && (
          <ul className="ml-4 mt-2">
            <li>• Friend 1 (Online)</li>
            <li>• Friend 2 (Online)</li>
            <li>• Friend 3 (Online)</li>
          </ul>
        )}
      </div>

      <div className="mt-4">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsOpenInvitations(!isOpenInvitations)}>
          <div className="flex items-center">
            <AiOutlineUserAdd className="mr-2" />
            <span>Invitations</span>
          </div>
          {isOpenInvitations ? <FaAngleUp /> : <FaAngleDown />}
        </div>

        {isOpenInvitations && (
          <ul className="ml-4 mt-2">
            <li>• Invite from Friend 1</li>
            <li>• Invite from Friend 2</li>
          </ul>
        )}
      </div>
    </div>
  );
};



export default FriendAndInvitations;
