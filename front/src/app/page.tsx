import HeroSection from "./components/section01/HeroSection";
import Field from "./components/section02/Field";
import Filed from "./components/section02/Field";
import Recommend from "./components/section03/Recommend";
import Benefit from "./components/section04/Benefit";
import FAQSection from "./components/section05/Fnq";
import Fnq from "./components/section05/Fnq";
import CheckTuition from "./components/section06/CheckTuition";
import Footer from "./Footer";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <HeroSection/>
      <Field/>
      <Recommend/>
      <Benefit/>
      <FAQSection/>
      <CheckTuition/>
      <Footer/>
    </div>
  );
}
