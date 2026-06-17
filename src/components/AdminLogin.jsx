import { useState } from 'react'

export default function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username === 'admin' && password === 'Miza3lFT123!') {
      sessionStorage.setItem('admin_authenticated', 'true')
      onLoginSuccess()
    } else {
      setError('Username atau password salah!')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4 py-12 text-text-custom">
      <div className="bg-bg2 border border-border-custom w-full max-w-md p-8 rounded-2xl shadow-custom flex flex-col gap-6">
        <div className="text-center flex flex-col items-center">
          <span className="text-text-muted mb-2">
            <svg className="w-8 h-8 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m-2-2a2 2 0 00-2 2m2-2a2 2 0 002 2M12 11a1 1 0 100-2 1 1 0 000 2zm-2.03 5.97a9.08 9.08 0 001.5 1.5l.3.3a1 1 0 001.4 0l1.41-1.41a1 1 0 000-1.41l-.3-.3a9.08 9.08 0 00-1.5-1.5M15 7h.01M8 12a4 4 0 118 0 4 4 0 01-8 0z" />
            </svg>
          </span>
          <h2 className="font-heading font-bold text-2xl mt-1">Admin Login</h2>
          <p className="text-sm text-text-muted mt-1">Gunakan username dan password admin Anda</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-3 py-2 rounded-lg font-mono flex items-center gap-2">
              <svg className="w-4 h-4 fill-none stroke-current shrink-0" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-mono text-text-muted uppercase tracking-wider mb-1">Username</label>
            <input
              type="text"
              required
              className="w-full bg-bg3 border border-border-custom text-text-custom rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-text-muted uppercase tracking-wider mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full bg-bg3 border border-border-custom text-text-custom rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 px-4 py-2.5 bg-accent text-[#fff] hover:opacity-90 rounded-lg text-sm font-semibold transition-opacity cursor-pointer border-none"
          >
            Masuk
          </button>
        </form>

        <div className="text-center">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault()
              window.history.pushState({}, '', '/')
              window.dispatchEvent(new Event('popstate'))
            }}
            className="text-xs text-text-muted hover:text-accent no-underline transition-colors"
          >
            ← Kembali ke Homepage
          </a>
        </div>
      </div>
    </div>
  )
}
