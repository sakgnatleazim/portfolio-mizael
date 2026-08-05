export default function About({ data, lang }) {
  if (!data) return null

  const openPdf = (base64String) => {
    try {
      const base64Parts = base64String.split(';base64,')
      const contentType = base64Parts[0].split(':')[1]
      const raw = window.atob(base64Parts[1])
      const rawLength = raw.length
      const uInt8Array = new Uint8Array(rawLength)
      
      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i)
      }
      
      const blob = new Blob([uInt8Array], { type: contentType })
      const url = URL.createObjectURL(blob)
      window.open(url, '_blank')
    } catch (e) {
      console.error('Gagal membuka PDF:', e)
      // Fallback
      const newTab = window.open()
      if (newTab) {
        newTab.document.write(`<iframe src="${base64String}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`)
      }
    }
  }

  const downloadPdf = (base64String, filename) => {
    try {
      const base64Parts = base64String.split(';base64,')
      const contentType = base64Parts[0].split(':')[1]
      const raw = window.atob(base64Parts[1])
      const rawLength = raw.length
      const uInt8Array = new Uint8Array(rawLength)
      
      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i)
      }
      
      const blob = new Blob([uInt8Array], { type: contentType })
      const url = URL.createObjectURL(blob)
      
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (e) {
      console.error('Gagal mengunduh PDF:', e)
    }
  }

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

        {/* CV & Portofolio PDF */}
        {(data.cvPdf || data.portfolioPdf) && (
          <div className="mt-16 fade-in">
            <h3 className="font-heading text-[1.1rem] font-bold text-text-custom mb-6 flex items-center gap-2">
              <span className="text-accent text-lg">📄</span>
              {lang === 'en' ? 'Documents & Resume' : 'Dokumen & Resume'}
            </h3>
            <div className="grid grid-cols-2 gap-6 max-[680px]:grid-cols-1">
              {data.cvPdf && (
                <div className="p-5 bg-card-bg border border-border-custom rounded-xl flex flex-col justify-between hover:border-accent/40 transition-colors duration-300">
                  <div className="mb-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center text-xs font-mono font-bold tracking-tighter">
                        PDF
                      </div>
                      <div>
                        <h4 className="font-heading text-[0.95rem] font-bold text-text-custom mb-0.5">
                          Curriculum Vitae (CV)
                        </h4>
                        <p className="text-[0.75rem] text-text-muted font-mono leading-none truncate max-w-[200px]" title={data.cvPdfName || 'cv.pdf'}>
                          {data.cvPdfName || 'cv.pdf'}
                        </p>
                      </div>
                    </div>
                    <p className="text-[0.85rem] text-text-muted leading-relaxed">
                      {lang === 'en'
                        ? 'My updated professional resume outlining skills, education, and experiences.'
                        : 'Resume profesional terbaru saya yang memuat keahlian, pendidikan, dan pengalaman.'}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => openPdf(data.cvPdf)}
                      className="flex-1 py-2 px-3 bg-bg3 text-text-custom hover:bg-border-custom rounded-lg font-heading text-[0.8rem] font-semibold border border-transparent cursor-pointer text-center transition-colors font-sans"
                    >
                      {lang === 'en' ? 'Open PDF' : 'Buka PDF'}
                    </button>
                    <button
                      onClick={() => downloadPdf(data.cvPdf, data.cvPdfName || 'CV_Mizael.pdf')}
                      className="flex-1 py-2 px-3 bg-accent text-[#fff] hover:opacity-90 rounded-lg font-heading text-[0.8rem] font-semibold border-none cursor-pointer text-center transition-all font-sans"
                    >
                      {lang === 'en' ? 'Download' : 'Unduh'}
                    </button>
                  </div>
                </div>
              )}
              {data.portfolioPdf && (
                <div className="p-5 bg-card-bg border border-border-custom rounded-xl flex flex-col justify-between hover:border-accent/40 transition-colors duration-300">
                  <div className="mb-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center text-xs font-mono font-bold tracking-tighter">
                        PDF
                      </div>
                      <div>
                        <h4 className="font-heading text-[0.95rem] font-bold text-text-custom mb-0.5">
                          Portofolio Lengkap
                        </h4>
                        <p className="text-[0.75rem] text-text-muted font-mono leading-none truncate max-w-[200px]" title={data.portfolioPdfName || 'portfolio.pdf'}>
                          {data.portfolioPdfName || 'portfolio.pdf'}
                        </p>
                      </div>
                    </div>
                    <p className="text-[0.85rem] text-text-muted leading-relaxed">
                      {lang === 'en'
                        ? 'A compilation of selected works, projects, and detailed academic showcases.'
                        : 'Kompilasi karya pilihan, proyek, dan penjelasan akademis secara mendalam.'}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => openPdf(data.portfolioPdf)}
                      className="flex-1 py-2 px-3 bg-bg3 text-text-custom hover:bg-border-custom rounded-lg font-heading text-[0.8rem] font-semibold border border-transparent cursor-pointer text-center transition-colors font-sans"
                    >
                      {lang === 'en' ? 'Open PDF' : 'Buka PDF'}
                    </button>
                    <button
                      onClick={() => downloadPdf(data.portfolioPdf, data.portfolioPdfName || 'Portfolio_Mizael.pdf')}
                      className="flex-1 py-2 px-3 bg-accent text-[#fff] hover:opacity-90 rounded-lg font-heading text-[0.8rem] font-semibold border-none cursor-pointer text-center transition-all font-sans"
                    >
                      {lang === 'en' ? 'Download' : 'Unduh'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
