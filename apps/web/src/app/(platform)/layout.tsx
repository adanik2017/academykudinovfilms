import { cookies } from 'next/headers'
import { getSession } from '@kf/auth/server'
import { PlatformNav } from '@/components/PlatformNav'
import { PlatformSidebar } from '@/components/PlatformSidebar'
import { BottomTabs } from '@/components/BottomTabs'

export default async function PlatformLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const session = await getSession(cookieStore)

  const initials = session?.name
    ? session.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : 'S'

  return (
    <>
      <PlatformNav userName={session?.name ?? undefined} userInitials={initials} />
      <PlatformSidebar userId={session?.id} />
      <div className="fixed top-[52px] left-[56px] right-0 bottom-0 overflow-y-auto max-md:left-0 max-md:bottom-[calc(52px+max(4px,env(safe-area-inset-bottom)))]">
        {children}
      </div>
      <BottomTabs />
    </>
  )
}
