export default function PagesPage() {
  return (
    <div className="space-y-6 p-6">
      <h1 className="font-display text-xl font-semibold uppercase tracking-wider">Страницы</h1>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {name:'Лендинг',desc:'Главная страница',views:'—',enabled:true},
          {name:'Дашборд',desc:'Панель студента',views:'—',enabled:true},
          {name:'Программа',desc:'Список академий',views:'—',enabled:true},
          {name:'Урок',desc:'Видеоплеер',views:'—',enabled:true},
          {name:'Лента',desc:'Работы студентов',views:'—',enabled:true},
          {name:'Профиль',desc:'Страница профиля',views:'—',enabled:true},
        ].map(p=>(
          <div key={p.name} className="rounded-xl border border-white/[0.08] bg-surface p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-display text-sm font-semibold">{p.name}</h3>
              <span className={`rounded px-2 py-0.5 text-[9px] uppercase ${p.enabled ? 'bg-green/10 text-green' : 'bg-red/10 text-red'}`}>
                {p.enabled ? 'Вкл' : 'Выкл'}
              </span>
            </div>
            <p className="text-[11px] text-white/30">{p.desc}</p>
            <p className="mt-2 text-[10px] text-white/20">Просмотры: {p.views}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
