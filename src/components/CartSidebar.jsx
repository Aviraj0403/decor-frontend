import React from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCartStore } from '../store';
import { useNavigate } from 'react-router-dom';

function formatPrice(n) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

function CartItem({ item }) {
  const { removeItem, updateQty } = useCartStore();
  const price = item.variant?.price || item.product?.variants?.[0]?.price || 0;
  const disc = item.product?.discount || 0;
  const finalPrice = disc > 0 ? price - (price * disc / 100) : price;
  const img = item.product?.pimages?.[0] || 'https://via.placeholder.com/80x100/F5F0E8/2D5016?text=SD';

  return (
    <div className="flex gap-3 py-4 border-b border-gray-100">
      <img src={img} alt={item.product?.name} className="w-20 h-24 object-cover flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="font-medium text-charcoal text-sm leading-snug line-clamp-2">{item.product?.name}</p>
        {item.variant?.name && (
          <p className="text-xs text-muted mt-1">{item.variant.name}</p>
        )}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1 border border-gray-200">
            <button
              onClick={() => updateQty(item.key, item.quantity - 1)}
              className="w-7 h-7 flex items-center justify-center hover:bg-cream transition-colors"
            >
              <Minus size={12} />
            </button>
            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
            <button
              onClick={() => updateQty(item.key, item.quantity + 1)}
              className="w-7 h-7 flex items-center justify-center hover:bg-cream transition-colors"
            >
              <Plus size={12} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-charcoal text-sm">{formatPrice(finalPrice * item.quantity)}</span>
            <button onClick={() => removeItem(item.key)} className="text-muted hover:text-red-500 transition-colors">
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CartSidebar() {
  const { isOpen, closeCart, items, total } = useCartStore();
  const navigate = useNavigate();
  const totalAmount = typeof total === 'function' ? total() : useCartStore.getState().total;
  const subtotal = items.reduce((sum, i) => {
    const price = i.variant?.price || i.product?.variants?.[0]?.price || 0;
    const disc = i.product?.discount || 0;
    const final = disc > 0 ? price - (price * disc / 100) : price;
    return sum + final * i.quantity;
  }, 0);

  const FREE_SHIPPING_THRESHOLD = 999;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay ${isOpen ? 'open' : ''}`}
        onClick={closeCart}
      />

      {/* Sidebar */}
      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-green" />
            <h2 className="font-serif text-lg text-charcoal">Your Bag ({items.length})</h2>
          </div>
          <button onClick={closeCart} className="text-muted hover:text-charcoal transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Free shipping progress */}
        {remaining > 0 && (
          <div className="px-5 py-3 bg-cream text-xs text-charcoal">
            Add <strong>{formatPrice(remaining)}</strong> more for free shipping 🚚
            <div className="mt-1.5 h-1 bg-cream-dark rounded-full overflow-hidden">
              <div
                className="h-full bg-green rounded-full transition-all"
                style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
              />
            </div>
          </div>
        )}
        {remaining === 0 && items.length > 0 && (
          <div className="px-5 py-2 bg-green/10 text-xs text-green font-medium">
            🎉 You qualify for free shipping!
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16 gap-4">
              <ShoppingBag size={48} className="text-cream-dark" />
              <p className="text-muted font-serif text-lg">Your bag is empty</p>
              <button onClick={closeCart} className="btn-outline text-sm">
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => <CartItem key={item.key} item={item} />)
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-5 py-5 border-t border-gray-100 space-y-3">
            <div className="flex justify-between text-sm text-muted">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted">
              <span>Shipping</span>
              <span>{subtotal >= FREE_SHIPPING_THRESHOLD ? <span className="text-green font-medium">Free</span> : formatPrice(99)}</span>
            </div>
            <div className="flex justify-between font-semibold text-charcoal">
              <span className="font-serif text-lg">Total</span>
              <span className="font-serif text-lg">{formatPrice(subtotal >= FREE_SHIPPING_THRESHOLD ? subtotal : subtotal + 99)}</span>
            </div>
            <button
              onClick={() => { closeCart(); navigate('/checkout'); }}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-2"
            >
              Proceed to Checkout <ArrowRight size={16} />
            </button>
            <button onClick={closeCart} className="w-full text-center text-xs text-muted hover:text-charcoal transition-colors py-1">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
