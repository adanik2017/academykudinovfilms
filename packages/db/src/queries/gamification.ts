import type { Client } from '../types'


export async function getUserGamification(supabase: Client, userId: string) {
  return supabase
    .from('user_gamification')
    .select('*')
    .eq('user_id', userId)
    .single()
}

export async function getUserProgress(supabase: Client, userId: string) {
  return supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
}

export async function markLessonComplete(supabase: Client, userId: string, lessonId: string) {
  return supabase
    .from('user_progress')
    .upsert({
      user_id: userId,
      lesson_id: lessonId,
      completed: true,
      completed_at: new Date().toISOString(),
    })
}
