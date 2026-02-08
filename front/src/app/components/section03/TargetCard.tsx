type TargetCardProps = {
  text: string;
};

export default function TargetCard({ text }: TargetCardProps) {
  return (
    <div
      className="
        w-full
        rounded-full
        border-3
        border-cyan-400/60
        bg-black
        backdrop-blur-md
        px-6
        py-6
        text-center
        text-white
        text-base
        md:text-lg
        font-bold
        shadow-[0_0_20px_rgba(34,211,238,0.2)]
        hover:border-cyan-300
        transition
      "
    >
      {text}
    </div>
  );
}