import { cn } from '@/shared/lib/cn.ts'

type StoryProgressProps = {
  count: number
  index: number
  progress: number
}

export function StoryProgress({ count, index, progress }: StoryProgressProps) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }, (_, item) => (
        <span key={item} className="h-[2.5px] flex-1 overflow-hidden rounded-full bg-white/25">
          <span
            className={cn('block h-full rounded-full bg-white', item > index && 'w-0', item < index && 'w-full')}
            style={item === index ? { width: `${Math.min(100, progress * 100)}%` } : undefined}
          />
        </span>
      ))}
    </div>
  )
}
