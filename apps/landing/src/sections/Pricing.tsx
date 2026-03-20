import { createServerSupabase } from '@kf/db'
import { cookies } from 'next/headers'
import { getTariffs } from '@kf/db/queries/tariffs'

interface PlanFeature {
  text: string
  included: boolean
}

interface Plan {
  name: string
  price: string
  period: string
  accent: string
  tab: string
  cta: string
  popular: boolean
  features: PlanFeature[]
}

const fallbackPlans: Plan[] = [
  {
    name: 'Оператор', price: '34 900', period: 'доступ навсегда', accent: 'amber',
    tab: 'ОПЕРАТОР', cta: 'Выбрать', popular: false,
    features: [
      { text: '1 академия на выбор', included: true },
      { text: '40-50 видеоуроков + практика', included: true },
      { text: 'Геймификация и ранг Оператор', included: true },
      { text: 'Сертификат по окончании', included: true },
      { text: 'Обновления 1 год', included: true },
      { text: 'Проверка куратором', included: false },
      { text: 'CLASSIFIED', included: false },
    ],
  },
  {
    name: 'Режиссёр', price: '69 900', period: 'доступ навсегда', accent: 'blue',
    tab: '✳ РЕЖИССЁР', cta: 'Выбрать', popular: true,
    features: [
      { text: '3 академии на выбор', included: true },
      { text: '130-150 видеоуроков', included: true },
      { text: 'Проверка заданий куратором', included: true },
      { text: 'Групповые Q&A-сессии', included: true },
      { text: 'Ранг Режиссёр + полная геймификация', included: true },
      { text: 'Сертификат по каждой академии', included: true },
      { text: 'Обновления 2 года', included: true },
      { text: 'Личный ментор', included: false },
      { text: 'CLASSIFIED', included: false },
    ],
  },
  {
    name: 'Студия', price: '199 900', period: 'доступ навсегда', accent: 'red',
    tab: 'СТУДИЯ', cta: 'Вступить', popular: false,
    features: [
      { text: 'Все 5 академий + CLASSIFIED', included: true },
      { text: '210+ уроков + эксклюзивный контент', included: true },
      { text: 'Личный ментор на весь курс', included: true },
      { text: 'Еженедельные 1-на-1 созвоны', included: true },
      { text: 'Помощь с портфолио и карьерой', included: true },
      { text: 'Ранг Мастер + закрытое community', included: true },
      { text: 'Пожизненные обновления', included: true },
    ],
  },
]

const accentVars: Record<string, { css: string; tabCss: string; btnHover: string; glowHover: string; popBg: string }> = {
  amber: { css: '#e8924a', tabCss: 'rgba(232,146,74,0.5)', btnHover: 'hover:bg-amber hover:text-black hover:border-amber', glowHover: 'hover:shadow-[0_0_22px_3px_rgba(232,146,74,0.15),0_0_55px_12px_rgba(232,146,74,0.07)]', popBg: '' },
  blue: { css: '#7eb8f7', tabCss: 'rgba(126,184,247,0.5)', btnHover: 'hover:bg-blue hover:text-black hover:border-blue', glowHover: 'hover:shadow-[0_0_22px_3px_rgba(126,184,247,0.15),0_0_55px_12px_rgba(126,184,247,0.07)]', popBg: 'bg-gradient-to-b from-blue/[0.06] to-transparent' },
  purple: { css: '#c97ef7', tabCss: 'rgba(201,126,247,0.5)', btnHover: 'hover:bg-purple hover:text-black hover:border-purple', glowHover: 'hover:shadow-[0_0_22px_3px_rgba(201,126,247,0.15),0_0_55px_12px_rgba(201,126,247,0.07)]', popBg: '' },
  red: { css: '#f27171', tabCss: 'rgba(242,113,113,0.5)', btnHover: 'hover:bg-red hover:text-black hover:border-red', glowHover: 'hover:shadow-[0_0_22px_3px_rgba(242,113,113,0.15),0_0_55px_12px_rgba(242,113,113,0.07)]', popBg: '' },
}

