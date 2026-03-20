export default function TelegramPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="font-display text-xl font-semibold uppercase tracking-wider">Telegram</h1>
        <p className="mt-1 text-[13px] font-extralight text-white/[0.32]">Бот, каналы, рассылки</p>
      </div>
      <div className="rounded-xl border border-white/[0.08] bg-surface p-5">
        <h2 className="mb-4 text-[8px] font-normal uppercase tracking-[0.14em] text-white/[0.3]">Бот</h2>
        <p className="py-4 text-center text-sm text-white/20">Telegram-бот не подключён</p>
      </div>
      <div className="rounded-xl border border-white/[0.08] bg-surface p-5">
        <h2 className="mb-4 text-[8px] font-normal uppercase tracking-[0.14em] text-white/[0.3]">Каналы</h2>
        <p className="py-4 text-center text-sm text-white/20">Нет подключённых каналов</p>
      </div>
    </div>
  )
}
