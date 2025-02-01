
const PricingSection = () => {
  return (
    <section className="py-16 px-6 md:px-12 ">
      <div className="max-w-screen-lg mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-purple-400">
        <span className="bg-clip-text text-transparent  bg-gradient-to-r from-white via-slate-300 to-gray-500">Affordable Pricing</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">



          <div className="bg-gray-800 p-6 rounded-lg shadow-lg transition duration-500 hover:scale-105 group">
            <h3 className="text-2xl font-bold mb-4 text-white ">Free</h3>
            <p className="text-lg mb-4 text-gray-300">Ideal for individuals starting with real-time collaboration.</p>
            <p className="text-4xl font-bold mb-6 text-white">$0</p>
            <button className="border-2 text-white py-3 px-6 rounded-lg group-hover:border-gray-400 transition duration-300">
              Get Started
            </button>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg transition duration-500 hover:scale-105 group">
            <h3 className="text-2xl font-bold mb-4 text-white ">Pro</h3>
            <p className="text-lg mb-4 text-gray-300">For teams looking for enhanced collaboration features.</p>
            <p className="text-4xl font-bold mb-6 text-white">$9/mo</p>
            <button className="border-2 text-white py-3 px-6 rounded-lg group-hover:border-gray-400 transition duration-300">
              Get Started
            </button>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg transition duration-500 hover:scale-105 group">
            <h3 className="text-2xl font-bold mb-4 text-white ">Enterprise</h3>
            <p className="text-lg mb-4 text-gray-300">Advanced features for large-scale teams and organizations.</p>
            <p className="text-4xl font-bold mb-6 text-white flex justify-center invisible">free space</p>
            <button className="border-2 text-white py-3 px-6 rounded-lg group-hover:border-gray-400 transition duration-300">
            Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
