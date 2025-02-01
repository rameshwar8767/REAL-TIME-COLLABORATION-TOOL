
import FeatureCard from './FeatureCard';
import { FaLaptopCode, FaComments, FaGlobe, FaHistory } from 'react-icons/fa';

const FeaturesSection = () => {
  return (
    <section className="py-16 px-6 md:px-12 
    
     ">
      <div className="max-w-screen-lg mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gradient-to-r from-slate-400 to-slate-700">
          <span className="bg-clip-text text-transparent  bg-gradient-to-r from-white via-slate-300 to-gray-500">Why CodeSync?</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FeatureCard
            icon={<FaLaptopCode className="text-white " />}
            title="Real-time Collaboration"
            description="Collaborate live with a shared code environment."
          />
          <FeatureCard
            icon={<FaComments className="text-blue-500" />}
            title="Integrated Communication"
            description="Seamlessly integrate video calls and chats."
          />
          <FeatureCard
            icon={<FaGlobe className="text-blue-300" />}
            title="Multi-language Support"
            description="Supports multiple programming languages."
          />
          <FeatureCard
            icon={<FaHistory className="text-white" />}
            title="Code History & Control"
            description="Track changes and control versions of your code."
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

