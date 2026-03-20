import type { Metadata } from 'next'
import Link from 'next/link'
import { RegisterForm } from './_components/RegisterForm'

export const metadata: Metadata = { title: 'Регистрация — KUDINOV FILMS Academy' }

export default function RegisterPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(232,146,74,0.04)_0%,transparent_50%),radial-gradient(ellipse_at_70%_80%,rgba(126,184,247,0.03)_0%,transparent_50%)]" />

      <div className="relative z-10 flex w-full max-w-[420px] flex-col items-center px-5 py-10">
        <Link href="/" className="mb-10 text-center font-display text-[18px] font-bold uppercase tracking-[0.12em]">
          KUDINOV <span className="text-amber">FILMS</span> ACADEMY
        </Link>

        <div className="w-full rounded-[20px] border border-white/[0.08] bg-[linear-gradient(145deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.01)_100%),#0e0e0e] p-8 shadow-[0_4px_30px_rgba(0,0,0,0.4),0_12px_60px_rgba(0,0,0,0.3)] max-sm:rounded-2xl max-sm:px-5 max-sm:py-7">
          <h1 className="text-center font-display text-[28px] font-bold uppercase tracking-[0.04em] max-sm:text-2xl">
            Создать аккаунт
          </h1>
          <p className="mt-1.5 mb-7 text-center text-[13px] font-extralight text-white/[0.32]">
            Вступай в Академию ИИ-кинопроизводства
          </p>
          <RegisterForm />
        </div>

        <p className="mt-8 text-[11px] font-extralight text-white/[0.12]">
          © 2026 KUDINOV FILMS Academy
        </p>
      </div>
    </main>
  )
}
