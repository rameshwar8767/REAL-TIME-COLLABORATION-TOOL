
import Editor from './../component/Editor';
import Sidebar from './../component/sidebar/Sidebar';
import { useState, useEffect, useMemo } from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import { useNavigate ,useParams,useLocation} from 'react-router-dom';
import SocketEvent  from '../Action';
import {initializeSocket,setupSocketListeners} from '../Redux/Slices/Socket.Slice'
import { io } from 'socket.io-client'
function EditorPage() {
    const [fontSize, setFontSize] = useState(16);
    const [fontFamily, setFontFamily] = useState('Space Mono');
    const [theme, setTheme] = useState('Dracula');
    const [language, setLanguage] = useState('javascript');
    const currentUser = useSelector((state) => state.room.currentUser)
    const status = useSelector((state) => state.room.status)
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
    const socket = useMemo(
        () =>
            io(BACKEND_URL, {
                reconnectionAttempts: 1,
            }),
        [],
    )
   // const socket = useSelector((state)=> state.socket.socket);
    const navigate= useNavigate();
    const location = useLocation();
    const { roomId } = useParams()
    const dispatch = useDispatch()
    const username = useSelector((state)=> state.auth?.data?.username)
   // const [Socket, setSocket] = useState(socket);


   useEffect(() => {
    const handleNavigation = (e) => {
      // Check if user is navigating away (but not refreshing)
      if (e.currentTarget.location.pathname !== location.pathname) {
        socket.emit("disconnecting"); // Emit disconnecting on page navigation
      }
    };

    // Add event listener for page navigation
    window.addEventListener("beforeunload", handleNavigation);
    return () => {
      // Cleanup navigation logic
      window.removeEventListener("beforeunload", handleNavigation);
      socket.emit("disconnecting"); // Ensure disconnecting is emitted
    };
  }, [location]);

   useEffect(() => {
        dispatch(initializeSocket(socket))
  
}, []);
    useEffect(() => {
       
        
        if (username === undefined) {
            navigate("/", {
                state: { roomId },
            })
        } else
         if (roomId) {
            dispatch(setupSocketListeners());
            const user = { username, roomId }
            socket?.emit(SocketEvent.JOIN_REQUEST, user) // Emit socket event
        }
     
    }, [])
    return (
        <div className="flex h-screen"> 
           <Sidebar theme={theme} language={language} 
           fontSize={fontSize} fontFamily={fontFamily} setTheme={setTheme} setLanguage={setLanguage} setFontFamily={setFontFamily} setFontSize={setFontSize}/>
           <Editor theme={theme} language={language} 
           fontSize={fontSize} fontFamily={fontFamily}></Editor>
        </div>
    );
}

export default EditorPage;