import HeroSection from "@/app/components/section01/HeroSection";
import Field from "@/app/components/section02/Field";
import Recommend from "@/app/components/section03/Recommend";
import FaqSection from "@/app/components/section04/Fnq";
import BenefitSection from "@/app/components/section06/Benefit";
import RecommendForm from "@/app/components/section07/RecommendForm";
import { mentorData } from "@/app/datas/mentor";
import NotFoundMentor from "./not-found";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const mentor =
    mentorData[id as keyof typeof mentorData];

  if (!mentor) {
    return <NotFoundMentor />;
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

      <Field />
      <Recommend />
      <FaqSection />
      <BenefitSection />
      <RecommendForm />
    </div>
  );
}