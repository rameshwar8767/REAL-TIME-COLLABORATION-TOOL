/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
    ACTIVITY_STATE,
    AppContext as AppContextType,
    
} from "../types/app";
import { RemoteUser, USER_STATUS, User } from "../types/user";
import React, { createContext, useContext, useState } from "react";

const AppContext = createContext(null)

export const useAppContext = () => {
    const context = useContext(AppContext)
    if (context === null) {
        throw new Error(
            "useAppContext must be used within a AppContextProvider",
        )
    }
    return context
}


function AppContextProvider({ children }) {
    const [users, setUsers] = useState([])
    const [status, setStatus] = useState(USER_STATUS.INITIAL)
    const [currentUser, setCurrentUser] = useState({
        username: "",
        roomId: "",
    })
    const [activityState, setActivityState] = useState(
        ACTIVITY_STATE.CODING,
    )

    const [drawingData, setDrawingData] = useState(null)

    return (
        <AppContext.Provider
            value={{
                users,
                setUsers,
                currentUser,
                setCurrentUser,
                status,
                setStatus,
                activityState,
                setActivityState,
                drawingData,
                setDrawingData,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export { AppContextProvider }
export default AppContext