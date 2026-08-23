import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ShoppingBag, Heart, Share2, Star, Truck, RotateCcw, Shield, Plus, Minus, Check } from 'lucide-react';
import { productAPI, shippingAPI } from '../api/services';
import { useWishlistStore } from '../store';
import { useCartActions } from '../hooks/useCartActions';
import { toast } from 'sonner';

// Color mapping utility - maps color names to hex values
const getColorHex = (colorName) => {
  if (!colorName) return null;
  const colorMap = {
    'red': '#EF4444',
    'blue': '#3B82F6',
    'green': '#10B981',
    'yellow': '#FBBF24',
    'orange': '#F97316',
    'purple': '#A855F7',
    'pink': '#EC4899',
    'black': '#000000',
    'white': '#FFFFFF',
    'gray': '#6B7280',
    'grey': '#6B7280',
    'brown': '#92400E',
    'beige': '#F5F5DC',
    'navy': '#1E3A8A',
    'teal': '#14B8A6',
    'cyan': '#06B6D4',
    'lime': '#84CC16',
    'indigo': '#6366F1',
    'violet': '#8B5CF6',
    'fuchsia': '#D946EF',
    'rose': '#F43F5E',
    'gold': '#FFD700',
    'silver': '#C0C0C0',
    'maroon': '#7F1D1D',
    'olive': '#84CC16',
    'coral': '#FF7F50',
    'peach': '#FFDAB9',
    'lavender': '#E6E6FA',
    'mint': '#98FF98',
    'cream': '#FFFDD0',
    'ivory': '#FFFFF0',
    'tan': '#D2B48C',
    'khaki': '#F0E68C',
    'burgundy': '#800020',
    'crimson': '#DC143C',
    'magenta': '#FF00FF',
    'turquoise': '#40E0D0',
    'aqua': '#00FFFF',
    'sky blue': '#87CEEB',
    'light blue': '#ADD8E6',
    'dark blue': '#00008B',
    'light green': '#90EE90',
    'dark green': '#006400',
    'light pink': '#FFB6C1',
    'hot pink': '#FF69B4',
    'light gray': '#D1D5DB',
    'dark gray': '#374151',
    'charcoal': '#36454F',
    'nude': '#E3BC9A',
    'champagne': '#F7E7CE',
    'bronze': '#CD7F32',
    'copper': '#B87333',
    'mauve': '#E0B0FF',
    'plum': '#DDA0DD',
    'sage': '#9DC183',
    'mustard': '#FFDB58',
    'rust': '#B7410E',
    'slate': '#708090',
    'transparent': 'transparent',
    'clear': 'transparent',
  };

  const normalized = colorName.toLowerCase().trim();
  return colorMap[normalized] || null;
};

const findImageForColor = (images, color, selectedVariant = null) => {
  if (!images || !images.length || !color) return -1;
  const normalizedColor = color.toLowerCase().trim();
  
  // 1. Try smart substring match on filename
  for (let i = 0; i < images.length; i++) {
    const url = images[i].toLowerCase();
    const filename = url.substring(url.lastIndexOf('/') + 1);
    const cleanedFilename = filename.replace(/[-_]/g, ' ');
    if (cleanedFilename.includes(normalizedColor) || cleanedFilename.replace(/\s+/g, '').includes(normalizedColor.replace(/\s+/g, ''))) {
      return i;
    }
  }

  // 2. Try matching individual color words
  const colorWords = normalizedColor.split(/\s+/).filter(w => w.length > 2);
  for (let i = 0; i < images.length; i++) {
    const url = images[i].toLowerCase();
    const filename = url.substring(url.lastIndexOf('/') + 1);
    const cleanedFilename = filename.replace(/[-_]/g, ' ');
    for (const word of colorWords) {
      if (cleanedFilename.includes(word)) {
        return i;
      }
    }
  }

  // 3. Fallback to index-based mapping
  if (selectedVariant && Array.isArray(selectedVariant.color)) {
    const colorIdx = selectedVariant.color.indexOf(color);
    if (colorIdx !== -1 && colorIdx < images.length) {
      return colorIdx;
    }
  }

  return -1;
};

