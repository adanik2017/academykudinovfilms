import type { Metadata } from 'next'
import { RegisterForm } from './_components/RegisterForm'

export const metadata: Metadata = { title: 'Регистрация — KUDINOV FILMS Academy' }

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-center font-display text-2xl font-bold uppercase tracking-wider">
          Регистрация
        </h1>
        <p className="mt-2 text-center text-sm font-light text-muted">
          Создайте аккаунт в KUDINOV FILMS Academy
        </p>
        <RegisterForm />
      </div>
    </main>
  )
}
