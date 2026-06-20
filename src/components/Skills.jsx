const skillLogos = {
  Python: (
    <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 4C15.5 4 12 5.2 12 8v4h8v2H8C5.8 14 4 15.8 4 18v8c0 2.2 1.8 4 4 4h2v-5c0-2.2 1.8-4 4-4h12c2 0 3-1 3-3V8c0-2.2-2.5-4-9-4z" fill="#306998" />
      <path d="M20 36c4.5 0 8-1.2 8-4v-4h-8v-2h12c2.2 0 4-1.8 4-4v-8c0-2.2-1.8-4-4-4h-2v5c0 2.2-1.8 4-4 4H14c-2 0-3 1-3 3v8c0 2.2 2.5 4 9 4z" fill="#FFD43B" />
      <circle cx="16" cy="9" r="1.5" fill="#fff" />
      <circle cx="24" cy="31" r="1.5" fill="#306998" />
    </svg>
  ),
  R: (
    <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="32" height="32" rx="8" fill="#276DC3" />
      <text x="20" y="27" fontFamily="Georgia,serif" fontSize="20" fontWeight="bold" fill="white" textAnchor="middle">R</text>
    </svg>
  ),
  SQL: (
    <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="20" cy="13" rx="14" ry="5" fill="#336791" />
      <path d="M6 13v7c0 2.76 6.27 5 14 5s14-2.24 14-5v-7c0 2.76-6.27 5-14 5S6 15.76 6 13z" fill="#336791" />
      <path d="M6 20v7c0 2.76 6.27 5 14 5s14-2.24 14-5v-7c0 2.76-6.27 5-14 5S6 22.76 6 20z" fill="#336791" />
      <ellipse cx="20" cy="13" rx="14" ry="5" fill="#6EA6C9" />
    </svg>
  ),
  Pandas: (
    <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="32" height="32" rx="8" fill="#150458" />
      <rect x="11" y="10" width="5" height="20" rx="2" fill="#E70488" />
      <rect x="24" y="10" width="5" height="20" rx="2" fill="#E70488" />
      <rect x="11" y="17" width="18" height="5" rx="1" fill="#FFCA00" />
    </svg>
  ),
  NumPy: (
    <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="32" height="32" rx="8" fill="#013243" />
      <path d="M12 20l8-8 8 8-8 8-8-8z" fill="#4DABCF" />
      <path d="M20 12l8 8-8 8" fill="none" stroke="#4DABCF" strokeWidth="1.5" />
    </svg>
  ),
  Matplotlib: (
    <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="32" height="32" rx="8" fill="#ffffff" />
      <circle cx="20" cy="20" r="12" stroke="#11557C" strokeWidth="2" fill="none" />
      <path d="M8 20 Q14 12 20 20 Q26 28 32 20" stroke="#E5792C" strokeWidth="2" fill="none" />
      <circle cx="20" cy="20" r="3" fill="#11557C" />
    </svg>
  ),
  'Scikit-learn': (
    <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="32" height="32" rx="8" fill="#F7931E" />
      <path d="M10 28 Q20 8 30 28" fill="none" stroke="white" strokeWidth="2.5" />
      <circle cx="15" cy="22" r="2" fill="white" />
      <circle cx="20" cy="16" r="2" fill="white" />
      <circle cx="25" cy="22" r="2" fill="white" />
    </svg>
  ),
  Tableau: (
    <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="32" height="32" rx="8" fill="#E8762D" />
      <rect x="18.5" y="8" width="3" height="24" rx="1.5" fill="white" />
      <rect x="8" y="18.5" width="24" height="3" rx="1.5" fill="white" />
      <rect x="13" y="12" width="2.5" height="16" rx="1.25" fill="#ffcfa8" />
      <rect x="24.5" y="12" width="2.5" height="16" rx="1.25" fill="#ffcfa8" />
    </svg>
  ),
  Jupyter: (
    <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="16" fill="#F37626" />
      <circle cx="20" cy="20" r="10" fill="white" />
      <circle cx="13" cy="11" r="3" fill="#9E9E9E" />
      <circle cx="27" cy="11" r="3" fill="#9E9E9E" />
      <circle cx="20" cy="30" r="3" fill="#9E9E9E" />
    </svg>
  ),
  'Google Colab': (
    <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="32" height="32" rx="8" fill="#F9AB00" />
      <path d="M13 20 a7 7 0 1 1 7 7" stroke="white" strokeWidth="2.5" fill="none" />
      <circle cx="20" cy="13" r="3" fill="white" />
    </svg>
  ),
  'Power BI': (
    <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="32" height="32" rx="8" fill="#F2C811" />
      <rect x="10" y="22" width="5" height="10" rx="1" fill="#333" />
      <rect x="17.5" y="15" width="5" height="17" rx="1" fill="#333" />
      <rect x="25" y="10" width="5" height="22" rx="1" fill="#333" />
    </svg>
  ),
  Git: (
    <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="32" height="32" rx="8" fill="#F05032" />
      <path d="M33.5 19.1l-12.6-12.6c-.8-.8-2-.8-2.8 0L15.9 8.7l3.5 3.5c.8-.3 1.7-.1 2.3.5.6.6.8 1.5.5 2.3l3.4 3.4c.8-.3 1.7-.1 2.3.5 1 1 1 2.5 0 3.5s-2.5 1-3.5 0c-.7-.7-.9-1.7-.5-2.5l-3.2-3.2v8.3c.6.3 1.1.8 1.3 1.5.5 1.3-.1 2.8-1.5 3.3-1.3.5-2.8-.1-3.3-1.5-.5-1.3.1-2.8 1.5-3.3V16.4c-.6-.3-1.2-.9-1.5-1.5l-3.4-3.4-7.4 7.4c-.8.8-.8 2 0 2.8l12.6 12.6c.8.8 2 .8 2.8 0l12.4-12.4c.8-.8.8-2.1 0-2.8z" fill="white" />
    </svg>
  )
}

export default function Skills({ data, lang }) {
  if (!data) return null

  return (
    <section id="skills" className="py-[100px] 0">
      <div className="max-w-[900px] w-full mx-auto px-8">
        <div className="h-[1px] bg-border-custom mb-16"></div>
        <div className="fade-in">
          <p className="font-mono text-[0.75rem] text-accent tracking-[0.15em] uppercase mb-2">
            // skills
          </p>
          <h2 className="font-heading text-[clamp(1.6rem,3vw,2.2rem)] font-bold tracking-[-0.02em] text-text-custom mb-12">
            {lang === 'en' ? 'Languages & Tools' : 'Bahasa & Tools'}
          </h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-4 fade-in">
          {data.map((skill, index) => (
            <div
              key={index}
              className="bg-card-bg border border-border-custom rounded-xl p-[1.25rem_1rem] flex flex-col items-center gap-3 transition-all duration-200 text-center hover:border-accent hover:-translate-y-[2px]"
            >
              {skill.customLogo ? (
                <img src={skill.customLogo} alt={skill.name} className="w-10 h-10 object-contain" />
              ) : (
                skillLogos[skill.logoType] || skillLogos.Python
              )}
              <span className="text-[0.82rem] font-medium text-text-custom">
                {skill.name}
              </span>
              <span className="text-[0.7rem] text-text-muted font-mono">
                {skill.level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
