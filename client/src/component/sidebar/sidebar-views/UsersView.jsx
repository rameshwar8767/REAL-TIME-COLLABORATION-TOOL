import Users from "../../common/Users"
import toast from "react-hot-toast"
import { GoSignOut } from "react-icons/go"
import { IoShareOutline } from "react-icons/io5"
import { LuCopy } from "react-icons/lu"
import { useNavigate } from "react-router-dom"

function UsersView() {
    const navigate = useNavigate()
    const copyURL = async () => {
        const url = window.location.href
        try {
            await navigator.clipboard.writeText(url)
            toast.success("URL copied to clipboard")
        } catch (error) {
            toast.error("Unable to copy URL to clipboard")
            console.log(error)
        }
    }

    const shareURL = async () => {
        const url = window.location.href
        try {
            await navigator.share({ url })
        } catch (error) {
            toast.error("Unable to share URL")
            console.log(error)
        }
    }

    const leaveRoom = () => {
        // socket.disconnect()
        // setStatus(USER_STATUS.DISCONNECTED)
        navigate("/", {
            replace: true,
        })
    }

    return (
        <div className="flex flex-col p-4 h-full w-full">
            <h1 className="p-4 border-b border-gray-100 text-lg">Users</h1>
            {/* List of connected users */}
            <Users />
            <div className="flex flex-col items-center gap-4 pt-4 mt-auto">
                <div className="flex w-full gap-4">
                    {/* Share URL button */}
                    <button
                        className="flex flex-grow items-center justify-center rounded-md text-white p-3 "
                        onClick={shareURL}
                        title="Share Link"
                    >
                        <IoShareOutline size={26} />
                    </button>
                    {/* Copy URL button */}
                    <button
                        className="flex flex-grow items-center justify-center rounded-md text-white p-3 "
                        onClick={copyURL}
                        title="Copy Link"
                    >
                        <LuCopy size={22} />
                    </button>
                    {/* Leave room button */}
                    <button
                        className="flex flex-grow items-center justify-center rounded-md bg-primary p-3 text-white"
                        onClick={leaveRoom}
                        title="Leave room"
                    >
                        <GoSignOut size={22} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UsersView
