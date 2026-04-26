import { memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf, ShieldCheck, Package } from 'lucide-react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface Props {
  products: Product[];
  selectedCategory: string;
  onAddToCart: (product: Product) => void;
}

const ProductGrid = memo(({ products, selectedCategory, onAddToCart }: Props) => (
  <main id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-32">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 sm:mb-16 lg:mb-20 gap-6 sm:gap-8">
      <motion.div layout>
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-light mb-3 sm:mb-4 tracking-tighter">Essential Studio</h3>
        <p className="text-(--color-muted) text-xs sm:text-sm tracking-[0.15em] uppercase font-bold">
          {selectedCategory === 'all' ? 'The Complete Edit' : `${selectedCategory} Collection`}
        </p>
      </motion.div>
      <div className="flex gap-5 sm:gap-8 border-l border-(--color-border) pl-5 sm:pl-8">
        <div className="group cursor-default">
          <Leaf size={20} className="text-(--color-primary) mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform" />
          <h4 className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-(--color-dark)">Natural</h4>
          <p className="text-[8px] sm:text-[9px] text-(--color-muted)">Organic Materials</p>
        </div>
        <div className="group cursor-default">
          <ShieldCheck size={20} className="text-(--color-secondary) mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform" />
          <h4 className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-(--color-dark)">Safe</h4>
          <p className="text-[8px] sm:text-[9px] text-(--color-muted)">Vet Tested</p>
        </div>
        <div className="group cursor-default">
          <Package size={20} className="text-(--color-accent) mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform" />
          <h4 className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-(--color-dark)">Smart</h4>
          <p className="text-[8px] sm:text-[9px] text-(--color-muted)">Carbon Neutral</p>
        </div>
      </div>
    </div>

    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-8 lg:gap-x-12 gap-y-12 sm:gap-y-16 lg:gap-y-20">
      <AnimatePresence mode="popLayout">
        {products.map((product, idx) => (
          <ProductCard key={product.id} product={product} index={idx} onAddToCart={onAddToCart} />
        ))}
      </AnimatePresence>
    </motion.div>
  </main>
));

export default ProductGrid;
