import { cookies } from 'next/headers'
import { createServerSupabase } from '@kf/db'
import { getTariffs } from '@kf/db/queries/tariffs'
import { getLandingToolCategories } from '@kf/db/queries/landing'
import { getAcademies } from '@kf/db/queries/academies'
import { LandingTabs } from './_components/LandingTabs'

export default async function LandingEditorPage() {
  const cookieStore = await cookies()
  const supabase = createServerSupabase(cookieStore)

  const { data: tariffs } = await getTariffs(supabase)
  const { data: categories } = await getLandingToolCategories(supabase)
  const { data: academies } = await getAcademies(supabase)

  return (
    <div className="p-6">
      <h1 className="mb-1 font-display text-xl font-semibold uppercase tracking-wider">Лендинг</h1>
      <LandingTabs
        tariffs={tariffs ?? []}
        categories={categories ?? []}
        academies={academies ?? []}
      />
    </div>
  )
}
