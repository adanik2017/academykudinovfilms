import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Политика конфиденциальности — KUDINOV FILMS' }

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24">
      <h1 className="font-display text-2xl font-bold uppercase tracking-wider">
        Политика конфиденциальности
      </h1>
      <div className="mt-8 space-y-4 text-sm font-light leading-relaxed text-dim">
        <p>Дата последнего обновления: 16 марта 2026 г.</p>
        <p>
          ИП Кудинов Даниил (далее — «Оператор») обрабатывает персональные данные пользователей
          платформы KUDINOV FILMS Academy в соответствии с Федеральным законом № 152-ФЗ
          «О персональных данных».
        </p>
        <h2 className="pt-4 font-display text-lg font-semibold uppercase tracking-wider text-white">
          1. Какие данные мы собираем
        </h2>
        <p>Имя, адрес электронной почты, данные об обучении (прогресс, выполненные задания).</p>
        <h2 className="pt-4 font-display text-lg font-semibold uppercase tracking-wider text-white">
          2. Цели обработки
        </h2>
        <p>Предоставление доступа к платформе, отправка уведомлений, улучшение сервиса.</p>
        <h2 className="pt-4 font-display text-lg font-semibold uppercase tracking-wider text-white">
          3. Хранение и защита
        </h2>
        <p>Данные хранятся на защищённых серверах в России. Доступ ограничен.</p>
        <h2 className="pt-4 font-display text-lg font-semibold uppercase tracking-wider text-white">
          4. Права пользователя
        </h2>
        <p>Вы можете запросить удаление своих данных, написав на kudinovfilms@gmail.com.</p>
      </div>
    </main>
  )
}
