'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { createServerSupabase } from '@kf/db'
import { getSession } from '@kf/auth/server'
import { createAcademy, updateAcademy, deleteAcademy } from '@kf/db/queries/academies'
import { createModule, deleteModule } from '@kf/db/queries/modules'
import { createLesson, updateLesson, deleteLesson } from '@kf/db/queries/lessons'

type Result<T = null> = { data: T; error: null } | { data: null; error: string }

async function getAuthedSupabase() {
  const cookieStore = await cookies()
  const session = await getSession(cookieStore)
  if (!session || session.role !== 'superadmin') throw new Error('Нет доступа')
  const supabase = createServerSupabase(cookieStore)
  return { supabase, session }
}

// Академии
export async function createAcademyAction(input: { name: string; description?: string; color?: string }): Promise<Result> {
  try {
    const { supabase } = await getAuthedSupabase()
    const { error } = await createAcademy(supabase, input)
    if (error) return { data: null, error: error.message }
    revalidatePath('/content')
    return { data: null, error: null }
  } catch (e: unknown) {
    return { data: null, error: e instanceof Error ? e.message : 'Ошибка' }
  }
}

export async function updateAcademyAction(id: string, input: { name?: string; description?: string; color?: string }): Promise<Result> {
  try {
    const { supabase } = await getAuthedSupabase()
    const { error } = await updateAcademy(supabase, id, input)
    if (error) return { data: null, error: error.message }
    revalidatePath('/content')
    return { data: null, error: null }
  } catch (e: unknown) {
    return { data: null, error: e instanceof Error ? e.message : 'Ошибка' }
  }
}

export async function deleteAcademyAction(id: string): Promise<Result> {
  try {
    const { supabase } = await getAuthedSupabase()
    const { error } = await deleteAcademy(supabase, id)
    if (error) return { data: null, error: error.message }
    revalidatePath('/content')
    return { data: null, error: null }
  } catch (e: unknown) {
    return { data: null, error: e instanceof Error ? e.message : 'Ошибка' }
  }
}

// Модули
export async function createModuleAction(input: { academy_id: string; title: string }): Promise<Result> {
  try {
    const { supabase } = await getAuthedSupabase()
    const { error } = await createModule(supabase, input)
    if (error) return { data: null, error: error.message }
    revalidatePath(`/content/${input.academy_id}`)
    return { data: null, error: null }
  } catch (e: unknown) {
    return { data: null, error: e instanceof Error ? e.message : 'Ошибка' }
  }
}

export async function deleteModuleAction(id: string, academyId: string): Promise<Result> {
  try {
    const { supabase } = await getAuthedSupabase()
    const { error } = await deleteModule(supabase, id)
    if (error) return { data: null, error: error.message }
    revalidatePath(`/content/${academyId}`)
    return { data: null, error: null }
  } catch (e: unknown) {
    return { data: null, error: e instanceof Error ? e.message : 'Ошибка' }
  }
}

// Уроки
export async function createLessonAction(input: { module_id: string; title: string; type?: 'video' | 'practice' | 'project' | 'test' }, academyId: string): Promise<Result> {
  try {
    const { supabase } = await getAuthedSupabase()
    const { error } = await createLesson(supabase, input as Parameters<typeof createLesson>[1])
    if (error) return { data: null, error: error.message }
    revalidatePath(`/content/${academyId}/${input.module_id}`)
    return { data: null, error: null }
  } catch (e: unknown) {
    return { data: null, error: e instanceof Error ? e.message : 'Ошибка' }
  }
}

export async function updateLessonAction(id: string, input: Record<string, unknown>, path: string): Promise<Result> {
  try {
    const { supabase } = await getAuthedSupabase()
    const { error } = await updateLesson(supabase, id, input)
    if (error) return { data: null, error: error.message }
    revalidatePath(path)
    return { data: null, error: null }
  } catch (e: unknown) {
    return { data: null, error: e instanceof Error ? e.message : 'Ошибка' }
  }
}

export async function deleteLessonAction(id: string, path: string): Promise<Result> {
  try {
    const { supabase } = await getAuthedSupabase()
    const { error } = await deleteLesson(supabase, id)
    if (error) return { data: null, error: error.message }
    revalidatePath(path)
    return { data: null, error: null }
  } catch (e: unknown) {
    return { data: null, error: e instanceof Error ? e.message : 'Ошибка' }
  }
}
