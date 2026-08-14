import { useState } from 'react'
import { supabase } from '../supabaseClient'

const initialForm = { name: '', email: '', message: '' }

export default function Contact({ data, lang }) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  if (!data) return null

  const t = (id, en) => (lang === 'en' ? en : id)

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = t('Nama wajib diisi', 'Name is required')
    if (!form.email.trim()) {
      next.email = t('Email wajib diisi', 'Email is required')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = t('Format email tidak valid', 'Invalid email format')
    }
    if (!form.message.trim()) next.message = t('Pesan wajib diisi', 'Message is required')
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('sending')

    if (supabase) {
      const { error } = await supabase.from('messages').insert({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      })

      if (error) {
        console.error('Gagal mengirim pesan ke Supabase:', error)
        setStatus('error')
        return
      }

      setStatus('success')
      setForm(initialForm)
      return
    }

    // No Supabase configured — fall back to opening the user's mail client
    window.location.href = `mailto:${data.email}?subject=${encodeURIComponent(
      `Pesan dari ${form.name}`
    )}&body=${encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)}`
    setStatus('success')
    setForm(initialForm)
  }

  return (
    <section id="contact" className="py-[100px] scroll-mt-[60px]">
      <div className="max-w-[900px] w-full mx-auto px-8">
        <div className="section-divider mb-16"></div>
        <div className="flex flex-col items-center text-center gap-6 fade-in">
          <p className="font-mono text-[0.75rem] text-accent tracking-[0.15em] uppercase mb-2">
            // contact
          </p>
          <h2 className="font-heading text-[clamp(1.8rem,4vw,2.8rem)] font-bold tracking-[-0.02em] text-text-custom">
            {data.title}
          </h2>
          <p className="text-text-muted max-w-[460px] text-[0.95rem]">
            {data.sub}
          </p>
          <div className="flex gap-4 flex-wrap justify-center mt-2">
            <a
              href={`mailto:${data.email}`}
              className="btn-glow inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-heading text-[0.9rem] font-medium no-underline transition-all duration-200 cursor-pointer border-none bg-accent text-[#fff] hover:opacity-85 hover:-translate-y-[1px]"
            >
              <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {lang === 'en' ? 'Email Me' : 'Email Saya'}
            </a>
            <a
              href={data.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-heading text-[0.9rem] font-medium no-underline transition-all duration-200 cursor-pointer bg-transparent border border-border-custom text-text-custom hover:border-accent hover:text-accent hover:-translate-y-[1px]"
            >
              LinkedIn
            </a>
            <a
              href={data.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-heading text-[0.9rem] font-medium no-underline transition-all duration-200 cursor-pointer bg-transparent border border-border-custom text-text-custom hover:border-accent hover:text-accent hover:-translate-y-[1px]"
            >
              GitHub
            </a>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="w-full max-w-[480px] mt-8 flex flex-col gap-4 text-left"
          >
            <div>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder={t('Nama Anda', 'Your name')}
                className="w-full bg-card-bg border border-border-custom rounded-lg px-4 py-2.5 text-[0.9rem] text-text-custom placeholder:text-text-muted outline-none transition-colors focus:border-accent"
              />
              {errors.name && <p className="text-[0.75rem] text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder={t('Email Anda', 'Your email')}
                className="w-full bg-card-bg border border-border-custom rounded-lg px-4 py-2.5 text-[0.9rem] text-text-custom placeholder:text-text-muted outline-none transition-colors focus:border-accent"
              />
              {errors.email && <p className="text-[0.75rem] text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder={t('Pesan Anda', 'Your message')}
                className="w-full bg-card-bg border border-border-custom rounded-lg px-4 py-2.5 text-[0.9rem] text-text-custom placeholder:text-text-muted outline-none transition-colors focus:border-accent resize-none"
              />
              {errors.message && <p className="text-[0.75rem] text-red-500 mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-glow inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-heading text-[0.9rem] font-medium no-underline transition-all duration-200 cursor-pointer border-none bg-accent text-[#fff] hover:opacity-85 hover:-translate-y-[1px] disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
            >
              {status === 'sending'
                ? t('Mengirim...', 'Sending...')
                : t('Kirim Pesan', 'Send Message')}
            </button>

            {status === 'success' && (
              <p className="text-[0.85rem] text-green-500 text-center">
                {t('Pesan berhasil dikirim! Terima kasih.', 'Message sent successfully! Thank you.')}
              </p>
            )}
            {status === 'error' && (
              <p className="text-[0.85rem] text-red-500 text-center">
                {t('Gagal mengirim pesan. Coba lagi nanti.', 'Failed to send message. Please try again later.')}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
