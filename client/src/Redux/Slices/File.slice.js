import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid"; // to generate unique IDs for each file/folder
import { toast } from 'react-hot-toast';
import { SocketEvent } from './Socket.Slice';
import { useCallback } from 'react';
// Utility to determine language by file extension
const getLanguageByExtension = (filename) => {
  const extension = filename.split(".").pop().toLowerCase();
  switch (extension) {
    case "js":
      return "javascript";
    case "html":
      return "html";
    case "css":
      return "css";
    case "py":
      return "python";
    case "java":
      return "java";
    case "cpp":
      return "c++";
    case "md":
      return "markdown";
    default:
      return "text";
  }
};

// Initial file structure with unique IDs
const initialState = {
  fileStructure: [
    {
      id: nanoid(),
      name: "src",
      type: "folder",
      children: [
        {
          id: nanoid(),
          name: "App.js",
          type: "file",
          language: "javascript",
          content: "",
        },
        {
          id: nanoid(),
          name: "index.js",
          type: "file",
          language: "javascript",
          content: "",
        },
      ],
    },
    {
      id: nanoid(),
      name: "public",
      type: "folder",
      children: [
        {
          id: nanoid(),
          name: "index.html",
          type: "file",
          language: "html",
          content: "",
        },
      ],
    },
    {
      id: nanoid(),
      name: "README.md",
      type: "file",
      language: "markdown",
      content: "Hello",
    },
  ],
  openFiles: [],
  activeFile: null,
};

// Recursive helper to find and update items by ID
const findAndUpdateItemById = (structure, targetId, updateCallback) => {
  return structure.map((item) => {
    if (item.id === targetId) {
      return updateCallback(item);
    } else if (item.type === "folder") {
      return {
        ...item,
        children: findAndUpdateItemById(
          item.children,
          targetId,
          updateCallback
        ),
      };
    }
    return item;
  });
};

// Recursive helper to add an item to a target folder by ID
const addItemToFolderById = (structure, parentId, newItem) => {
  return structure.map((item) => {
    if (item.id === parentId && item.type === "folder") {
      return { ...item, children: [...item.children, newItem] };
    } else if (item.type === "folder") {
      return {
        ...item,
        children: addItemToFolderById(item.children, parentId, newItem),
      };
    }
    return item;
  });
};

// Recursive helper to delete an item by ID
const deleteItemById = (structure, targetId) => {
  return structure
    .filter((item) => item.id !== targetId)
    .map((item) => {
      if (item.type === "folder") {
        return { ...item, children: deleteItemById(item.children, targetId) };
      }
      return item;
    });
};

// Create slice
const fileSlice = createSlice({
  name: "fileSystem",
  initialState,
  reducers: {

    setFileStructure : (state,action)=>{

      state.FileStructure = action.payload
    },
    addFileOrFolder: (state, action) => {
      const { parentId, name, type } = action.payload;
      const newItem = {
        id: nanoid(),
        name,
        type,
        language: type === "file" ? getLanguageByExtension(name) : undefined,
        content: type === "file" ? "" : undefined,
        children: type === "folder" ? [] : undefined,
      };

      state.fileStructure = addItemToFolderById(
        state.fileStructure,
        parentId,
        newItem
      );
    },

    deleteFileOrFolder: (state, action) => {
      const { id } = action.payload;
      state.fileStructure = deleteItemById(state.fileStructure, id);
      state.openFiles = state.openFiles.filter((file) => file.id !== id);
      if (state.activeFile && state.activeFile.id === id) {
        state.activeFile = null;
      }
    },
    renameFileOrFolder: (state, action) => {
      const { id, newName } = action.payload;
      state.fileStructure = findAndUpdateItemById(
        state.fileStructure,
        id,
        (item) => ({
          ...item,
          name: newName,
        })
      );
      state.openFiles = state.openFiles.map((file) =>
        file.id === id ? { ...file, name: newName } : file
      );
      if (state.activeFile && state.activeFile.id === id) {
        state.activeFile.name = newName;
      }
    },

    openFile: (state, action) => {
      const { file } = action.payload;
      if (!state.openFiles.some((openFile) => openFile.id === file.id)) {
        state.openFiles.push(file);
      }
      state.activeFile = file;
    },
    closeFile: (state, action) => {
      const { fileId } = action.payload;
      state.openFiles = state.openFiles.filter((file) => file.id !== fileId);

      if (state.openFiles.length > 0) {
        state.activeFile = state.openFiles[0];
      } else {
        state.activeFile = null;
      }
    },

    setActiveFile: (state, action) => {
      const file = action.payload;
      state.activeFile = file;
    },

    updateFileContent: (state, action) => {
      console.log("action", action.payload);
      const { id, content } = action.payload;
      console.log(id, content);
      state.fileStructure = findAndUpdateItemById(
        state.fileStructure,
        id,
        (item) => ({
          ...item,
          content,
        })
      );

      if (state.activeFile && state.activeFile.id === id) {
        state.activeFile.content = content;
      }
    },

    saveFileContent: (state, action) => {
      const { fileId, content } = action.payload;
      state.fileStructure = findAndUpdateItemById(
        state.fileStructure,
        fileId,
        (item) => ({
          ...item,
          content,
        })
      );
      if (state.activeFile && state.activeFile.id === fileId) {
        state.activeFile.content = content;
      }
    },
    setOpenFiles : (state,action)=>{
      state.openFiles = action.payload
    }
  },
});

export const setupFileSocketListeners = () => (dispatch, getState) => {
  const socket = getState().socket.socket;

  console.log("from file slice" , socket);
  console.log("hello", socket);
  if (!socket) {
    console.log("return");
    return;
  }

  const fileStructure = getState().file.fileStrucutre;
  const openFiles = getState().file.openFiles;
  const activeFile = getState().file.activeFile;

  const handleUserJoined = ({ user }) => {
    toast.success(`${user.username} joined`);

    socket.emit( SocketEvent.SYNC_FILE_STRUCTURE, {
      fileStructure,
      openFiles,
      activeFile,
      socketId: user.socketId,
    });
  };

  const handleFileStructureSync = 
    ({
        fileStructure,
        openFiles,
        activeFile,
    }) => {
        setFileStructure(fileStructure)
        setOpenFiles(openFiles)
        setActiveFile(activeFile)
        toast.dismiss()
    }

    const handleFileUpdated = useCallback(
      ({ fileId, content} ) => {
        updateFileContent({fileId, content})
          // Update the content of the active file if it's the same file
          if (activeFile?.id === fileId) {
              setActiveFile({ ...activeFile, content: content })
          }
      },
      [activeFile],
  )
  


  socket.once( SocketEvent.SYNC_FILE_STRUCTURE, handleFileStructureSync)
  socket.on(SocketEvent.USER_JOINED, handleUserJoined)
  socket.on(SocketEvent.FILE_UPDATED, handleFileUpdated)
  return () => {
socket.off(SocketEvent.USER_JOINED)
socket.off(SocketEvent.FILE_UPDATED)
  };
};

export const {
  addFileOrFolder,
  deleteFileOrFolder,
  renameFileOrFolder,
  openFile,
  closeFile,
  setActiveFile,
  updateFileContent,
  saveFileContent,
  setFileStructure,setOpenFiles
} = fileSlice.actions;

export default fileSlice.reducer;
