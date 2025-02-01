/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import  { useState } from "react";
import { VscDebugStart } from "react-icons/vsc";
import instance from './../../../api/index';
import { useSelector } from 'react-redux';
import { RunCode } from './../../../Helpers/RunCode';
import { toast } from 'react-hot-toast';
const RunView = ({ language }) => {
  const [customInput, setCustomInput] = useState("");
  const [output, setOutput] = useState("");
  const {activeFile} = useSelector((state)=> state.file)

  const executeCode = async (payload) => {
    try {
        const response = await instance.post("/execute", payload);
        if (response.data.run.stderr) {
          setOutput(response.data.run.stderr)
          toast.dismiss()
      } else {
          setOutput(response.data.run.stdout)
          toast.dismiss()
      }
    } catch (error) {
        setOutput("Error executing code:", error.response?.data || error.message)
    }
};
  const handleRunCode = async () => {
    toast.loading("Code Running")
    const payload = await RunCode(activeFile)
  
    if(payload.length == 0){
      toast.dismiss()
      toast.error("Language Not supported");
      
    }
    
    const data = {
      language : payload[0]?.language,
      version : payload[0]?.version,
      compile_timeout: 10000,
      run_timeout: 3000,
      files: [
        {
          name: activeFile?.name,
          content:activeFile?.content
        }
      ],
      stdin:customInput
    }
    console.log(data)
   executeCode(data)
  };

  return (
    <div className="flex flex-col w-full h-full text-white p-4 rounded-md 
    ">

       <div className="flex w-full gap-2 text-lg  items-center ">
       <h1 > Run Code</h1>
       <VscDebugStart className="w-6 h-6" />
       </div>
      {/* Custom Input */}

      <div className="mt-12">
        <label className="block text-md font-medium text-gray-300 mb-2">
          Custom Input
        </label>
        <textarea
          className="w-full h-40 p-2 rounded bg-black text-white focus:ring-2 focus:ring-blue-500 overflow-auto no-scrollbar"
          rows="4"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          placeholder="Enter custom input..."
        ></textarea>
      </div>
      {/* Run Button */}
      <div className="text-center mt-4">
        <button
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-medium"
          onClick={handleRunCode}
        >
          Run Code
        </button>
      </div>

      {/* Output Section */}
      <div className="mt-8"> 
        <label className="block text-md font-medium text-gray-300 mb-2">
          Output
        </label>
        <div className="w-full p-4 rounded bg-black text-white whitespace-pre-wrap h-40 overflow-auto no-scrollbar">
          {output || "Output will appear here..."}
        </div>
      </div>
    </div>
  );
};

export default RunView;
