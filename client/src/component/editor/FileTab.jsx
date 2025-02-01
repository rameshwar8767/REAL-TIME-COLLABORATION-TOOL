
// import { useFileSystem } from "../../context/FileContext";
// import { getIconClassName } from "../../utils/getIconClassName";
// import { IoClose } from "react-icons/io5";
// import cn from "classnames";
// import { useEffect, useRef } from "react";
// import customMapping from "../../utils/customMapping";
// import { useSettings } from "../../context/SettingContext";
// import langMap from "lang-map";
// import { Icon } from "@iconify/react";



// function FileTab() {
//   const { openFiles, closeFile, activeFile, updateFileContent, setActiveFile } =
//     useFileSystem();
//   const fileTabRef = useRef(null);
//   const { setLanguage } = useSettings();

//   const changeActiveFile = (fileId) => {
//     // If the file is already active, do nothing
//     if (activeFile?.id === fileId) return;

//     updateFileContent(activeFile?.id || "", activeFile?.content || "");

//     const file = openFiles.find((file) => file.id === fileId);
//     if (file) {
//       setActiveFile(file);
//     }
//   };

//   useEffect(() => {
//     const fileTabNode = fileTabRef.current;
//     if (!fileTabNode) return;

//     const handleWheel = (e) => {
//       if (e.deltaY > 0) {
//         fileTabNode.scrollLeft += 100;
//       } else {
//         fileTabNode.scrollLeft -= 100;
//       }
//     };

//     fileTabNode.addEventListener("wheel", handleWheel);

//     return () => {
//       fileTabNode.removeEventListener("wheel", handleWheel);
//     };
//   }, []);

//   // Update the editor language when a file is opened
//   useEffect(() => {
//     if (activeFile?.name === undefined) return;
//     // Get file extension on file open and set language when file is opened
//     const extension = activeFile.name.split(".").pop();
//     if (!extension) return;

//     // Check if custom mapping exists
//     if (customMapping[extension]) {
//       setLanguage(customMapping[extension]);
//       return;
//     }

//     const language = langMap.languages(extension);
//     setLanguage(language[0]);
//   }, [activeFile?.name, setLanguage]);

//   return (
//     <div
//       className="flex h-[50px] w-full select-none gap-2 p-2 pb-0"
//       ref={fileTabRef}
//     >
//       {openFiles.map((file) => (
//         <span
//           key={file.id}
//           className={cn(
//             "flex w-fit cursor-pointer items-center rounded-t-md px-2 py-1 text-white",
//             { "bg-darkHover": file.id === activeFile?.id }
//           )}
//           onClick={() => changeActiveFile(file.id)}
//         >
//           <Icon
//             icon={getIconClassName(file.name)}
//             fontSize={22}
//             className="mr-2 min-w-fit"
//           />
//           <p
//             className="flex-grow cursor-pointer overflow-hidden truncate"
//             title={file.name}
//           >
//             {file.name}
//           </p>
//           <IoClose
//             className="ml-3 inline rounded-md hover:bg-darkHover"
//             size={20}
//             onClick={(e) => {
//               e.stopPropagation(); // Prevent click from triggering the file change
//               closeFile(file.id);
//             }}
//           />
//         </span>
//       ))}
//     </div>
//   );
// }

// export default FileTab;


import { FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {closeFile,openFile} from "../../Redux/Slices/File.slice"
const FileTabs = () => {

  const dispatch = useDispatch();
 
    const FileClose = (fileName) => {
      dispatch(closeFile({fileId: fileName?.id}))
    };

    const handleFileCLick = (file)=>{
      dispatch(openFile({file}))
    }

  const {openFiles,activeFile} = useSelector((state)=> state.file)
  return (
    <div className="flex bg-zinc-900 text-white border-b border-gray-700 mt-0 py-4 pb-0
    overflow-x-auto no-scrollbar pl-1 h-12">
      {openFiles?.map((file) => (
        <div
          key={file?.id}
          className={`flex items-center p-2 pr-4 cursor-pointer ${
            activeFile.id === file.id ? ' bg-gray-600 rounded-t' :''
          }`
       }
       onClick={() => handleFileCLick(file)}
        >
          <span className="text-sm mr-2 text-white">{file.name}</span>
          <FaTimes
            className="text-xs cursor-pointer hover:text-red-500"
            onClick={(e) => {
              e.stopPropagation();
              FileClose(file);
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default FileTabs;
