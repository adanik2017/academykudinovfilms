export default function PagesPage() {
  const pages = [
    { name: 'Лендинг', desc: 'Публичная маркетинговая страница', views: '—', date: '20.03.2026', enabled: true, href: '/', iconBg: 'bg-amber/10', iconColor: 'text-amber' },
    { name: 'Авторизация', desc: 'Вход и регистрация', views: '—', date: '20.03.2026', enabled: true, iconBg: 'bg-blue/10', iconColor: 'text-blue' },
    { name: 'Дашборд', desc: 'Панель студента', views: '—', date: '20.03.2026', enabled: true, href: '/dashboard', iconBg: 'bg-green/10', iconColor: 'text-green' },
    { name: 'Программа', desc: 'Список академий и модулей', views: '—', date: '20.03.2026', enabled: true, href: '/program', iconBg: 'bg-purple/10', iconColor: 'text-purple' },
    { name: 'Урок', desc: 'Видеоплеер и контент', views: '—', date: '20.03.2026', enabled: true, iconBg: 'bg-blue/10', iconColor: 'text-blue' },
    { name: 'Лента', desc: 'Работы студентов', views: '—', date: '20.03.2026', enabled: true, href: '/feed', iconBg: 'bg-amber/10', iconColor: 'text-amber' },
    { name: 'Профиль', desc: 'Страница профиля студента', views: '—', date: '20.03.2026', enabled: true, iconBg: 'bg-green/10', iconColor: 'text-green' },
    { name: 'Админка', desc: 'Эта страница', views: '—', date: '20.03.2026', enabled: true, isCurrent: true, iconBg: 'bg-red/10', iconColor: 'text-red' },
  ]

  const analytics = [
    { label: 'Всего страниц', value: String(pages.length) },
    { label: 'Активных', value: String(pages.filter(p => p.enabled).length), color: 'text-green' },
    { label: 'Просмотров / день', value: '0' },
    { label: 'Ср. время на странице', value: '0 сек' },
  ]

  const system = [
    { label: 'Next.js', value: '15.5', color: 'text-green' },
    { label: 'React', value: '19', color: 'text-blue' },
    { label: 'Supabase', value: 'Онлайн', color: 'text-green' },
    { label: 'Node.js', value: '20', color: 'text-amber' },
  ]

  return (
    <div className="flex flex-col gap-4 p-5">
      <div>
        <h1 className="font-display text-[22px] font-bold uppercase tracking-[0.06em]">Страницы платформы</h1>
        <p className="mt-0.5 text-[13px] font-extralight text-white/[0.32]">Управление и аналитика</p>
      </div>

      {/* Таблица страниц */}
      <div className="rounded-2xl border border-white/[0.08] bg-surface p-5">
        <p className="mb-3.5 text-[8px] font-normal uppercase tracking-[0.14em] text-white/[0.3]">Все страницы</p>
        <div className="space-y-2 mt-3.5">
          {pages.map((p) => (
            <div key={p.name} className={`grid grid-cols-[44px_1fr_80px_70px_70px_80px] items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] p-3.5 transition-colors hover:bg-white/[0.04] ${p.isCurrent ? 'border-red/[0.12]' : ''}`}>
              <div className={`flex h-11 w-11 items-center justify-center rounded-[10px] ${p.iconBg}`}>
                <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.3" className={p.iconColor}>
                  <rect x="3" y="3" width="14" height="14" rx="3" /><path d="M7 8h6M7 11h4" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-normal">{p.name}</p>
                <p className="mt-0.5 text-[11px] font-extralight text-white/[0.32]">{p.desc}</p>
              </div>
              <p className="text-[11px] font-extralight text-white/[0.32] text-right">{p.date}</p>
              <p className="text-[13px] font-light text-white/60 text-right">{p.views}</p>
              <div className="flex justify-center">
                <div className={`h-5 w-9 rounded-full ${p.enabled ? 'bg-green/25' : 'bg-white/10'} relative`}>
                  <div className={`absolute top-[3px] h-3.5 w-3.5 rounded-full bg-white transition-all ${p.enabled ? 'left-[19px]' : 'left-[3px]'}`} />
                </div>
              </div>
              <div className="text-right">
                {p.isCurrent ? (
                  <span className="rounded-md border border-red/15 bg-transparent px-3 py-1 text-[10px] font-light text-red">Текущая</span>
                ) : p.href ? (
                  <span className="rounded-md border border-white/[0.06] bg-white/[0.04] px-3 py-1 text-[10px] font-light text-white/60 transition-colors hover:bg-white/[0.08]">Открыть</span>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics + System */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-white/[0.08] bg-surface p-5">
          <p className="mb-3 text-[8px] font-normal uppercase tracking-[0.14em] text-white/[0.3]">Аналитика страниц</p>
          {analytics.map((s) => (
            <div key={s.label} className="flex items-center justify-between border-b border-white/[0.05] py-2.5 last:border-b-0">
              <span className="text-[13px] font-extralight text-white/[0.32]">{s.label}</span>
              <span className={`font-display text-[22px] font-bold tracking-[0.02em] ${s.color ?? ''}`}>{s.value}</span>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-white/[0.08] bg-surface p-5">
          <p className="mb-3 text-[8px] font-normal uppercase tracking-[0.14em] text-white/[0.3]">Статус системы</p>
          {system.map((s) => (
            <div key={s.label} className="flex items-center justify-between border-b border-white/[0.05] py-2.5 last:border-b-0">
              <span className="text-[13px] font-extralight text-white/[0.32]">{s.label}</span>
              <span className={`font-display text-[22px] font-bold tracking-[0.02em] ${s.color ?? ''}`}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
