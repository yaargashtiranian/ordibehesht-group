export function Arrow({ direction = "diagonal" }: { direction?: "diagonal" | "down" | "up" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`direction-arrow arrow-${direction}`}>
      {direction === "up" ? <path d="M12 19V5M5 12L12 5L19 12" /> : direction === "down" ? <path d="M17 7L7 17M7 7V17H17" /> : <path d="M17 17L7 7M7 17V7H17" />}
    </svg>
  );
}
