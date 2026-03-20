import { Skeleton } from '@kf/ui'

export default function ProgramLoading() {
  return (
    <div className="space-y-6 p-5">
      <Skeleton className="h-8 w-40" />
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-48 rounded-2xl" />
      ))}
    </div>
  )
}
