import type { Client } from '../types'


export async function getPosts(supabase: Client, limit = 20) {
  return supabase
    .from('posts')
    .select('*, users(name, avatar_url)')
    .is('deleted_at', null)
    .order('created_at', { ascending: false })
    .limit(limit)
}

export async function createPost(
  supabase: Client,
  input: { user_id: string; title?: string; content?: string; image_url?: string; type?: 'homework' | 'film' | 'creative' },
) {
  return supabase.from('posts').insert(input).select().single()
}

export async function toggleLike(supabase: Client, userId: string, postId: string) {
  const { data: existing } = await supabase
    .from('likes')
    .select('*')
    .eq('user_id', userId)
    .eq('post_id', postId)
    .single()

  if (existing) {
    await supabase.from('likes').delete().eq('user_id', userId).eq('post_id', postId)
    return { liked: false }
  }
  await supabase.from('likes').insert({ user_id: userId, post_id: postId })
  return { liked: true }
}
