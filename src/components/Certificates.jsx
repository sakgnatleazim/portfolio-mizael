import { useState } from 'react'

export default function Certificates({ data, lang }) {
  const [selectedImg, setSelectedImg] = useState(null)

  if (!data || data.length === 0) return null

  return (
    <section id="certificates" className="py-[100px] 0">
      <div className="max-w-[900px] w-full mx-auto px-8">
        <div className="h-[1px] bg-border-custom mb-16"></div>
        <div className="fade-in">
          <p className="font-mono text-[0.75rem] text-accent tracking-[0.15em] uppercase mb-2">
            // {lang === 'en' ? 'certificates & achievements' : 'sertifikat & pencapaian'}
          </p>
          <h2 className="font-heading text-[clamp(1.6rem,3vw,2.2rem)] font-bold tracking-[-0.02em] text-text-custom mb-12">
            {lang === 'en' ? 'Certificates & Achievements' : 'Sertifikat & Pencapaian'}
          </h2>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-5 fade-in">
          {data.map((cert, index) => (
            <div
              key={index}
              className="bg-card-bg border border-border-custom rounded-xl p-6 flex flex-col gap-3 transition-all duration-200 hover:border-accent hover:-translate-y-[3px] hover:shadow-custom justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-text-muted">
                    <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </span>
                  <span className="text-[0.75rem] text-text-muted font-mono bg-bg3 border border-border-custom rounded-full px-2.5 py-0.5">
                    {cert.date}
                  </span>
                </div>
                <h3 className="font-heading text-[0.98rem] font-semibold text-text-custom leading-snug mb-1">
                  {cert.title}
                </h3>
                <p className="text-[0.8rem] text-accent font-medium mb-2">
                  {cert.issuer}
                </p>
              </div>

              <div className="flex items-center gap-3 mt-3">
                {cert.imgUrl && (
                  <button
                    onClick={() => setSelectedImg(cert.imgUrl)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg text-xs font-semibold cursor-pointer transition-colors border-none"
                  >
                    <svg className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    {lang === 'en' ? 'View Certificate' : 'Lihat Sertifikat'}
                  </button>
                )}
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-border-custom hover:border-accent text-text-custom hover:text-accent rounded-lg text-xs font-semibold no-underline transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    {lang === 'en' ? 'Verify' : 'Verifikasi'} →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FULLSCREEN IMAGE VIEWER MODAL */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-[999] bg-[#000000]/75 backdrop-blur-md flex items-center justify-center p-6 transition-all duration-300"
          onClick={() => setSelectedImg(null)}
        >
          <div
            className="relative max-w-[85vw] max-h-[85vh] bg-bg2 border border-border-custom rounded-2xl overflow-hidden p-2 shadow-2xl flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute top-4 right-4 z-50 w-8 h-8 rounded-full bg-bg3 hover:bg-red-500/20 hover:text-red-400 text-text-custom flex items-center justify-center font-bold border border-border-custom cursor-pointer transition-all shadow"
            >
              ✕
            </button>
            <img
              src={selectedImg}
              alt="Sertifikat Dokumen"
              className="max-w-full max-h-[80vh] object-contain rounded-xl select-none"
            />
          </div>
        </div>
      )}
    </section>
  )
}
