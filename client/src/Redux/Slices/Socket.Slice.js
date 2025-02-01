/* eslint-disable react-hooks/rules-of-hooks */
// src/redux/slices/socketSlice.js
import { createSlice } from "@reduxjs/toolkit";
// import { io } from 'socket.io-client'
import { toast } from "react-hot-toast";
import {
  setUsers,
  setCurrentUser,
  setStatus,
  setDrawingData,
} from "./Room.slice";
// const {fileStrucuture , openFiles , activeFiles} = useSelector((state)=> state.file)
import { USER_STATUS } from "./Room.slice";
export const SocketEvent = {
  JOIN_REQUEST: "join-request",
  JOIN_ACCEPTED: "join-accepted",
  USER_JOINED: "user-joined",
  USER_DISCONNECTED: "user-disconnected",
  SYNC_FILE_STRUCTURE: "sync-file-structure",
  DIRECTORY_CREATED: "directory-created",
  DIRECTORY_UPDATED: "directory-updated",
  DIRECTORY_RENAMED: "directory-renamed",
  DIRECTORY_DELETED: "directory-deleted",
  FILE_CREATED: "file-created",
  FILE_UPDATED: "file-updated",
  FILE_RENAMED: "file-renamed",
  FILE_DELETED: "file-deleted",
  USER_OFFLINE: "offline",
  USER_ONLINE: "online",
  SEND_MESSAGE: "send-message",
  RECEIVE_MESSAGE: "receive-message",
  TYPING_START: "typing-start",
  TYPING_PAUSE: "typing-pause",
  USERNAME_EXISTS: "username-exists",
  REQUEST_DRAWING: "request-drawing",
  SYNC_DRAWING: "sync-drawing",
  DRAWING_UPDATE: "drawing-update",
};

const initialState = {
  socket: null,
};
const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    initializeSocket(state, action) {
      state.socket = action.payload;
    },
    // disconnectSocket(state) {
    //     if (state.socket) {
    //         state.socket.disconnect()
    //         state.socket = null
    //     }
    // },
  },
});

export const { initializeSocket, disconnectSocket } = socketSlice.actions;

export const setupSocketListeners = () => (dispatch, getState) => {
  const socket = getState().socket.socket;
  console.log("hello");
  if (!socket) {
    console.log("return");
    return;
  }

  const handleError = (err) => {
    console.error("Socket error:", err);
    dispatch(setStatus(USER_STATUS.CONNECTION_FAILED));
    toast.dismiss();
    toast.error("Failed to connect to the server");
  };

  const handleUsernameExist = () => {
    toast.dismiss()
    setStatus(USER_STATUS.INITIAL)
    toast.error(
      "The username you chose already exists in the room. Please choose a different username."
    );
  };

  const handleJoiningAccept = ({ user, users }) => {
    console.log("join accept");
    toast.dismiss()
    dispatch(setCurrentUser(user));
    dispatch(setUsers(users));
    dispatch(setStatus(USER_STATUS.JOINED));
  };

  const handleUserLeft = ({ user }) => {
    toast.success(`${user.username} left the room`);
    dispatch(
      setUsers(
        getState().room.users.filter((u) => u.username !== user.username)
      )
    );
  };

  const handleRequestDrawing = ({ socketId }) => {
    const { drawingData } = getState().room;
    socket.emit("SYNC_DRAWING", { socketId, drawingData });
  };

  const handleDrawingSync = ({ drawingData }) => {
    dispatch(setDrawingData(drawingData));
  };

  socket.on("connect_error", handleError)
        socket.on("connect_failed", handleError)
        socket.on(SocketEvent.USERNAME_EXISTS, handleUsernameExist)
        socket.on(SocketEvent.JOIN_ACCEPTED, handleJoiningAccept)
        socket.on(SocketEvent.USER_DISCONNECTED, handleUserLeft)
        socket.on(SocketEvent.REQUEST_DRAWING, handleRequestDrawing)
        socket.on(SocketEvent.SYNC_DRAWING, handleDrawingSync)
  return () => {
    socket.off("connect_error")
            socket.off("connect_failed")
            socket.off(SocketEvent.USERNAME_EXISTS)
            socket.off(SocketEvent.JOIN_ACCEPTED)
            socket.off(SocketEvent.USER_DISCONNECTED)
            socket.off(SocketEvent.REQUEST_DRAWING)
            socket.off(SocketEvent.SYNC_DRAWING)
  };
};

export default socketSlice.reducer;
