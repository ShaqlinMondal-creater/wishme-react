import { RoomFrame } from '@/views/wish/components/RoomFrame.tsx'
import { wishPrivacy, wishPrivacyHero, wishPrivacyScenes } from '@/views/wish/data/midnightToastRooms.ts'

type WishPrivacyRoomProps = {
  onBack: () => void
}

export function WishPrivacyRoom({ onBack }: WishPrivacyRoomProps) {
  return (
    <RoomFrame kicker="Status" title="Privacy" onBack={onBack}>
      <div className="grid grid-cols-1 gap-4 pb-4 lg:grid-cols-2 lg:gap-6">
        <article className="wish-card-in relative min-h-[16rem] overflow-hidden rounded-[1.4rem] sm:min-h-[20rem] lg:min-h-full">
          <img src={wishPrivacyHero.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/45 to-black/15" />
          <div className="relative flex h-full min-h-[16rem] flex-col justify-end p-5 sm:min-h-[20rem] sm:p-7">
            <p className="text-[10px] tracking-[0.24em] text-gold uppercase">{wishPrivacyHero.kicker}</p>
            <h2 className="mt-2 font-display text-3xl text-white sm:text-4xl">{wishPrivacyHero.title}</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-gold-soft">{wishPrivacyHero.body}</p>
          </div>
        </article>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {wishPrivacyScenes.map((scene, index) => (
            <article
              key={scene.title}
              className="wish-card-in group relative min-h-[11.5rem] overflow-hidden rounded-[1.2rem] sm:min-h-[13rem]"
              style={{ animationDelay: `${0.08 + index * 0.08}s` }}
            >
              <img
                src={scene.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/10" />
              <div className="relative flex h-full flex-col justify-end p-3.5 sm:p-4">
                <p className="text-[9px] tracking-[0.2em] text-gold uppercase">{scene.kicker}</p>
                <p className="mt-1 font-display text-xl leading-none text-white">{scene.title}</p>
                <p className="mt-1.5 text-[12px] leading-5 text-gold-soft">{scene.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {wishPrivacy.map((row) => (
          <article key={row.label} className="rounded-[1.1rem] border border-white/10 bg-white/5 px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[10px] tracking-[0.16em] text-gold uppercase">{row.label}</p>
              <p className="font-display text-base text-gold-soft">{row.value}</p>
            </div>
            <p className="mt-1 text-xs leading-5 text-white/60">{row.detail}</p>
          </article>
        ))}
      </div>
    </RoomFrame>
  )
}
