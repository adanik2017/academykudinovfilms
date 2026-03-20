'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Input } from '@kf/ui'
import { signIn } from '@kf/auth/client'

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error: err } = await signIn(email, password)
    if (err) {
      setError('Неверный email или пароль')
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <Input
        id="email"
        label="Email"
        type="email"
        placeholder="name@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        id="password"
        label="Пароль"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p className="text-sm text-red">{error}</p>}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Вход...' : 'Войти'}
      </Button>
      <p className="text-center text-xs text-muted">
        Нет аккаунта?{' '}
        <a href="/register" className="text-amber hover:underline">
          Зарегистрироваться
        </a>
      </p>
    </form>
  )
}
