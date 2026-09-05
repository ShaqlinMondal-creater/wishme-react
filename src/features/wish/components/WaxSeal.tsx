export function WaxSeal({ className = '' }: { className?: string }) {
  return (
    <span className={`wish-seal-press inline-flex h-12 w-12 items-center justify-center ${className}`} aria-hidden="true">
      <svg viewBox="0 0 48 48" className="h-full w-full drop-shadow-md">
        <circle cx="24" cy="24" r="22" fill="#7a2e24" />
        <circle cx="24" cy="22" r="18" fill="#9c3d30" />
        <circle cx="19" cy="18" r="7" fill="#c4a35a" opacity="0.28" />
        <text
          x="24"
          y="28"
          textAnchor="middle"
          fill="#f3ead3"
          fontFamily="Cormorant Garamond, Georgia, serif"
          fontSize="16"
          fontWeight="600"
        >
          A
        </text>
      </svg>
    </span>
  )
}
