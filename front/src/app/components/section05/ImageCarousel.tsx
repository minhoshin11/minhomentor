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
    <section className="w-full bg-[#faf7f2] px-4 pt-5 pb-25 md:px-20">
      <div className="flex flex-col items-center">
        <h2 className="text-center text-3xl font-bold md:text-4xl">
          결과로 증명하는 멘토링
        </h2>

        <p className="mt-3 text-center text-sm text-zinc-500 md:text-lg">
          실제 수강생들의 수상이력 및 합격 후기입니다.
        </p>

        <div
          ref={emblaRef}
          className="mt-10 w-full max-w-7xl overflow-hidden"
        >
          <div className="flex">
            {reviewData.map((review) => (
              <div
                key={review.id}
                className="basis-full shrink-0 px-2 md:basis-1/2 md:px-4"
              >
                <div className="relative h-[550px] w-full overflow-hidden rounded-2xl bg-black md:h-[900px]">
                  
                  {/* 상단 뱃지 */}
                  <div className="absolute left-4 top-4 z-10 rounded-full border-2 border-teal-600 bg-zinc-900/90 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md md:left-5 md:top-5 md:px-4 md:py-2 md:text-sm">
                    {review.text}
                  </div>

                  <Image
                    src={review.image}
                    alt={review.text}
                    fill
                    priority={review.id <= 2}
                    className="object-contain p-2 md:p-4"
                    sizes="(max-width: 768px) 100vw, 50vw"
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