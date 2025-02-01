/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import  {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const SettingContext = createContext(null)

export const useSettings = () => {
    const context = useContext(SettingContext)
    if (!context) {
        throw new Error(
            "useSettings must be used within a SettingContextProvider",
        )
    }
    return context
}

const defaultSettings = {
    theme: "Dracula",
    language: "Javascript",
    fontSize: 16,
    fontFamily: "Space Mono",
    showGitHubCorner: true,
}

function SettingContextProvider({ children }) {
    const { getItem } = useLocalStorage()
    const storedSettings = JSON.parse(
        getItem("settings") || "{}",
    )
    const storedTheme =
        storedSettings.theme !== undefined
            ? storedSettings.theme
            : defaultSettings.theme
    const storedLanguage =
        storedSettings.language !== undefined
            ? storedSettings.language
            : defaultSettings.language
    const storedFontSize =
        storedSettings.fontSize !== undefined
            ? storedSettings.fontSize
            : defaultSettings.fontSize
    const storedFontFamily =
        storedSettings.fontFamily !== undefined
            ? storedSettings.fontFamily
            : defaultSettings.fontFamily
    const storedShowGitHubCorner =
        storedSettings.showGitHubCorner !== undefined
            ? storedSettings.showGitHubCorner
            : defaultSettings.showGitHubCorner

    const [theme, setTheme] = useState(storedTheme)
    const [language, setLanguage] = useState(storedLanguage)
    const [fontSize, setFontSize] = useState(storedFontSize)
    const [fontFamily, setFontFamily] = useState(storedFontFamily)
    const [showGitHubCorner, setShowGitHubCorner] = useState(
        storedShowGitHubCorner,
    )

    const resetSettings = () => {
        setTheme(defaultSettings.theme)
        setLanguage(defaultSettings.language)
        setFontSize(defaultSettings.fontSize)
        setFontFamily(defaultSettings.fontFamily)
        setShowGitHubCorner(defaultSettings.showGitHubCorner)
    }

    useEffect(() => {
        // Save settings to local storage whenever they change
        const updatedSettings = {
            theme,
            language,
            fontSize,
            fontFamily,
            showGitHubCorner,
        }
        localStorage.setItem("settings", JSON.stringify(updatedSettings))
    }, [theme, language, fontSize, fontFamily, showGitHubCorner])

    return (
        <SettingContext.Provider
            value={{
                theme,
                setTheme,
                language,
                setLanguage,
                fontSize,
                setFontSize,
                fontFamily,
                setFontFamily,
                showGitHubCorner,
                setShowGitHubCorner,
                resetSettings,
            }}
        >
            {children}
        </SettingContext.Provider>
    )
}

export { SettingContextProvider }
export default SettingContext 