/* eslint-disable react/prop-types */

/* eslint-disable no-unused-vars */
import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { html } from "@codemirror/lang-html";
import {
  vscodeDark,
  dracula,
  githubDark,
  materialDark,
  nord,
  abcdef,
} from "@uiw/codemirror-themes-all";

import { abyss } from "@uiw/codemirror-themes-all";
import { androidstudio } from "@uiw/codemirror-themes-all";
import { andromeda } from "@uiw/codemirror-themes-all";
import { atomone } from "@uiw/codemirror-themes-all";
import { aura } from "@uiw/codemirror-themes-all";
import { basicDark } from "@uiw/codemirror-themes-all";
import { basicLight } from "@uiw/codemirror-themes-all";
import { bbedit } from "@uiw/codemirror-themes-all";
import { bespin } from "@uiw/codemirror-themes-all";
import { copilot } from "@uiw/codemirror-themes-all";
import { darcula } from "@uiw/codemirror-themes-all";
import { duotoneDark } from "@uiw/codemirror-themes-all";
import { duotoneLight } from "@uiw/codemirror-themes-all";
import { eclipse } from "@uiw/codemirror-themes-all";
import { githubLight } from "@uiw/codemirror-themes-all";
import { gruvboxDark } from "@uiw/codemirror-themes-all";
import { gruvboxLight } from "@uiw/codemirror-themes-all";
import { kimbie } from "@uiw/codemirror-themes-all";
import { material } from "@uiw/codemirror-themes-all";
import { materialLight } from "@uiw/codemirror-themes-all";
import { monokai } from "@uiw/codemirror-themes-all";
import { monokaiDimmed } from "@uiw/codemirror-themes-all";
import { noctisLilac } from "@uiw/codemirror-themes-all";
import { okaidia } from "@uiw/codemirror-themes-all";
import { quietlight } from "@uiw/codemirror-themes-all";
import { red } from "@uiw/codemirror-themes-all";
import { solarizedDark } from "@uiw/codemirror-themes-all";
import { solarizedLight } from "@uiw/codemirror-themes-all";
import { sublime } from "@uiw/codemirror-themes-all";
import { tokyoNight } from "@uiw/codemirror-themes-all";
import { tokyoNightDay } from "@uiw/codemirror-themes-all";
import { tokyoNightStorm } from "@uiw/codemirror-themes-all";
import { tomorrowNightBlue } from "@uiw/codemirror-themes-all";

import { whiteDark } from "@uiw/codemirror-themes-all";
import { whiteLight } from "@uiw/codemirror-themes-all";
import { xcodeDark } from "@uiw/codemirror-themes-all";
import { xcodeLight } from "@uiw/codemirror-themes-all";
import Sidebar from "./sidebar/Sidebar";
import FileTab from "./editor/FileTab";
import { useSelector } from "react-redux";
import { updateFileContent } from "../Redux/Slices/File.slice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { editorThemes } from "./../resources/Themes";
import { toast } from "react-hot-toast";
import { useMemo } from "react";
import { SocketEvent } from './../Redux/Slices/Socket.Slice';

function Editor({ theme, language, fontSize, fontFamily }) {
  const { openFiles, activeFile } = useSelector((state) => state.file);
  const [content, setcontent] = useState(activeFile?.content || "");
  const { socket } = useSelector((state) => state.socket);
  const { users, currentUser } = useSelector((state) => state.room);


  const [timeOut, setTimeOut] = useState(setTimeout(() => {}, 0))
  const filteredUsers = useMemo(
    () => users.filter((user) => user.username !== currentUser.username),
    [users, currentUser]
  );

  const dispatch = useDispatch();


  const handleSave = async () => {
    const id = activeFile?.id;
    if (id) {
      const resp = await dispatch(updateFileContent({ id, content }));
      toast.dismiss();
      toast.success("Code saved");
    } else {
      toast.error("Error in saving code");
    }
  };

  // Listen for Ctrl+S or Cmd+S
  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "s") {
      e.preventDefault();
      handleSave();
      socket?.emit("file-updated", { fileId: activeFile.id, newContent: content });
    }

    if (e.key === "Enter") {
      setcontent((prevValue) => prevValue + "\n");
    }
  };

  const onCodeChange = (code, view) => {
    if (!activeFile) return;
    const cursorPosition = view?.state?.selection.main?.head;
    console.log("cursor", cursorPosition);
    socket.emit(SocketEvent.TYPING_START, { cursorPosition })
    socket.emit(SocketEvent.FILE_UPDATED, {
        fileId: activeFile.id,
        newContent: code,
    })
    clearTimeout(timeOut)
    
    const newTimeOut = setTimeout(
      () => socket.emit(SocketEvent.TYPING_PAUSE),
      1000,
  )
  setTimeOut(newTimeOut)
  };
  // Attach keydown listener on mount
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, activeFile, useSelector]);


 

  const getLanguage = () => {
    switch (language) {
      case "javascript":
        return javascript({ jsx: true });
      case "python":
        return python();
      case "html":
        return html();
      // case 'css':
      //   return css();
      // case 'java':
      //   return java();
      // case 'c':
      //   return c();
      // case 'csharp':
      //   return csharp();
      // case 'php':
      //   return php();
      // case 'ruby':
      //   return ruby();
      // case 'go':
      //   return go();
      // case 'typescript':
      //   return typescript();
      // case 'rust':
      //   return rust();
      // case 'swift':
      //   return swift();
      // case 'kotlin':
      //   return kotlin();
      // case 'dart':
      //   return dart();
      default:
        return javascript({ jsx: true });
    }
  };

  // Theme mapping
  const getTheme = () => {
    // Ensure the theme exists in the editorThemes object, fallback to 'VS Code Dark' if not found
    return editorThemes[theme] || editorThemes["VS Code Dark"];
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <FileTab />

      <div className="flex-grow overflow-scroll no-scrollbar h-full mb-1 border-t max-w-full">
        {openFiles.length > 0 ? (
          <CodeMirror
            value={activeFile?.content || ""}
            theme={getTheme()}
            height="calc(100vh - 32px)" // Adjust height for any header
            extensions={[
              getLanguage(), // Use the language function correctly
              getTheme(), // Apply the selected theme
            ]}
            minHeight="100%"
            maxWidth="100vw"
            onChange={onCodeChange}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mb-4 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M8 2a2 2 0 012-2h4a2 2 0 012 2v6h-2V2H10v4H8V2zm5 6a2 2 0 00-2-2H2a2 2 0 00-2 2v6a2 2 0 002 2h9a2 2 0 002-2V8zm-1 6H2V8h9v6z" />
            </svg>
            <p className="text-lg font-semibold">No file open</p>
            <p className="text-sm text-gray-400 mt-2">
              Select a file from the sidebar to start editing.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Editor;
