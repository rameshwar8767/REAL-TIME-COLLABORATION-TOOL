
const LiveDemoSection = () => {
  return (
    <section className="py-16 px-6 md:px-12  text-center ">
      <div className="max-w-screen-lg mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 ">
          <span className="bg-clip-text text-transparent  bg-gradient-to-r from-white via-slate-300 to-gray-500">Try Our Live Demo</span>
        </h2>
        <p className="text-lg md:text-xl mb-8 text-gray-300">
          Experience CodeSync in action. See how seamless collaboration can be!
        </p>
        <button className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
          Launch Live Demo
        </button>
      </div>
    </section>
  );
};

export default LiveDemoSection;
