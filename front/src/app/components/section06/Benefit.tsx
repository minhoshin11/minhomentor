import { benefitData } from "@/app/datas/BenefitData";
import BenefitCard from "./BenefitCard";

export default function BenefitSection() {
  return (
    <section className="relative w-full overflow-hidden py-10 pb-20">
      {/* 배경 이미지 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/gift.jpg')",
        }}
      />

      {/* 흰색 오버레이 */}
      <div className="absolute inset-0 bg-white/70" />

      {/* 콘텐츠 */}
      <div className="relative z-10 sm:mx-20 mx-5 flex flex-col items-center justify-between gap-10">
        <h2 className="mb-10 flex flex-col gap-2 text-center text-4xl font-extrabold text-zinc-900 md:flex-row">
          <p>지금 등록하면 받는</p>
          <p>특별 혜택!</p>
        </h2>

        <div className="flex justify-between w-full max-w-170 flex-col gap-4">    
            {benefitData.map((item) => (
              <BenefitCard key={item.id} {...item} />
            ))}
          
        </div>
      </div>
    </section>
  );
}