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
          className="bg-transparent border border-border-custom rounded-lg px-2.5 py-1.5 cursor-pointer text-text-muted text-[0.8rem] font-mono font-bold transition-all duration-200 flex items-center hover:border-accent hover:text-accent"
          onClick={onToggleLang}
          title="Ubah Bahasa / Switch Language"
        >
          {lang === 'id' ? '🇮🇩 ID' : '🇬🇧 EN'}
        </button>
        <button
          className="bg-transparent border border-border-custom rounded-lg px-2.5 py-1.5 cursor-pointer text-text-muted text-base transition-all duration-200 flex items-center hover:border-accent hover:text-accent"
          onClick={onToggleTheme}
          title="Toggle theme"
        >
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  )
}
