import HeroSection from "@/app/components/section01/HeroSection";
import Field from "@/app/components/section02/Field";
import Recommend from "@/app/components/section03/Recommend";
import FaqSection from "@/app/components/section04/Fnq";
import BenefitSection from "@/app/components/section05/Benefit";
import RecommendForm from "@/app/components/section06/RecommendForm";
import Footer from "@/app/Footer";


export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <HeroSection/>
      <Field/>
      <Recommend/>
      <FaqSection/>
      <BenefitSection/>
      <RecommendForm/>
      <Footer/>
    </div>
  );
}
