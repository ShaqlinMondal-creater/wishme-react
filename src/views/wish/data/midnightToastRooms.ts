import cake from '@/assets/wish/midnight/midnight-cake.png'
import cheers from '@/assets/wish/midnight/midnight-cheers.png'
import clock from '@/assets/wish/midnight/midnight-clock.png'
import gift from '@/assets/wish/midnight/midnight-gift.png'
import glasses from '@/assets/wish/midnight/midnight-glasses.png'
import letter from '@/assets/wish/midnight/midnight-letter.png'
import sparks from '@/assets/wish/midnight/midnight-sparks.png'
import terrace from '@/assets/wish/midnight/midnight-terrace.png'

export type WishRoomId = 'letter' | 'stories' | 'moments' | 'privacy' | 'gifts'

export const wishRooms: {
  id: WishRoomId
  title: string
  kicker: string
  hint: string
  cover: string
}[] = [
  {
    id: 'letter',
    title: 'Letter',
    kicker: 'Sealed',
    hint: 'A note written only for you',
    cover: letter,
  },
  {
    id: 'stories',
    title: 'Stories',
    kicker: 'Status',
    hint: 'Images and a night, like a status',
    cover: glasses,
  },
  {
    id: 'moments',
    title: 'Moments',
    kicker: 'Kept',
    hint: 'Captures with a line of text',
    cover: terrace,
  },
  {
    id: 'privacy',
    title: 'Privacy',
    kicker: 'Status',
    hint: 'Who can see what he made',
    cover: clock,
  },
  {
    id: 'gifts',
    title: 'Surprise Gift',
    kicker: 'Scratch',
    hint: 'Nine cards. Nine different gifts',
    cover: gift,
  },
]

export const wishLetter = {
  greeting: 'Riya —',
  body: [
    'When the city went quiet I still wanted to say your name out loud.',
    'So I made this. Not a forward. A small room: a letter, a night of stories, the moments I kept, and a gift you have to scratch open.',
    'Happy birthday. Quietly.',
  ],
  signoff: 'With the hour that is only ours,\nArjun',
  date: '2 November · midnight',
}

export const wishMoments: { image: string; title: string; body: string; time: string }[] = [
  {
    image: glasses,
    title: 'The first glass',
    body: 'I poured it before you arrived. The gold rim caught the lamp. I thought: this is the year we keep.',
    time: '11:47',
  },
  {
    image: cake,
    title: 'One candle',
    body: 'Not a crowd. One flame. Make the wish slowly — nobody is filming it but this page.',
    time: '11:59',
  },
  {
    image: terrace,
    title: 'The city went quiet',
    body: 'You looking out. I looking at you. I still wanted to say your name.',
    time: '12:04',
  },
  {
    image: cheers,
    title: 'The toast',
    body: 'To the year that starts now. No audience. Two glasses, then this keepsake.',
    time: '12:06',
  },
  {
    image: sparks,
    title: 'Gold in the dark',
    body: 'A second that does not need a caption in a chat. It lives here.',
    time: '12:11',
  },
]

export const wishPrivacyHero = {
  image: clock,
  kicker: 'Private status',
  title: 'Only this link. Only her.',
  body: 'What he made is not a story on a feed. It lives here for 72 hours, then the door closes.',
}

export const wishPrivacyScenes: { image: string; kicker: string; title: string; body: string }[] = [
  {
    image: letter,
    kicker: 'The letter',
    title: 'Written once',
    body: 'A note sealed for Riya — not forwarded, not posted.',
  },
  {
    image: glasses,
    kicker: 'The night',
    title: 'Two glasses',
    body: 'The toast, held in this room. Nobody else is in the frame.',
  },
  {
    image: terrace,
    kicker: 'Kept',
    title: 'The city went quiet',
    body: 'A photograph he would not send in a chat.',
  },
  {
    image: gift,
    kicker: 'The gift',
    title: 'Nine tickets, one scratch',
    body: 'She opens one. The rest stay closed.',
  },
]

export const wishPrivacy = [
  {
    label: 'Who can open',
    value: 'Only Riya',
    detail: 'A unique link. Not a group. Not a story on a feed.',
  },
  {
    label: 'How long',
    value: '72 hours',
    detail: 'From the wishing date and time. Then this door closes.',
  },
  {
    label: 'Forwarding',
    value: 'Off',
    detail: 'This is not meant to travel. If it leaves this link, it is no longer the wish.',
  },
]

export const wishGifts: { id: string; emoji: string; title: string; body: string }[] = [
  {
    id: 'g1',
    emoji: '🥂',
    title: 'Midnight toast',
    body: 'One glass, raised only for you.',
  },
  {
    id: 'g2',
    emoji: '🎂',
    title: 'Cake at 12:01',
    body: 'A slice that does not wait for morning.',
  },
  {
    id: 'g3',
    emoji: '🎵',
    title: 'A song for tonight',
    body: 'Night Changes — piano. Play it once, slowly.',
  },
  {
    id: 'g4',
    emoji: '📸',
    title: 'The terrace photograph',
    body: 'The one where the city is behind you.',
  },
  {
    id: 'g5',
    emoji: '✉️',
    title: 'The letter, kept',
    body: 'You can reread it whenever this door is still open.',
  },
  {
    id: 'g6',
    emoji: '🌙',
    title: 'A quiet call',
    body: 'No agenda. Just the hour after midnight.',
  },
  {
    id: 'g7',
    emoji: '🚗',
    title: 'A drive with no plan',
    body: 'Windows down. No destination worth naming.',
  },
  {
    id: 'g8',
    emoji: '☕',
    title: 'Breakfast tomorrow',
    body: 'Something warm. No rush to speak first.',
  },
  {
    id: 'g9',
    emoji: '💛',
    title: 'This wish, yours',
    body: 'The whole night, held. Nobody else gets a copy.',
  },
]
