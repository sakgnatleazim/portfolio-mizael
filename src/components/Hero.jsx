export default function Hero({ data }) {
  if (!data) return null

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center pt-[60px] pb-[100px]"
    >
      <div className="max-w-[900px] w-full mx-auto px-8">
        <div className="max-w-[700px] hero-inner fade-in visible">
          <div className="font-mono text-[0.8rem] text-accent tracking-[0.15em] uppercase mb-6 flex items-center gap-3 before:content-[''] before:block before:w-8 before:h-[1px] before:bg-accent">
            {data.eyebrow}
          </div>
          
          <div className="flex items-center gap-6 mb-4 max-[480px]:gap-3">
            {data.profileImg && (
              <div className="w-[120px] h-[120px] rounded-full border-2 border-accent overflow-hidden shrink-0 shadow-custom max-[680px]:w-[80px] max-[680px]:h-[80px] max-[480px]:w-[60px] max-[480px]:h-[60px]">
                <img
                  src={data.profileImg}
                  alt={data.name}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <h1 className="font-heading text-[clamp(2rem,4.8vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.02em] text-text-custom max-[680px]:text-[clamp(1.4rem,5.5vw,2.2rem)] m-0 whitespace-nowrap">
              {data.name}
            </h1>
          </div>

          <p className="font-heading text-[clamp(1.1rem,2.5vw,1.5rem)] font-light text-text-muted mb-8">
            {data.title}
            <span className="inline-block w-[3px] h-[1.2em] bg-accent align-middle ml-[2px] animate-[blink_1.1s_step-end_infinite]"></span>
          </p>
          <p className="text-base text-text-muted max-w-[520px] leading-[1.8] mb-10">
            {data.desc}
          </p>
          <div className="flex gap-4 flex-wrap">
            <a
              href={data.ctaPrimaryLink}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-heading text-[0.9rem] font-medium no-underline transition-all duration-200 cursor-pointer border-none bg-accent text-[#fff] hover:opacity-85 hover:-translate-y-[1px]"
            >
              {data.ctaPrimaryText}
            </a>
            <a
              href={data.ctaOutlineLink}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-heading text-[0.9rem] font-medium no-underline transition-all duration-200 cursor-pointer bg-transparent border border-border-custom text-text-custom hover:border-accent hover:text-accent hover:-translate-y-[1px]"
            >
              {data.ctaOutlineText}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
