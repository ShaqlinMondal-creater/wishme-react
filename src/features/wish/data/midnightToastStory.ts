import glasses from '@/assets/wish/midnight/midnight-glasses.png'
import clock from '@/assets/wish/midnight/midnight-clock.png'
import cake from '@/assets/wish/midnight/midnight-cake.png'
import letter from '@/assets/wish/midnight/midnight-letter.png'
import gift from '@/assets/wish/midnight/midnight-gift.png'
import terrace from '@/assets/wish/midnight/midnight-terrace.png'
import sparks from '@/assets/wish/midnight/midnight-sparks.png'
import cheers from '@/assets/wish/midnight/midnight-cheers.png'
import type { StorySlide } from '@/features/wish/data/storyTypes.ts'

/** Full autoplay is ~3 minutes 20 seconds. Tap to skip, hold to pause. */
export const midnightToastStory: StorySlide[] = [
  {
    id: 'open',
    type: 'cinematic',
    durationMs: 11000,
    image: glasses,
    kicker: 'A private wish',
    title: 'For Riya',
    subtitle: 'From Arjun · a birthday at midnight',
    kenBurns: 'in',
  },
  {
    id: 'clock',
    type: 'clock',
    durationMs: 12000,
    image: clock,
  },
  {
    id: 'glasses',
    type: 'cinematic',
    durationMs: 12000,
    image: glasses,
    kicker: 'Midnight Toast',
    title: 'The hour only we keep',
    kenBurns: 'out',
  },
  {
    id: 'cake',
    type: 'cinematic',
    durationMs: 11000,
    image: cake,
    kicker: 'One candle',
    title: 'Make a wish, slowly',
    kenBurns: 'in',
  },
  {
    id: 'gift',
    type: 'cinematic',
    durationMs: 11000,
    image: gift,
    kicker: 'Kept for you',
    title: 'Not a forward. A room.',
    kenBurns: 'out',
  },
  {
    id: 'letter-still',
    type: 'cinematic',
    durationMs: 11000,
    image: letter,
    kicker: 'A letter',
    title: 'Written, not typed in a chat',
    kenBurns: 'in',
  },
  {
    id: 'terrace',
    type: 'cinematic',
    durationMs: 12000,
    image: terrace,
    kicker: 'The city went quiet',
    title: 'I still wanted to say your name',
    kenBurns: 'out',
  },
  {
    id: 'toast',
    type: 'toast',
    durationMs: 13000,
    image: cheers,
    title: 'Raise a glass',
    subtitle: 'To the year that starts now',
  },
  {
    id: 'letter-one',
    type: 'letter',
    durationMs: 24000,
    image: letter,
    lines: [
      'Riya —',
      'When the city went quiet I still wanted to say your name out loud.',
      'So I made this. A night sky, these photographs, a toast that does not have to compete with anyone else.',
    ],
  },
  {
    id: 'letter-two',
    type: 'letter',
    durationMs: 24000,
    image: letter,
    lines: [
      'This is not a greeting that disappears under newer messages.',
      'It is a small room. Your name. A song. The sentence I never send in a chat.',
    ],
    signoff: 'Happy birthday. Quietly. — Arjun',
  },
  {
    id: 'film',
    type: 'film',
    durationMs: 18000,
    images: [glasses, cake, gift, terrace, sparks, cheers],
    caption: 'A night, held',
  },
  {
    id: 'sparks',
    type: 'cinematic',
    durationMs: 12000,
    image: sparks,
    kicker: 'Gold in the dark',
    title: 'For the year ahead',
    kenBurns: 'in',
  },
  {
    id: 'song',
    type: 'song',
    durationMs: 15000,
    image: glasses,
    title: 'Now playing',
    track: 'Night Changes — piano',
  },
  {
    id: 'celebrate',
    type: 'celebrate',
    durationMs: 18000,
    image: sparks,
    title: 'Send a little gold',
  },
  {
    id: 'close',
    type: 'close',
    durationMs: 16000,
    image: cake,
    title: 'Kept for Riya',
    body: 'Reopen this door any time in the next 72 hours. After that, the link closes — the way a night does.',
  },
]
