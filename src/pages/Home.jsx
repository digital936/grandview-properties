import HeroSection from "../components/HeroSection";
import NewlyLaunched from "../components/NewlyLaunched";
import RentAHome from "../components/RentAHome";
import PromotionSection from "../components/PromotionSection";
import PostPropertySection from "../components/PostPropertySection";
import TopCities from "../components/TopCities";
import BenefitsSection from "../components/BenefitsSection";
import Footer from "../components/Footer";





const Home = () => {
  return (
    <>
      <HeroSection />
      <PromotionSection />
      <RentAHome />
      <NewlyLaunched />
      
      <PostPropertySection />
      <TopCities />
      <BenefitsSection />
      <Footer />
      
    </>
  );
};

export default Home;
