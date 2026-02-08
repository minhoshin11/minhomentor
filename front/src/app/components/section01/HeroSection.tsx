import React from 'react'

export default function HeroSection() {
  return (
     <section className="relative h-[1080px] w-full overflow-hidden">
      {/* Background image */}
      <img
        src="/section01.png"
        alt="메이크업샵 셀프 메이크업"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 flex h-full w-full items-center">
        <div className="mx-auto w-full max-w-6xl px-6">
          <p className="mb-3 text-xl font-medium text-white/90">
            올댓뷰티 아카데미 민호멘토
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-6xl">
            프로가 되는 <span className="text-white">확실한 방법</span>
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 md:text-lg flex-col flex">
            <span>처음 시작해도 프로가 되도록</span>
            <span>목데이터 민호멘토가 도와드립니다.</span>
          </p>

          <div className="mt-8 flex gap-3">
            
            <button className="rounded-xl border border-white/40 px-5 py-3 text-sm font-semibold text-white">
              후기 보기
            </button>
            <button className=" rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black">
              상담 신청
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
