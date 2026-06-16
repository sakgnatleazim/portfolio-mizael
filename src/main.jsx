import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
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

function MainApp() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark'
  })

  const [portfolioData, setPortfolioData] = useState(() => {
    const saved = localStorage.getItem('portfolio_data')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error(e)
      }
    }
    return defaultPortfolioData
  })

  // Simple client-side SPA routing state
  const [route, setRoute] = useState(window.location.pathname)

  // Session login protection state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('admin_authenticated') === 'true'
  })

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  const handleSaveData = (newData) => {
    setPortfolioData(newData)
    localStorage.setItem('portfolio_data', JSON.stringify(newData))
  }

  const handleResetData = () => {
    setPortfolioData(defaultPortfolioData)
    localStorage.removeItem('portfolio_data')
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated')
    setIsAuthenticated(false)
    window.location.reload()
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

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
  }, [portfolioData, route])

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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainApp />
  </StrictMode>,
)
