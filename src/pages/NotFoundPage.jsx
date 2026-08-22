import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-cream">
      <p className="font-serif text-8xl text-cream-dark font-light select-none">404</p>
      <h1 className="font-serif text-3xl text-charcoal mt-4 mb-2">Page Not Found</h1>
      <p className="text-muted mb-8 max-w-sm">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="btn-primary flex items-center gap-2">Back to Home <ArrowRight size={16} /></Link>
    </div>
  );
}
