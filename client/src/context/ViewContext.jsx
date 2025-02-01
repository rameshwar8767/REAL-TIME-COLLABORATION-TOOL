/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import ChatsView from "../component/sidebar/sidebar-views/ChatsView";
import FilesView from "../component/sidebar/sidebar-views/FilesView";
import RunView from "../component/sidebar/sidebar-views/RunView";
import SettingsView from "../component/sidebar/sidebar-views/SettingsView";
import UsersView from "../component/sidebar/sidebar-views/UsersView";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { VIEWS, ViewContext as ViewContextType } from "../types/view";
import { createContext, useContext, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { LuFiles } from "react-icons/lu";
import { PiChats, PiPlay, PiUsers } from "react-icons/pi";

const ViewContext = createContext(null);

export const useViews = () => {
    const context = useContext(ViewContext);
    if (!context) {
        throw new Error("useViews must be used within a ViewContextProvider");
    }
    return context;
};

function ViewContextProvider({ children }) {
    const { isMobile } = useWindowDimensions();
    const [activeView, setActiveView] = useState(VIEWS.FILES);
    const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

    const viewComponents = {
        [VIEWS.FILES]: <FilesView />,
        [VIEWS.CLIENTS]: <UsersView />,
        [VIEWS.SETTINGS]: <SettingsView />,
        [VIEWS.CHATS]: <ChatsView />,
        [VIEWS.RUN]: <RunView />,
    };

    const viewIcons = {
        [VIEWS.FILES]: <LuFiles size={28} />,
        [VIEWS.CLIENTS]: <PiUsers size={30} />,
        [VIEWS.SETTINGS]: <IoSettingsOutline size={28} />,
        [VIEWS.CHATS]: <PiChats size={30} />,
        [VIEWS.RUN]: <PiPlay size={28} />,
    };

    return (
        <ViewContext.Provider
            value={{
                activeView,
                setActiveView,
                isSidebarOpen,
                setIsSidebarOpen,
                viewComponents,
                viewIcons,
            }}
        >
            {children}
        </ViewContext.Provider>
    );
}

export { ViewContextProvider };
export default ViewContext;
