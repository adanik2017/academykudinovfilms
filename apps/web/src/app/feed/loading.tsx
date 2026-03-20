import { Skeleton } from '@kf/ui'

export default function FeedLoading() {
  return (
    <div className="space-y-4 p-5">
      <Skeleton className="h-8 w-32" />
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-36 rounded-2xl" />
      ))}
    </div>
  )
}
