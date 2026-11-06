import { useId } from "react";

type MarkProps = {
  className?: string;
};

export function Mark({ className }: MarkProps) {
  const raw = useId().replace(/:/g, "");
  const face = `face-${raw}`;
  const side = `side-${raw}`;
  const lip = `lip-${raw}`;
  const glow = `glow-${raw}`;

  return (
    <div className={`mark-3d ${className ?? ""}`}>
      <svg viewBox="0 0 280 250" className="h-auto w-full overflow-visible" aria-hidden>
        <defs>
          <linearGradient id={face} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9b95ff" />
            <stop offset="42%" stopColor="#3d2ef0" />
            <stop offset="100%" stopColor="#140e78" />
          </linearGradient>
          <linearGradient id={side} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#241c9a" />
            <stop offset="100%" stopColor="#05040f" />
          </linearGradient>
          <linearGradient id={lip} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#efeaff" />
            <stop offset="100%" stopColor="#6d64ff" />
          </linearGradient>
          <filter id={glow} x="-30%" y="-30%" width="160%" height="170%">
            <feDropShadow dx="0" dy="22" stdDeviation="10" floodColor="#3d2ef0" floodOpacity="0.55" />
            <feDropShadow dx="8" dy="28" stdDeviation="6" floodColor="#000000" floodOpacity="0.55" />
          </filter>
        </defs>
        <g filter={`url(#${glow})`}>
          <path d="M62 70 L176 140 L62 210 L96 210 L210 140 L96 70 Z" fill={`url(#${side})`} />
          <path d="M24 28 L138 98 L24 168 L58 168 L172 98 L58 28 Z" fill={`url(#${face})`} />
          <path d="M24 28 L138 98 L158 112 L44 42 Z" fill={`url(#${lip})`} opacity="0.9" />
          <path
            d="M58 168 L172 98 L152 88 L38 158 Z"
            fill="#07061c"
            opacity="0.55"
          />
        </g>
      </svg>
    </div>
  );
}
