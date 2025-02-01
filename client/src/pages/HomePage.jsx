import HeroSection from "./../component/HeroSection";
import FeaturesSection from "./../component/FeatureSection";
import LiveDemoSection from "./../component/LiveDemoSection";
import FooterSection from "./../component/FooterSection";
import PricingSection from "./../component/PricingSection";
import Layout from './../layout/Layout';
const HomePage = () => {
  return (
    <Layout>
     
      <div id="hero">
        <HeroSection />
      </div>
      <div id="features">
        <FeaturesSection />
      </div>
      <div id="demo">
        <LiveDemoSection />
      </div>
      <div id="pricing">
        <PricingSection />
      </div>
      <FooterSection />
    </Layout>
  );
};
export default HomePage;
