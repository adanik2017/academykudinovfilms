'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { createServerSupabase } from '@kf/db'
import { getSession } from '@kf/auth/server'
import { markLessonComplete } from '@kf/db/queries/gamification'

type Result = { data: null; error: null } | { data: null; error: string }

export async function completeLessonAction(lessonId: string): Promise<Result> {
  try {
    const cookieStore = await cookies()
    const session = await getSession(cookieStore)
    if (!session) return { data: null, error: 'Не авторизован' }

    const supabase = createServerSupabase(cookieStore)
    const { error } = await markLessonComplete(supabase, session.id, lessonId)
    if (error) return { data: null, error: error.message }
    revalidatePath(`/lesson/${lessonId}`)
    revalidatePath('/dashboard')
    return { data: null, error: null }
  } catch (e: unknown) {
    return { data: null, error: e instanceof Error ? e.message : 'Ошибка' }
  }
}
