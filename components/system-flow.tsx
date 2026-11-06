type Stage = {
  id: string;
  title: string;
  text: string;
};

export function SystemFlow({ stages }: { stages: readonly Stage[] }) {
  return (
    <div>
      <ol className="hidden md:grid md:grid-cols-4">
        {stages.map((stage, index) => (
          <li key={stage.id} className="relative px-5 pt-10">
            <svg
              className="absolute inset-x-0 top-0 h-3 w-full text-bronze"
              viewBox="0 0 100 12"
              preserveAspectRatio="none"
              aria-hidden
            >
              <line
                x1={index === 0 ? 8 : 0}
                y1="6"
                x2={index === stages.length - 1 ? 92 : 100}
                y2="6"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <circle cx={index === 0 ? 8 : 0} cy="6" r="3.2" fill="#3d2ef0" />
              {index === stages.length - 1 ? (
                <circle cx="92" cy="6" r="3.2" fill="#f4f5f8" />
              ) : null}
            </svg>
            <p className="font-metric text-sm tracking-[0.18em] text-olive">
              {stage.id}
            </p>
            <h3 className="mt-4 font-display text-[1.65rem] leading-tight text-charcoal">
              {stage.title}
            </h3>
            <p className="mt-3 text-[0.98rem] leading-relaxed text-charcoal/75">
              {stage.text}
            </p>
          </li>
        ))}
      </ol>

      <ol className="space-y-0 md:hidden">
        {stages.map((stage, index) => (
          <li key={stage.id} className="grid grid-cols-[1.25rem_1fr] gap-4">
            <div className="flex flex-col items-center">
              <span className="mt-1 size-2.5 rounded-full bg-olive" />
              {index < stages.length - 1 ? (
                <span className="w-px flex-1 bg-bronze/80" />
              ) : null}
            </div>
            <div className={index < stages.length - 1 ? "pb-8" : ""}>
              <p className="font-metric text-sm tracking-[0.18em] text-olive">
                {stage.id}
              </p>
              <h3 className="mt-2 font-display text-2xl text-charcoal">
                {stage.title}
              </h3>
              <p className="mt-2 text-[0.98rem] leading-relaxed text-charcoal/75">
                {stage.text}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
