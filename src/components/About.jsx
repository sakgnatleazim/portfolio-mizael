import { useState, useEffect } from 'react'

export default function About({ data, lang }) {
  if (!data) return null

  const [cvBlobUrl, setCvBlobUrl] = useState('')
  const [portfolioBlobUrl, setPortfolioBlobUrl] = useState('')

  useEffect(() => {
    let activeCvUrl = ''
    let activePortfolioUrl = ''

    if (data.cvPdf) {
      try {
        const base64Parts = data.cvPdf.split(';base64,')
        const contentType = base64Parts[0].split(':')[1]
        const raw = window.atob(base64Parts[1])
        const uInt8Array = new Uint8Array(raw.length)
        for (let i = 0; i < raw.length; ++i) {
          uInt8Array[i] = raw.charCodeAt(i)
        }
        const blob = new Blob([uInt8Array], { type: contentType })
        activeCvUrl = URL.createObjectURL(blob)
        setCvBlobUrl(activeCvUrl)
      } catch (e) {
        console.error('Error generating CV Blob URL:', e)
        setCvBlobUrl(data.cvPdf)
      }
    } else {
      setCvBlobUrl('')
    }

    if (data.portfolioPdf) {
      try {
        const base64Parts = data.portfolioPdf.split(';base64,')
        const contentType = base64Parts[0].split(':')[1]
        const raw = window.atob(base64Parts[1])
        const uInt8Array = new Uint8Array(raw.length)
        for (let i = 0; i < raw.length; ++i) {
          uInt8Array[i] = raw.charCodeAt(i)
        }
        const blob = new Blob([uInt8Array], { type: contentType })
        activePortfolioUrl = URL.createObjectURL(blob)
        setPortfolioBlobUrl(activePortfolioUrl)
      } catch (e) {
        console.error('Error generating Portfolio Blob URL:', e)
        setPortfolioBlobUrl(data.portfolioPdf)
      }
    } else {
      setPortfolioBlobUrl('')
    }

    return () => {
      if (activeCvUrl) URL.revokeObjectURL(activeCvUrl)
      if (activePortfolioUrl) URL.revokeObjectURL(activePortfolioUrl)
    }
  }, [data.cvPdf, data.portfolioPdf])

  const openPdf = (blobUrl, fallbackBase64) => {
    const url = blobUrl || fallbackBase64
    if (!url) return

    if (url.startsWith('blob:') || url.startsWith('http://') || url.startsWith('https://')) {
      window.open(url, '_blank')
    } else {
      try {
        const base64Parts = url.split(';base64,')
        const contentType = base64Parts[0].split(':')[1]
        const raw = window.atob(base64Parts[1])
        const uInt8Array = new Uint8Array(raw.length)
        for (let i = 0; i < raw.length; ++i) {
          uInt8Array[i] = raw.charCodeAt(i)
        }
        const blob = new Blob([uInt8Array], { type: contentType })
        const tempUrl = URL.createObjectURL(blob)
        window.open(tempUrl, '_blank')
      } catch (e) {
        console.error('Failed to open PDF:', e)
        const newTab = window.open()
        if (newTab) {
          newTab.document.write(`<iframe src="${url}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`)
        }
      }
    }
  }

  const downloadPdf = (blobUrl, fallbackBase64, filename) => {
    const url = blobUrl || fallbackBase64
    if (!url) return

    if (url.startsWith('blob:') || url.startsWith('http://') || url.startsWith('https://')) {
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    } else {
      try {
        const base64Parts = url.split(';base64,')
        const contentType = base64Parts[0].split(':')[1]
        const raw = window.atob(base64Parts[1])
        const uInt8Array = new Uint8Array(raw.length)
        for (let i = 0; i < raw.length; ++i) {
          uInt8Array[i] = raw.charCodeAt(i)
        }
        const blob = new Blob([uInt8Array], { type: contentType })
        const tempUrl = URL.createObjectURL(blob)
        
        const a = document.createElement('a')
        a.href = tempUrl
        a.download = filename
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(tempUrl)
      } catch (e) {
        console.error('Failed to download PDF:', e)
      }
    }
  }

  return (
    <section id="about" className="py-[100px] scroll-mt-[60px]">
      <div className="max-w-[900px] w-full mx-auto px-8">
        <div className="section-divider mb-16"></div>
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
              {lang === 'en' ? 'Curriculum Vitae & Portfolio' : 'Curriculum Vitae & Portofolio'}
            </h3>
            <div className="grid grid-cols-2 gap-6 max-[680px]:grid-cols-1">
              {data.cvPdf && (
                <div className="p-5 bg-card-bg border border-border-custom rounded-xl flex flex-col justify-between hover:border-accent/40 transition-colors duration-300">
                  <div className="mb-5">
                    {/* PDF Preview Box */}
                    {cvBlobUrl && (
                      <div className="w-full h-[280px] rounded-lg overflow-hidden border border-border-custom bg-bg3 relative mb-4 shadow-sm">
                        <iframe
                          src={`${cvBlobUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                          className="w-full h-full border-none pointer-events-none"
                          title="CV Preview"
                        />
                        <div 
                          onClick={() => openPdf(cvBlobUrl, data.cvPdf)}
                          className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center cursor-pointer group"
                        >
                          <span className="opacity-0 group-hover:opacity-100 bg-accent text-[#fff] px-3.5 py-2 rounded-lg text-xs font-semibold shadow-custom transition-all duration-200 -translate-y-2 group-hover:translate-y-0 flex items-center gap-1.5 font-sans">
                            🔍 {lang === 'en' ? 'Open Fullscreen' : 'Buka Layar Penuh'}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center text-xs font-mono font-bold tracking-tighter">
                        PDF
                      </div>
                      <div>
                        <h4 className="font-heading text-[0.95rem] font-bold text-text-custom mb-0.5 font-sans">
                          Curriculum Vitae (CV)
                        </h4>
                        <p className="text-[0.75rem] text-text-muted font-mono leading-none truncate max-w-[200px]" title={data.cvPdfName || 'cv.pdf'}>
                          {data.cvPdfName || 'cv.pdf'}
                        </p>
                      </div>
                    </div>
                    <p className="text-[0.85rem] text-text-muted leading-relaxed font-sans">
                      {lang === 'en'
                        ? 'My updated professional resume outlining skills, education, and experiences.'
                        : 'Resume profesional terbaru saya yang memuat keahlian, pendidikan, dan pengalaman.'}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => openPdf(cvBlobUrl, data.cvPdf)}
                      className="flex-1 py-2 px-3 bg-bg3 text-text-custom hover:bg-border-custom rounded-lg font-heading text-[0.8rem] font-semibold border border-transparent cursor-pointer text-center transition-colors font-sans"
                    >
                      {lang === 'en' ? 'Open PDF' : 'Buka PDF'}
                    </button>
                    <button
                      onClick={() => downloadPdf(cvBlobUrl, data.cvPdf, data.cvPdfName || 'CV_Mizael.pdf')}
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
                    {/* PDF Preview Box */}
                    {portfolioBlobUrl && (
                      <div className="w-full h-[280px] rounded-lg overflow-hidden border border-border-custom bg-bg3 relative mb-4 shadow-sm">
                        <iframe
                          src={`${portfolioBlobUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                          className="w-full h-full border-none pointer-events-none"
                          title="Portfolio Preview"
                        />
                        <div 
                          onClick={() => openPdf(portfolioBlobUrl, data.portfolioPdf)}
                          className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center cursor-pointer group"
                        >
                          <span className="opacity-0 group-hover:opacity-100 bg-accent text-[#fff] px-3.5 py-2 rounded-lg text-xs font-semibold shadow-custom transition-all duration-200 -translate-y-2 group-hover:translate-y-0 flex items-center gap-1.5 font-sans">
                            🔍 {lang === 'en' ? 'Open Fullscreen' : 'Buka Layar Penuh'}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center text-xs font-mono font-bold tracking-tighter">
                        PDF
                      </div>
                      <div>
                        <h4 className="font-heading text-[0.95rem] font-bold text-text-custom mb-0.5 font-sans">
                          Portofolio Lengkap
                        </h4>
                        <p className="text-[0.75rem] text-text-muted font-mono leading-none truncate max-w-[200px]" title={data.portfolioPdfName || 'portfolio.pdf'}>
                          {data.portfolioPdfName || 'portfolio.pdf'}
                        </p>
                      </div>
                    </div>
                    <p className="text-[0.85rem] text-text-muted leading-relaxed font-sans">
                      {lang === 'en'
                        ? 'A compilation of selected works, projects, and detailed academic showcases.'
                        : 'Kompilasi karya pilihan, proyek, dan penjelasan akademis secara mendalam.'}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => openPdf(portfolioBlobUrl, data.portfolioPdf)}
                      className="flex-1 py-2 px-3 bg-bg3 text-text-custom hover:bg-border-custom rounded-lg font-heading text-[0.8rem] font-semibold border border-transparent cursor-pointer text-center transition-colors font-sans"
                    >
                      {lang === 'en' ? 'Open PDF' : 'Buka PDF'}
                    </button>
                    <button
                      onClick={() => downloadPdf(portfolioBlobUrl, data.portfolioPdf, data.portfolioPdfName || 'Portfolio_Mizael.pdf')}
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
