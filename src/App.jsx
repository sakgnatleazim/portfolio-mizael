import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Activities from './components/Activities'
import Organizations from './components/Organizations'
import Certificates from './components/Certificates'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AdminPanel from './components/AdminPanel'
import AdminLogin from './components/AdminLogin'
import BackToTop from './components/BackToTop'
import { defaultPortfolioData, normalizePortfolioData } from './data/defaultPortfolioData'
import { supabase } from './supabaseClient'
import LoadingScreen from './components/LoadingScreen'

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark'
  })

  // Language state: 'id' or 'en' (automatically detects browser language on first visit)
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('lang')
    if (saved) return saved

    // Deteksi bahasa browser pengunjung
    const browserLang = navigator.language || navigator.userLanguage || ''
    if (browserLang.startsWith('id') || browserLang.startsWith('in')) {
      return 'id'
    }
    return 'en'
  })

  // Load from localStorage first, then sync with Supabase
  const [portfolioData, setPortfolioData] = useState(() => {
    const saved = localStorage.getItem('portfolio_data')
    if (saved) {
      try {
        return normalizePortfolioData(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to parse local portfolio data:', e)
      }
    }
    return defaultPortfolioData
  })

  const [loading, setLoading] = useState(true)
  const [showIntro, setShowIntro] = useState(true)

  // Simple client-side SPA routing state
  const [route, setRoute] = useState(window.location.pathname)

  // Session login protection state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('admin_authenticated') === 'true'
  })

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  const toggleLang = () => {
    setLang((prev) => {
      const next = prev === 'id' ? 'en' : 'id'
      localStorage.setItem('lang', next)
      return next
    })
  }

  const savePortfolioDataToLocalStorage = (data) => {
    try {
      localStorage.setItem('portfolio_data', JSON.stringify(data))
    } catch (e) {
      console.warn('Gagal menyimpan ke localStorage (kemungkinan ukuran data melebihi batas kuota 5MB):', e)
    }
  }

  const handleSaveData = async (newData) => {
    const normalized = normalizePortfolioData(newData)

    if (supabase) {
      try {
        const { error } = await supabase
          .from('portfolio')
          .upsert({ id: 1, data: normalized, updated_at: new Date() })

        if (error) {
          console.error('Gagal menyimpan ke Supabase:', error)
          let errorMsg = error.message
          if (errorMsg.includes('Failed to fetch') || errorMsg.includes('fetch')) {
            errorMsg += '\n\nKemungkinan penyebab:\n1. Adblocker / Brave Shields aktif dan memblokir request ke Supabase.\n2. Koneksi internet terputus.\n3. Masalah CORS atau VPN.'
          }
          alert('Perubahan disimpan di browser Anda, tetapi GAGAL sinkronisasi ke database: ' + errorMsg)
          // Still save to local storage as fallback
          setPortfolioData(normalized)
          savePortfolioDataToLocalStorage(normalized)
        } else {
          console.log('Sinkronisasi Supabase berhasil!')
          setPortfolioData(normalized)
          savePortfolioDataToLocalStorage(normalized)
          alert('Perubahan berhasil disimpan ke database!')
        }
      } catch (err) {
        console.error('Error saat menyimpan ke Supabase:', err)
        let errorMsg = err.message
        if (errorMsg.includes('Failed to fetch') || errorMsg.includes('fetch')) {
          errorMsg += '\n\nKemungkinan penyebab:\n1. Adblocker / Brave Shields aktif dan memblokir request ke Supabase.\n2. Koneksi internet terputus.\n3. Masalah CORS atau VPN.'
        }
        alert('Gagal terhubung ke database: ' + errorMsg + '\nPerubahan disimpan di browser Anda (offline).')
        // Still save to local storage as fallback
        setPortfolioData(normalized)
        savePortfolioDataToLocalStorage(normalized)
      }
    } else {
      setPortfolioData(normalized)
      savePortfolioDataToLocalStorage(normalized)
      alert('Perubahan berhasil disimpan secara lokal (Offline Mode).')
    }
  }

  const handleResetData = async () => {
    setPortfolioData(defaultPortfolioData)
    savePortfolioDataToLocalStorage(defaultPortfolioData)

    if (supabase) {
      try {
        const { error } = await supabase
          .from('portfolio')
          .upsert({ id: 1, data: defaultPortfolioData, updated_at: new Date() })

        if (error) {
          console.error('Gagal me-reset di Supabase:', error)
        } else {
          console.log('Reset Supabase berhasil!')
        }
      } catch (err) {
        console.error('Error saat me-reset di Supabase:', err)
      }
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated')
    setIsAuthenticated(false)
    window.location.reload()
  }

  // Effect to handle theme toggling
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  // Fetch from Supabase on mount
  useEffect(() => {
    async function fetchFromSupabase() {
      if (!supabase) {
        setLoading(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from('portfolio')
          .select('data')
          .eq('id', 1)
          .single()

        if (data && data.data) {
          const normalized = normalizePortfolioData(data.data)
          setPortfolioData(normalized)
          savePortfolioDataToLocalStorage(normalized)
        } else if (error && error.code === 'PGRST116') {
          // Row doesn't exist yet, upsert default
          console.log('Data tidak ditemukan di Supabase, meng-upsert default data...')
          await supabase
            .from('portfolio')
            .upsert({ id: 1, data: defaultPortfolioData })
        } else if (error) {
          console.error('Error memuat data dari Supabase:', error)
        }
      } catch (err) {
        console.error('Gagal mengambil data dari Supabase:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchFromSupabase()
  }, [])

  // Routing popstate listener
  useEffect(() => {
    const handleLocationChange = () => {
      setRoute(window.location.pathname)
    }
    window.addEventListener('popstate', handleLocationChange)
    return () => window.removeEventListener('popstate', handleLocationChange)
  }, [])

  // IntersectionObserver for scroll transitions
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    const els = document.querySelectorAll('.fade-in:not(.visible)')
    els.forEach((el) => observer.observe(el))

    return () => {
      observer.disconnect()
    }
  }, [portfolioData, route, loading, showIntro])

  // Translate data for rendering on the frontend
  const translatedHero = portfolioData.hero ? {
    ...portfolioData.hero,
    eyebrow: portfolioData.hero[`eyebrow_${lang}`] || portfolioData.hero.eyebrow_id || portfolioData.hero.eyebrow || '',
    title: portfolioData.hero[`title_${lang}`] || portfolioData.hero.title_id || portfolioData.hero.title || '',
    desc: portfolioData.hero[`desc_${lang}`] || portfolioData.hero.desc_id || portfolioData.hero.desc || '',
    ctaPrimaryText: portfolioData.hero[`ctaPrimaryText_${lang}`] || portfolioData.hero.ctaPrimaryText_id || portfolioData.hero.ctaPrimaryText || '',
    ctaOutlineText: portfolioData.hero[`ctaOutlineText_${lang}`] || portfolioData.hero.ctaOutlineText_id || portfolioData.hero.ctaOutlineText || ''
  } : {}

  const translatedAbout = portfolioData.about ? {
    ...portfolioData.about,
    title: portfolioData.about[`title_${lang}`] || portfolioData.about.title_id || portfolioData.about.title || '',
    text1: portfolioData.about[`text1_${lang}`] || portfolioData.about.text1_id || portfolioData.about.text1 || '',
    text2: portfolioData.about[`text2_${lang}`] || portfolioData.about.text2_id || portfolioData.about.text2 || '',
    text3: portfolioData.about[`text3_${lang}`] || portfolioData.about.text3_id || portfolioData.about.text3 || '',
    details: Array.isArray(portfolioData.about.details) ? portfolioData.about.details.map(d => ({
      ...d,
      label: d[`label_${lang}`] || d.label_id || d.label || '',
      value: d[`value_${lang}`] || d.value_id || d.value || ''
    })) : [],
    cvPdf: portfolioData.about.cvPdf || '',
    cvPdfName: portfolioData.about.cvPdfName || '',
    portfolioPdf: portfolioData.about.portfolioPdf || '',
    portfolioPdfName: portfolioData.about.portfolioPdfName || ''
  } : {}

  const translatedSkills = Array.isArray(portfolioData.skills) ? portfolioData.skills.map(s => ({
    ...s,
    level: s[`level_${lang}`] || s.level_id || s.level || ''
  })) : []

  const translatedProjects = Array.isArray(portfolioData.projects) ? portfolioData.projects.map(p => ({
    ...p,
    type: p[`type_${lang}`] || p.type_id || p.type || '',
    name: p[`name_${lang}`] || p.name_id || p.name || '',
    desc: p[`desc_${lang}`] || p.desc_id || p.desc || ''
  })) : []

  const translatedActivities = Array.isArray(portfolioData.activities) ? portfolioData.activities.map(a => ({
    ...a,
    title: a[`title_${lang}`] || a.title_id || a.title || '',
    desc: a[`desc_${lang}`] || a.desc_id || a.desc || ''
  })) : []

  const translatedOrganizations = Array.isArray(portfolioData.organizations) ? portfolioData.organizations.map(o => ({
    ...o,
    name: o[`name_${lang}`] || o.name_id || o.name || '',
    role: o[`role_${lang}`] || o.role_id || o.role || '',
    desc: o[`desc_${lang}`] || o.desc_id || o.desc || ''
  })) : []

  const translatedCertificates = Array.isArray(portfolioData.certificates) ? portfolioData.certificates.map(c => ({
    ...c,
    title: c[`title_${lang}`] || c.title_id || c.title || '',
    issuer: c[`issuer_${lang}`] || c.issuer_id || c.issuer || ''
  })) : []

  const translatedContact = portfolioData.contact ? {
    ...portfolioData.contact,
    title: portfolioData.contact[`title_${lang}`] || portfolioData.contact.title_id || portfolioData.contact.title || '',
    sub: portfolioData.contact[`sub_${lang}`] || portfolioData.contact.sub_id || portfolioData.contact.sub || ''
  } : {}

  const translatedFooter = portfolioData.footer ? {
    ...portfolioData.footer,
    text: portfolioData.footer[`text_${lang}`] || portfolioData.footer.text_id || portfolioData.footer.text || ''
  } : {}

  // Route: /admin
  if (route === '/admin') {
    if (isAuthenticated) {
      return (
        <>
          {showIntro && <LoadingScreen isLoading={loading} onFinished={() => setShowIntro(false)} />}
          {!loading && (
            <AdminPanel
              data={portfolioData}
              onSave={handleSaveData}
              onReset={handleResetData}
              onLogout={handleLogout}
            />
          )}
        </>
      )
    } else {
      return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />
    }
  }

  // Route: / (Homepage)
  return (
    <>
      {showIntro && <LoadingScreen isLoading={loading} onFinished={() => setShowIntro(false)} />}
      <Navbar theme={theme} onToggleTheme={toggleTheme} lang={lang} onToggleLang={toggleLang} />
      <Hero data={translatedHero} />
      <About data={translatedAbout} lang={lang} />
      <Skills data={translatedSkills} lang={lang} />
      <Projects data={translatedProjects} lang={lang} />
      <Activities data={translatedActivities} lang={lang} />
      <Organizations data={translatedOrganizations} lang={lang} />
      <Certificates data={translatedCertificates} lang={lang} />
      <Contact data={translatedContact} lang={lang} />
      <Footer data={translatedFooter} />
      <BackToTop />
    </>
  )
}
