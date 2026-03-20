import { cookies } from 'next/headers'
import { createServerSupabase } from '@kf/db'
import { getTariffs } from '@kf/db/queries/tariffs'
import { getLandingToolCategories } from '@kf/db/queries/landing'
import { Card } from '@kf/ui'

export default async function LandingEditorPage() {
  const cookieStore = await cookies()
  const supabase = createServerSupabase(cookieStore)

  const { data: tariffs } = await getTariffs(supabase)
  const { data: categories } = await getLandingToolCategories(supabase)

  return (
    <div className="space-y-8 p-6">
      <h1 className="font-display text-xl font-semibold uppercase tracking-wider">Управление лендингом</h1>

      {/* Тарифы */}
      <section>
        <h2 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-muted">Тарифы</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {tariffs?.map((t) => (
            <Card key={t.id}>
              <h3 className="font-display text-lg font-semibold uppercase">{t.name}</h3>
              <p className="font-display text-2xl font-bold text-amber">
                {new Intl.NumberFormat('ru-RU').format(t.price)} ₽
              </p>
              <p className="text-xs text-muted">{t.features?.length ?? 0} фич</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Инструменты */}
      <section>
        <h2 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-muted">Инструменты</h2>
        <div className="space-y-3">
          {categories?.map((cat) => (
            <Card key={cat.id}>
              <h3 className="text-sm font-medium">{cat.name}</h3>
              <p className="text-xs text-muted">
                {(cat.landing_tools as unknown[])?.length ?? 0} инструментов
              </p>
            </Card>
          ))}
          {(!categories || categories.length === 0) && (
            <p className="text-sm text-muted">Нет категорий</p>
          )}
        </div>
      </section>
    </div>
  )
}
