'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { createServerSupabase } from '@kf/db'
import { getSession } from '@kf/auth/server'
import { updateUserProfile } from '@kf/db/queries/users'

type Result = { data: null; error: null } | { data: null; error: string }

export async function updateStudentAction(id: string, input: { name?: string; role?: string; bio?: string }): Promise<Result> {
  try {
    const cookieStore = await cookies()
    const session = await getSession(cookieStore)
    if (!session || session.role !== 'superadmin') return { data: null, error: 'Нет доступа' }

    const supabase = createServerSupabase(cookieStore)
    const { error } = await updateUserProfile(supabase, id, input as Parameters<typeof updateUserProfile>[2])
    if (error) return { data: null, error: error.message }
    revalidatePath('/students')
    return { data: null, error: null }
  } catch (e: unknown) {
    return { data: null, error: e instanceof Error ? e.message : 'Ошибка' }
  }
}
