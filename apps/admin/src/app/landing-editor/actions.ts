'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { createServerSupabase } from '@kf/db'
import { getSession } from '@kf/auth/server'
import { createTariff, updateTariff, deleteTariff } from '@kf/db/queries/tariffs'
import { createLandingToolCategory, deleteLandingToolCategory, createLandingTool, deleteLandingTool } from '@kf/db/queries/landing'

type Result = { data: null; error: null } | { data: null; error: string }

async function getAuthedSupabase() {
  const cookieStore = await cookies()
  const session = await getSession(cookieStore)
  if (!session || session.role !== 'superadmin') throw new Error('Нет доступа')
  return createServerSupabase(cookieStore)
}

// Тарифы
export async function createTariffAction(input: { name: string; price: number; features?: string[]; accent?: string }): Promise<Result> {
  try {
    const supabase = await getAuthedSupabase()
    const { error } = await createTariff(supabase, input)
    if (error) return { data: null, error: error.message }
    revalidatePath('/landing-editor')
    return { data: null, error: null }
  } catch (e: unknown) {
    return { data: null, error: e instanceof Error ? e.message : 'Ошибка' }
  }
}

export async function updateTariffAction(id: string, input: Record<string, unknown>): Promise<Result> {
  try {
    const supabase = await getAuthedSupabase()
    const { error } = await updateTariff(supabase, id, input)
    if (error) return { data: null, error: error.message }
    revalidatePath('/landing-editor')
    return { data: null, error: null }
  } catch (e: unknown) {
    return { data: null, error: e instanceof Error ? e.message : 'Ошибка' }
  }
}

export async function deleteTariffAction(id: string): Promise<Result> {
  try {
    const supabase = await getAuthedSupabase()
    const { error } = await deleteTariff(supabase, id)
    if (error) return { data: null, error: error.message }
    revalidatePath('/landing-editor')
    return { data: null, error: null }
  } catch (e: unknown) {
    return { data: null, error: e instanceof Error ? e.message : 'Ошибка' }
  }
}

// Категории инструментов
export async function createToolCategoryAction(input: { name: string; color_var?: string; icon?: string }): Promise<Result> {
  try {
    const supabase = await getAuthedSupabase()
    const { error } = await createLandingToolCategory(supabase, input)
    if (error) return { data: null, error: error.message }
    revalidatePath('/landing-editor')
    return { data: null, error: null }
  } catch (e: unknown) {
    return { data: null, error: e instanceof Error ? e.message : 'Ошибка' }
  }
}

export async function deleteToolCategoryAction(id: string): Promise<Result> {
  try {
    const supabase = await getAuthedSupabase()
    const { error } = await deleteLandingToolCategory(supabase, id)
    if (error) return { data: null, error: error.message }
    revalidatePath('/landing-editor')
    return { data: null, error: null }
  } catch (e: unknown) {
    return { data: null, error: e instanceof Error ? e.message : 'Ошибка' }
  }
}

// Инструменты
export async function createToolAction(input: { category_id: string; name: string }): Promise<Result> {
  try {
    const supabase = await getAuthedSupabase()
    const { error } = await createLandingTool(supabase, input)
    if (error) return { data: null, error: error.message }
    revalidatePath('/landing-editor')
    return { data: null, error: null }
  } catch (e: unknown) {
    return { data: null, error: e instanceof Error ? e.message : 'Ошибка' }
  }
}

export async function deleteToolAction(id: string): Promise<Result> {
  try {
    const supabase = await getAuthedSupabase()
    const { error } = await deleteLandingTool(supabase, id)
    if (error) return { data: null, error: error.message }
    revalidatePath('/landing-editor')
    return { data: null, error: null }
  } catch (e: unknown) {
    return { data: null, error: e instanceof Error ? e.message : 'Ошибка' }
  }
}
