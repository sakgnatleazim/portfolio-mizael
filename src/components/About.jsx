export default function About({ data }) {
  if (!data) return null

  return (
    <section id="about" className="py-[100px] 0">
      <div className="max-w-[900px] w-full mx-auto px-8">
        <div className="h-[1px] bg-border-custom mb-16"></div>
        <div className="fade-in">
          <p className="font-mono text-[0.75rem] text-accent tracking-[0.15em] uppercase mb-2">
            // about
          </p>
          <h2 className="font-heading text-[clamp(1.6rem,3vw,2.2rem)] font-bold tracking-[-0.02em] text-text-custom mb-12">
            {data.title}
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-12 items-start max-[680px]:grid-cols-1 fade-in">
          <div className="about-text">
            {data.text1 && <p className="text-text-muted mb-4 text-[0.95rem]">{data.text1}</p>}
            {data.text2 && <p className="text-text-muted mb-4 text-[0.95rem]">{data.text2}</p>}
            {data.text3 && <p className="text-text-muted mb-4 text-[0.95rem]">{data.text3}</p>}
          </div>
          <div className="flex flex-col gap-4">
            {data.details.map((detail, idx) => (
              <div
                key={idx}
                className="p-[1rem_1.25rem] bg-card-bg border border-border-custom rounded-[10px]"
              >
                <div className="text-[0.7rem] text-text-muted font-mono tracking-[0.1em] uppercase mb-1">
                  {detail.label}
                </div>
                <div className="text-[0.9rem] font-medium text-text-custom">
                  {detail.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