function formatPrice(n) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

export default function ProductPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toggle, has } = useWishlistStore();
  const { addToCart } = useCartActions();

  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [qty, setQty] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeResult, setPincodeResult] = useState(null);
  const [activeTab, setActiveTab] = useState('story');
  
  // Cross-sell selected items state
  const [selectedCrossSells, setSelectedCrossSells] = useState([]);
  
  // Sticky bar visibility
  const [showStickyBar, setShowStickyBar] = useState(false);
  
  // Ref for the buy button to check scroll position
  const buyButtonRef = useRef(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      const res = await productAPI.getBySlug(slug);
      return res.data;
    },
  });

  useEffect(() => {
    if (data?.product) {
      const firstVariant = data.product.variants?.[0] || null;
      setSelectedVariant(firstVariant);
      setSelectedColor(firstVariant?.color?.[0] || null);
    }
  }, [data]);

  useEffect(() => {
    if (selectedColor && data?.product?.pimages) {
      const imgIdx = findImageForColor(data.product.pimages, selectedColor, selectedVariant);
      if (imgIdx !== -1) {
        setSelectedImg(imgIdx);
      }
    }
  }, [selectedColor, selectedVariant, data]);

  // Scroll listener for sticky bar
  useEffect(() => {
    const handleScroll = () => {
      if (buyButtonRef.current) {
        const rect = buyButtonRef.current.getBoundingClientRect();
        // Show sticky bar when the buy button is scrolled out of view (top < 0)
        setShowStickyBar(rect.top < 0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) return (
    <div className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-12 animate-pulse bg-white">
      <div className="space-y-3">
        <div className="bg-cream-dark aspect-square" />
        <div className="flex gap-2">
          {[1,2,3].map(i => <div key={i} className="bg-cream-dark w-20 h-20" />)}
        </div>
      </div>
      <div className="space-y-4">
        {[1,2,3,4,5].map(i => <div key={i} className="h-6 bg-cream-dark rounded" />)}
      </div>
    </div>
  );

  if (error || !data || !data.product) return (
    <div className="text-center py-24 bg-white min-h-screen">
      <p className="font-serif text-2xl">Product not found</p>
      <Link to="/collections/all" className="mt-4 inline-block text-sm text-green underline">← Back to shop</Link>
    </div>
  );

  const product = data.product;
  const crossSellProducts = data.crossSellProducts || [];

  const price = selectedVariant?.price || product.variants?.[0]?.price || 0;
  const disc = product.discount || 0;
  const finalPrice = disc > 0 ? price - (price * disc / 100) : price;
  const wishlisted = has(product._id);
  const imgs = product.pimages || [];

  // Calculate combined price for main + selected cross sells
  const crossSellsPrice = selectedCrossSells.reduce((sum, item) => {
    const itemPrice = item.variants?.[0]?.price || 0;
    const itemDisc = item.discount || 0;
    const itemFinal = itemDisc > 0 ? itemPrice - (itemPrice * itemDisc / 100) : itemPrice;
    return sum + itemFinal;
  }, 0);
  const combinedPrice = (finalPrice * qty) + crossSellsPrice;

  const handleAddToCart = async () => {
    if (!selectedVariant) return toast.error('Please select a variant');
    
    // Add main product
    const response = await addToCart(
      {
        _id: product._id,
        name: product.name,
        pimage: product.pimages?.[0] || '',
        variants: {
          price: selectedVariant.price,
          size: selectedVariant.size,
          color: selectedColor
        },
      },
      selectedVariant.size,
      selectedColor,
      qty
    );
    
    if (response?.success) {
      // Add selected cross-sells
      for (const item of selectedCrossSells) {
        const itemVariant = item.variants?.[0];
        const itemColor = itemVariant?.color?.[0] || null;
        await addToCart(
          {
            _id: item._id,
            name: item.name,
            pimage: item.pimages?.[0] || '',
            variants: {
              price: itemVariant?.price || 0,
              size: itemVariant?.size || '',
              color: itemColor
            }
          },
          itemVariant?.size || '',
          itemColor,
          1
        );
      }

      toast.success('Added selection to bag!', {
        description: `${product.name} ${selectedCrossSells.length > 0 ? `+ ${selectedCrossSells.length} companion items` : ''} added to your bag.`
      });
    } else {
      toast.error('Failed to add item to bag');
    }
  };

  const handleBuyNow = async () => {
    if (!selectedVariant) return toast.error('Please select a variant');
    
    // Add main product
    const response = await addToCart(
      {
        _id: product._id,
        name: product.name,
        pimage: product.pimages?.[0] || '',
        variants: {
          price: selectedVariant.price,
          size: selectedVariant.size,
          color: selectedColor
        },
      },
      selectedVariant.size,
      selectedColor,
      qty
    );

    if (response?.success) {
      // Add selected cross-sells
      for (const item of selectedCrossSells) {
        const itemVariant = item.variants?.[0];
        const itemColor = itemVariant?.color?.[0] || null;
        await addToCart(
          {
            _id: item._id,
            name: item.name,
            pimage: item.pimages?.[0] || '',
            variants: {
              price: itemVariant?.price || 0,
              size: itemVariant?.size || '',
              color: itemColor
            }
          },
          itemVariant?.size || '',
          itemColor,
          1
        );
      }
      navigate('/cart');
    } else {
      toast.error('Failed to proceed to checkout');
    }
  };

  const toggleCrossSell = (item) => {
    if (selectedCrossSells.some(i => i._id === item._id)) {
      setSelectedCrossSells(selectedCrossSells.filter(i => i._id !== item._id));
    } else {
      setSelectedCrossSells([...selectedCrossSells, item]);
    }
  };

  const checkPincode = async () => {
    if (!pincode || pincode.length !== 6) {
      return toast.error('Please enter a valid 6-digit PIN code');
    }
    try {
      const res = await shippingAPI.checkPincode(pincode);
      if (res.data?.success) {
        setPincodeResult({ ok: true, message: `Delivering to ${res.data?.city || 'your area'} in 3-5 days.` });
      } else {
        setPincodeResult({ ok: false, message: 'Delivery currently unavailable for this location.' });
      }
    } catch (err) {
      // Fallback for demo/pincode check
      setPincodeResult({ ok: true, message: 'Standard shipping available. Est. delivery 4-6 days.' });
    }
  };

  const tabsContent = {
    story: product.story || product.description,
    shipping: product.shipping || 'We offer free delivery across India for all orders above ₹999. Standard shipping takes 4 to 6 business days. Express shipping options are available at checkout.',
    returns: product.returns || 'We want you to love your purchase. If you are not completely satisfied, you can return or exchange any item within 7 days of delivery. Custom products are final sale.',
    care: product.care || product.additionalInfo?.usageInstructions || 'Dry clean recommended for embroidered covers. Gentle hand wash in cold water using a mild detergent. Dry inside-out in shade. Warm iron on reverse.'
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        
        {/* Breadcrumb */}
        <nav className="text-xs tracking-wider uppercase text-muted mb-8 flex items-center gap-2 font-sans">
          <Link to="/" className="hover:text-charcoal transition-colors">Home</Link>
          <span className="text-cream-dark">/</span>
          <Link to="/collections/all" className="hover:text-charcoal transition-colors">Collections</Link>
          <span className="text-cream-dark">/</span>
          <span className="text-charcoal font-medium">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* LEFT COLUMN: Gallery with Vertical Thumbnails */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            
            {/* Vertical Thumbnails Stack (hidden/horizontal on mobile) */}
            {imgs.length > 1 && (
              <div className="flex md:flex-col gap-2.5 overflow-x-auto md:overflow-y-auto md:w-20 w-full shrink-0">
                {imgs.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImg(i)}
                    className={`md:w-20 md:h-24 w-16 h-20 border overflow-hidden shrink-0 transition-all duration-300 ${
                      i === selectedImg ? 'border-charcoal scale-102 shadow-sm' : 'border-cream-dark opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
            
            {/* Main Preview Image */}
            <div className="flex-1 bg-cream-dark overflow-hidden relative group">
              <img
                src={imgs[selectedImg] || 'https://via.placeholder.com/600x750/F5F0E8/2D5016?text=Siddhi+Decor'}
                alt={product.name}
                className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                style={{ aspectRatio: '4/5' }}
              />
              {disc > 0 && (
                <div className="absolute top-4 left-4 bg-charcoal text-white text-[10px] font-sans font-semibold px-3 py-1.5 uppercase tracking-widest">
                  {disc}% OFF
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Details & Purchase Options */}
          <div className="lg:col-span-5 space-y-8">
            <div className="border-b border-cream-dark pb-6">
              <p className="text-xs font-sans text-muted uppercase tracking-widest mb-3">{product.brand || 'Siddhi Decor'}</p>
              <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-light leading-snug">{product.name}</h1>
              
              {/* Reviews rating */}
              <div className="flex items-center gap-2 mt-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className={i < Math.round(product.rating) ? 'text-gold fill-gold' : 'text-gray-200'} />
                  ))}
                </div>
                <span className="text-xs font-sans text-muted tracking-wider">
                  {product.rating.toFixed(1)} {product.reviewCount > 0 ? `(${product.reviewCount} Reviews)` : '(No Reviews Yet)'}
                </span>
              </div>
            </div>

            {/* Price display */}
            <div className="flex items-baseline gap-4">
              <span className="font-serif text-3xl text-charcoal">{formatPrice(finalPrice)}</span>
              {disc > 0 && (
                <>
                  <span className="text-base text-muted line-through font-serif">{formatPrice(price)}</span>
                  <span className="text-xs font-sans font-semibold text-green bg-green/5 border border-green/10 px-2.5 py-1 tracking-wider uppercase">
                    Save {disc}%
                  </span>
                </>
              )}
            </div>

            {/* Sizes */}
            {product.variants?.length > 0 && (
              <div className="space-y-3.5">
                <p className="text-xs font-sans font-semibold text-charcoal uppercase tracking-widest">
                  Select Size: <span className="font-light normal-case text-muted ml-1">{selectedVariant?.size}</span>
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {product.variants.map((v, i) => {
                    const active = selectedVariant?.size === v.size;
                    return (
                      <button
                        key={i}
                        onClick={() => {
                          setSelectedVariant(v);
                          setSelectedColor(v.color?.[0] || null);
                        }}
                        className={`px-5 py-2.5 border text-xs font-sans tracking-widest uppercase transition-all duration-300 ${
                          active
                            ? 'border-charcoal bg-charcoal text-white font-medium shadow-sm'
                            : 'border-cream-dark text-charcoal bg-white hover:border-charcoal'
                        }`}
                      >
                        {v.size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Colors */}
            {selectedVariant?.color?.length > 0 && (
              <div className="space-y-3.5">
                <p className="text-xs font-sans font-semibold text-charcoal uppercase tracking-widest">
                  Select Color: <span className="font-light normal-case text-muted ml-1">{selectedColor}</span>
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {selectedVariant.color.map((color, index) => {
                    const active = selectedColor === color;
                    const colorHex = getColorHex(color);
                    return (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 border text-xs font-sans tracking-wider uppercase transition-all duration-300 flex items-center gap-2 ${
                          active
                            ? 'border-charcoal bg-charcoal text-white font-medium shadow-sm'
                            : 'border-cream-dark text-charcoal bg-white hover:border-charcoal'
                        }`}
                      >
                        {colorHex && (
                          <span
                            className="w-4 h-4 rounded-full border border-gray-300 flex-shrink-0"
                            style={{
                              backgroundColor: colorHex,
                              borderColor: colorHex === '#FFFFFF' || colorHex === 'transparent' ? '#D1D5DB' : colorHex
                            }}
                          />
                        )}
                        {color}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 border-b border-cream-dark pb-6">
              <p className="text-xs font-sans font-semibold text-charcoal uppercase tracking-widest">Quantity:</p>
              <div className="flex items-center border border-cream-dark bg-white">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-cream transition-colors text-charcoal"
                >
                  <Minus size={12} />
                </button>
                <span className="w-12 text-center font-sans font-medium text-sm text-charcoal">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-cream transition-colors text-charcoal"
                >
                  <Plus size={12} />
                </button>
              </div>
            </div>

            {/* COMPLETE THE LOOK SECTION */}
            {crossSellProducts.length > 0 && (
              <div className="bg-[#FAF8F5] border border-cream-dark p-5 space-y-4">
                <h3 className="font-serif text-lg text-charcoal">Complete the Look</h3>
                <div className="space-y-4">
                  {crossSellProducts.map((item) => {
                    const isChecked = selectedCrossSells.some(i => i._id === item._id);
                    const itemPrice = item.variants?.[0]?.price || 0;
                    const itemDisc = item.discount || 0;
                    const itemFinal = itemDisc > 0 ? itemPrice - (itemPrice * itemDisc / 100) : itemPrice;
                    
                    return (
                      <div key={item._id} className="flex items-center justify-between gap-4 border-b border-cream-dark/50 pb-3 last:border-b-0 last:pb-0">
                        <Link to={`/products/${item.slug}`} className="flex items-center gap-3.5 flex-1 group">
                          <img
                            src={item.pimages?.[0] || 'https://via.placeholder.com/60x80'}
                            alt={item.name}
                            className="w-12 h-15 object-cover bg-cream-dark border border-cream-dark"
                          />
                          <div>
                            <h4 className="font-serif text-sm text-charcoal group-hover:text-gold transition-colors leading-snug line-clamp-1">
                              {item.name}
                            </h4>
                            <p className="font-serif text-xs text-muted mt-0.5">
                              {formatPrice(itemFinal)}
                              {itemDisc > 0 && (
                                <span className="text-[10px] text-green font-sans font-semibold uppercase tracking-wider ml-1.5">
                                  {itemDisc}% off
                                </span>
                              )}
                            </p>
                          </div>
                        </Link>
                        <button
                          onClick={() => toggleCrossSell(item)}
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300 ${
                            isChecked
                              ? 'bg-charcoal border-charcoal text-white'
                              : 'border-cream-dark hover:border-charcoal text-transparent'
                          }`}
                        >
                          <Check size={12} className="stroke-[3px]" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* CTAs */}
            <div ref={buyButtonRef} className="space-y-3.5">
              <button
                onClick={handleAddToCart}
                className="w-full btn-outline border-charcoal hover:bg-charcoal hover:text-white transition-all duration-300 py-4 flex items-center justify-center gap-2"
              >
                <ShoppingBag size={15} />
                {selectedCrossSells.length > 0
                  ? `ADD SELECTION TO BAG — ${formatPrice(combinedPrice)}`
                  : 'ADD TO BAG'
                }
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full btn-primary bg-charcoal hover:bg-black text-white py-4 transition-colors duration-300"
              >
                BUY IT NOW
              </button>
            </div>

            {/* Wishlist & Share */}
            <div className="flex items-center gap-5 text-xs uppercase tracking-widest font-sans text-muted">
              <button
                onClick={() => { toggle(product); toast.success(wishlisted ? 'Removed from wishlist' : 'Added to wishlist'); }}
                className="flex items-center gap-2 hover:text-charcoal transition-colors font-semibold"
              >
                <Heart size={14} className={wishlisted ? 'text-red-500 fill-red-500 stroke-red-500' : 'text-muted'} />
                {wishlisted ? 'WISHLISTED' : 'ADD TO WISHLIST'}
              </button>
              <button
                onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Link copied to clipboard!'); }}
                className="flex items-center gap-2 hover:text-charcoal transition-colors font-semibold"
              >
                <Share2 size={14} />
                SHARE PRODUCT
              </button>
            </div>

            {/* Delivery/Pincode check */}
            <div className="border border-cream-dark p-4 bg-white">
              <p className="text-xs font-sans font-semibold text-charcoal uppercase tracking-widest mb-3.5 flex items-center gap-2">
                <Truck size={14} /> CHECK DELIVERY TIMES
              </p>
              <div className="flex gap-2.5">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit PIN code"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  className="flex-1 border border-cream-dark px-3 py-2 text-sm font-sans tracking-wide focus:outline-none focus:border-charcoal placeholder-muted/65"
                />
                <button
                  onClick={checkPincode}
                  className="btn-outline py-2 px-5 text-xs border-charcoal hover:bg-charcoal hover:text-white"
                >
                  CHECK
                </button>
              </div>
              {pincodeResult && (
                <p className={`mt-3 text-xs font-sans tracking-wider ${pincodeResult.ok ? 'text-green' : 'text-red-500'}`}>
                  {pincodeResult.message}
                </p>
              )}
            </div>

            {/* Product detail tabs (horizontal tab list) */}
            <div className="border-t border-cream-dark pt-6 space-y-4">
              <div className="flex border-b border-cream-dark overflow-x-auto gap-5 pb-2">
                {[
                  { id: 'story', label: 'THE STORY' },
                  { id: 'care', label: 'CARE & MAINTENANCE' },
                  { id: 'shipping', label: 'SHIPPING' },
                  { id: 'returns', label: 'RETURNS' }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={`pb-2 text-[11px] font-sans font-semibold uppercase tracking-widest border-b-2 whitespace-nowrap transition-all duration-300 ${
                      activeTab === t.id
                        ? 'border-charcoal text-charcoal'
                        : 'border-transparent text-muted hover:text-charcoal'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <div className="text-sm font-sans text-muted leading-relaxed transition-all duration-300 min-h-24 whitespace-pre-line">
                {tabsContent[activeTab]}
              </div>
            </div>

            {/* Core Trust Badges */}
            <div className="grid grid-cols-3 gap-3 border-t border-cream-dark pt-6">
              {[
                { icon: Truck, title: 'FREE SHIPPING', text: 'On orders above ₹999' },
                { icon: RotateCcw, title: '7 DAY RETURNS', text: 'Hassle-free exchanges' },
                { icon: Shield, title: 'SECURE CHECKOUT', text: '100% encrypted pay' },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex flex-col items-center gap-1.5 text-center">
                  <Icon size={18} className="text-charcoal" />
                  <p className="text-[10px] font-sans font-semibold tracking-wider text-charcoal mt-1 uppercase">{title}</p>
                  <p className="text-[9px] font-sans text-muted tracking-wide leading-snug">{text}</p>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

      {/* STICKY BOTTOM BAR (Displays when buy buttons scrolled out of view) */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-cream-dark shadow-md py-3.5 px-4 transition-transform duration-500 ${
        showStickyBar ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <img
              src={imgs[0] || 'https://via.placeholder.com/50x50'}
              alt={product.name}
              className="w-10 h-12 object-cover bg-cream-dark border border-cream-dark"
            />
            <div className="hidden sm:block">
              <h4 className="font-serif text-sm text-charcoal leading-tight line-clamp-1">{product.name}</h4>
              <p className="text-[11px] font-sans text-muted mt-0.5 uppercase tracking-widest">
                Variant: {selectedVariant?.size || 'Default'}{selectedColor ? ` / ${selectedColor}` : ''}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="font-serif text-lg text-charcoal">{formatPrice(finalPrice)}</span>
            <button
              onClick={() => {
                // Scroll back to variants
                window.scrollTo({ top: buyButtonRef.current.offsetTop - 150, behavior: 'smooth' });
              }}
              className="btn-primary bg-charcoal hover:bg-black text-[11px] tracking-widest font-semibold px-6 py-3 uppercase"
            >
              SELECT OPTIONS
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
