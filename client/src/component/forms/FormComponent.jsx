/* eslint-disable no-unused-vars */

import { ChangeEvent, FormEvent, useEffect, useRef } from "react"
import { toast } from "react-hot-toast"
import { useLocation, useNavigate } from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"
import { v4 as uuidv4 } from "uuid"
import { useState } from 'react';
import { useMemo } from 'react';
import { io } from 'socket.io-client'
import {initializeSocket,setupSocketListeners} from '../../Redux/Slices/Socket.Slice'
import { SocketEvent } from './../../Redux/Slices/Socket.Slice';
import {setStatus,setCurrentUser} from "../../Redux/Slices/Room.slice"
import { USER_STATUS,USER_CONNECTION_STATUS } from './../../Redux/Slices/Room.slice.js';
const FormComponent = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  const {username} = useSelector((state)=>state.auth.data)
  const {currentUser , status} = useSelector((state)=>state.room)
  const socket = useMemo(
    () =>
        io(BACKEND_URL, {
            reconnectionAttempts: 2,
        }),
    [],
)
   const [userStatus, setuserStatus] = useState(status);
     const navigate = useNavigate();
     const dispatch = useDispatch();
  const [roomName, setroomName] = useState("");
   const [roomId, setroomId] = useState("");
    const validateForm = () => {
        if (roomId === 0) {
            toast.error("Enter a room id")
            return false
        } else if (roomId.length < 5) {
            toast.error("ROOM Id must be at least 5 characters long")
            return false
        } else if(roomName.length ==0){
          toast.error("Enter room name")
          return false;
        }
        return true
    }
    const GenerateUniqueId =(e)=>{
      e.preventDefault();
      setroomId((val)=>
        uuidv4()
      )
      
    }
const joinRoom = (e)=>{
  e.preventDefault()

  if (status === USER_STATUS.ATTEMPTING_JOIN) return
  if(!roomId){
    toast.error('enter roomId')
    return;
   }
   toast.loading("Joining room...")
   dispatch(setStatus(USER_STATUS.ATTEMPTING_JOIN))
   setuserStatus(USER_STATUS.ATTEMPTING_JOIN)
   socket.emit(SocketEvent.JOIN_REQUEST, currentUser,(response) => {
  if (response.success) {
        setuserStatus('joined');
    }})
}
    const createRoom = (e) => {
        e.preventDefault()
        if (status === USER_STATUS.ATTEMPTING_JOIN) return
        if (!validateForm()) return
       if(!roomId){
        toast.error('enter roomId')
        return;
       }
       if(!roomName){
        toast.error('enter room name')
        return;
       }

       toast.loading("creating room")
       dispatch(setStatus(USER_STATUS.ATTEMPTING_JOIN))
     //  navigate(`/Editor/${roomId}`)
     setuserStatus(USER_STATUS.ATTEMPTING_JOIN)
      socket.emit(SocketEvent.JOIN_REQUEST, currentUser,(response) => {
        if (response.success) {
            setuserStatus('joined');
        }})
    }
  useEffect(() => {
    if (status === USER_STATUS.DISCONNECTED && !socket.connected) {
        socket.connect()
        return
    }
    dispatch(setupSocketListeners())
    const isRedirect = sessionStorage.getItem("redirect") || false
    console.log(isRedirect)
    if (status === USER_STATUS.JOINED && !isRedirect) {
        sessionStorage.setItem("redirect", "true")
        navigate(`/Editor/${roomId}`)
    } else if (status === USER_STATUS.JOINED && isRedirect) {
        sessionStorage.removeItem("redirect")
        dispatch(setStatus(USER_STATUS.DISCONNECTED))
        setuserStatus(USER_STATUS.DISCONNECTED);
        socket.disconnect()
        socket.connect()
    }
}, [currentUser, dispatch, navigate, socket, status, username,setStatus,setuserStatus])
    return (
        <>
        <div className="border p-4 border-gray-700 lg:w-2/3">
            <h2 className="text-xl font-semibold text-white">Create Room</h2>
            <div className="my-4">
              <input
                type="text"
                className="mt-2 p-2  w-full rounded bg-gray-700 border border-gray-600"
                placeholder="Room Name"
                name="username"
                value={roomName}
                onChange={(e)=> setroomName(e.target.value)}   
              />
              <input
                type="text"
                className="mt-2 p-2 w-full rounded bg-gray-700 border border-gray-600"
                placeholder="Room ID"
                name="roomId"
                value={roomId}
                onChange={(e)=> setroomId(e.target.value)}
              />
              <div className="flex space-x-2 mt-2">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"  
              onClick={GenerateUniqueId}  >
                  Generate Unique ID
                </button>
                <button
                  className="bg-green-600 hover:bg-green-700 text-white p-2 rounded"
                  onClick={createRoom}

                >
                  Create Room
                </button>
              </div>
            </div>
          </div>
          <div className="border border-gray-700 p-4  w-full lg:w-2/3">
            <h2 className="text-xl font-semibold text-white">Join Room</h2>
            <div className="my-4">
              <input
                type="text"
                className="mt-2 p-2 w-full rounded bg-gray-700 border border-gray-600"
                placeholder="Room Id"
               
              />
              <div className="flex space-x-2 mt-2">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
                 
               onClick={joinRoom} >
                  Join Room
                </button>
              </div>
            </div>
          </div>
          </>
    )
}

export default FormComponent
