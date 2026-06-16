export default function Navbar({ theme, onToggleTheme }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-nav-bg backdrop-blur-[12px] border-b border-border-custom px-8 h-[60px] flex items-center justify-between transition-colors duration-300">
      <span className="font-mono text-[0.9rem] text-accent tracking-[0.05em]">
        mizael
      </span>
      <ul className="flex items-center gap-8 list-none max-[680px]:hidden">
        <li>
          <a
            href="#about"
            className="text-[0.85rem] text-text-muted no-underline font-medium tracking-[0.03em] transition-colors duration-200 relative hover:text-text-custom after:content-[''] after:absolute after:-bottom-[2px] after:left-0 after:right-0 after:h-[1px] after:bg-accent after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-100"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#skills"
            className="text-[0.85rem] text-text-muted no-underline font-medium tracking-[0.03em] transition-colors duration-200 relative hover:text-text-custom after:content-[''] after:absolute after:-bottom-[2px] after:left-0 after:right-0 after:h-[1px] after:bg-accent after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-100"
          >
            Skills
          </a>
        </li>
        <li>
          <a
            href="#projects"
            className="text-[0.85rem] text-text-muted no-underline font-medium tracking-[0.03em] transition-colors duration-200 relative hover:text-text-custom after:content-[''] after:absolute after:-bottom-[2px] after:left-0 after:right-0 after:h-[1px] after:bg-accent after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-100"
          >
            Projects
          </a>
        </li>
        <li>
          <a
            href="#activities"
            className="text-[0.85rem] text-text-muted no-underline font-medium tracking-[0.03em] transition-colors duration-200 relative hover:text-text-custom after:content-[''] after:absolute after:-bottom-[2px] after:left-0 after:right-0 after:h-[1px] after:bg-accent after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-100"
          >
            Aktivitas
          </a>
        </li>
        <li>
          <a
            href="#organizations"
            className="text-[0.85rem] text-text-muted no-underline font-medium tracking-[0.03em] transition-colors duration-200 relative hover:text-text-custom after:content-[''] after:absolute after:-bottom-[2px] after:left-0 after:right-0 after:h-[1px] after:bg-accent after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-100"
          >
            Organisasi
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className="text-[0.85rem] text-text-muted no-underline font-medium tracking-[0.03em] transition-colors duration-200 relative hover:text-text-custom after:content-[''] after:absolute after:-bottom-[2px] after:left-0 after:right-0 after:h-[1px] after:bg-accent after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-100"
          >
            Kontak
          </a>
        </li>
      </ul>
      <button
        className="bg-transparent border border-border-custom rounded-lg px-2.5 py-1.5 cursor-pointer text-text-muted text-base transition-all duration-200 flex items-center hover:border-accent hover:text-accent"
        onClick={onToggleTheme}
        title="Toggle theme"
      >
        {theme === 'dark' ? '🌙' : '☀️'}
      </button>
    </nav>
  )
}
