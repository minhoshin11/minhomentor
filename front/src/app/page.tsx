import HeroSection from "./components/section01/HeroSection";
import Field from "./components/section02/Field";
import Filed from "./components/section02/Field";
import Recommend from "./components/section03/Recommend";
import Benefit from "./components/section04/Benefit";
import Qna from "./components/section05/Qna";
import CheckTuition from "./components/section06/CheckTuition";
import Ask from "./components/section06/CheckTuition";
import Footer from "./Footer";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <HeroSection/>
      <Field/>
      <Recommend/>
      <Benefit/>
      <Qna/>
      <CheckTuition/>
      <Footer/>
    </div>
  );
}
