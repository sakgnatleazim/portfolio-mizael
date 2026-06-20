export default function Organizations({ data, lang }) {
  if (!data) return null

  return (
    <section id="organizations" className="py-[100px] 0">
      <div className="max-w-[900px] w-full mx-auto px-8">
        <div className="h-[1px] bg-border-custom mb-16"></div>
        <div className="fade-in">
          <p className="font-mono text-[0.75rem] text-accent tracking-[0.15em] uppercase mb-2">
            // organizations
          </p>
          <h2 className="font-heading text-[clamp(1.6rem,3vw,2.2rem)] font-bold tracking-[-0.02em] text-text-custom mb-12">
            {lang === 'en' ? 'Organizations & Committees' : 'Organisasi & Kepanitiaan'}
          </h2>
        </div>
        <div className="flex flex-col gap-4 fade-in">
          {data.map((org, index) => (
            <div
              key={index}
              className="bg-card-bg border border-border-custom rounded-xl p-[1.25rem_1.5rem] flex items-start gap-5 transition-colors duration-200 hover:border-accent"
            >
              <div className="w-11 h-11 rounded-lg bg-bg3 flex items-center justify-center text-[1.3rem] shrink-0 border border-border-custom">
                {org.icon}
              </div>
              <div className="flex-1">
                <div className="font-heading font-semibold text-[0.95rem] text-text-custom mb-[0.15rem]">
                  {org.name}
                </div>
                <div className="text-[0.82rem] text-accent mb-[0.3rem]">
                  {org.role}
                </div>
                <div className="text-[0.75rem] text-text-muted font-mono">
                  {org.period}
                </div>
                <div className="text-[0.82rem] text-text-muted mt-[0.35rem]">
                  {org.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
