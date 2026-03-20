import type { Metadata } from 'next'
import { LoginForm } from './_components/LoginForm'

export const metadata: Metadata = { title: 'Вход — KUDINOV FILMS Academy' }

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-center font-display text-2xl font-bold uppercase tracking-wider">
          Вход
        </h1>
        <p className="mt-2 text-center text-sm font-light text-muted">
          Войдите в свой аккаунт KUDINOV FILMS
        </p>
        <LoginForm />
      </div>
    </main>
  )
}
