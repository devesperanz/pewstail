import { memo } from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import RealisticPet from './RealisticPet';

interface Props {
  onExplore: () => void;
}

const HeroSection = memo(({ onExplore }: Props) => (
  <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
    <div className="absolute inset-0 z-0">
      <img
        src="https://images.unsplash.com/photo-1544568100-847a948585b9?w=1600&q=80"
        alt="Hero Dog"
        className="w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12 py-32 lg:py-0">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="inline-flex items-center gap-3 px-4 sm:px-5 py-2 bg-(--color-primary) text-white text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] sm:tracking-[0.3em] rounded-full mb-6 sm:mb-8 shadow-xl">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
          The Wellness Edit • Live Now
        </div>
        <h2 className="text-6xl sm:text-8xl lg:text-[9rem] xl:text-[11rem] font-display font-light leading-[0.85] mb-6 sm:mb-10 text-white tracking-tighter">
          Natural <br />
          <span className="italic font-medium text-(--color-secondary)">Soul.</span>
        </h2>
        <p className="text-base sm:text-xl text-white/80 mb-8 sm:mb-12 leading-relaxed max-w-md font-medium">
          Sustainable, organic, and ethically sourced essentials for the modern pet owner.
        </p>
        <button
          onClick={onExplore}
          className="bg-white text-(--color-dark) px-7 sm:px-10 py-4 sm:py-5 rounded-2xl font-bold shadow-2xl hover:bg-(--color-primary) hover:text-white transition-all flex items-center gap-3 group active:scale-95 text-sm sm:text-base"
        >
          Explore Collection <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="hidden lg:flex items-center justify-center"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-white/20 blur-3xl transform scale-150 rotate-45" />
          <RealisticPet type="cat" />
        </div>
      </motion.div>
    </div>
  </section>
));

export default HeroSection;
