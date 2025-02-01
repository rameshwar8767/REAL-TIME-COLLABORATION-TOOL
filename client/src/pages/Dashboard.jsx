/* eslint-disable no-unused-vars */
// src/pages/Dashboard.js
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import FriendAndInvitations from "../component/FriendAndInvitations";

import ActiveRooms from "../component/ActiveRooms";
import Layout from "./../layout/Layout";

import { ChangeEvent, FormEvent, useEffect, useRef } from "react"
import { toast } from "react-hot-toast"
import { useLocation, useNavigate } from "react-router-dom"
import FormComponent from './../component/forms/FormComponent';

const Dashboard = () => {
  const [activeRooms, setActiveRooms] = useState([]);
  return (
    <Layout>
      <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black min-h-screen flex mt-24 md:mt-40">
        {/* Left Sidebar */}
        <div className="w-1/4 p-4 text-white hidden lg:block">
          <FriendAndInvitations />
        </div>
        {/* Main Section */}
        <div className="sm:w-2/3 md:w-1/2 p-4 flex flex-col items-center gap-10">
         <FormComponent></FormComponent>
        </div>

        {/* Right Section (Active Rooms) */}
        <div className="w-1/4 p-4 text-white hidden sm:block">
          <ActiveRooms rooms={activeRooms} />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
