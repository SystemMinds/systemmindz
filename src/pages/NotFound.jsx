import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="section pt-32 text-center">
      <div className="container-custom">
        <p className="text-8xl font-black text-gradient mb-4">404</p>
        <h1 className="heading-lg mb-4">Page not found</h1>
        <p className="text-dark-400 mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link to="/" className="btn-primary">
          <ArrowLeft size={18} /> Go Home
        </Link>
      </div>
    </section>
  )
}
