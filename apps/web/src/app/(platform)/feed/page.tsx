import { cookies } from 'next/headers'
import { createServerSupabase } from '@kf/db'
import { getSession } from '@kf/auth/server'
import { getPosts } from '@kf/db/queries/posts'
import { Heart, MessageCircle, Eye, Bookmark, Share2, Search, Plus } from 'lucide-react'

export default async function FeedPage() {
  const cookieStore = await cookies()
  const session = await getSession(cookieStore)
  const supabase = createServerSupabase(cookieStore)
  const { data: posts } = await getPosts(supabase)

  return (
    <div className="flex gap-4 p-5 max-md:flex-col">
      {/* Основной контент */}
      <div className="flex flex-1 flex-col gap-4">
        {/* Хедер + фильтры */}
        <div className="flex items-center gap-3">
          <h1 className="font-display text-xl font-semibold uppercase tracking-wider">Лента</h1>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1.5">
              <Search size={13} className="text-white/30" />
              <input type="text" placeholder="Поиск..." className="w-24 bg-transparent text-xs font-light text-white outline-none placeholder:text-white/20" />
            </div>
            <button type="button" className="flex items-center gap-1.5 rounded-lg border border-amber/30 bg-amber/10 px-3 py-1.5 font-display text-[10px] font-semibold uppercase tracking-[0.06em] text-amber transition-all hover:bg-amber/20">
              <Plus size={12} />
              Опубликовать
            </button>
          </div>
        </div>

        {/* Фильтры */}
        <div className="flex gap-1.5">
          {['Все', 'Фильмы', 'Домашние задания', 'Творческие'].map((filter, i) => (
            <button key={filter} type="button" className={`rounded-full px-3 py-1 text-[10px] font-light uppercase tracking-[0.06em] transition-all ${i === 0 ? 'bg-white/[0.08] text-white' : 'text-white/30 hover:bg-white/[0.04] hover:text-white/50'}`}>
              {filter}
            </button>
          ))}
        </div>

        {/* Посты */}
        {posts && posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post) => {
              const author = post.users as { name: string; avatar_url: string | null } | null
              const initials = author?.name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) ?? '?'

              return (
                <article key={post.id} className="card-cinema overflow-hidden transition-transform duration-[450ms] hover:translate-y-[-2px]">
                  {/* Шапка поста */}
                  <div className="flex items-center gap-3 p-4 pb-0">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border-[1.5px] border-amber/30 bg-amber/[0.15] font-display text-[10px] font-semibold text-amber">
                      {initials}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium">{author?.name ?? 'Аноним'}</p>
                      <div className="mt-0.5 flex items-center gap-2 text-[10px] text-white/30">
                        <span className="rounded bg-amber/10 px-1.5 py-[1px] text-[8px] font-medium uppercase tracking-[0.06em] text-amber">
                          {post.type === 'film' ? 'Фильм' : post.type === 'homework' ? 'ДЗ' : 'Творческая'}
                        </span>
                        {new Date(post.created_at).toLocaleDateString('ru-RU')}
                      </div>
                    </div>
                    <button type="button" className="text-white/20 transition-colors hover:text-white/50">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><circle cx="3" cy="7" r="1.2" /><circle cx="7" cy="7" r="1.2" /><circle cx="11" cy="7" r="1.2" /></svg>
                    </button>
                  </div>

                  {/* Обложка */}
                  {post.image_url && (
                    <div className="relative mx-4 mt-3 aspect-video overflow-hidden rounded-lg border border-white/[0.06]">
                      <img src={post.image_url} alt={post.title ?? ''} className="h-full w-full object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm transition-transform hover:scale-110">
                          <div className="ml-1 h-0 w-0 border-y-[8px] border-l-[14px] border-y-transparent border-l-white" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Тело */}
                  <div className="p-4">
                    {post.title && <h3 className="mb-1 text-sm font-medium">{post.title}</h3>}
                    {post.content && <p className="text-xs font-light leading-[1.6] text-white/[0.55]">{post.content}</p>}
                  </div>

                  {/* Действия */}
                  <div className="flex items-center gap-1 border-t border-white/[0.04] px-4 py-2.5">
                    <button type="button" className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] text-white/40 transition-colors hover:bg-red/10 hover:text-red">
                      <Heart size={13} /> {post.likes_count}
                    </button>
                    <button type="button" className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] text-white/40 transition-colors hover:bg-blue/10 hover:text-blue">
                      <MessageCircle size={13} /> {post.comments_count}
                    </button>
                    <button type="button" className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] text-white/40 transition-colors hover:bg-white/5 hover:text-white/60">
                      <Eye size={13} /> 0
                    </button>
                    <div className="ml-auto flex items-center gap-1">
                      <button type="button" className="rounded-md p-1.5 text-white/25 transition-colors hover:bg-white/5 hover:text-white/50">
                        <Bookmark size={13} />
                      </button>
                      <button type="button" className="flex items-center gap-1 rounded-md px-2 py-1 text-[10px] text-white/30 transition-colors hover:bg-white/5 hover:text-white/50">
                        <Share2 size={11} /> Поделиться
                      </button>
                    </div>
                  </div>

                  {/* Комментарий */}
                  <div className="flex items-center gap-2.5 border-t border-white/[0.03] px-4 py-3">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-white/10 to-white/[0.02]" />
                    <input type="text" placeholder="Написать комментарий..." className="flex-1 bg-transparent text-xs font-light text-white outline-none placeholder:text-white/15" />
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          <div className="card-cinema flex flex-col items-center gap-4 p-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" className="h-8 w-8 text-white/20"><rect x="4" y="12" width="24" height="16" rx="2" /><path d="M4 16h24M9 12l3-6M15 12l3-6M21 12l3-6" /><circle cx="16" cy="22" r="3" /></svg>
            </div>
            <div>
              <p className="font-display text-sm font-semibold uppercase">Лента пуста</p>
              <p className="mt-1 text-xs text-white/25">Будь первым — опубликуй свою работу</p>
            </div>
            <button type="button" className="flex items-center gap-1.5 rounded-lg border border-amber/30 bg-amber/10 px-4 py-2 font-display text-xs font-semibold uppercase tracking-[0.06em] text-amber transition-all hover:bg-amber/20">
              <Plus size={14} /> Опубликовать работу
            </button>
          </div>
        )}
      </div>

      {/* Сайдбар */}
      <aside className="flex w-[284px] flex-col gap-3.5 max-md:w-full">
        <div className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-green" />
          <span className="text-[11px] text-white/40"><span className="font-display font-bold text-white/70">0</span> студентов онлайн</span>
        </div>

        <div className="card-cinema p-4">
          <div className="mb-3 text-[8px] font-normal uppercase tracking-[0.14em] text-white/[0.3]">Авторы недели</div>
          <p className="py-2 text-center text-xs text-white/20">Нет данных</p>
        </div>

        <div className="card-cinema p-4">
          <div className="mb-3 text-[8px] font-normal uppercase tracking-[0.14em] text-white/[0.3]">Активность</div>
          <p className="py-2 text-center text-xs text-white/20">Нет активности</p>
        </div>

        <div className="card-cinema p-4">
          <div className="mb-3 text-[8px] font-normal uppercase tracking-[0.14em] text-white/[0.3]">Челлендж недели</div>
          <p className="py-2 text-center text-xs text-white/20">Нет активных челленджей</p>
        </div>
      </aside>
    </div>
  )
}
