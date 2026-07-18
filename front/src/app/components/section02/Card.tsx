import { SectionTwoCardProps } from "../../../Types/CardType";
// 커밋을 위한 주석
export default function Card({
  imageSrc,
  title,
  subtitle,
  description,
}: SectionTwoCardProps) {
  return (
    <article className="w-full rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm lg:p-7">
      {/* 모바일/태블릿: 세로 */}
      {/* lg 이상: 가로 */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-7">
        
        {/* Image */}
        <div className="w-full lg:w-[220px] lg:flex-shrink-0">
          <div className="relative overflow-hidden rounded-xl bg-zinc-100">
            <img
              src={imageSrc}
              alt={title}
              className="
                h-[200px]
                w-full
                object-cover
                lg:h-[180px]
                lg:w-[220px]
              "
              loading="lazy"
            />
          </div>
        </div>

        {/* Text */}
        <div className="flex min-w-0 flex-col gap-2 lg:h-[180px] lg:justify-center">
          <h3 className="text-lg font-extrabold tracking-tight text-zinc-900 lg:text-xl">
            {title}
          </h3>

          <p className="text-sm font-semibold text-zinc-800 lg:text-base">
            {subtitle}
          </p>

          <p className="text-sm leading-relaxed text-zinc-600 lg:text-base">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}