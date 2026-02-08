import HeroSection from "./components/section01/HeroSection";
import Field from "./components/section02/Field";
import Filed from "./components/section02/Field";
import Recommend from "./components/section03/Recommend";
import Benefit from "./components/section05/Benefit";
import FAQSection from "./components/section04/Fnq";

import Footer from "./Footer";
import RecommendForm from "./components/section06/RecommendForm";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <HeroSection/>
      <Field/>
      <Recommend/>
      <FAQSection/>
      <Benefit/>
      <RecommendForm/>
      <Footer/>
    </div>
  );
}
