import { useMemo, useState } from 'react'

export default function Projects({ data, lang }) {
  const [activeFilter, setActiveFilter] = useState('all')

  const categories = useMemo(() => {
    if (!Array.isArray(data)) return []
    return Array.from(new Set(data.map((p) => p.type).filter(Boolean)))
  }, [data])

  if (!data) return null

  const filteredData = activeFilter === 'all'
    ? data
    : data.filter((project) => project.type === activeFilter)

  return (
    <section id="projects" className="py-[100px] scroll-mt-[60px]">
      <div className="max-w-[900px] w-full mx-auto px-8">
        <div className="section-divider mb-16"></div>
        <div className="fade-in">
          <p className="font-mono text-[0.75rem] text-accent tracking-[0.15em] uppercase mb-2">
            // projects
          </p>
          <h2 className="font-heading text-[clamp(1.6rem,3vw,2.2rem)] font-bold tracking-[-0.02em] text-text-custom mb-8">
            {lang === 'en' ? 'Projects' : 'Proyek'}
          </h2>
        </div>

        {categories.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-8 fade-in">
            <button
              onClick={() => setActiveFilter('all')}
              className={`text-[0.78rem] font-mono px-3.5 py-1.5 rounded-full border cursor-pointer transition-colors duration-200 ${
                activeFilter === 'all'
                  ? 'bg-accent text-white border-accent'
                  : 'bg-transparent text-text-muted border-border-custom hover:border-accent hover:text-accent'
              }`}
            >
              {lang === 'en' ? 'All' : 'Semua'}
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`text-[0.78rem] font-mono px-3.5 py-1.5 rounded-full border cursor-pointer transition-colors duration-200 ${
                  activeFilter === cat
                    ? 'bg-accent text-white border-accent'
                    : 'bg-transparent text-text-muted border-border-custom hover:border-accent hover:text-accent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-5 fade-in">
          {filteredData.map((project, index) => {
            const projectTags = typeof project.tags === 'string'
              ? project.tags.split(',').map(t => t.trim()).filter(Boolean)
              : Array.isArray(project.tags) ? project.tags : []

            return (
              <div
                key={index}
                className="card-glow bg-card-bg border border-border-custom rounded-xl p-6 flex flex-col gap-3 transition-all duration-200 hover:border-accent hover:-translate-y-[3px]"
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
