/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { editorThemes } from "./../../../resources/Themes";
import { editorFonts } from "./../../../resources/Fonts";
import { langNames } from "@uiw/codemirror-extensions-langs";
function Settings({
  theme,
  language,
  fontSize,
  fontFamily,
  setTheme,
  setLanguage,
  setFontFamily,
  setFontSize,
}) {
  return (
    <div
      className="flex flex-col w-full p-4 bg-zinc-800 text-white rounded-lg gap-6
    h-screen"
    >
      <h2 className="text-lg font-semibold">Settings</h2>
      <hr className="border-gray-600" />
      {/* Font Family */}
      <div
        className="flex flex-col justify-between gap-1
      w-full"
      >
        <label className="text-sm">Font Family</label>
        <div className="flex space-x-2 w-full">
          <select
            className="bg-gray-700 p-2 rounded text-white
            text-sm w-full mt-2"
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
          >
            {Object.entries(editorFonts).map(([key, value], index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
          <input
            type="number"
            className="w-12 bg-gray-700 p-2 rounded text-white
            text-sm mt-2"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Theme */}
      <div className="flex flex-col justify-between">
        <label className="text-sm">Theme</label>
        <select
          className="bg-gray-700 p-2 rounded w-full text-white
          text-sm mt-2"
          value={theme}
           onChange={(e) =>{
            setTheme(e.target.value) 
           }}
        >
          {Object.entries(editorThemes).map(([themeName]) => (
            <option key={themeName} value={themeName}>
              {themeName}
              
            </option>
          ))}
        </select>
      </div>

      {/* Language */}
      <div className="flex flex-col justify-between">
        <label className="text-sm">Language</label>
        <select
          className="bg-gray-700 p-2 rounded w-full text-white mt-2"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          {langNames.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      {/* Reset Button */}
      <div className="flex h-full w-full">
        <button
          className="w-full  bg-gray-700 py-2 rounded text-white hover:bg-gray-600 mt-auto "
          onClick={() => {
            setFontSize(16);
            setFontFamily("Space Mono");
            setTheme("Dracula");
            setLanguage("Javascript");
          }}
        >
          Reset to default
        </button>
      </div>
    </div>
  );
}

export default Settings;
