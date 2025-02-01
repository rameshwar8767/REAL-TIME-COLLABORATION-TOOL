/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { ChatContext as ChatContextType, ChatMessage } from "../types/chat";
import { SocketEvent } from "../types/socket";
import { useSocket } from "./SocketContext";

const ChatContext = createContext(null)

export const useChatRoom = () => {
    const context = useContext(ChatContext)
    if (!context) {
        throw new Error("useChatRoom must be used within a ChatContextProvider")
    }
    return context
}

function ChatContextProvider({ children }) {
    const { socket } = useSocket()
    const [messages, setMessages] = useState([])
    const [isNewMessage, setIsNewMessage] = useState(false)
    const [lastScrollHeight, setLastScrollHeight] = useState(0)

    useEffect(() => {
        socket.on(
            SocketEvent.RECEIVE_MESSAGE,
            ({ message }) => {
                setMessages((messages) => [...messages, message])
                setIsNewMessage(true)
            },
        )
        return () => {
            socket.off(SocketEvent.RECEIVE_MESSAGE)
        }
    }, [socket])

    return (
        <ChatContext.Provider
            value={{
                messages,
                setMessages,
                isNewMessage,
                setIsNewMessage,
                lastScrollHeight,
                setLastScrollHeight,
            }}
        >
            {children}
        </ChatContext.Provider>
    )
}

export { ChatContextProvider }
export default ChatContext