import { Card } from '@kf/ui'

export default function SettingsPage() {
  return (
    <div className="space-y-6 p-6">
      <h1 className="font-display text-xl font-semibold uppercase tracking-wider">Настройки</h1>

      <Card>
        <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-muted">
          Платформа
        </h2>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-dim">Название</span>
            <span>KUDINOV FILMS Academy</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-dim">Домен</span>
            <span className="text-muted">kudinovfilms.ru (не привязан)</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-dim">Supabase</span>
            <span className="text-green">Подключён</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
