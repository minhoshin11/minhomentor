"use client";

import { faqData } from "@/app/datas/FaqData";
import { useState } from "react";


export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>("faq-04"); // 기본으로 하나 열고 싶으면 id, 아니면 null

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-full py-20">
      <div className="mx-auto px-4 max-w-275">
        {/* 제목 */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-zinc-900 md:text-4xl">
            자주묻는 질문을<br className="md:hidden" /> 한곳에 모아봤어요!
          </h2>
          <p className="mt-3 text-base text-zinc-500 md:text-lg">
            수강 전 많이 궁금해하시는 내용을 정리했습니다
          </p>
        </div>

        {/* 리스트 */}
        <div className="mt-10 space-y-4">
          {faqData.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className="rounded-2xl bg-zinc-100/80 px-5 py-5 shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  className="flex w-full items-center gap-4 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`panel-${item.id}`}
                >
                  {/* Q 뱃지 */}
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 text-white font-extrabold">
                    Q
                  </span>

                  {/* 질문 */}
                  <span className="flex-1 text-lg font-extrabold text-zinc-900 md:text-xl">
                    {item.question}
                  </span>

                  {/* 토글 아이콘 */}
                  <span
                    className={`text-zinc-500 transition-transform ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                    aria-hidden="true"
                  >
                    ▼
                  </span>
                </button>

                {/* 답변 (토글) */}
                <div
                  id={`panel-${item.id}`}
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] mt-4" : "grid-rows-[0fr] mt-0"
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
