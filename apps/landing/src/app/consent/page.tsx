import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Согласие на обработку ПД — KUDINOV FILMS' }

export default function ConsentPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24">
      <h1 className="font-display text-2xl font-bold uppercase tracking-wider">
        Согласие на обработку персональных данных
      </h1>
      <div className="mt-8 space-y-4 text-sm font-light leading-relaxed text-dim">
        <p>
          В соответствии с Федеральным законом от 27.07.2006 г. № 152-ФЗ «О персональных данных»,
          я даю согласие ИП Кудинов Даниил на обработку моих персональных данных.
        </p>
        <h2 className="pt-4 font-display text-lg font-semibold uppercase tracking-wider text-white">
          Перечень данных
        </h2>
        <p>Фамилия, имя, адрес электронной почты, данные об обучении.</p>
        <h2 className="pt-4 font-display text-lg font-semibold uppercase tracking-wider text-white">
          Цели обработки
        </h2>
        <p>Предоставление образовательных услуг, информирование об обновлениях, аналитика.</p>
        <h2 className="pt-4 font-display text-lg font-semibold uppercase tracking-wider text-white">
          Срок действия
        </h2>
        <p>Согласие действует до момента его отзыва путём направления уведомления на kudinovfilms@gmail.com.</p>
      </div>
    </main>
  )
}
