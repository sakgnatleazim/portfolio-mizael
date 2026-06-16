import { useState } from 'react'

export default function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username === 'admin' && password === 'admin') {
      sessionStorage.setItem('admin_authenticated', 'true')
      onLoginSuccess()
    } else {
      setError('Username atau password salah!')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4 py-12 text-text-custom">
      <div className="bg-bg2 border border-border-custom w-full max-w-md p-8 rounded-2xl shadow-custom flex flex-col gap-6">
        <div className="text-center">
          <span className="text-3xl">🔑</span>
          <h2 className="font-heading font-bold text-2xl mt-3">Admin Login</h2>
          <p className="text-sm text-text-muted mt-1">Gunakan username dan password admin Anda</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-3 py-2 rounded-lg font-mono">
              ⚠️ {error}
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
