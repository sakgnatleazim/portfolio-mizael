export default function Footer({ data }) {
  if (!data) return null

  return (
    <footer className="border-t border-border-custom p-8 text-center text-[0.78rem] text-text-muted font-mono flex flex-col gap-2 items-center">
      <div>{data.text}</div>
      <a
        href="/admin"
        onClick={(e) => {
          e.preventDefault()
          window.history.pushState({}, '', '/admin')
          window.dispatchEvent(new Event('popstate'))
        }}
        className="text-accent hover:underline no-underline text-xs mt-1"
      >
        Admin Panel
      </a>
    </footer>
  )
}
