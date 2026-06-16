import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Activities from './components/Activities'
import Organizations from './components/Organizations'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AdminPanel from './components/AdminPanel'
import AdminLogin from './components/AdminLogin'
import { defaultPortfolioData } from './data/defaultPortfolioData'
import { supabase } from './supabaseClient'

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark'
  })

  // Load from localStorage first, then sync with Supabase
  const [portfolioData, setPortfolioData] = useState(() => {
    const saved = localStorage.getItem('portfolio_data')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error('Failed to parse local portfolio data:', e)
      }
    }
    return defaultPortfolioData
  })

  const [loading, setLoading] = useState(true)

  // Simple client-side SPA routing state
  const [route, setRoute] = useState(window.location.pathname)

  // Session login protection state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('admin_authenticated') === 'true'
  })

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  const handleSaveData = async (newData) => {
    setPortfolioData(newData)
    localStorage.setItem('portfolio_data', JSON.stringify(newData))

    if (supabase) {
      try {
        const { error } = await supabase
          .from('portfolio')
          .upsert({ id: 1, data: newData, updated_at: new Date() })

        if (error) {
          console.error('Gagal menyimpan ke Supabase:', error)
          alert('Berhasil disimpan lokal, tetapi gagal sinkronisasi ke Supabase: ' + error.message)
        } else {
          console.log('Sinkronisasi Supabase berhasil!')
        }
      } catch (err) {
        console.error('Error saat menyimpan ke Supabase:', err)
      }
    }
  }

  const handleResetData = async () => {
    setPortfolioData(defaultPortfolioData)
    localStorage.setItem('portfolio_data', JSON.stringify(defaultPortfolioData))

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
          setPortfolioData(data.data)
          localStorage.setItem('portfolio_data', JSON.stringify(data.data))
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
  }, [portfolioData, route, loading])

  if (loading && supabase) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center text-text-custom font-mono">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm">Menghubungkan ke database...</p>
        </div>
      </div>
    )
  }

  // Route: /admin
  if (route === '/admin') {
    if (isAuthenticated) {
      return (
        <AdminPanel
          data={portfolioData}
          onSave={handleSaveData}
          onReset={handleResetData}
          onLogout={handleLogout}
        />
      )
    } else {
      return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />
    }
  }

  // Route: / (Homepage)
  return (
    <>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <Hero data={portfolioData.hero} />
      <About data={portfolioData.about} />
      <Skills data={portfolioData.skills} />
      <Projects data={portfolioData.projects} />
      <Activities data={portfolioData.activities} />
      <Organizations data={portfolioData.organizations} />
      <Contact data={portfolioData.contact} />
      <Footer data={portfolioData.footer} />
    </>
  )
}
