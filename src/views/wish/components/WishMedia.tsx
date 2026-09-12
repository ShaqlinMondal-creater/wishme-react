import { isAudioSrc, isVideoSrc, resolveMedia } from '@/views/wish/content/builtinMedia.ts'

export function WishMedia({
  src,
  className,
  alt = '',
}: {
  src: string
  className?: string
  alt?: string
}) {
  const resolved = resolveMedia(src)

  if (isAudioSrc(src)) {
    return <audio src={resolved} className={className} controls />
  }

  if (isVideoSrc(src)) {
    return <video src={resolved} className={className} autoPlay muted loop playsInline />
  }

  return <img src={resolved} alt={alt} className={className} />
}
