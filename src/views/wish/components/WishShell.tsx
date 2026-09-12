import { useState } from 'react'
import { Starfield } from '@/views/wish/components/Starfield.tsx'
import { WaxSeal } from '@/views/wish/components/WaxSeal.tsx'
import { WishGiftRoom } from '@/views/wish/components/WishGiftRoom.tsx'
import { WishHub } from '@/views/wish/components/WishHub.tsx'
import { WishLetterRoom } from '@/views/wish/components/WishLetterRoom.tsx'
import { WishMomentsRoom } from '@/views/wish/components/WishMomentsRoom.tsx'
import { WishPlayer } from '@/views/wish/components/WishPlayer.tsx'
import { WishPrivacyRoom } from '@/views/wish/components/WishPrivacyRoom.tsx'
import { WishMedia } from '@/views/wish/components/WishMedia.tsx'
import { EditPencil } from '@/views/wish/components/EditPencil.tsx'
import type { DemoWish } from '@/views/wish/data/demoWishes.ts'
import type { WishRoomId } from '@/shared/types/templateContent.ts'
import type { TemplateContent } from '@/shared/types/templateContent.ts'
import { defaultMidnightToastContent } from '@/views/wish/content/defaultContent.ts'
import { WishEditorProvider, useWishEditor } from '@/views/wish/content/WishEditorContext.tsx'
import { fillContentVars } from '@/views/wish/content/mergeContent.ts'
import { enabledRoomIds, type TemplateRoomFlags } from '@/shared/lib/templateDisplay.ts'
import { resolveMedia } from '@/views/wish/content/builtinMedia.ts'
import type { StorySlide } from '@/views/wish/data/storyTypes.ts'

type WishShellProps = {
  wish: DemoWish
  content?: TemplateContent
  rooms?: Partial<TemplateRoomFlags> | null
  editor?: {
    enabled: boolean
    onEdit: (path: string, label: string, kind: 'text' | 'textarea' | 'media' | 'lines') => void
  }
}

type View = 'gate' | 'hub' | WishRoomId

export function WishShell({ wish, content, rooms, editor }: WishShellProps) {
  const [view, setView] = useState<View>('gate')
  const [opened, setOpened] = useState<Set<WishRoomId>>(new Set())
  const resolved = content ?? defaultMidnightToastContent()
  const enabledRooms = enabledRoomIds(rooms)
  const show = (id: WishRoomId) => view === id && enabledRooms.includes(id)

  const openRoom = (id: WishRoomId) => {
    setOpened((current) => new Set(current).add(id))
    setView(id)
  }

  const backToHub = () => setView('hub')
  const playerWish = withContentSlides(wish, resolved)

  return (
    <WishEditorProvider
      value={{
        enabled: editor?.enabled ?? false,
        content: resolved,
        enabledRooms,
        onEdit: editor?.onEdit ?? (() => undefined),
      }}
    >
      <div className="relative min-h-svh w-full bg-[#070f1c]">
        <div className="relative h-svh w-full overflow-hidden">
          {view === 'gate' ? <Gate wish={wish} onOpen={() => setView('hub')} /> : null}
          {view === 'hub' || (view !== 'gate' && !enabledRooms.includes(view)) ? (
            <WishHub wish={wish} opened={opened} onOpen={openRoom} onBack={() => setView('gate')} />
          ) : null}
          {show('letter') ? <WishLetterRoom onBack={backToHub} /> : null}
          {show('stories') ? <WishPlayer wish={playerWish} onBack={backToHub} /> : null}
          {show('moments') ? <WishMomentsRoom onBack={backToHub} /> : null}
          {show('privacy') ? <WishPrivacyRoom onBack={backToHub} /> : null}
          {show('gifts') ? <WishGiftRoom onBack={backToHub} /> : null}
        </div>
      </div>
    </WishEditorProvider>
  )
}

function withContentSlides(wish: DemoWish, content: TemplateContent): DemoWish {
  if (content.rooms.stories.slides.length === 0) {
    return wish
  }

  const slides: StorySlide[] = content.rooms.stories.slides.map((slide) => ({
    id: slide.id,
    type: 'cinematic',
    durationMs: 11000,
    image: resolveMedia(slide.image),
    kicker: slide.kicker,
    title: slide.title,
    subtitle: slide.subtitle || undefined,
    kenBurns: 'in',
  }))

  return {
    ...wish,
    recipient: content.gate.recipient,
    from: content.gate.from,
    slides,
  }
}

