'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Input } from '@kf/ui'
import { signUp } from '@kf/auth/client'

export function RegisterForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!agreed) { setError('Примите условия'); return }
    setError('')
    setLoading(true)

    const { error: err } = await signUp(email, password, name)
    if (err) {
      setError(err.message)
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <Input id="name" label="Имя" placeholder="Как вас зовут?" value={name} onChange={(e) => setName(e.target.value)} required />
      <Input id="email" label="Email" type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Input id="password" label="Пароль" type="password" placeholder="Минимум 6 символов" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
      <label className="flex items-start gap-2 text-xs font-light text-muted">
        <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 accent-amber" />
        <span>
          Я принимаю{' '}
          <a href="http://localhost:3000/terms" target="_blank" rel="noreferrer" className="text-amber hover:underline">условия</a>
          {' '}и{' '}
          <a href="http://localhost:3000/privacy" target="_blank" rel="noreferrer" className="text-amber hover:underline">политику конфиденциальности</a>
        </span>
      </label>
      {error && <p className="text-sm text-red">{error}</p>}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Создание...' : 'Создать аккаунт'}
      </Button>
      <p className="text-center text-xs text-muted">
        Уже есть аккаунт?{' '}
        <a href="/login" className="text-amber hover:underline">Войти</a>
      </p>
    </form>
  )
}
