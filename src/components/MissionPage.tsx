import { memo } from 'react';
import { motion } from 'motion/react';
import { PawPrint } from 'lucide-react';
import RealisticPet from './RealisticPet';

const MissionPage = memo(() => (
  <motion.div
    key="mission"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="pt-28 sm:pt-36 lg:pt-48 pb-16 sm:pb-24 lg:pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
  >
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-center">
      <div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-[10px] font-extrabold uppercase tracking-[0.4em] text-(--color-primary) mb-5 sm:mb-6 block"
        >
          Our Philosophy
        </motion.span>
        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-display font-light text-(--color-dark) leading-[1.1] mb-8 sm:mb-10 lg:mb-12 tracking-tight">
          Better homes for <br />
          <span className="italic text-(--color-secondary)">better companions.</span>
        </h2>
        <div className="space-y-5 sm:space-y-8 text-base sm:text-lg text-(--color-muted) leading-relaxed font-medium">
          <p>
            Paws&Tail was founded on a simple realization: the products we buy for our pets
            should meet the same standards we hold for ourselves. No harmful plastics, no
            extractive chains, and no compromise on aesthetics.
          </p>
          <p>
            Every piece in our collection is curated through a lens of three core pillars:
            Orthopedic Health, Ecological Sustainability, and Modern Architectural Design.
          </p>
        </div>
        <div className="mt-10 sm:mt-14 lg:mt-16 grid grid-cols-3 gap-4 sm:gap-8 border-t border-(--color-border) pt-8 sm:pt-12">
          {[
            { stat: '12k+', label: 'Happy Pets' },
            { stat: '100%', label: 'Organic' },
            { stat: '0%', label: 'Plastics' },
          ].map(({ stat, label }) => (
            <div key={label}>
              <h5 className="text-2xl sm:text-3xl font-display text-(--color-dark) mb-1">{stat}</h5>
              <p className="text-[9px] sm:text-[10px] font-bold text-(--color-muted) uppercase tracking-widest">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pet visual — hide on mobile to avoid overflow */}
      <div className="hidden sm:flex items-center justify-center relative">
        <div className="absolute inset-0 bg-(--color-primary)/10 rounded-[60px] sm:rounded-[100px] blur-3xl transform rotate-12" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <RealisticPet size="lg" type="dog" />
        </motion.div>

        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-10 -right-6 sm:-top-20 sm:-right-10 lg:-right-20 p-5 sm:p-8 bg-white/40 backdrop-blur-md rounded-[30px] sm:rounded-[40px] border border-white/50 shadow-2xl"
        >
          <PawPrint size={24} className="text-(--color-primary)" />
        </motion.div>
      </div>
    </div>
  </motion.div>
));

export default MissionPage;
