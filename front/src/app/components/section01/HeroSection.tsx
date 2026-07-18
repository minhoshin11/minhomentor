type HeroSectionProps = {
  mentor: string;
  subTitle: string;
  title: string;
  description1: string;
  description2: string;
};

export default function HeroSection({
  mentor,
  subTitle,
  title,
  description1,
  description2,
}: HeroSectionProps) {
  return (
    <section className="relative h-[1080px] w-full overflow-hidden">
      {/* Background image */}
      <img
        src="/section01.png"
        alt={mentor}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div style={{paddingBottom : "20vh"}} className="relative z-10 flex h-full w-full items-center">
        <div className="mx-auto w-full max-w-6xl px-6">
          <p className="mb-3 text-xl font-medium text-white/90">
            {subTitle}
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-6xl">
            {title}
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 md:text-lg flex-col flex">
            <span>{description1}</span>
            <span>{description2}</span>
          </p>

          <div className="mt-8 flex gap-3">
            {/* <button className="rounded-xl border border-white/40 px-5 py-3 text-sm font-semibold text-white">
              후기 보기
            </button>

            <button className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black">
              상담 신청
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
}