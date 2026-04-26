import { memo } from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  type?: 'dog' | 'cat';
}

const PET_IMAGES = {
  dog: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=800&q=80',
  cat: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=800&q=80',
};

const SCALE = { sm: 0.6, md: 1, lg: 1.2 };

const RealisticPet = memo(({ size = 'md', type = 'dog' }: Props) => (
  <div className="relative group cursor-pointer" style={{ transform: `scale(${SCALE[size]})` }}>
    <motion.div
      animate={{ y: [0, -15, 0], rotate: [0, 1, -1, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      className="relative z-10"
    >
      <div className="w-64 h-64 rounded-full overflow-hidden border-[12px] border-white shadow-2xl relative">
        <img
          src={PET_IMAGES[type]}
          alt="Happy Pet"
          className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 hover:scale-110"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>

      <motion.div
        animate={{ rotate: [-15, 15, -15] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-4 -right-4 bg-[var(--color-accent)] p-3 rounded-full shadow-lg"
      >
        <Heart size={20} className="text-white fill-white" />
      </motion.div>
    </motion.div>

    <motion.div
      animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-8 bg-black/20 rounded-full blur-xl"
    />
    <div className="absolute -inset-10 bg-[var(--color-primary)]/5 blur-3xl rounded-full -z-10" />
  </div>
));

export default RealisticPet;
