export default function SettingsPage() {
  const sections = [
    {
      title: 'Платформа',
      rows: [
        { label: 'Название', desc: 'Отображается в навбаре', value: 'KUDINOV FILMS Academy' },
        { label: 'Домен', desc: 'Основной домен', value: 'kudinovfilms.ru (не привязан)' },
        { label: 'Supabase', desc: 'Статус подключения', value: 'Подключён', valueColor: 'text-green' },
        { label: 'Сервер', desc: 'VPS Timeweb, Москва', value: '5.129.203.13' },
      ],
    },
    {
      title: 'Авторизация',
      rows: [
        { label: 'Email + пароль', desc: 'Основной метод', value: 'Включён', valueColor: 'text-green' },
        { label: 'Google OAuth', desc: 'Нужна настройка в Supabase', value: 'Не настроен', valueColor: 'text-amber' },
        { label: 'Telegram', desc: 'Вход через Telegram', value: 'Не подключён', valueColor: 'text-white/30' },
      ],
    },
    {
      title: 'Интеграции',
      rows: [
        { label: 'ЮKassa', desc: 'Приём платежей', value: 'Не подключена', valueColor: 'text-red' },
        { label: 'Unisender', desc: 'Email-рассылки', value: 'Не подключён', valueColor: 'text-white/30' },
        { label: 'Telegram Bot', desc: 'Уведомления', value: 'Не подключён', valueColor: 'text-white/30' },
      ],
    },
    {
      title: 'Безопасность',
      rows: [
        { label: 'SSL', desc: 'HTTPS сертификат', value: 'Нет', valueColor: 'text-red' },
        { label: 'Бэкапы', desc: 'PostgreSQL', value: 'Не настроены', valueColor: 'text-amber' },
        { label: 'RLS', desc: '65 политик безопасности', value: 'Включён', valueColor: 'text-green' },
      ],
    },
  ]

  return (
    <div className="space-y-6 p-6">
      <h1 className="font-display text-xl font-semibold uppercase tracking-wider">Настройки</h1>

      {sections.map((section) => (
        <div key={section.title} className="rounded-xl border border-white/[0.08] bg-surface p-5">
          <h2 className="mb-4 text-[8px] font-normal uppercase tracking-[0.14em] text-white/[0.3]">{section.title}</h2>
          <div className="space-y-0">
            {section.rows.map((row) => (
              <div key={row.label} className="flex items-center justify-between border-b border-white/[0.04] py-3 last:border-b-0">
                <div>
                  <p className="text-xs font-medium">{row.label}</p>
                  <p className="text-[10px] text-white/25">{row.desc}</p>
                </div>
                <span className={`text-xs ${row.valueColor ?? 'text-white/60'}`}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="rounded-xl border border-white/[0.08] bg-surface p-5">
        <h2 className="mb-4 text-[8px] font-normal uppercase tracking-[0.14em] text-white/[0.3]">Действия</h2>
        <div className="flex gap-3">
          <button type="button" className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-xs transition-all hover:bg-white/[0.06]">
            Очистить кэш
          </button>
          <button type="button" className="rounded-lg border border-amber/30 bg-amber/10 px-4 py-2 text-xs text-amber transition-all hover:bg-amber/20">
            Сохранить
          </button>
        </div>
      </div>
    </div>
  )
}
