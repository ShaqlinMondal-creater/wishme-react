type EditPencilProps = {
  label: string
  onClick: () => void
  className?: string
}

export function EditPencil({ label, onClick, className }: EditPencilProps) {
  return (
    <button
      type="button"
      aria-label={`Edit ${label}`}
      className={
        className ??
        'absolute top-2 right-2 z-30 inline-flex h-9 w-9 items-center justify-center rounded-full bg-gold text-navy shadow-lift hover:bg-white'
      }
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        onClick()
      }}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
        <path
          d="M4 17.25V20h2.75L17.8 8.95l-2.75-2.75L4 17.25Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="m13.5 6.2 2.75 2.75" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    </button>
  )
}
