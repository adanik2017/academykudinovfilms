import { KpiCard } from '@kf/ui'

export default function FinancePage() {
  return (
    <div className="space-y-6 p-6">
      <h1 className="font-display text-xl font-semibold uppercase tracking-wider">Финансы</h1>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiCard value="0 ₽" label="Выручка за месяц" />
        <KpiCard value="0 ₽" label="Средний чек" />
        <KpiCard value="0" label="Оплат" />
        <KpiCard value="0 ₽" label="Возвраты" />
      </div>
      <p className="text-sm text-muted">
        Финансовая аналитика появится после подключения ЮKassa.
      </p>
    </div>
  )
}
