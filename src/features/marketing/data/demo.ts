import letterImage from '@/assets/auth/login.png'
import giftImage from '@/assets/auth/register.png'
import birthdayStill from '@/assets/home/occasion-birthday.png'
import letterScene from '@/assets/home/template-first-light.png'
import keepImage from '@/assets/home/story-meher.png'
import storyAnanya from '@/assets/home/story-ananya.png'
import storyMeher from '@/assets/home/story-meher.png'
import storyAarav from '@/assets/home/story-aarav.png'

export const demoWish = {
  occasion: 'Birthday wish',
  recipient: 'Ananya',
  from: 'Kabir',
  date: '12 March',
  song: 'Raabta — instrumental',
  title: 'For the girl who still laughs like July',
  message:
    'I kept the photograph from the terrace, the one where the light caught your earring. This is not a forward. It is a small room I made for you — your name, these pictures, a song, and the sentence I never send in a chat.',
  photos: [
    { src: birthdayStill, alt: 'A cream cake, roses and a gold candle' },
    { src: letterImage, alt: 'A handwritten letter with a gold seal' },
    { src: giftImage, alt: 'A gold-ribboned gift and ceremonial thread' },
  ],
}

export const demoPillars = [
  {
    title: 'Private',
    body: 'A unique link, not a group chat. The wish is for one person, and it stays that way.',
    image: storyAnanya,
  },
  {
    title: 'Personal',
    body: 'Their name, your photographs, a song, a line only the two of you would recognise.',
    image: letterScene,
  },
  {
    title: 'Kept',
    body: 'They can reopen it next year. It does not disappear under newer messages.',
    image: keepImage,
  },
]

export const demoStories = [
  {
    quote:
      'I opened it on the balcony and sat there for a long time. It felt like a letter, not a notification.',
    name: 'Ananya',
    occasion: 'Birthday',
    image: storyAnanya,
  },
  {
    quote:
      'He put our first photograph in, and the song from the drive to Goa. I have sent it to no one. It is mine.',
    name: 'Meher',
    occasion: 'Anniversary',
    image: storyMeher,
  },
  {
    quote:
      'For Rakhi he wrote the thing he never says out loud. I keep the link in my notes.',
    name: 'Aarav',
    occasion: 'Raksha Bandhan',
    image: storyAarav,
  },
]

export const howItWorksImages = [birthdayStill, letterScene, storyAnanya]
