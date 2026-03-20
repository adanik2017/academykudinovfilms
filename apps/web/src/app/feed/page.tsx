import { cookies } from 'next/headers'
import { createServerSupabase } from '@kf/db'
import { getPosts } from '@kf/db/queries/posts'
import { Card } from '@kf/ui'
import { Heart, MessageCircle } from 'lucide-react'

export default async function FeedPage() {
  const cookieStore = await cookies()
  const supabase = createServerSupabase(cookieStore)
  const { data: posts } = await getPosts(supabase)

  return (
    <div className="space-y-4 p-5">
      <h1 className="font-display text-xl font-semibold uppercase tracking-wider">Лента</h1>

      {posts && posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((post) => {
            const author = post.users as { name: string; avatar_url: string | null } | null

            return (
              <Card key={post.id}>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber/10 font-display text-xs text-amber">
                    {author?.name?.charAt(0)?.toUpperCase() ?? '?'}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{author?.name ?? 'Аноним'}</p>
                    <p className="text-[10px] text-muted">
                      {new Date(post.created_at).toLocaleDateString('ru-RU')}
                    </p>
                  </div>
                </div>
                {post.title && <h3 className="mt-3 text-sm font-medium">{post.title}</h3>}
                {post.content && <p className="mt-1 text-sm font-light text-dim">{post.content}</p>}
                <div className="mt-3 flex gap-4">
                  <button type="button" className="flex items-center gap-1 text-xs text-muted transition-colors hover:text-red">
                    <Heart size={14} /> {post.likes_count}
                  </button>
                  <button type="button" className="flex items-center gap-1 text-xs text-muted transition-colors hover:text-blue">
                    <MessageCircle size={14} /> {post.comments_count}
                  </button>
                </div>
              </Card>
            )
          })}
        </div>
      ) : (
        <p className="text-sm text-muted">Пока нет публикаций</p>
      )}
    </div>
  )
}
