export default function Projects({ data, lang }) {
  if (!data) return null

  return (
    <section id="projects" className="py-[100px] 0">
      <div className="max-w-[900px] w-full mx-auto px-8">
        <div className="h-[1px] bg-border-custom mb-16"></div>
        <div className="fade-in">
          <p className="font-mono text-[0.75rem] text-accent tracking-[0.15em] uppercase mb-2">
            // projects
          </p>
          <h2 className="font-heading text-[clamp(1.6rem,3vw,2.2rem)] font-bold tracking-[-0.02em] text-text-custom mb-12">
            {lang === 'en' ? 'Projects' : 'Proyek'}
          </h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-5 fade-in">
          {data.map((project, index) => {
            const projectTags = typeof project.tags === 'string'
              ? project.tags.split(',').map(t => t.trim()).filter(Boolean)
              : Array.isArray(project.tags) ? project.tags : []

            return (
              <div
                key={index}
                className="bg-card-bg border border-border-custom rounded-xl p-6 flex flex-col gap-3 transition-all duration-200 hover:border-accent hover:-translate-y-[3px] hover:shadow-custom"
              >
                <span
                  className={`text-[0.7rem] font-mono tracking-[0.1em] uppercase ${
                    project.isPaper ? 'text-[#F97316]' : 'text-text-muted'
                  }`}
                >
                  {project.type}
                </span>
                <h3 className="font-heading text-[1.05rem] font-semibold text-text-custom leading-tight">
                  {project.name}
                </h3>
                <p className="text-[0.85rem] text-text-muted flex-1">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {projectTags.map((tag, tIndex) => (
                    <span
                      key={tIndex}
                      className="text-[0.7rem] bg-tag-bg text-tag-text rounded-[5px] px-2 py-0.5 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  className="inline-flex items-center gap-[0.4rem] text-[0.82rem] text-accent no-underline font-medium mt-1 w-fit transition-[gap] duration-200 hover:gap-[0.65rem]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.isPaper
                    ? (lang === 'en' ? 'View Paper' : 'Lihat Paper')
                    : (lang === 'en' ? 'View Project' : 'Lihat Project')} →
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
