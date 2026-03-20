'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { createServerSupabase } from '@kf/db'
import { getSession } from '@kf/auth/server'
import { createPost, toggleLike } from '@kf/db/queries/posts'

type Result = { data: null; error: null } | { data: null; error: string }

export async function createPostAction(input: { title?: string; content?: string; type?: 'homework' | 'film' | 'creative' }): Promise<Result> {
  try {
    const cookieStore = await cookies()
    const session = await getSession(cookieStore)
    if (!session) return { data: null, error: 'Не авторизован' }

    const supabase = createServerSupabase(cookieStore)
    const { error } = await createPost(supabase, { ...input, user_id: session.id })
    if (error) return { data: null, error: error.message }
    revalidatePath('/feed')
    return { data: null, error: null }
  } catch (e: unknown) {
    return { data: null, error: e instanceof Error ? e.message : 'Ошибка' }
  }
}

export async function toggleLikeAction(postId: string): Promise<Result> {
  try {
    const cookieStore = await cookies()
    const session = await getSession(cookieStore)
    if (!session) return { data: null, error: 'Не авторизован' }

    const supabase = createServerSupabase(cookieStore)
    await toggleLike(supabase, session.id, postId)
    revalidatePath('/feed')
    return { data: null, error: null }
  } catch (e: unknown) {
    return { data: null, error: e instanceof Error ? e.message : 'Ошибка' }
  }
}
