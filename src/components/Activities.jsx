export default function Activities({ data, lang }) {
  if (!data) return null

  return (
    <section id="activities" className="py-[100px] scroll-mt-[60px]">
      <div className="max-w-[900px] w-full mx-auto px-8">
        <div className="section-divider mb-16"></div>
        <div className="fade-in">
          <p className="font-mono text-[0.75rem] text-accent tracking-[0.15em] uppercase mb-2">
            // activities
          </p>
          <h2 className="font-heading text-[clamp(1.6rem,3vw,2.2rem)] font-bold tracking-[-0.02em] text-text-custom mb-12">
            {lang === 'en' ? 'Activity Documentation' : 'Dokumentasi Keaktifan'}
          </h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5 fade-in">
          {data.map((act, index) => (
            <div
              key={index}
              className="card-glow bg-card-bg border border-border-custom rounded-xl overflow-hidden transition-all duration-200 hover:border-accent hover:-translate-y-[2px]"
            >
              <div className="w-full h-40 bg-bg3 flex items-center justify-center text-text-muted font-mono text-[0.75rem] tracking-[0.08em] border-b border-border-custom overflow-hidden">
                {act.imgUrl ? (
                  <img
                    src={act.imgUrl}
                    alt={act.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  act.imgText
                )}
              </div>
              <div className="p-[1.1rem_1.25rem]">
                <div className="text-[0.7rem] text-text-muted font-mono mb-[0.3rem]">
                  {act.date}
                </div>
                <h3 className="font-heading font-semibold text-[0.95rem] text-text-custom mb-[0.4rem]">
                  {act.title}
                </h3>
                <p className="text-[0.82rem] text-text-muted">{act.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
