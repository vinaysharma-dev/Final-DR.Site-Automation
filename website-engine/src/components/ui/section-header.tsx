interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  intro?: string;
  centered?: boolean;
}

export function SectionHeader({ eyebrow, title, intro, centered = false }: SectionHeaderProps) {
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="text-eyebrow font-semibold uppercase text-[color:var(--brand-primary)]/80">
        {eyebrow}
      </p>
      <h2 className="text-heading mt-2 font-semibold tracking-tight text-slate-950 sm:mt-3">
        {title}
      </h2>
      {intro ? (
        <p className="text-body mt-3 text-slate-600 sm:mt-4">{intro}</p>
      ) : null}
    </div>
  );
}
