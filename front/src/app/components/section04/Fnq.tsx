"use client";

import { faqData } from "@/app/datas/FaqData";
import { useState } from "react";

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>("faq-04");

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#faf7f2] py-20">
      {/* Grain Texture */}
      <div
        className="
          absolute inset-0
          bg-[url('/grain-beige.png')]
          bg-repeat
          opacity-[0.06]
          mix-blend-multiply
          pointer-events-none
        "
      />

      <div className="relative z-10 mx-auto max-w-275 px-4">
        {/* 제목 */}
        <div className="text-center">
          <h2 className=" flex justify-center gap-2 md:flex-row flex-col text-3xl font-extrabold text-zinc-900 md:text-4xl">
            <p>자주묻는 질문을</p>
            <p>한곳에 모아봤어요!</p>
          </h2>

          <p className="mt-3 text-base text-zinc-500 md:text-lg">
            수강 전 많이 궁금해하시는 내용을 정리했습니다
          </p>
        </div>

        {/* FAQ 리스트 */}
        <div className="mt-10 space-y-4">
          {faqData.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className="
                  rounded-2xl
                  bg-white/80
                  px-5
                  py-5
                  shadow-sm
                  backdrop-blur-sm
                "
              >
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  className="flex w-full items-center gap-4 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`panel-${item.id}`}
                >
                  {/* Q 뱃지 */}
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 font-extrabold text-white">
                    Q
                  </span>

                  {/* 질문 */}
                  <span className="flex-1 text-lg font-extrabold text-zinc-900 md:text-xl">
                    {item.question}
                  </span>

                  {/* 화살표 */}
                  <span
                    className={`text-zinc-500 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                    aria-hidden="true"
                  >
                    ▼
                  </span>
                </button>

                {/* 답변 */}
                <div
                  id={`panel-${item.id}`}
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "mt-4 grid-rows-[1fr]" : "mt-0 grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pl-14 pr-2 text-sm leading-relaxed text-zinc-600 md:text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}