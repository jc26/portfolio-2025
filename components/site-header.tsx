import Link from 'next/link'

export function SiteHeader() {
  return (
    <header className="max-w-2xl mx-auto mb-6">
      <Link href="/" className="block">
        <svg 
          width="26" 
          height="44" 
          viewBox="0 0 26 44" 
          className="fill-foreground mb-4"
        >
          <path fillRule="evenodd" clipRule="evenodd" d="M20.9375 22C23.4287 19.8012 25 16.5841 25 13C25 6.37258 19.6274 1 13 1C6.37259 1 1 6.37258 1 13C1 16.5841 2.57127 19.8012 5.06254 22C2.57127 24.1988 1 27.4159 1 31C1 37.6274 6.37259 43 13 43C19.6274 43 25 37.6274 25 31C25 27.4159 23.4287 24.1988 20.9375 22ZM20.9375 22C18.8221 20.1329 16.0433 19 13 19C9.95667 19 7.17793 20.1329 5.06254 22C7.17793 23.8671 9.95667 25 13 25C16.0433 25 18.8221 23.8671 20.9375 22Z" />
        </svg>
      </Link>
    </header>
  )
} 