export default function BrandIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Mast */}
      <rect x="11.25" y="2" width="1.5" height="11.5" rx="0.75" />
      {/* Main sail — right of mast */}
      <path d="M13 3.5 L21 13 H13 Z" opacity="0.9" />
      {/* Hull */}
      <path d="M4 14.5 H20 L17.8 19.5 Q12 22 6.2 19.5 Z" />
      {/* Checkmark — left quadrant, on gradient background */}
      <path
        d="M3.5 9.5 L6 12 L10 7"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.85"
      />
    </svg>
  )
}
