interface SectionDividerProps {
  variant?: "wave" | "bubble" | "clean";
  flip?: boolean;
  color?: string;
}

export default function SectionDivider({
  variant = "wave",
  flip = false,
  color = "#F7F9FC",
}: SectionDividerProps) {
  const transform = flip ? "rotate(180deg)" : undefined;

  if (variant === "wave") {
    return (
      <div className="w-full leading-[0]" style={{ transform }}>
        <svg
          viewBox="0 0 1440 70"
          preserveAspectRatio="none"
          className="block h-[60px] w-full sm:h-[70px] md:h-[80px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,32 C120,56 240,64 360,56 C480,48 600,24 720,16 C840,8 960,16 1080,28 C1200,40 1320,56 1380,60 L1440,64 L1440,70 L0,70 Z"
            fill={color}
          />
        </svg>
      </div>
    );
  }

  if (variant === "bubble") {
    return (
      <div className="w-full leading-[0]" style={{ transform }}>
        <svg
          viewBox="0 0 1440 70"
          preserveAspectRatio="none"
          className="block h-[60px] w-full sm:h-[70px] md:h-[80px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,70 L0,40 Q180,0 360,40 Q540,80 720,40 Q900,0 1080,40 Q1260,80 1440,40 L1440,70 Z"
            fill={color}
          />
        </svg>
      </div>
    );
  }

  // "clean" variant - gradient fade
  return (
    <div
      className="h-[60px] w-full sm:h-[70px] md:h-[80px]"
      style={{
        transform,
        background: `linear-gradient(to bottom, transparent, ${color})`,
      }}
    />
  );
}
