import type { Client } from '../types'


export async function getUserSubscription(supabase: Client, userId: string) {
  return supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .single()
}

// Проверка доступа к академии по тарифу
export async function getUserAccess(supabase: Client, userId: string) {
  const { data: sub } = await getUserSubscription(supabase, userId)
  if (!sub) return { tariff: null, academyIds: [] as string[] }

  const { data: tariffs } = await supabase
    .from('tariffs')
    .select('academy_ids')
    .eq('name', sub.tariff)
    .single()

  return {
    tariff: sub.tariff,
    academyIds: (tariffs?.academy_ids ?? []) as string[],
  }
}
