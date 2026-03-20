import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Пользовательское соглашение — KUDINOV FILMS' }

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24">
      <h1 className="font-display text-2xl font-bold uppercase tracking-wider">
        Пользовательское соглашение
      </h1>
      <div className="mt-8 space-y-4 text-sm font-light leading-relaxed text-dim">
        <p>Дата последнего обновления: 16 марта 2026 г.</p>
        <h2 className="pt-4 font-display text-lg font-semibold uppercase tracking-wider text-white">
          1. Общие положения
        </h2>
        <p>
          Настоящее соглашение регулирует использование платформы KUDINOV FILMS Academy,
          принадлежащей ИП Кудинов Даниил.
        </p>
        <h2 className="pt-4 font-display text-lg font-semibold uppercase tracking-wider text-white">
          2. Доступ к контенту
        </h2>
        <p>Доступ предоставляется после оплаты выбранного тарифа. Контент предназначен для личного использования.</p>
        <h2 className="pt-4 font-display text-lg font-semibold uppercase tracking-wider text-white">
          3. Возврат средств
        </h2>
        <p>Полный возврат возможен в течение 14 дней с момента оплаты.</p>
        <h2 className="pt-4 font-display text-lg font-semibold uppercase tracking-wider text-white">
          4. Ограничения
        </h2>
        <p>Запрещено распространение учебных материалов, передача доступа третьим лицам.</p>
      </div>
    </main>
  )
}
