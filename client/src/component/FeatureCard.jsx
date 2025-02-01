/* eslint-disable react/prop-types */
const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="flex items-start gap-4 bg-gray-800 shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
      <div className="text-4xl flex items-center ">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