function Gate({ wish, onOpen }: { wish: DemoWish; onOpen: () => void }) {
  const editor = useWishEditor()
  const gate = editor?.content.gate
  const recipient = gate?.recipient ?? wish.recipient
  const from = gate?.from ?? wish.from
  const occasion = gate?.occasion ?? wish.occasion
  const cover = gate?.cover ?? ''
  const count = editor?.enabledRooms.length ?? 5
  const quote = gate?.quote ?? 'When the city went quiet, he still wanted to say your name.'
  const body =
    gate?.body ??
    'Not a message. A night made only for you — a sealed letter, stories, the moments he kept, and one gift behind gold foil.'
  const cta = gate?.cta ?? 'Open the night'
  const footer = fillContentVars(
    gate?.footer ?? '{Count} rooms. This link is only yours. Open for 72 hours, then the door closes.',
    { from, count },
  )

  const inner = (
    <>
      <WishMedia src={cover} className="absolute inset-0 h-full w-full object-cover object-[58%_center] lg:object-[62%_center]" />
      {editor?.enabled ? (
        <EditPencil label="Cover image or video" onClick={() => editor.onEdit('gate.cover', 'Landing cover', 'media')} />
      ) : null}
      <div className="absolute inset-0 bg-linear-to-b from-black/20 via-navy/35 to-[#070f1c] lg:bg-linear-to-r lg:from-[#070f1c]/90 lg:via-[#070f1c]/45 lg:to-transparent" />
      <div className="absolute inset-0 bg-linear-to-t from-[#070f1c] via-transparent to-transparent lg:hidden" />
      <Starfield />
      <div className="wish-grain" />

      <div className="relative flex h-full items-end justify-center px-5 pb-[max(1.4rem,env(safe-area-inset-bottom))] sm:px-8 lg:items-center lg:justify-start lg:px-16 lg:pb-0 xl:px-24">
        <div className="relative w-full max-w-md rounded-[1.6rem] border border-gold/20 bg-black/25 px-5 py-6 text-center backdrop-blur-md sm:px-7 sm:py-8 lg:max-w-lg lg:bg-black/20 lg:text-left lg:backdrop-blur-sm">
          <div className="wish-rise flex justify-center lg:justify-start">
            <WaxSeal className="h-16 w-16 lg:h-[4.5rem] lg:w-[4.5rem]" />
          </div>
          <p className="wish-rise mt-5 text-[11px] tracking-[0.34em] text-gold uppercase" style={{ animationDelay: '0.08s' }}>
            {wish.templateName}
          </p>
          <div className="relative">
            <p
              className="wish-rise mt-4 font-display text-[1.35rem] leading-8 text-gold-soft italic sm:text-[1.5rem] sm:leading-9"
              style={{ animationDelay: '0.16s' }}
            >
              {quote}
            </p>
            {editor?.enabled ? (
              <EditPencil label="Quote" onClick={() => editor.onEdit('gate.quote', 'Quote', 'textarea')} />
            ) : null}
          </div>
          <div className="relative">
            <h1
              className="wish-rise mt-5 font-display text-5xl leading-none text-white sm:text-6xl lg:text-7xl"
              style={{ animationDelay: '0.24s' }}
            >
              For {recipient}
            </h1>
            {editor?.enabled ? (
              <EditPencil label="Recipient" onClick={() => editor.onEdit('gate.recipient', 'Recipient name', 'text')} />
            ) : null}
          </div>
          <div className="relative">
            <p className="wish-rise mt-4 text-sm tracking-wide text-white/75" style={{ animationDelay: '0.32s' }}>
              A private {occasion.toLowerCase()} from {from}
            </p>
            {editor?.enabled ? (
              <EditPencil label="From" onClick={() => editor.onEdit('gate.from', 'From name', 'text')} />
            ) : null}
          </div>
          <div className="relative">
            <p
              className="wish-rise mx-auto mt-4 max-w-sm text-sm leading-6 text-gold-soft/90 lg:mx-0"
              style={{ animationDelay: '0.4s' }}
            >
              {body}
            </p>
            {editor?.enabled ? (
              <EditPencil label="Intro" onClick={() => editor.onEdit('gate.body', 'Landing text', 'textarea')} />
            ) : null}
          </div>
          <span
            className="wish-rise wish-seal-cta mt-7 inline-flex items-center justify-center rounded-full border border-gold/55 bg-gold/10 px-6 py-2.5 text-sm tracking-[0.14em] text-gold uppercase"
            style={{ animationDelay: '0.5s' }}
            onClick={
              editor?.enabled
                ? (event) => {
                    event.stopPropagation()
                    onOpen()
                  }
                : undefined
            }
          >
            {cta}
          </span>
          {editor?.enabled ? (
            <EditPencil
              label="Button"
              className="relative ml-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gold text-navy"
              onClick={() => editor.onEdit('gate.cta', 'Button text', 'text')}
            />
          ) : null}
          <div className="relative">
            <p className="wish-rise mt-4 text-[11px] leading-5 tracking-wide text-white/45" style={{ animationDelay: '0.58s' }}>
              {footer}
            </p>
            {editor?.enabled ? (
              <EditPencil label="Footer" onClick={() => editor.onEdit('gate.footer', 'Footer', 'textarea')} />
            ) : null}
          </div>
        </div>
      </div>
    </>
  )

  if (editor?.enabled) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        {inner}
        <button
          type="button"
          className="absolute right-4 bottom-4 z-30 rounded-full border border-gold/50 bg-gold px-4 py-2 text-xs tracking-[0.14em] text-navy uppercase"
          onClick={onOpen}
        >
          Open rooms
        </button>
      </div>
    )
  }

  return (
    <button
      type="button"
      className="absolute inset-0 overflow-hidden"
      onClick={onOpen}
      aria-label={`Open the night for ${recipient}`}
    >
      {inner}
    </button>
  )
}

export function WishClosed({ reason }: { reason: 'invalid' | 'expired' }) {
  return (
    <div className="flex min-h-svh items-center justify-center bg-navy px-6 text-center">
      <div className="max-w-sm">
        <p className="text-[11px] tracking-[0.28em] text-gold uppercase">WishMe</p>
        <h1 className="mt-4 font-display text-4xl text-white">
          {reason === 'expired' ? 'This wish has closed' : 'This link is not a wish'}
        </h1>
        <p className="mt-4 text-sm leading-7 text-gold-soft">
          {reason === 'expired'
            ? 'A WISHME link stays open for 72 hours after the wishing date and time. Then the door closes.'
            : 'The token does not match a keepsake we can open.'}
        </p>
      </div>
    </div>
  )
}
