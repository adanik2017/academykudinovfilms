'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signUp } from '@kf/auth/client'

export function RegisterForm() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '', referral: '', agreeTerms: false, agreeData: false })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function set(key: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.agreeTerms || !form.agreeData) { setError('Примите условия'); return }
    setError('')
    setLoading(true)

    const { error: err } = await signUp(form.email, form.password, form.name)
    if (err) { setError(err.message); setLoading(false); return }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-[11px] font-light uppercase tracking-[0.08em] text-white/[0.35]">Имя</label>
        <input id="name" type="text" placeholder="Даниил Кудинов" required value={form.name} onChange={(e) => set('name', e.target.value)}
          className="w-full rounded-[10px] border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm font-light text-white outline-none transition-colors placeholder:text-white/[0.18] focus:border-amber/40 focus:bg-white/[0.05]" />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-[11px] font-light uppercase tracking-[0.08em] text-white/[0.35]">Email</label>
        <input id="email" type="email" placeholder="name@email.com" required value={form.email} onChange={(e) => set('email', e.target.value)}
          className="w-full rounded-[10px] border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm font-light text-white outline-none transition-colors placeholder:text-white/[0.18] focus:border-amber/40 focus:bg-white/[0.05]" />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-[11px] font-light uppercase tracking-[0.08em] text-white/[0.35]">Пароль</label>
        <input id="password" type="password" placeholder="Минимум 8 символов" required minLength={8} value={form.password} onChange={(e) => set('password', e.target.value)}
          className="w-full rounded-[10px] border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm font-light text-white outline-none transition-colors placeholder:text-white/[0.18] focus:border-amber/40 focus:bg-white/[0.05]" />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="referral" className="text-[11px] font-light uppercase tracking-[0.08em] text-white/[0.35]">
          ID того, кто пригласил <span className="normal-case tracking-normal text-white/20">— необязательно</span>
        </label>
        <input id="referral" type="text" placeholder="Например: 4821" value={form.referral} onChange={(e) => set('referral', e.target.value)}
          className="w-full rounded-[10px] border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm font-light text-white outline-none transition-colors placeholder:text-white/[0.18] focus:border-amber/40 focus:bg-white/[0.05]" />
      </div>

      <label className="flex items-start gap-2.5 mt-1">
        <input type="checkbox" checked={form.agreeTerms} onChange={(e) => set('agreeTerms', e.target.checked)} className="mt-0.5 h-4 w-4 flex-shrink-0 accent-amber" />
        <span className="text-xs font-extralight leading-[1.5] text-white/40">
          Я принимаю{' '}
          <a href="/terms" target="_blank" className="text-amber underline underline-offset-2">пользовательское соглашение</a> и{' '}
          <a href="/privacy" target="_blank" className="text-amber underline underline-offset-2">политику конфиденциальности</a>
        </span>
      </label>

      <label className="flex items-start gap-2.5">
        <input type="checkbox" checked={form.agreeData} onChange={(e) => set('agreeData', e.target.checked)} className="mt-0.5 h-4 w-4 flex-shrink-0 accent-amber" />
        <span className="text-xs font-extralight leading-[1.5] text-white/40">
          Я даю{' '}
          <a href="/consent" target="_blank" className="text-amber underline underline-offset-2">согласие на обработку персональных данных</a>
        </span>
      </label>

      {error && (
        <div className="rounded-lg border border-red/15 bg-red/[0.08] px-3 py-2 text-xs font-light text-red">{error}</div>
      )}

      <button type="submit" disabled={!form.agreeTerms || !form.agreeData || loading}
        className="relative mt-1 w-full overflow-hidden rounded-[10px] bg-gradient-to-br from-amber to-[#d4793a] px-4 py-3.5 font-display text-[15px] font-semibold uppercase tracking-[0.06em] text-black shadow-[0_4px_20px_rgba(232,146,74,0.2)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_30px_rgba(232,146,74,0.3)] disabled:cursor-not-allowed disabled:opacity-50">
        {loading ? 'Создаём аккаунт...' : 'Зарегистрироваться'}
      </button>

      <div className="my-1 flex items-center gap-4">
        <div className="h-px flex-1 bg-white/[0.06]" />
        <span className="text-[11px] font-extralight uppercase tracking-[0.1em] text-white/20">или</span>
        <div className="h-px flex-1 bg-white/[0.06]" />
      </div>

      <button type="button"
        className="flex w-full items-center justify-center gap-2.5 rounded-[10px] border border-white/10 bg-white/[0.03] px-4 py-3 text-[13px] font-light text-white/70 transition-all hover:border-white/15 hover:bg-white/[0.06] hover:text-white">
        <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
        Войти через Google
      </button>

      <p className="mt-2 text-center text-[13px] font-extralight text-white/[0.3]">
        Уже есть аккаунт?{' '}
        <a href="/login" className="font-normal text-amber hover:underline">Войти</a>
      </p>
    </form>
  )
}
