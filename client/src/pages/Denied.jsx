import { useNavigate } from "react-router-dom";
import Layout from "./../layout/Layout";

function Denied() {
  const navigate = useNavigate();

  return (
    <Layout>
      <main className="flex flex-col items-center justify-center w-full h-screen bg-gray-900 text-white">
        {/* Error Code */}
        <div className="text-center mb-8">
          <h1 className="text-9xl font-extrabold text-red-600 drop-shadow-lg">
            403
          </h1>
          <h2 className="mt-4 text-3xl font-semibold text-gray-200">
            Access Denied
          </h2>
          <p className="mt-2 text-lg text-gray-400">
            You don’t have the necessary permissions to view this page. <br />
            Please log in or contact the administrator.
          </p>
        </div>

        {/* Illustration */}
        {/* <div className="mb-12">
          <img
            src="/assets/denied-illustration.svg" // Replace with your illustration URL
            alt="Access Denied"
            className="w-64 h-64"
          />
        </div> */}

        {/* Call-to-Action Buttons */}
        <div className="flex gap-6">
          <button
            onClick={() => navigate("/auth")}
            className="px-8 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Log In
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-3 text-lg font-medium text-gray-800 bg-gray-300 rounded-lg shadow-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            Go Back
          </button>
        </div>
      </main>
    </Layout>
  );
}

export default Denied;
