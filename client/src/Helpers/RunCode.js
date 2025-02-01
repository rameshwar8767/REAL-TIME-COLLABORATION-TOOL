
import axiosInstance from "../api/index";
export const RunCode = async (activeFile) => {
  const languages = await axiosInstance.get("/runtimes");

  if (!activeFile) return "No file to Run";
console.log(languages)
const extension = activeFile.name.split(".").pop()
  const data = languages?.data.filter(
    (lang) =>   
        lang.aliases.includes(extension) &&
        lang.language == activeFile.language
)

return data;
};
