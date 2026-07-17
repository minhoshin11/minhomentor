
import HeroSection from "@/app/components/section01/HeroSection";
import Field from "@/app/components/section02/Field";
import Recommend from "@/app/components/section03/Recommend";
import FaqSection from "@/app/components/section04/Fnq";
import BenefitSection from "@/app/components/section05/Benefit";
import RecommendForm from "@/app/components/section06/RecommendForm";
import { mentorData } from "@/app/datas/mentor";
import Footer from "@/app/Footer";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const mentor =
    mentorData[id as keyof typeof mentorData];

  if (!mentor) {
    return <div>존재하지 않는 멘토입니다.</div>;
  }

  return (
    <div>
    <HeroSection
      mentor={mentor.mentorName}
      subTitle={mentor.subTitle}
      title={mentor.title}
      description1={mentor.description1}
      description2={mentor.description2}
    />
    <Field/>
          <Recommend/>
          <FaqSection/>
          <BenefitSection/>
          <RecommendForm/>
          <Footer/>
    </div>


  );
}