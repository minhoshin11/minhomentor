import HeroSection from "./components/section01/HeroSection";
import Field from "./components/section02/Field";
import Filed from "./components/section02/Field";
import Recommend from "./components/section03/Recommend";
import Benefit from "./components/section06/Benefit";
import FAQSection from "./components/section04/Fnq";

import Footer from "./Footer";
import RecommendForm from "./components/section07/RecommendForm";
import { mentorData } from "./datas/mentor";
import ImageCarousel from "./components/section05/ImageCarousel";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <HeroSection mentor={mentorData.minho.title}
      subTitle={mentorData.minho.subTitle}
      title={mentorData.minho.title}
      description1={mentorData.minho.description1}
      description2={mentorData.minho.description2}/>
      <Field/>
      <Recommend/>
      <FAQSection/>
      {/* <ImageCarousel/> */}
      <Benefit/>
      <RecommendForm/>
      <Footer/>
    </div>
  );
}
