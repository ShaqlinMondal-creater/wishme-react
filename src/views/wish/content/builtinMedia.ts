import cake from '@/assets/wish/midnight/midnight-cake.png'
import cheers from '@/assets/wish/midnight/midnight-cheers.png'
import clock from '@/assets/wish/midnight/midnight-clock.png'
import gift from '@/assets/wish/midnight/midnight-gift.png'
import glasses from '@/assets/wish/midnight/midnight-glasses.png'
import letter from '@/assets/wish/midnight/midnight-letter.png'
import sparks from '@/assets/wish/midnight/midnight-sparks.png'
import terrace from '@/assets/wish/midnight/midnight-terrace.png'

export const builtinMedia: Record<string, string> = {
  'midnight-cake': cake,
  'midnight-cheers': cheers,
  'midnight-clock': clock,
  'midnight-gift': gift,
  'midnight-glasses': glasses,
  'midnight-letter': letter,
  'midnight-sparks': sparks,
  'midnight-terrace': terrace,
}

export function builtin(id: string) {
  return `builtin:${id}`
}

export function resolveMedia(src: string) {
  if (src.startsWith('builtin:')) {
    return builtinMedia[src.slice('builtin:'.length)] ?? src
  }

  return src
}

export function isVideoSrc(src: string) {
  const resolved = resolveMedia(src)
  return /\.(mp4|webm)(\?|$)/i.test(resolved)
}

export function isAudioSrc(src: string) {
  const resolved = resolveMedia(src)
  return /\.(mp3|wav|m4a|aac|ogg)(\?|$)/i.test(resolved)
}
