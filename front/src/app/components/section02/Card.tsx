import { SectionTwoCardProps } from "../../../Types/CardType";

export default function Card({
  imageSrc,
  title,
  subtitle,
  description,
}: SectionTwoCardProps) {
  return (
      <article className="w-full rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm md:p-7">
      {/* 모바일: 세로(사진->글), md: 가로(사진|글) */}
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-7">
        {/* Image */}
        <div className="w-full md:w-[220px] md:flex-shrink-0">
          <div className="relative overflow-hidden rounded-xl bg-zinc-100">
            <img
              src={imageSrc}
              alt={title}
              className="h-[200px] w-full object-cover md:h-[180px] md:w-[220px]"
              loading="lazy"
            />
          </div>
        </div>

        {/* Text */}
        <div className="flex min-w-0 flex-col gap-2 md:h-[180px] md:justify-center">
          <h3 className="text-lg font-extrabold tracking-tight text-zinc-900 md:text-xl">
            {title}
          </h3>

          <p className="text-sm font-semibold text-zinc-800 md:text-base">
            {subtitle}
          </p>

          <p className="text-sm leading-relaxed text-zinc-600 md:text-base">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}
