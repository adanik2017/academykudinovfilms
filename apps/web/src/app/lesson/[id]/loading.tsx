import { Skeleton } from '@kf/ui'

export default function LessonLoading() {
  return (
    <div className="space-y-4 p-5">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="aspect-video rounded-2xl" />
      <Skeleton className="h-32 rounded-2xl" />
    </div>
  )
}
