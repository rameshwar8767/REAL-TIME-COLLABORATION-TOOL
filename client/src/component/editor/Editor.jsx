import { useAppContext } from "../../context/AppContext";
import { useFileSystem } from "../../context/FileContext";
import { useSettings } from "../../context/SettingContext";
import { useSocket } from "../../context/SocketContext";
import usePageEvents from "../../hooks/usePageEvents";
import useResponsive from "../../hooks/useResponsive";
import { editorThemes } from "../../resources/Themes";
import { color } from "@uiw/codemirror-extensions-color";
import { hyperLink } from "@uiw/codemirror-extensions-hyper-link";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import CodeMirror, { scrollPastEnd } from "@uiw/react-codemirror";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { cursorTooltipBaseTheme, tooltipField } from "./tooltip";
import { SocketEvent } from "../../types/socket";

function Editor() {
    const { users, currentUser } = useAppContext();
    const { activeFile, setActiveFile } = useFileSystem();
    const { theme, language, fontSize } = useSettings();
    const { socket } = useSocket();
    const { viewHeight } = useResponsive();
    const [timeOut, setTimeOut] = useState(setTimeout(() => {}, 0));

    // Filter users to exclude the current user
    const filteredUsers = useMemo(
        () => users.filter((u) => u.username !== currentUser.username),
        [users, currentUser]
    );

    const [extensions, setExtensions] = useState([]);

    // Handle code change event
    const onCodeChange = (code, view) => {
        if (!activeFile) return;

        const file = { ...activeFile, content: code };
        setActiveFile(file);

        const cursorPosition = view.state?.selection?.main?.head;
        socket.emit(SocketEvent.TYPING_START, { cursorPosition });
        socket.emit(SocketEvent.FILE_UPDATED, {
            fileId: activeFile.id,
            newContent: code,
        });
        
        clearTimeout(timeOut);

        const newTimeOut = setTimeout(
            () => socket.emit(SocketEvent.TYPING_PAUSE),
            1000
        );
        setTimeOut(newTimeOut);
    };

    // Apply page event listeners to handle zoom and prevent page reload
    usePageEvents();

    useEffect(() => {
        const extensionsArray = [
            color,
            hyperLink,
            tooltipField(filteredUsers),
            cursorTooltipBaseTheme,
            scrollPastEnd(),
        ];

        const langExt = loadLanguage(language.toLowerCase());
        if (langExt) {
            extensionsArray.push(langExt);
        } else {
            toast.error(
                "Syntax highlighting is unavailable for this language. Please adjust the editor settings; it may be listed under a different name.",
                { duration: 5000 }
            );
        }

        setExtensions(extensionsArray);
    }, [filteredUsers, language]);

    return (
        <CodeMirror
            theme={editorThemes[theme]}
            onChange={onCodeChange}
            value={activeFile?.content || ""}
            extensions={extensions}
            minHeight="100%"
            maxWidth="100vw"
            style={{
                fontSize: fontSize + "px",
                height: viewHeight,
                position: "relative",
            }}
            className="mt-2"
        />
    );
}

export default Editor;
