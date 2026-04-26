import { memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import RealisticPet from './RealisticPet';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const CheckoutModal = memo(({ isOpen, onClose, onConfirm }: Props) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-[70]"
        />
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="fixed inset-0 m-auto w-[90%] max-w-2xl h-fit bg-white z-[80] rounded-[60px] shadow-2xl overflow-hidden flex flex-col items-center justify-center p-12 text-center"
        >
          <RealisticPet size="sm" type="cat" />
          <div className="mt-12 space-y-6">
            <h3 className="text-5xl font-display font-light text-[var(--color-dark)] tracking-tighter max-w-sm mx-auto leading-tight">
              Your order is <br />
              <span className="italic text-[var(--color-primary)]">on the way!</span>
            </h3>
            <p className="text-[var(--color-muted)] max-w-sm mx-auto text-lg leading-relaxed">
              Thank you for choosing conscious care. We've sent a detailed confirmation to your inbox.
            </p>
            <div className="pt-8">
              <button
                onClick={onConfirm}
                className="bg-[var(--color-dark)] text-white px-12 py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-[var(--color-primary)] transition-all text-xs"
              >
                Back to Studio
              </button>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
));

export default CheckoutModal;
