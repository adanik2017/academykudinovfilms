import { createServerSupabase } from '@kf/db'
import { cookies } from 'next/headers'
import { getTariffs } from '@kf/db/queries/tariffs'

const accentColors: Record<string, { border: string; hoverShadow: string; btnHover: string; tabColor: string }> = {
  amber: {
    border: 'border-t-amber',
    hoverShadow: 'hover:shadow-[0_0_22px_3px_rgba(232,146,74,0.15),0_0_55px_12px_rgba(232,146,74,0.07)]',
    btnHover: 'hover:bg-amber hover:text-black hover:border-amber',
    tabColor: 'text-amber/50',
  },
  blue: {
    border: 'border-t-blue',
    hoverShadow: 'hover:shadow-[0_0_22px_3px_rgba(126,184,247,0.15),0_0_55px_12px_rgba(126,184,247,0.07)]',
    btnHover: 'hover:bg-blue hover:text-black hover:border-blue',
    tabColor: 'text-blue/50',
  },
  purple: {
    border: 'border-t-purple',
    hoverShadow: 'hover:shadow-[0_0_22px_3px_rgba(201,126,247,0.15),0_0_55px_12px_rgba(201,126,247,0.07)]',
    btnHover: 'hover:bg-purple hover:text-black hover:border-purple',
    tabColor: 'text-purple/50',
  },
  red: {
    border: 'border-t-red',
    hoverShadow: 'hover:shadow-[0_0_22px_3px_rgba(242,113,113,0.15),0_0_55px_12px_rgba(242,113,113,0.07)]',
    btnHover: 'hover:bg-red hover:text-black hover:border-red',
    tabColor: 'text-red/50',
  },
  green: {
    border: 'border-t-green',
    hoverShadow: 'hover:shadow-[0_0_22px_3px_rgba(94,207,126,0.15),0_0_55px_12px_rgba(94,207,126,0.07)]',
    btnHover: 'hover:bg-green hover:text-black hover:border-green',
    tabColor: 'text-green/50',
  },
}

// Фолбэк тарифы
const fallbackTariffs = [
  { id: '1', name: 'Оператор', price: 34900, period: 'навсегда', accent: 'amber', popular: false, features: ['1 академия на выбор', '40-50 видеоуроков + практика', 'Геймификация и ранг Оператор', 'Сертификат по окончании'] },
  { id: '2', name: 'Режиссёр', price: 69900, period: 'навсегда', accent: 'blue', popular: true, features: ['3 академии на выбор', '130-150 видеоуроков', 'Проверка заданий куратором', 'Групповые Q&A-сессии', 'Сертификат по каждой академии'] },
  { id: '3', name: 'Студия', price: 199900, period: 'навсегда', accent: 'red', popular: false, features: ['Все 5 академий', '210+ уроков + эксклюзив', 'Личный ментор на весь курс', 'Еженедельные 1-на-1 созвоны', 'Пожизненные обновления'] },
]

export async function Pricing() {
  const cookieStore = await cookies()
  const supabase = createServerSupabase(cookieStore)
  const { data: dbTariffs } = await getTariffs(supabase)

  const tariffs = (dbTariffs && dbTariffs.length > 0) ? dbTariffs : fallbackTariffs

  return (
    <section className="mx-auto max-w-[1100px] px-10 py-[100px] max-sm:px-5 max-sm:py-[60px]" id="pricing">
      <h2 className="text-center font-display text-[clamp(32px,5vw,50px)] font-bold uppercase tracking-[0.02em]">
        Тарифы
      </h2>
      <div className="mx-auto mt-0 mb-10 h-px w-10 bg-white/20" />
      <p className="mb-14 text-center text-[15px] text-white/[0.32]">
        Выберите подходящий формат обучения
      </p>

      <div className="grid gap-5 [perspective:1200px] sm:grid-cols-2 lg:grid-cols-3">
        {tariffs.map((tariff) => {
          const defaultAccent = { border: 'border-t-amber', hoverShadow: '', btnHover: 'hover:bg-amber hover:text-black hover:border-amber', tabColor: 'text-amber/50' }
          const accent = accentColors[tariff.accent ?? 'amber'] ?? defaultAccent
          const features = (tariff.features ?? []) as string[]

          return (
            <div
              key={tariff.id}
              className={`card-cinema relative overflow-hidden border-t-[3px] px-4 pt-9 pb-6 text-[13px] transition-transform hover:-translate-y-1 ${accent.border} ${accent.hoverShadow} ${tariff.popular ? 'bg-gradient-to-b from-blue/[0.06] to-surface' : ''}`}
            >
              {/* Таб сверху */}
              <div className={`absolute top-0 inset-x-0 border-b border-white/[0.04] bg-white/[0.02] px-6 py-2 font-display text-[10px] font-semibold uppercase tracking-[0.12em] ${accent.tabColor}`}>
                {tariff.name}
              </div>

              {tariff.popular && (
                <span className="absolute top-9 right-4 rounded-full border border-blue/25 bg-blue/[0.12] px-3 py-1 font-display text-[9px] font-semibold uppercase tracking-[0.1em] text-blue">
                  Популярный
                </span>
              )}

              <h3 className="mb-3 font-display text-[18px] font-semibold tracking-[0.04em]">{tariff.name}</h3>
              <div className="flex items-baseline gap-0.5">
                <span className="font-display text-[34px] font-bold tracking-[0.02em]">
                  {new Intl.NumberFormat('ru-RU').format(tariff.price)}
                </span>
                <span className="font-display text-[15px] font-medium text-white/[0.32]"> ₽</span>
              </div>
              <p className="mt-1 mb-6 text-xs text-white/[0.32]">доступ {tariff.period}</p>

              <ul className="mb-7 flex flex-col gap-2.5">
                {features.map((feature: string, fi: number) => (
                  <li key={fi} className="flex items-start gap-2 text-xs leading-[1.45] text-white/[0.82]">
                    <span className="font-bold text-white/50">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full rounded-lg border border-white/15 bg-transparent py-3.5 font-display text-sm font-semibold uppercase tracking-[0.06em] transition-all ${accent.btnHover}`}
                type="button"
              >
                Выбрать
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}
