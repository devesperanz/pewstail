import { memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, X, Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem } from '../types';

interface Props {
  isOpen: boolean;
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  onClose: () => void;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onCheckout: () => void;
}

const CartDrawer = memo(({
  isOpen, cart, cartCount, cartTotal,
  onClose, onRemove, onUpdateQuantity, onCheckout,
}: Props) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
        />
        <motion.div
          initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="fixed top-0 right-0 h-full w-full sm:max-w-md lg:max-w-lg bg-white z-[60] shadow-2xl flex flex-col pt-6 sm:pt-8"
        >
          {/* Header */}
          <div className="px-5 sm:px-10 pb-5 sm:pb-8 border-b border-(--color-border) flex justify-between items-center">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-(--color-light) rounded-2xl flex items-center justify-center">
                <ShoppingCart size={20} className="text-(--color-dark)" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-display font-medium">Boutique Bag</h3>
                <p className="text-[10px] font-bold text-(--color-muted) uppercase tracking-widest">
                  {cartCount} items selected
                </p>
              </div>
            </div>
            <button onClick={onClose} className="p-2.5 sm:p-3 hover:bg-(--color-light) rounded-full transition-all">
              <X size={22} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-5 sm:px-10 py-6 sm:py-10 space-y-8 sm:space-y-12 custom-scrollbar">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-(--color-light) rounded-full flex items-center justify-center mb-8 sm:mb-10">
                  <ShoppingCart size={40} className="text-slate-300" />
                </div>
                <h4 className="text-xl sm:text-2xl font-display mb-3">Your bag is empty</h4>
                <p className="text-(--color-muted) mb-8 sm:mb-10 max-w-[260px] text-sm leading-relaxed">
                  Discover our newest collection and find something special for your companion.
                </p>
                <button
                  onClick={onClose}
                  className="bg-(--color-dark) text-white px-8 sm:px-10 py-4 sm:py-5 rounded-[22px] font-bold text-xs uppercase tracking-widest shadow-xl active:scale-95"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              <div className="space-y-6 sm:space-y-10">
                {cart.map(item => (
                  <motion.div layout key={item.id} className="flex gap-4 sm:gap-8 group">
                    <div className="w-20 h-24 sm:w-28 sm:h-36 bg-(--color-light) rounded-[20px] sm:rounded-[28px] overflow-hidden shrink-0 border border-(--color-border)/50 group-hover:shadow-lg transition-all">
                      <img src={item.image} className="w-full h-full object-cover" alt={item.name} loading="lazy" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center min-w-0">
                      <div className="flex justify-between items-start mb-1 sm:mb-2 gap-2">
                        <h4 className="font-display text-base sm:text-xl text-(--color-dark) truncate">{item.name}</h4>
                        <button onClick={() => onRemove(item.id)} className="text-slate-300 hover:text-red-500 transition-colors p-1 shrink-0">
                          <Trash2 size={15} />
                        </button>
                      </div>
                      <p className="text-[9px] sm:text-[10px] font-bold text-(--color-muted) uppercase tracking-widest mb-4 sm:mb-6">
                        {item.category}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center bg-(--color-light) rounded-xl py-1.5 px-2.5 sm:px-3 border border-(--color-border)/50 gap-1">
                          <button onClick={() => onUpdateQuantity(item.id, -1)} className="hover:text-(--color-primary) transition-colors p-0.5">
                            <Minus size={13} />
                          </button>
                          <span className="w-6 sm:w-8 text-center text-xs font-bold font-mono">{item.quantity}</span>
                          <button onClick={() => onUpdateQuantity(item.id, 1)} className="hover:text-(--color-primary) transition-colors p-0.5">
                            <Plus size={13} />
                          </button>
                        </div>
                        <p className="font-bold text-base sm:text-lg text-(--color-dark)">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="px-5 sm:px-10 py-6 sm:py-10 bg-(--color-light) border-t border-(--color-border)">
              <div className="flex justify-between items-center mb-6 sm:mb-8">
                <span className="text-(--color-muted) font-bold uppercase tracking-widest text-[10px]">Estimated Total</span>
                <span className="text-3xl sm:text-4xl font-display font-medium text-(--color-dark)">${cartTotal.toFixed(2)}</span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full bg-(--color-dark) text-white py-5 sm:py-6 rounded-[24px] sm:rounded-[28px] font-bold text-xs uppercase tracking-[0.2em] shadow-2xl shadow-black/20 hover:bg-(--color-primary) active:scale-95 transition-all"
              >
                Complete Checkout
              </button>
              <p className="text-[9px] text-(--color-muted) mt-4 sm:mt-6 text-center font-bold tracking-widest">
                CARBON NEUTRAL SHIPPING CALCULATED NEXT
              </p>
            </div>
          )}
        </motion.div>
      </>
    )}
  </AnimatePresence>
));

export default CartDrawer;
