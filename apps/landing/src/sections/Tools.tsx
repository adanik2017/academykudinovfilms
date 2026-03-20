import { createServerSupabase } from '@kf/db'
import { cookies } from 'next/headers'
import { getLandingToolCategories } from '@kf/db/queries/landing'

const fallbackCategories = [
  { name: 'Видеогенерация', color: 'amber', tools: ['Runway Gen-3', 'Sora', 'Kling AI', 'Pika Labs', 'Hailuo / MiniMax', 'LTX Video', 'Wan 2.1'] },
  { name: 'Звук и голос', color: 'green', tools: ['Suno v4', 'Udio', 'ElevenLabs', 'AudioCraft', 'LANDR'] },
  { name: 'LLM и ИИ', color: 'blue', tools: ['Claude / Claude Code', 'ChatGPT', 'Gemini', 'Ollama', 'MidJourney', 'Stable Diffusion', 'ComfyUI'] },
  { name: 'Монтаж и автоматизация', color: 'purple', tools: ['DaVinci Resolve', 'Descript', 'CapCut AI', 'HeyGen', 'D-ID', 'Zapier', 'Make / n8n'] },
]

const colorVars: Record<string, string> = {
  amber: '#e8924a',
  green: '#5ecf7e',
  blue: '#7eb8f7',
  purple: '#c97ef7',
}

export async function Tools() {
  const cookieStore = await cookies()
  const supabase = createServerSupabase(cookieStore)
  const { data: dbCats } = await getLandingToolCategories(supabase)

  let categories = fallbackCategories
  if (dbCats && dbCats.length > 0) {
    categories = dbCats.map((c) => ({
      name: c.name,
      color: c.color_var ?? 'amber',
      tools: ((c as Record<string, unknown>).landing_tools as Array<{ name: string; deleted_at: string | null; order: number }> ?? [])
        .filter(t => !t.deleted_at)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .map(t => t.name),
    }))
  }

  return (
    <section className="mx-auto max-w-[1100px] px-10 py-[100px] max-sm:px-5 max-sm:py-[60px]" id="tools">
      <h2 className="text-center font-display text-[clamp(32px,5vw,50px)] font-bold uppercase tracking-[0.02em]">
        Инструменты, которые ты освоишь
      </h2>
      <div className="mx-auto mt-0 mb-10 h-px w-10 bg-white/20" />
      <p className="mb-14 text-center text-[15px] text-white/[0.32]">
        Видеогенерация, звук, языковые модели и автоматизация
      </p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat, i) => {
          const tc = colorVars[cat.color] ?? colorVars.amber
          return (
            <div
              key={i}
              className="rounded-[14px] border border-white/[0.06] border-t-[2px] border-t-[var(--tc)] bg-[linear-gradient(145deg,rgba(255,255,255,0.02),transparent),#0e0e0e] p-[18px]"
              style={{ '--tc': tc } as React.CSSProperties}
            >
              <div className="mb-3 flex items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--tc)]">
                {cat.name}
              </div>
              <div className="flex flex-col gap-[5px]">
                {cat.tools.map((tool, ti) => (
                  <div key={ti} className="flex items-center gap-1.5 border-b border-white/[0.03] py-1 text-[11px] text-white/50 last:border-b-0">
                    <span className="h-1 w-1 flex-shrink-0 rounded-full bg-[var(--tc)]" />
                    {tool}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
