import Link from 'next/link'

export const metadata = {
  title: '404 — Page Not Found',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 h-18 flex items-center px-6">
        <Link
          href="/"
          className="font-display text-2xl font-light tracking-wide text-gold hover:text-ink transition-colors"
        >
          ARTIA DESIGN
        </Link>
      </header>
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center animate-fade-up">
          <p className="font-display text-[12rem] font-light leading-none text-border select-none">
            404
          </p>
          <h1 className="font-display text-3xl font-light text-ink -mt-4 mb-4">
            Page Not Found
          </h1>
          <p className="text-muted mb-8 max-w-sm mx-auto text-sm leading-relaxed">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </main>
    </>
  )
}