export async function Pricing() {
  const cookieStore = await cookies()
  const supabase = createServerSupabase(cookieStore)
  const { data: dbTariffs } = await getTariffs(supabase)

  // Конвертируем тарифы из БД в формат Plan, или используем фолбэк
  let plans = fallbackPlans
  if (dbTariffs && dbTariffs.length > 0) {
    const TAB_MAP: Record<string, string> = { 'Оператор': 'ОПЕРАТОР', 'Режиссёр': '✳ РЕЖИССЁР', 'Студия': 'СТУДИЯ' }
    const CTA_MAP: Record<string, string> = { 'Оператор': 'Выбрать', 'Режиссёр': 'Выбрать', 'Студия': 'Вступить' }
    plans = dbTariffs.map((t) => ({
      name: t.name,
      price: new Intl.NumberFormat('ru-RU').format(t.price),
      period: `доступ ${t.period}`,
      accent: t.accent,
      tab: TAB_MAP[t.name] ?? t.name.toUpperCase(),
      cta: CTA_MAP[t.name] ?? 'Выбрать',
      popular: t.popular,
      features: ((t.features ?? []) as string[]).map((f: string) => ({ text: f, included: true })),
    }))
  }

  return (
    <section className="mx-auto max-w-[1320px] px-10 py-[100px] max-sm:px-5 max-sm:py-[60px]" id="pricing">
      <h2 className="text-center font-display text-[clamp(32px,5vw,50px)] font-bold uppercase tracking-[0.02em]">
        Тарифы
      </h2>
      <div className="mx-auto mt-0 mb-3 h-px w-10 bg-white/20" />
      <p className="mb-14 text-center text-[15px] text-white/[0.32]">
        Выберите подходящий формат обучения
      </p>

      <div className="mx-auto grid max-w-[1100px] gap-5 [perspective:1200px] max-[960px]:max-w-[400px] max-[960px]:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => {
          const defaultAv = { css: '#e8924a', tabCss: 'rgba(232,146,74,0.5)', btnHover: 'hover:bg-amber hover:text-black hover:border-amber', glowHover: '', popBg: '' }
          const av = accentVars[plan.accent] ?? defaultAv
          return (
            <div
              key={plan.name}
              className={`card-cinema relative overflow-hidden rounded-2xl pt-9 pb-[22px] px-4 text-[13px] transition-transform duration-[450ms] hover:-translate-y-1 ${av.glowHover} ${plan.popular ? av.popBg : ''}`}
              style={{ '--pkg-accent': av.css, borderTopWidth: '3px', borderTopColor: av.css } as React.CSSProperties}
            >
              {/* Таб */}
              <div
                className="absolute inset-x-0 top-0 rounded-t-2xl border-b border-white/[0.04] bg-white/[0.02] px-6 py-2 font-display text-[10px] font-semibold uppercase tracking-[0.12em]"
                style={{ color: av.tabCss }}
              >
                {plan.tab}
              </div>

              {plan.popular && (
                <span className="absolute right-4 top-9 rounded-full border border-blue/25 bg-blue/[0.12] px-3 py-1 font-display text-[9px] font-semibold uppercase tracking-[0.1em] text-blue">
                  Популярный
                </span>
              )}

              <div className="mb-3 font-display text-[18px] font-semibold tracking-[0.04em]">{plan.name}</div>
              <div className="flex items-baseline gap-0.5">
                <span className="font-display text-[34px] font-bold tracking-[0.02em]">{plan.price}</span>
                <span className="font-display text-[15px] font-medium text-white/[0.32]"> ₽</span>
              </div>
              <div className="mt-1 mb-6 text-xs text-white/[0.32]">{plan.period}</div>

              <ul className="mb-7 flex flex-col gap-2.5">
                {plan.features.map((f, fi) => (
                  <li key={fi} className={`flex items-start gap-2 text-xs leading-[1.45] ${f.included ? 'text-white/[0.82]' : 'text-white/25'}`}>
                    <span className={`font-bold flex-shrink-0 ${f.included ? 'text-white/50' : 'text-white/15'}`}>
                      {f.included ? '✓' : '✗'}
                    </span>
                    {f.text}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full rounded-lg border border-white/15 bg-transparent py-3.5 font-display text-sm font-semibold uppercase tracking-[0.06em] transition-all ${av.btnHover}`}
                type="button"
              >
                {plan.cta}
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}
