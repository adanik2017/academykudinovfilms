export default function TelegramPage() {
  return (
    <div className="flex flex-col gap-4 p-5">
      {/* Bot header */}
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-surface p-6">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[rgba(0,136,204,0.06)] via-[rgba(0,136,204,0.02)] to-transparent" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#0088cc] to-[#0077b5] shadow-[0_4px_16px_rgba(0,136,204,0.25)]">
            <svg viewBox="0 0 24 24" fill="#fff" width="26" height="26"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" /></svg>
          </div>
          <div>
            <h1 className="font-display text-[20px] font-bold tracking-[0.04em]">KudinovFilms Bot</h1>
            <p className="mt-0.5 text-xs font-extralight text-[rgba(0,180,255,0.7)]">@kudinovfilms_academy_bot</p>
            <div className="mt-1.5 flex items-center gap-2">
              <span className="text-[10px] font-light uppercase tracking-[0.06em] text-white/[0.32]">Не подключён</span>
            </div>
          </div>
          <div className="ml-auto flex gap-2">
            <button type="button" className="rounded-lg border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-light text-white/60 transition-all hover:bg-white/[0.08]">Перезапуск</button>
            <button type="button" className="rounded-lg border border-[rgba(0,136,204,0.3)] bg-[rgba(0,136,204,0.12)] px-4 py-2 text-xs font-light text-[rgba(0,180,255,0.9)] transition-all hover:bg-[rgba(0,136,204,0.2)]">Настроить</button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { v: '0', l: 'Подписчиков' },
          { v: '0', l: 'Сообщений / день' },
          { v: '0', l: 'Команд / день' },
          { v: '0', l: 'Привязано аккаунтов' },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl border border-white/[0.08] bg-surface p-4 text-center">
            <p className="font-display text-[28px] font-bold tracking-[0.02em] text-white/[0.32]">{s.v}</p>
            <p className="mt-1 text-[10px] font-light uppercase tracking-[0.08em] text-white/[0.32]">{s.l}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Каналы */}
        <div className="rounded-2xl border border-white/[0.08] bg-surface p-5">
          <p className="mb-3.5 text-[8px] font-normal uppercase tracking-[0.14em] text-white/[0.3]">Каналы уведомлений</p>
          <div className="space-y-1.5">
            {[
              { name: 'Алерты неактивности', desc: 'Студент не заходил 3+ дня', color: 'bg-amber/20' },
              { name: 'Новые оплаты', desc: 'Уведомление при оплате', color: 'bg-green/20' },
              { name: 'Дедлайны', desc: 'Напоминания за 3 дня и 1 день', color: 'bg-blue/20' },
            ].map((ch) => (
              <div key={ch.name} className="flex items-center justify-between rounded-[10px] border border-white/[0.05] bg-white/[0.02] p-3 transition-colors hover:bg-white/[0.04]">
                <div className="flex items-center gap-2.5">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${ch.color}`}>
                    <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"><circle cx="8" cy="8" r="7" /><path d="M8 5v3l2 2" /></svg>
                  </div>
                  <div>
                    <p className="text-[13px] font-light">{ch.name}</p>
                    <p className="text-[10px] font-extralight text-white/[0.32]">{ch.desc}</p>
                  </div>
                </div>
                <div className="h-5 w-9 rounded-full bg-white/10" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {/* Команды */}
          <div className="rounded-2xl border border-white/[0.08] bg-surface p-5">
            <p className="mb-3.5 text-[8px] font-normal uppercase tracking-[0.14em] text-white/[0.3]">Команды бота</p>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { name: '/start', desc: 'Привязка аккаунта' },
                { name: '/progress', desc: 'Прогресс обучения' },
                { name: '/frames', desc: 'Баланс фреймов' },
                { name: '/deadline', desc: 'Ближайший дедлайн' },
                { name: '/rank', desc: 'Текущий ранг' },
                { name: '/help', desc: 'Список команд' },
              ].map((cmd) => (
                <div key={cmd.name} className="rounded-[10px] border border-white/[0.05] bg-white/[0.02] p-3.5">
                  <p className="font-display text-sm tracking-[0.04em] text-[rgba(0,180,255,0.8)]">{cmd.name}</p>
                  <p className="mt-0.5 text-[11px] font-extralight leading-[1.35] text-white/[0.32]">{cmd.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Рассылки */}
          <div className="rounded-2xl border border-white/[0.08] bg-surface p-5">
            <p className="mb-3.5 text-[8px] font-normal uppercase tracking-[0.14em] text-white/[0.3]">Рассылки</p>
            <div className="space-y-1.5">
              {[
                { name: 'Дайджест (еженед.)', desc: 'Прогресс и новости' },
                { name: 'Мотивация', desc: 'Пн, Ср, Пт' },
                { name: 'Новые уроки', desc: 'При публикации' },
              ].map((nl) => (
                <div key={nl.name} className="flex items-center justify-between rounded-[10px] border border-white/[0.05] bg-white/[0.02] p-3">
                  <div>
                    <p className="text-[13px] font-light">{nl.name}</p>
                    <p className="text-[10px] font-extralight text-white/[0.32]">{nl.desc}</p>
                  </div>
                  <div className="h-5 w-9 rounded-full bg-white/10" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Лог */}
      <div className="rounded-2xl border border-white/[0.08] bg-surface p-5">
        <p className="mb-3.5 text-[8px] font-normal uppercase tracking-[0.14em] text-white/[0.3]">Последние события</p>
        <p className="py-6 text-center text-[13px] font-extralight text-white/[0.32]">Нет событий</p>
      </div>

      {/* Настройки подключения */}
      <div className="rounded-2xl border border-white/[0.08] bg-surface p-5">
        <p className="mb-3.5 font-display text-[13px] font-medium uppercase tracking-[0.08em] text-white/[0.32]">Подключение</p>
        {[
          { label: 'Bot Token', desc: 'Токен бота из @BotFather', value: 'Не задан' },
          { label: 'Webhook URL', desc: 'Адрес для вебхуков', value: 'Не настроен' },
          { label: 'Admin Chat ID', desc: 'ID чата для уведомлений', value: 'Не задан' },
        ].map((s) => (
          <div key={s.label} className="flex items-center justify-between border-b border-white/[0.04] py-3 last:border-b-0">
            <div>
              <p className="text-[13px] font-light">{s.label}</p>
              <p className="text-[10px] font-extralight text-white/[0.32]">{s.desc}</p>
            </div>
            <span className="w-[200px] rounded-md border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-right text-[13px] font-light text-white/[0.32]">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
