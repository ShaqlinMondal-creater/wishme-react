import letterImage from '@/assets/auth/login.png'
import giftImage from '@/assets/auth/register.png'
import birthdayStill from '@/assets/home/occasion-birthday.png'
import anniversaryStill from '@/assets/home/occasion-anniversary.png'
import rakhiStill from '@/assets/home/occasion-rakhi.png'
import photaStill from '@/assets/home/occasion-phota.png'
import storyAnanya from '@/assets/home/story-ananya.png'
import storyMeher from '@/assets/home/story-meher.png'
import storyAarav from '@/assets/home/story-aarav.png'
import firstLight from '@/assets/home/template-first-light.png'
import stillUs from '@/assets/home/template-still-us.png'
import sacredThread from '@/assets/home/template-sacred-thread.png'
import rakhiAtelier from '@/assets/home/template-rakhi-atelier.png'
import photaBloom from '@/assets/home/template-phota-bloom.png'
import tilakGold from '@/assets/home/template-tilak-gold.png'

export type TemplatePreview = {
  recipient: string
  from: string
  date: string
  title: string
  letter: string
  song: string
  mood: 'light' | 'dark'
  photos: { src: string; alt: string }[]
}

export const templatePreviews: Record<string, TemplatePreview> = {
  'tpl-golden-hour': {
    recipient: 'Ananya',
    from: 'Kabir',
    date: '12 March',
    title: 'For the girl who still laughs like July',
    letter:
      'I kept the photograph from the terrace, the one where the light caught your earring. This is not a forward. It is a small room I made for you — your name, these pictures, a song, and the sentence I never send in a chat.',
    song: 'Raabta — instrumental',
    mood: 'light',
    photos: [
      { src: birthdayStill, alt: 'A cream cake, roses and a gold candle' },
      { src: letterImage, alt: 'A handwritten letter with a gold seal' },
      { src: storyAnanya, alt: 'Soft evening light on a quiet table' },
    ],
  },
  'tpl-midnight-toast': {
    recipient: 'Riya',
    from: 'Arjun',
    date: '2 November',
    title: 'A toast for the hour only we keep',
    letter:
      'When the city went quiet I still wanted to say your name out loud. So I made this — a night sky, three photographs, and a wish that does not have to compete with anyone else’s. Happy birthday, quietly.',
    song: 'Night Changes — piano',
    mood: 'dark',
    photos: [
      { src: giftImage, alt: 'A gold-ribboned gift waiting to be opened' },
      { src: letterImage, alt: 'A sealed letter on dark wood' },
      { src: birthdayStill, alt: 'Candlelight on a cream cake' },
    ],
  },
  'tpl-still-us': {
    recipient: 'Meher',
    from: 'Vikram',
    date: '18 January',
    title: 'Still the two of us',
    letter:
      'Seven years, and the photograph from the drive to Goa still sits in my notes. I put our dates here, the song from that car, and the line I would rather write than type. We are still us. That is the whole wish.',
    song: 'Tum Hi Ho — strings',
    mood: 'light',
    photos: [
      { src: anniversaryStill, alt: 'Roses and a cream envelope on linen' },
      { src: stillUs, alt: 'A quiet table set for two' },
      { src: storyMeher, alt: 'Warm light on a keepsake' },
    ],
  },
  'tpl-first-light': {
    recipient: 'Isha',
    from: 'Rohan',
    date: '4 February',
    title: 'Written for the morning we still share',
    letter:
      'I wanted this to feel like a note left on the table — ivory, a little handwriting, nothing loud. Thank you for the years that did not need an audience. This is only for you, to open when the house is still.',
    song: 'Pehla Nasha — soft',
    mood: 'light',
    photos: [
      { src: firstLight, alt: 'Ivory stationery and morning light' },
      { src: letterImage, alt: 'A handwritten letter' },
      { src: anniversaryStill, alt: 'Flowers beside a cream envelope' },
    ],
  },
  'tpl-sacred-thread': {
    recipient: 'Aarav',
    from: 'Diya',
    date: '9 August',
    title: 'The thread I still tie',
    letter:
      'I cannot sit in the same room this year, so I made a place you can open instead. The photographs, the blessing I always mumble too fast, and a wish that does not expire when the day is over. Wear it the way you wear the rakhi — quietly, and for as long as you need.',
    song: 'Bhai — a quiet instrumental',
    mood: 'light',
    photos: [
      { src: rakhiStill, alt: 'A rakhi thread and sweets' },
      { src: sacredThread, alt: 'Ceremonial colour and gold' },
      { src: storyAarav, alt: 'A sibling keepsake in warm light' },
    ],
  },
  'tpl-rakhi-atelier': {
    recipient: 'Kabir',
    from: 'Sana',
    date: '9 August',
    title: 'Kept in a jewellery box, for you',
    letter:
      'This is the expensive version of what I always mean. A private message, a song, the thread I would have tied if I were there. Open it once, or every year — it is yours, not a story for anyone else.',
    song: 'Phir Le Aya Dil — hush',
    mood: 'dark',
    photos: [
      { src: rakhiAtelier, alt: 'A jewellery-box presentation' },
      { src: giftImage, alt: 'Gold ribbon and ceremonial thread' },
      { src: rakhiStill, alt: 'Rakhi sweets and a silk thread' },
    ],
  },
  'tpl-phota-bloom': {
    recipient: 'Dev',
    from: 'Anika',
    date: '23 October',
    title: 'Light, and a blessing',
    letter:
      'I marked your forehead in the old way, and then I made this so the day would not vanish into a chat. Floral light, a photograph, a voice I would have spoken if we were in the same courtyard. Keep it.',
    song: 'Aami Tomar — bloom',
    mood: 'light',
    photos: [
      { src: photaStill, alt: 'Floral light and a blessing plate' },
      { src: photaBloom, alt: 'Soft flowers for Bhai Phota' },
      { src: letterImage, alt: 'A written blessing' },
    ],
  },
  'tpl-tilak-gold': {
    recipient: 'Neil',
    from: 'Priya',
    date: '23 October',
    title: 'Once a year, and then forever',
    letter:
      'A ceremonial hour, held in gold. I wrote the blessing I always rush. There is a song, a photograph, and a door that stays open after the lamps are put out. This is not a greeting. It is the ritual, kept.',
    song: 'Aarambh — gold',
    mood: 'dark',
    photos: [
      { src: tilakGold, alt: 'Gold-accented ceremonial light' },
      { src: photaStill, alt: 'A blessing plate in warm light' },
      { src: giftImage, alt: 'A wrapped offering' },
    ],
  },
}
