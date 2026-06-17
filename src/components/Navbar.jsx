export default function Navbar({ theme, onToggleTheme, lang, onToggleLang }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-nav-bg backdrop-blur-[12px] border-b border-border-custom px-8 h-[60px] flex items-center justify-between transition-colors duration-300">
      <span className="font-mono text-[0.9rem] text-accent tracking-[0.05em]">
        mizaeltangkas
      </span>
      <ul className="flex items-center gap-8 list-none max-[800px]:hidden">
        <li>
          <a
            href="#about"
            className="text-[0.85rem] text-text-muted no-underline font-medium tracking-[0.03em] transition-colors duration-200 relative hover:text-text-custom after:content-[''] after:absolute after:-bottom-[2px] after:left-0 after:right-0 after:h-[1px] after:bg-accent after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-100"
          >
            {lang === 'en' ? 'About' : 'Tentang'}
          </a>
        </li>
        <li>
          <a
            href="#skills"
            className="text-[0.85rem] text-text-muted no-underline font-medium tracking-[0.03em] transition-colors duration-200 relative hover:text-text-custom after:content-[''] after:absolute after:-bottom-[2px] after:left-0 after:right-0 after:h-[1px] after:bg-accent after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-100"
          >
            {lang === 'en' ? 'Skills' : 'Keahlian'}
          </a>
        </li>
        <li>
          <a
            href="#projects"
            className="text-[0.85rem] text-text-muted no-underline font-medium tracking-[0.03em] transition-colors duration-200 relative hover:text-text-custom after:content-[''] after:absolute after:-bottom-[2px] after:left-0 after:right-0 after:h-[1px] after:bg-accent after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-100"
          >
            {lang === 'en' ? 'Projects' : 'Proyek'}
          </a>
        </li>
        <li>
          <a
            href="#activities"
            className="text-[0.85rem] text-text-muted no-underline font-medium tracking-[0.03em] transition-colors duration-200 relative hover:text-text-custom after:content-[''] after:absolute after:-bottom-[2px] after:left-0 after:right-0 after:h-[1px] after:bg-accent after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-100"
          >
            {lang === 'en' ? 'Activities' : 'Aktivitas'}
          </a>
        </li>
        <li>
          <a
            href="#organizations"
            className="text-[0.85rem] text-text-muted no-underline font-medium tracking-[0.03em] transition-colors duration-200 relative hover:text-text-custom after:content-[''] after:absolute after:-bottom-[2px] after:left-0 after:right-0 after:h-[1px] after:bg-accent after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-100"
          >
            {lang === 'en' ? 'Organizations' : 'Organisasi'}
          </a>
        </li>
        <li>
          <a
            href="#certificates"
            className="text-[0.85rem] text-text-muted no-underline font-medium tracking-[0.03em] transition-colors duration-200 relative hover:text-text-custom after:content-[''] after:absolute after:-bottom-[2px] after:left-0 after:right-0 after:h-[1px] after:bg-accent after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-100"
          >
            {lang === 'en' ? 'Certificates' : 'Sertifikat'}
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className="text-[0.85rem] text-text-muted no-underline font-medium tracking-[0.03em] transition-colors duration-200 relative hover:text-text-custom after:content-[''] after:absolute after:-bottom-[2px] after:left-0 after:right-0 after:h-[1px] after:bg-accent after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-100"
          >
            {lang === 'en' ? 'Contact' : 'Kontak'}
          </a>
        </li>
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
      </div>
    </nav>
  )
}
