type HeroSectionProps = {
  mentor: string;
  subTitle: string;
  title: string;
  description1: string;
  description2: string;
};
// 커밋을 위한 주석
export default function HeroSection({
  mentor,
  subTitle,
  title,
  description1,
  description2,
}: HeroSectionProps) {
  return (
    <section className="relative h-[1080px] w-full overflow-hidden">
      {/* Background images */}
      <img
        src="/section01.png"
        alt={mentor}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div style={{paddingBottom : "20vh"}} className="relative z-10 flex h-full w-full items-center">
        <div className="mx-auto w-full max-w-6xl px-6 pb-10">

          <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-6xl">
            {title}
          </h1>

          <p className="mt-4 max-w-xl leading-relaxed text-white/80 text-2xl font-semibold flex-col md:flex-row md:gap-2 flex mb-1">
            <span>{description1}</span>
            <span>{description2}</span>
          </p>
<p className="mb-3 text-lg font-bold text-white/60">
            {subTitle}
          </p>
          <div className="mt-8 flex gap-3">
          </div>
        </div>
      </div>
    </section>
  );
}