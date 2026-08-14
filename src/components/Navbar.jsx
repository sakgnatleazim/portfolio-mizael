import { useEffect, useState } from 'react'

const NAV_ITEMS = [
  { id: 'about', label_id: 'Tentang', label_en: 'About' },
  { id: 'skills', label_id: 'Keahlian', label_en: 'Skills' },
  { id: 'projects', label_id: 'Proyek', label_en: 'Projects' },
  { id: 'activities', label_id: 'Aktivitas', label_en: 'Activities' },
  { id: 'organizations', label_id: 'Organisasi', label_en: 'Organizations' },
  { id: 'certificates', label_id: 'Sertifikat', label_en: 'Certificates' },
  { id: 'contact', label_id: 'Kontak', label_en: 'Contact' },
]

export default function Navbar({ theme, onToggleTheme, lang, onToggleLang }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeId, setActiveId] = useState('')

  // Scroll-spy: highlight the nav link for the section currently in view
  useEffect(() => {
    const sections = NAV_ITEMS
      .map((item) => document.getElementById(item.id))
      .filter(Boolean)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const handleNavClick = () => setMenuOpen(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-nav-bg backdrop-blur-[12px] border-b border-border-custom px-8 h-[60px] flex items-center justify-between transition-colors duration-300 max-[800px]:px-5">
      <span className="font-mono text-[0.9rem] text-accent tracking-[0.05em]">
        mizaeltangkas
      </span>

      <ul className="flex items-center gap-8 list-none max-[800px]:hidden">
        {NAV_ITEMS.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`text-[0.85rem] no-underline font-medium tracking-[0.03em] transition-colors duration-200 relative after:content-[''] after:absolute after:-bottom-[2px] after:left-0 after:right-0 after:h-[1px] after:bg-accent after:transition-transform after:duration-200 ${
                activeId === item.id
                  ? 'text-accent after:scale-x-100'
                  : 'text-text-muted hover:text-text-custom after:scale-x-0 hover:after:scale-x-100'
              }`}
            >
              {lang === 'en' ? item.label_en : item.label_id}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3">
        <button
          className="bg-transparent border border-border-custom rounded-lg px-2.5 py-1.5 cursor-pointer text-text-muted text-[0.75rem] font-mono font-bold transition-all duration-200 flex items-center hover:border-accent hover:text-accent tracking-wider"
          onClick={onToggleLang}
          title="Ubah Bahasa / Switch Language"
        >
          {lang === 'id' ? 'ID' : 'EN'}
        </button>
        <button
          className="bg-transparent border border-border-custom rounded-lg p-2 cursor-pointer text-text-muted transition-all duration-200 flex items-center hover:border-accent hover:text-accent"
          onClick={onToggleTheme}
          title="Toggle theme"
        >
          {theme === 'dark' ? (
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464-5.636a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-5.636 4.95a1 1 0 101.414-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM4.636 15.364a1 1 0 010-1.414l.707-.707a1 1 0 111.414 1.414l-.707.707a1 1 0 01-1.414 0zM4 10a1 1 0 100-2H3a1 1 0 000 2h1zm1.414-4.636a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        {/* Hamburger toggle — only visible on small screens */}
        <button
          className="hidden max-[800px]:flex bg-transparent border border-border-custom rounded-lg p-2 cursor-pointer text-text-muted transition-all duration-200 items-center hover:border-accent hover:text-accent"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`hidden max-[800px]:flex flex-col fixed top-[60px] left-0 right-0 bottom-0 bg-bg z-[99] transition-transform duration-300 ease-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}
      >
        <ul className="flex flex-col list-none p-6 gap-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.id} className="border-b border-border-custom last:border-none">
              <a
                href={`#${item.id}`}
                onClick={handleNavClick}
                className={`block py-4 text-[1rem] no-underline font-medium tracking-[0.02em] transition-colors duration-200 ${
                  activeId === item.id ? 'text-accent' : 'text-text-muted hover:text-text-custom'
                }`}
              >
                {lang === 'en' ? item.label_en : item.label_id}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
