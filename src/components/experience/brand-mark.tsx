/** Vector tracing of the supplied rectangular teal/gold logo reference. */
export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 689 529" fill="none" aria-hidden="true" className={className}>
      <path fill="#D1AC66" d="M0 0H180V326H359V332H399V346H449V349H689V529H0Z" />
      <path fill="#105A5B" d="M180 0H504V118C514 147 511 178 504 198V326H180Z" />
      <path fill="#D1AC66" d="M368 122C329 98 287 101 253 121C219 141 198 176 197 214C195 263 230 303 294 323C267 293 254 266 255 237C255 182 296 143 368 122Z" />
      <path fill="#005B5D" d="M8 369H680V441H8C-3 428-3 386 8 369Z" />
      <text x="344" y="509" textAnchor="middle" fill="#005B5D" fontFamily="Vazirmatn, sans-serif" fontWeight="700" fontSize="56" textLength="678" lengthAdjust="spacingAndGlyphs" direction="rtl">گروه شرکت‌های اردیبهشت</text>
    </svg>
  );
}
