export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden="true" className={className}>
      <path d="M50 7C74 7 94 27 94 51C94 63 89 75 80 83C85 62 74 40 52 32C40 28 26 29 15 35C22 18 35 7 50 7Z" fill="currentColor" />
      <path d="M12 72C0 51 8 24 29 12C21 32 27 55 46 68C56 76 70 79 83 77C72 93 55 99 40 96C28 93 18 84 12 72Z" fill="currentColor" />
      <path d="M82 63C70 84 44 91 23 79C44 78 61 61 62 39C64 26 59 13 51 4C70 6 84 18 89 32C93 44 89 55 82 63Z" fill="#c6a76b" />
    </svg>
  );
}
