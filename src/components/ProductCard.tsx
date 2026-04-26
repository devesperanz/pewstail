import { memo } from 'react';
import { motion } from 'motion/react';
import { Heart, Plus } from 'lucide-react';
import { Product } from '../types';

interface Props {
  product: Product;
  index: number;
  onAddToCart: (product: Product) => void;
}

const ProductCard = memo(({ product, index, onAddToCart }: Props) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    className="group"
  >
    <div className="relative aspect-[4/5] overflow-hidden rounded-[40px] bg-[var(--color-border)]/20 mb-8 border border-white/50 group-hover:border-[var(--color-primary)]/30 transition-colors shadow-sm group-hover:shadow-2xl group-hover:shadow-[var(--color-primary)]/10">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
        loading="lazy"
        referrerPolicy="no-referrer"
      />
      <button
        aria-label={`Save ${product.name}`}
        className="absolute top-8 right-8 p-3.5 bg-white/90 backdrop-blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-[var(--color-accent)] transform translate-y-4 group-hover:translate-y-0 shadow-xl"
      >
        <Heart size={20} />
      </button>
      <div className="absolute bottom-8 left-8 right-8 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-[var(--color-dark)] text-white py-5 rounded-[22px] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[var(--color-primary)] active:scale-95 transition-all shadow-2xl shadow-black/20"
        >
          <Plus size={18} /> Add to Cart
        </button>
      </div>
    </div>
    <div>
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-2xl font-display font-medium text-[var(--color-dark)] group-hover:text-[var(--color-primary)] transition-colors">
          {product.name}
        </h4>
        <p className="text-xl font-semibold text-[var(--color-primary)]">${product.price.toFixed(2)}</p>
      </div>
      <p className="text-[10px] text-[var(--color-muted)] font-bold uppercase tracking-[0.2em]">
        {product.category} Focus • Quality Built
      </p>
    </div>
  </motion.div>
));

export default ProductCard;
