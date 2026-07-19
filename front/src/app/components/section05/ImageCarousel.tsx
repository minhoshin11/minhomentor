"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { reviewData } from "@/app/datas/ReviewData";

export default function Carousel() {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
    },
    [
      Autoplay({
        delay: 5000,
        stopOnInteraction: false,
      }),
    ]
  );

  return (
    <section className="w-full bg-[#faf7f2] px-20 pt-10 pb-30">
      <div className="flex flex-col items-center ">
        <h2 className="text-4xl  flex font-bold">
          결과로 증명하는 멘토링
        </h2>
        <p className="mt-3 text-base text-zinc-500 md:text-lg">
            실제 수강생들의 수상이력 및 합격 후기입니다.
          </p>
      
        <div
          ref={emblaRef}
          className="w-full max-w-7xl overflow-hidden mt-10"
        >
          <div className="flex">
            {reviewData.map((review) => (
              <div
                key={review.id}
                className="basis-1/2 shrink-0 px-4"
              >
                <div className="relative h-[900px] w-full overflow-hidden rounded-2xl bg-black">
                  
                  {/* 상단 뱃지 */}
                  <div className="absolute left-5 top-5 z-10 rounded-full border-2 border-teal-600 bg-zinc-900/90 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
                    {review.text}
                  </div>

                  <Image
                    src={review.image}
                    alt={review.text}
                    fill
                    priority={review.id <= 2}
                    className="object-contain p-4"
                    sizes="50vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}