/* eslint-disable react/prop-types */
import Avatar from "react-avatar";
import { useSelector } from 'react-redux';

function Users() {
   const {users} = useSelector((state)=> state.room)

    return (
        <div className="flex min-h-[200px] flex-grow justify-center overflow-y-auto py-2 mt-2">
            <div className="flex h-full w-full flex-wrap items-start gap-x-2 gap-y-6">
                {users.map((user) => (
                    <User key={user.socketId} user={user} />
                ))}
            </div>
        </div>
    );
}

const User = ({ user }) => {
    const { username, status } = user;
    const title = `${username} - ${status === "ONLINE" ? "online" : "offline"}`;

    return (
        <div
            className="relative flex w-[100px] flex-col items-center gap-2"
            title={title}
        >
            <Avatar name={username} size="50" round={"12px"} title={title} />
            <p className="line-clamp-2 max-w-full text-ellipsis break-words text-white">
                {username}
            </p>
            <div
                className={`absolute right-5 top-0 h-3 w-3 rounded-full ${
                    status === "ONLINE" ? "bg-green-500" : "bg-danger"
                }`}
            ></div>
        </div>
    );
};

export default Users;
