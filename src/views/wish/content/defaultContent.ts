import type { TemplateContent } from '@/shared/types/templateContent.ts'
import { builtin } from '@/views/wish/content/builtinMedia.ts'

export function defaultMidnightToastContent(): TemplateContent {
  return {
    gate: {
      cover: builtin('midnight-glasses'),
      quote: 'When the city went quiet, he still wanted to say your name.',
      recipient: 'Riya',
      from: 'Arjun',
      occasion: 'birthday',
      body: 'Not a message. A night made only for you — a sealed letter, stories, the moments he kept, and one gift behind gold foil.',
      cta: 'Open the night',
      footer: '{Count} rooms. This link is only yours. Open for 72 hours, then the door closes.',
    },
    hub: {
      cover: builtin('midnight-glasses'),
      intro: 'From {from}. A private night in {count} pieces. Open them as you would a box left on the table.',
    },
    rooms: {
      letter: {
        title: 'Letter',
        kicker: 'Sealed',
        hint: 'A note written only for you',
        cover: builtin('midnight-letter'),
        date: '2 November · midnight',
        heading: 'For Riya, in his hand',
        intro: 'A page he would not send in a chat. Open it once, the way you would a letter left on the table.',
        greeting: 'Riya —',
        body: [
          'When the city went quiet I still wanted to say your name out loud.',
          'So I made this. Not a forward. A small room: a letter, a night of stories, the moments I kept, and a gift you have to scratch open.',
          'Happy birthday. Quietly.',
        ],
        signoff: 'With the hour that is only ours,\nArjun',
      },
      stories: {
        title: 'Stories',
        kicker: 'Status',
        hint: 'Images and a night, like a status',
        cover: builtin('midnight-glasses'),
        slides: [
          {
            id: 'open',
            image: builtin('midnight-glasses'),
            kicker: 'A private wish',
            title: 'For Riya',
            subtitle: 'From Arjun · a birthday at midnight',
          },
          {
            id: 'glasses',
            image: builtin('midnight-glasses'),
            kicker: 'Midnight Toast',
            title: 'The hour only we keep',
            subtitle: '',
          },
          {
            id: 'cake',
            image: builtin('midnight-cake'),
            kicker: 'One candle',
            title: 'Make a wish, slowly',
            subtitle: '',
          },
          {
            id: 'gift',
            image: builtin('midnight-gift'),
            kicker: 'Kept for you',
            title: 'Not a forward. A room.',
            subtitle: '',
          },
          {
            id: 'terrace',
            image: builtin('midnight-terrace'),
            kicker: 'The city went quiet',
            title: 'I still wanted to say your name',
            subtitle: '',
          },
          {
            id: 'sparks',
            image: builtin('midnight-sparks'),
            kicker: 'Gold in the dark',
            title: 'For the year ahead',
            subtitle: '',
          },
        ],
      },
      moments: {
        title: 'Moments',
        kicker: 'Kept',
        hint: 'Captures with a line of text',
        cover: builtin('midnight-terrace'),
        intro: 'Polaroids from the night — a photograph, a time, a sentence he would not send in a chat.',
        items: [
          {
            image: builtin('midnight-glasses'),
            title: 'The first glass',
            body: 'I poured it before you arrived. The gold rim caught the lamp. I thought: this is the year we keep.',
            time: '11:47',
          },
          {
            image: builtin('midnight-cake'),
            title: 'One candle',
            body: 'Not a crowd. One flame. Make the wish slowly — nobody is filming it but this page.',
            time: '11:59',
          },
          {
            image: builtin('midnight-terrace'),
            title: 'The city went quiet',
            body: 'You looking out. I looking at you. I still wanted to say your name.',
            time: '12:04',
          },
          {
            image: builtin('midnight-cheers'),
            title: 'The toast',
            body: 'To the year that starts now. No audience. Two glasses, then this keepsake.',
            time: '12:06',
          },
          {
            image: builtin('midnight-sparks'),
            title: 'Gold in the dark',
            body: 'A second that does not need a caption in a chat. It lives here.',
            time: '12:11',
          },
        ],
      },
      privacy: {
        title: 'Privacy',
        kicker: 'Status',
        hint: 'Who can see what he made',
        cover: builtin('midnight-clock'),
        hero: {
          image: builtin('midnight-clock'),
          kicker: 'Private status',
          title: 'Only this link. Only her.',
          body: 'What he made is not a story on a feed. It lives here for 72 hours, then the door closes.',
        },
        scenes: [
          {
            image: builtin('midnight-letter'),
            kicker: 'The letter',
            title: 'Written once',
            body: 'A note sealed for Riya — not forwarded, not posted.',
          },
          {
            image: builtin('midnight-glasses'),
            kicker: 'The night',
            title: 'Two glasses',
            body: 'The toast, held in this room. Nobody else is in the frame.',
          },
          {
            image: builtin('midnight-terrace'),
            kicker: 'Kept',
            title: 'The city went quiet',
            body: 'A photograph he would not send in a chat.',
          },
          {
            image: builtin('midnight-gift'),
            kicker: 'The gift',
            title: 'Nine tickets, one scratch',
            body: 'She opens one. The rest stay closed.',
          },
        ],
        rows: [
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
        ],
      },
      gifts: {
        title: 'Surprise Gift',
        kicker: 'Scratch',
        hint: 'Nine cards. Nine different gifts',
        cover: builtin('midnight-gift'),
        intro: 'Nine foil tickets. Scratch only one — the rest stay sealed.',
        items: [
          { id: 'g1', emoji: '🥂', title: 'Midnight toast', body: 'One glass, raised only for you.' },
          { id: 'g2', emoji: '🎂', title: 'Cake at 12:01', body: 'A slice that does not wait for morning.' },
          { id: 'g3', emoji: '🎵', title: 'A song for tonight', body: 'Night Changes — piano. Play it once, slowly.' },
          { id: 'g4', emoji: '📸', title: 'The terrace photograph', body: 'The one where the city is behind you.' },
          { id: 'g5', emoji: '✉️', title: 'The letter, kept', body: 'You can reread it whenever this door is still open.' },
          { id: 'g6', emoji: '🌙', title: 'A quiet call', body: 'No agenda. Just the hour after midnight.' },
          { id: 'g7', emoji: '🚗', title: 'A drive with no plan', body: 'Windows down. No destination worth naming.' },
          { id: 'g8', emoji: '☕', title: 'Breakfast tomorrow', body: 'Something warm. No rush to speak first.' },
          { id: 'g9', emoji: '💛', title: 'This wish, yours', body: 'The whole night, held. Nobody else gets a copy.' },
        ],
      },
    },
  }
}
