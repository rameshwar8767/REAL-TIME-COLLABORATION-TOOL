/* eslint-disable react/prop-types */
import { useChatRoom } from "../../../context/ChatContext"
import { useViews } from "../../../context/ViewContext"
import { VIEWS } from "../../../types/view"



const ViewButton = ({ viewName, icon }) => {
    const { activeView, setActiveView, isSidebarOpen, setIsSidebarOpen } =
        useViews()
    const { isNewMessage } = useChatRoom()

    const handleViewClick = (viewName) => {
        if (viewName === activeView) {
            setIsSidebarOpen(!isSidebarOpen)
        } else {
            setIsSidebarOpen(true)
            setActiveView(viewName)
        }
    }

    return (
        <button
            onClick={() => handleViewClick(viewName)}
            className="relative flex items-center justify-center"
        >
            {icon}
            {/* Show dot for new message in chat View Button */}
            {viewName === VIEWS.CHATS && isNewMessage && (
                <div className="absolute right-0 top-0 h-3 w-3 rounded-full bg-primary"></div>
            )}
        </button>
    )
}

export default ViewButton
