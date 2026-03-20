import { createServerSupabase } from '@kf/db'
import { cookies } from 'next/headers'
import { getTariffs } from '@kf/db/queries/tariffs'
import { Button } from '@kf/ui'
import { cn } from '@kf/ui'

export async function Pricing() {
  const cookieStore = await cookies()
  const supabase = createServerSupabase(cookieStore)
  const { data: tariffs } = await getTariffs(supabase)

  return (
    <section id="pricing" className="mx-auto max-w-5xl px-4 py-24">
      <h2 className="text-center font-display text-2xl font-semibold uppercase tracking-wider md:text-3xl">
        Тарифы
      </h2>
      <p className="mt-4 text-center text-sm font-light text-dim">
        Выбери свой путь в ИИ-кинопроизводстве
      </p>
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {tariffs?.map((tariff) => (
          <div
            key={tariff.id}
            className={cn(
              'relative rounded-2xl border border-border-light bg-surface p-6',
              tariff.popular && 'border-amber/30 shadow-[0_0_30px_rgba(232,146,74,0.06)]',
            )}
          >
            {tariff.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-black">
                Популярный
              </span>
            )}
            <h3 className="font-display text-xl font-semibold uppercase tracking-wider">
              {tariff.name}
            </h3>
            <p className="mt-4 font-display text-3xl font-bold">
              {new Intl.NumberFormat('ru-RU').format(tariff.price)} ₽
            </p>
            <p className="text-xs text-muted">{tariff.period}</p>
            <ul className="mt-6 space-y-2">
              {tariff.features?.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm font-light text-dim">
                  <span className="mt-0.5 text-amber">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <Button className="mt-6 w-full" variant={tariff.popular ? 'primary' : 'secondary'}>
              Выбрать
            </Button>
          </div>
        ))}
        {(!tariffs || tariffs.length === 0) && (
          <p className="col-span-3 text-center text-sm text-muted">Тарифы скоро появятся</p>
        )}
      </div>
    </section>
  )
}
