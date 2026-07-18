// BenefitSection.tsx
import { benefitData } from "@/app/datas/BenefitData";
import BenefitCard from "./BenefitCard";


export default function BenefitSection() {
  return (
    <section className="w-full py-20">
      <div className="mx-auto items-center px-4 py-10  flex flex-col justify-between gap-10">
        <h2 className="mb-10 flex flex-col gap-2 md:flex-row text-center text-3xl font-extrabold text-zinc-900 md:text-4xl">
        <p>지금 등록하면 받을 수 있는 </p>
        <p>특별 혜택!</p>
        </h2>



<div className="flex justify-between min-w-[275]">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {benefitData.map((item) => (
            <BenefitCard key={item.id} {...item} />
          ))}
        </div>
      </div>
</div>      
    </section>
  );
}
