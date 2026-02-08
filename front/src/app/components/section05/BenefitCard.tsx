import { BenefitItem } from "../../../Types/CardType";



export default function BenefitCard({
  number,
  title,
  subtitle,
  iconSrc,
  iconAlt,
}: BenefitItem) {
  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-2xl
        border
        border-teal-500/70
        bg-white
        px-6
        py-3
        shadow-sm
      "
    >
      

      {/* Text */}
      <div className="flex justify-between min-w-115">
        <div className="space-y-1 flex flex-col gap-4 pt-2">
        <span
          className="
            inline-flex
            w-fit
            items-center
            justify-center
            rounded-full
            bg-teal-600
            px-4
            py-1.5
            text-sm
            font-extrabold
            tracking-wider
            text-white
          "
        >
          {number}
        </span>
        
          <p className="text-2xl font-extrabold text-zinc-900 px-1">{title}</p>
          {subtitle ? (
            <p className="text-2xl font-extrabold text-zinc-900">{subtitle}</p>
          ) : null}
        </div>
        <img
        src={iconSrc}
        alt={iconAlt}
        className="
          right-6
          object-contain
          drop-shadow
          md:h-[110px]
          md:w-[110px]
        "
        loading="lazy"
      />
      </div>
    </div>
  );
}
