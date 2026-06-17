export default function Contact({ data, lang }) {
  if (!data) return null

  return (
    <section id="contact" className="py-[100px] 0">
      <div className="max-w-[900px] w-full mx-auto px-8">
        <div className="h-[1px] bg-border-custom mb-16"></div>
        <div className="flex flex-col items-center text-center gap-6 fade-in">
          <p className="font-mono text-[0.75rem] text-accent tracking-[0.15em] uppercase mb-2">
            // contact
          </p>
          <h2 className="font-heading text-[clamp(1.8rem,4vw,2.8rem)] font-bold tracking-[-0.02em] text-text-custom">
            {data.title}
          </h2>
          <p className="text-text-muted max-w-[460px] text-[0.95rem]">
            {data.sub}
          </p>
          <div className="flex gap-4 flex-wrap justify-center mt-2">
            <a
              href={`mailto:${data.email}`}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-heading text-[0.9rem] font-medium no-underline transition-all duration-200 cursor-pointer border-none bg-accent text-[#fff] hover:opacity-85 hover:-translate-y-[1px]"
            >
              <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {lang === 'en' ? 'Email Me' : 'Email Saya'}
            </a>
            <a
              href={data.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-heading text-[0.9rem] font-medium no-underline transition-all duration-200 cursor-pointer bg-transparent border border-border-custom text-text-custom hover:border-accent hover:text-accent hover:-translate-y-[1px]"
            >
              LinkedIn
            </a>
            <a
              href={data.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-heading text-[0.9rem] font-medium no-underline transition-all duration-200 cursor-pointer bg-transparent border border-border-custom text-text-custom hover:border-accent hover:text-accent hover:-translate-y-[1px]"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
