"use client";

import { useEffect, useState } from "react";

const images = [
  "/reviews/01.png",
  "/reviews/02.png",
  "/reviews/03.png",
  "/reviews/04.png",
];

export default function ImageCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  return (
    <section className="w-full bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* 제목 */}
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold text-zinc-900">
            수강생 작품 포트폴리오
          </h2>

          <p className="mt-3 text-zinc-500">
            실제 수강생들의 작품을 확인해보세요.
          </p>
        </div>

        {/* 캐러셀 */}
        <div className="relative w-full h-20 rounded-3xl bg-zinc-200 shadow-2xl">
        <div className="relative w-full overflow-hidden bg-zinc-100">
      <div className="flex h-full w-full items-center justify-center">
        <img
      src={images[current]}
      alt=""
      className="max-h-full max-w-full object-contain"
    />
  </div>
</div>
          {/* 이전 */}
          <button
            type="button"
            onClick={prevSlide}
            className="absolute left-5 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/60 px-4 py-3 text-white"
          >
            ←
          </button>

          {/* 다음 */}
          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-5 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/60 px-4 py-3 text-white"
          >
            →
          </button>

          {/* 페이지 표시 */}
          <div className="absolute right-5 top-5 z-20 rounded-full bg-black/60 px-4 py-2 text-sm text-white">
            {current + 1} / {images.length}
          </div>

          {/* 인디케이터 */}
          <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-3 w-3 rounded-full ${
                  current === idx
                    ? "bg-white"
                    : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}