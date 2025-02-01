/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// src/components/Sidebar.js
import  { useState, useEffect } from 'react';
import FileExplorer from './sidebar-views/FilesView';
import SettingsView from './sidebar-views/SettingsView';
import RunView from './sidebar-views/RunView';
import UsersView from './sidebar-views/UsersView';

function Sidebar({theme,language,fontSize, fontFamily,setTheme,setLanguage,setFontFamily,setFontSize}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
    const [renderSectionWidth, setRenderSectionWidth] = useState(400); // Default render section width
    const [activeSection, setActiveSection] = useState("files");
    const iconWidth = 60; // Fixed width for the icons section
    const icons = [
        { emoji: "📂", label: "Files", section: "files" },
        { emoji: "👤", label: "Users", section: "Users" },
        { emoji: "▶️", label: "Run", section: "run" },
        { emoji: "💬", label: "Chat", section: "chat" },
        { emoji: "⚙️", label: "Settings", section: "settings" },
       
    ];

    // Automatically close sidebar on small screens
    useEffect(() => {
        const handleResize = () => {
            setIsSidebarOpen(window.innerWidth >= 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Toggle sidebar visibility for mobile screens
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Handle render section resizing
    const handleMouseDown = (e) => {
        const startX = e.clientX;
        const startWidth = renderSectionWidth;

        const handleMouseMove = (e) => {
            const newWidth = startWidth + (e.clientX - startX);
            if (newWidth >= 200 && newWidth <= 500) { // Min and max width for render section
                setRenderSectionWidth(newWidth);
            }
        };

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    // Render content based on active section
    const renderContent = () => {
        switch (activeSection) {
            case "files":
                return <FileExplorer />;
            case "run":
                return <RunView language={language}/>;
            case "chat":
                return <div className="text-white">Chat Section</div>;
            case "settings":
                return <SettingsView theme={theme} language={language} 
                fontSize={fontSize} fontFamily={fontFamily} setTheme={setTheme} setLanguage={setLanguage} setFontFamily={setFontFamily} setFontSize={setFontSize}/>;
            case "Users":
                return <UsersView/>;
            default:
                return <div className="text-white">Files Section</div>;
        }
    };

    return (
        <div className="flex h-full ">
            {/* Sidebar Icons Section */}

            <div
                style={{
                    width: isSidebarOpen ? iconWidth : iconWidth,
                    transition: "width 0.3s",        
                }}
                className="bg-zinc-900  h-full flex flex-col items-center py-4 relative border-r-2 border-gray-600"
            >
                {/* Toggle button for mobile screens */}
                <button
                    onClick={toggleSidebar}
                    className="absolute top-4 left-full bg-gray-700 text-white p-1 rounded-md md:hidden right-0"
                >
                    {isSidebarOpen ? "←" : "→"}
                </button>

                {/* Sidebar Icons */}
                    <>
                        {icons.map((icon) => (
                            <button
                                key={icon.section}
                                onClick={() => setActiveSection(icon.section)}
                                className="text-white text-2xl mb-4"
                                aria-label={icon.label}
                            >
                                {icon.emoji}
                            </button>
                        ))}
                    </>
            </div>

            {/* Render Section (Content) */}
            {isSidebarOpen && (    
                <div
                    style={{ width: renderSectionWidth, 
                        transition: "width 0.3s",
                        overflow: isSidebarOpen ? "visible" : "hidden",
                    } 
                }
               
                    className="relative  flex-shrink-0  bg-zinc-800 text-white min-w-44 h-screen w-full"
                >
                    {renderContent()}
                    {/* Resizer Handle */}
                    <div
                            onMouseDown={handleMouseDown}
                            className="absolute 
                            right-0  top-0 h-full w-1 cursor-col-resize bg-gray-600"
                        ></div>
                    
                </div>

            )}
        </div>
    );
}

export default Sidebar;
