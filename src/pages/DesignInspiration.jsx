import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, ChevronLeft, ChevronRight, ShoppingBag, Eye, ArrowLeft } from 'lucide-react';
import { lookbookAPI } from '../api/services';
import { useCartActions } from '../hooks/useCartActions';
import { toast } from 'sonner';

export default function DesignInspiration() {
  const [searchParams, setSearchParams] = useSearchParams();
  const story = searchParams.get('story');
  const navigate = useNavigate();
  const { addToCart } = useCartActions();
  const [activeSlide, setActiveSlide] = useState(0);
  const [addingId, setAddingId] = useState(null);

  // Fetch all lookbooks
  const { data: lookbooksRes, isLoading: loadingAll } = useQuery({
    queryKey: ['lookbooks-all'],
    queryFn: async () => {
      const res = await lookbookAPI.getAll();
      return res.data?.lookbooks || [];
    },
    enabled: !story,
  });

  // Fetch single lookbook details
  const { data: lookbookDetailRes, isLoading: loadingDetail } = useQuery({
    queryKey: ['lookbook-detail', story],
    queryFn: async () => {
      if (!story) return null;
      const res = await lookbookAPI.getBySlug(story);
      return res.data?.lookbook || null;
    },
    enabled: !!story,
  });

  useEffect(() => {
    setActiveSlide(0);
  }, [story]);

  const handleAddTaggedProduct = async (product) => {
    setAddingId(product._id);
    const defaultVariant = product.variants?.[0];
    const defaultSize = defaultVariant?.size || 'Standard';
    const defaultColor = defaultVariant?.color?.[0] || null;

    try {
      const response = await addToCart(
        {
          _id: product._id,
          name: product.name,
          pimage: product.pimages?.[0] || '',
          variants: {
            price: defaultVariant?.price || 0,
            size: defaultSize,
            color: defaultColor,
          },
        },
        defaultSize,
        defaultColor,
        1
      );

      if (response?.success) {
        toast.success(`Added ${product.name} to bag!`);
      } else {
        toast.error('Failed to add item to bag');
      }
    } catch (err) {
      toast.error('Failed to add item');
    } finally {
      setAddingId(null);
    }
  };

  // Render detail view for a specific story
  if (story) {
    if (loadingDetail) {
      return (
        <div className="max-w-7xl mx-auto px-4 py-16 animate-pulse space-y-6">
          <div className="h-6 w-32 bg-cream-dark rounded" />
          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-8 bg-cream-dark aspect-video rounded" />
            <div className="md:col-span-4 bg-cream-dark h-80 rounded" />
          </div>
        </div>
      );
    }

    const lookbook = lookbookDetailRes;
    if (!lookbook) {
      return (
        <div className="text-center py-24 bg-white min-h-[60vh]">
          <p className="font-serif text-2xl text-charcoal">Design story not found</p>
          <button onClick={() => setSearchParams({})} className="mt-4 inline-flex items-center gap-2 text-sm text-green hover:underline">
            <ArrowLeft size={16} /> Back to inspirations
          </button>
        </div>
      );
    }

    const slides = lookbook.slides || [];
    const currentSlide = slides[activeSlide];
    const allTaggedProducts = slides.reduce((acc, slide) => {
      if (slide.taggedProducts) {
        slide.taggedProducts.forEach(prod => {
          if (!acc.some(p => p._id === prod._id)) {
            acc.push(prod);
          }
        });
      }
      return acc;
    }, []);

    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {/* Back button */}
          <button
            onClick={() => setSearchParams({})}
            className="inline-flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-wider text-muted hover:text-charcoal transition-colors mb-8"
          >
            <ArrowLeft size={14} /> Back to Inspirations
          </button>

          {/* Title & Description */}
          <div className="mb-10 text-center max-w-3xl mx-auto">
            <p className="text-xs font-sans text-muted uppercase tracking-[0.25em] mb-2">Design Story</p>
            <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-light leading-snug">{lookbook.title}</h1>
            <p className="mt-4 text-muted text-sm sm:text-base leading-relaxed">{lookbook.description}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Slide Show Container */}
            <div className="lg:col-span-8 space-y-6">
              {slides.length > 0 && (
                <div className="relative overflow-hidden bg-cream border border-cream-dark shadow-sm group">
                  <img
                    src={currentSlide.image}
                    alt=""
                    className="w-full h-auto object-cover aspect-video"
                  />
                  
                  {/* Slide controls */}
                  {slides.length > 1 && (
                    <>
                      <button
                        onClick={() => setActiveSlide(prev => (prev - 1 + slides.length) % slides.length)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/60 hover:bg-black text-white flex items-center justify-center rounded-full transition opacity-0 group-hover:opacity-100"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        onClick={() => setActiveSlide(prev => (prev + 1) % slides.length)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/60 hover:bg-black text-white flex items-center justify-center rounded-full transition opacity-0 group-hover:opacity-100"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </>
                  )}

                  {/* Caption */}
                  <div className="p-5 bg-cream/90 backdrop-blur-sm border-t border-cream-dark">
                    <p className="text-sm font-sans leading-relaxed text-charcoal italic">
                      "{currentSlide.text}"
                    </p>
                  </div>
                </div>
              )}

              {/* Dots navigation */}
              {slides.length > 1 && (
                <div className="flex justify-center gap-2">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveSlide(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${i === activeSlide ? 'bg-charcoal w-6' : 'bg-zinc-300'}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Shop the Look side panel */}
            <div className="lg:col-span-4 space-y-6">
              <div className="border border-cream-dark bg-cream-light/35 p-6 rounded shadow-sm">
                <h3 className="font-serif text-lg text-charcoal border-b border-cream-dark pb-3 mb-5 uppercase tracking-wide">
                  Shop The Look
                </h3>
                {allTaggedProducts.length === 0 ? (
                  <p className="text-xs text-muted font-sans">No products linked to this inspiration room.</p>
                ) : (
                  <div className="space-y-5">
                    {allTaggedProducts.map((product) => {
                      const finalPrice = product.variants?.[0]?.price || 0;
                      return (
                        <div key={product._id} className="flex gap-4 items-center bg-white p-3 border border-cream-dark rounded transition hover:shadow-md">
                          <Link to={`/product/${product.slug}`} className="w-16 h-20 shrink-0 overflow-hidden bg-cream-dark rounded border border-cream-dark">
                            <img
                              src={product.pimages?.[0] || 'https://via.placeholder.com/100x120'}
                              alt={product.name}
                              className="w-full h-full object-cover transition duration-300 hover:scale-105"
                            />
                          </Link>
                          
                          <div className="flex-1 min-w-0">
                            <Link to={`/product/${product.slug}`} className="block">
                              <h4 className="font-serif text-sm text-charcoal hover:text-gold transition-colors leading-snug line-clamp-1">
                                {product.name}
                              </h4>
                            </Link>
                            <p className="text-xs text-muted font-sans mt-1">₹{finalPrice.toLocaleString('en-IN')}</p>
                            
                            <button
                              onClick={() => handleAddTaggedProduct(product)}
                              disabled={addingId === product._id}
                              className="mt-3.5 flex items-center gap-1.5 text-[10px] font-sans font-bold uppercase tracking-wider text-green hover:text-green-light transition-colors"
                            >
                              <ShoppingBag size={11} /> {addingId === product._id ? 'Adding...' : 'Add to Bag'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Grid View of all stories
  return (
    <div className="bg-cream/40 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Page Header */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p className="section-tag mb-2">Lookbook</p>
          <h1 className="font-serif text-4xl text-charcoal font-light leading-tight">Design Inspiration</h1>
          <p className="mt-3 text-muted text-sm sm:text-base leading-relaxed">
            Every masterpiece begins as a quiet conversation between memory and craft. Explore our curated collections designed to breathe life, warmth, and character into your home.
          </p>
        </div>

        {loadingAll ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-cream-dark h-80 rounded" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {lookbooksRes.map((book) => (
              <div
                key={book._id}
                onClick={() => setSearchParams({ story: book.slug })}
                className="group cursor-pointer bg-white border border-cream-dark rounded overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              >
                <div className="relative overflow-hidden aspect-[4/3] bg-cream-dark">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <span className="w-10 h-10 rounded-full bg-white/90 text-charcoal flex items-center justify-center opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all">
                      <Eye size={16} />
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl text-charcoal group-hover:text-gold transition-colors leading-snug">
                      {book.title}
                    </h3>
                    <p className="mt-2.5 text-muted text-xs sm:text-sm leading-relaxed line-clamp-2">
                      {book.description}
                    </p>
                  </div>

                  <span className="mt-6 flex items-center gap-1 text-[10px] font-sans font-bold uppercase tracking-wider text-green">
                    View Story <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
