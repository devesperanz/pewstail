import { memo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import emailjs from '@emailjs/browser';
import { ChevronRight, ShieldCheck, Lock, PawPrint, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { CartItem } from '../types';

const SERVICE_ID  = 'service_m8ob9mb';
const TEMPLATE_ID = 'template_mdt8i75';
const PUBLIC_KEY  = 'K9gyxDoAN6WCEcbFl';

interface Props {
  cart: CartItem[];
  cartTotal: number;
  onBack: () => void;
  onConfirm: () => void;
}

type Step = 'details' | 'sending' | 'confirmed' | 'error';
type EmailError = { text?: string; status?: number; message?: string };

const INPUT = "w-full bg-white border border-(--color-border) rounded-2xl px-4 sm:px-5 py-3.5 sm:py-4 text-sm text-(--color-dark) placeholder:text-(--color-muted)/50 focus:outline-none focus:border-(--color-primary) transition-all";
const LABEL = "block text-[10px] font-bold uppercase tracking-widest text-(--color-muted) mb-2";

const CheckoutPage = memo(({ cart, cartTotal, onBack, onConfirm }: Props) => {
  const [step, setStep] = useState<Step>('details');
  const [emailError, setEmailError] = useState<EmailError | null>(null);
  const [form, setForm] = useState({
    email: '', firstName: '', lastName: '',
    address: '', city: '', state: '', zip: '', country: 'United States',
    cardNumber: '', expiry: '', cvv: '', cardName: '',
  });

  const set = useCallback((key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm(prev => ({ ...prev, [key]: e.target.value }))
  , []);

  const formatCard = (v: string) =>
    v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();

  const formatExpiry = (v: string) => {
    const digits = v.replace(/\D/g, '').slice(0, 4);
    return digits.length >= 3 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
  };

  const shipping = cartTotal >= 75 ? 0 : 9.95;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;

  const orderItems = cart
    .map(item => `${item.name} x${item.quantity} — $${(item.price * item.quantity).toFixed(2)}`)
    .join('\n');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('sending');

    const templateParams = {
      to_email:    form.email,
      email:       form.email,
      first_name:  form.firstName,
      last_name:   form.lastName,
      order_items: orderItems,
      subtotal:    `$${cartTotal.toFixed(2)}`,
      shipping:    shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`,
      tax:         `$${tax.toFixed(2)}`,
      total:       `$${total.toFixed(2)}`,
      address:     form.address,
      city:        form.city,
      state:       form.state,
      zip:         form.zip,
      country:     form.country,
    };

    try {
      console.log('EmailJS sending...', { SERVICE_ID, TEMPLATE_ID, templateParams });
      const result = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      console.log('EmailJS success:', result);
      setStep('confirmed');
    } catch (err: unknown) {
      const e = err as EmailError;
      console.error('EmailJS error:', {
        status: e?.status,
        text: e?.text,
        message: e?.message,
        raw: err,
      });
      setEmailError(e);
      setStep('error');
    }
  };

  if (step === 'confirmed') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="pt-32 sm:pt-40 lg:pt-48 pb-20 sm:pb-32 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
          className="w-20 h-20 sm:w-24 sm:h-24 bg-(--color-primary)/10 rounded-full flex items-center justify-center mx-auto mb-8 sm:mb-10"
        >
          <CheckCircle size={40} className="text-(--color-primary)" />
        </motion.div>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-light text-(--color-dark) tracking-tight mb-5 sm:mb-6">
          Order confirmed.
        </h2>
        <p className="text-(--color-muted) text-base sm:text-lg leading-relaxed mb-4 max-w-md mx-auto">
          Thank you, {form.firstName}. A confirmation has been sent to <strong>{form.email}</strong>.
          Your order will arrive in 3–5 business days.
        </p>
        <p className="text-(--color-muted) text-sm mb-12 sm:mb-16">
          Shipping to {form.address}, {form.city}, {form.state} {form.zip}.
        </p>
        <button
          onClick={onConfirm}
          className="bg-(--color-dark) text-white px-10 sm:px-12 py-4 sm:py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-(--color-primary) transition-all text-xs"
        >
          Back to Studio
        </button>
      </motion.div>
    );
  }

  if (step === 'error') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="pt-32 sm:pt-40 lg:pt-48 pb-20 sm:pb-32 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8">
          <AlertCircle size={40} className="text-red-400" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-light text-(--color-dark) tracking-tight mb-4">
          Something went wrong.
        </h2>
        <p className="text-(--color-muted) text-base mb-4 max-w-sm mx-auto leading-relaxed">
          We couldn't send your confirmation email. Your order may still have been placed — please contact us at hello@pawsandtail.com.
        </p>
        {emailError && (
          <p className="text-xs font-mono text-red-400 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-6 max-w-sm mx-auto text-left break-all">
            {emailError.status ? `Status ${emailError.status}: ` : ''}{emailError.text ?? emailError.message ?? 'Unknown error'}
          </p>
        )}
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => setStep('details')}
            className="bg-(--color-dark) text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-(--color-primary) transition-all text-xs"
          >
            Try Again
          </button>
          <button
            onClick={onConfirm}
            className="border border-(--color-border) text-(--color-muted) px-8 py-4 rounded-2xl font-bold uppercase tracking-widest hover:border-(--color-dark) hover:text-(--color-dark) transition-all text-xs"
          >
            Back to Shop
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pt-28 sm:pt-36 lg:pt-40 pb-20 sm:pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-(--color-muted) hover:text-(--color-primary) transition-colors mb-10 sm:mb-16 group"
      >
        <ChevronRight size={14} className="rotate-180 group-hover:-translate-x-0.5 transition-transform" />
        Back to cart
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-8 lg:gap-16 items-start">

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-10 sm:space-y-12">

          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-(--color-primary) rounded-xl flex items-center justify-center">
                <PawPrint size={14} className="text-white" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-[0.4em] text-(--color-primary)">Checkout</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-light text-(--color-dark) tracking-tight">
              Complete your order.
            </h1>
          </div>

          {/* Contact */}
          <section>
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-(--color-dark) mb-5 sm:mb-6 pb-3 sm:pb-4 border-b border-(--color-border)">
              Contact
            </h2>
            <div>
              <label className={LABEL}>Email address</label>
              <input required type="email" placeholder="you@email.com" className={INPUT} value={form.email} onChange={set('email')} />
            </div>
          </section>

          {/* Shipping */}
          <section>
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-(--color-dark) mb-5 sm:mb-6 pb-3 sm:pb-4 border-b border-(--color-border)">
              Shipping address
            </h2>
            <div className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className={LABEL}>First name</label>
                  <input required placeholder="Jane" className={INPUT} value={form.firstName} onChange={set('firstName')} />
                </div>
                <div>
                  <label className={LABEL}>Last name</label>
                  <input required placeholder="Doe" className={INPUT} value={form.lastName} onChange={set('lastName')} />
                </div>
              </div>
              <div>
                <label className={LABEL}>Street address</label>
                <input required placeholder="123 Oak Street" className={INPUT} value={form.address} onChange={set('address')} />
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className={LABEL}>City</label>
                  <input required placeholder="New York" className={INPUT} value={form.city} onChange={set('city')} />
                </div>
                <div>
                  <label className={LABEL}>State</label>
                  <input required placeholder="NY" className={INPUT} value={form.state} onChange={set('state')} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className={LABEL}>ZIP code</label>
                  <input required placeholder="10001" className={INPUT} value={form.zip} onChange={set('zip')} />
                </div>
                <div>
                  <label className={LABEL}>Country</label>
                  <select required className={INPUT} value={form.country} onChange={set('country')}>
                    {['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France'].map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Payment */}
          <section>
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-(--color-dark) mb-5 sm:mb-6 pb-3 sm:pb-4 border-b border-(--color-border)">
              Payment
            </h2>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className={LABEL}>Card number</label>
                <input
                  required placeholder="1234 5678 9012 3456" className={INPUT}
                  value={form.cardNumber}
                  onChange={e => setForm(prev => ({ ...prev, cardNumber: formatCard(e.target.value) }))}
                  maxLength={19}
                />
              </div>
              <div>
                <label className={LABEL}>Cardholder name</label>
                <input required placeholder="Jane Doe" className={INPUT} value={form.cardName} onChange={set('cardName')} />
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className={LABEL}>Expiry</label>
                  <input
                    required placeholder="MM/YY" className={INPUT}
                    value={form.expiry}
                    onChange={e => setForm(prev => ({ ...prev, expiry: formatExpiry(e.target.value) }))}
                    maxLength={5}
                  />
                </div>
                <div>
                  <label className={LABEL}>CVV</label>
                  <input
                    required placeholder="123" className={INPUT}
                    value={form.cvv}
                    onChange={e => setForm(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                    maxLength={4}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-5 sm:mt-6 p-4 bg-(--color-light) rounded-2xl border border-(--color-border)">
              <Lock size={13} className="text-(--color-primary) shrink-0" />
              <p className="text-[10px] text-(--color-muted) font-medium leading-relaxed">
                Your payment is encrypted with 256-bit SSL. We never store your card details.
              </p>
            </div>
          </section>

          <button
            type="submit"
            disabled={step === 'sending'}
            className="w-full bg-(--color-dark) text-white py-5 sm:py-6 rounded-[28px] font-bold text-xs uppercase tracking-[0.2em] shadow-2xl shadow-black/10 hover:bg-(--color-primary) active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
          >
            {step === 'sending' ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Placing Order…
              </>
            ) : (
              <>
                <ShieldCheck size={16} />
                Place Order · ${total.toFixed(2)}
              </>
            )}
          </button>
        </form>

        {/* Order Summary */}
        <div className="lg:sticky lg:top-28">
          <div className="bg-white rounded-[28px] sm:rounded-[40px] border border-(--color-border) shadow-sm overflow-hidden">
            <div className="px-6 sm:px-8 py-5 sm:py-6 border-b border-(--color-border)">
              <h3 className="font-display text-lg sm:text-xl text-(--color-dark)">Order Summary</h3>
              <p className="text-[10px] font-bold text-(--color-muted) uppercase tracking-widest mt-1">
                {cart.reduce((s, i) => s + i.quantity, 0)} items
              </p>
            </div>

            <div className="px-6 sm:px-8 py-5 sm:py-6 space-y-4 max-h-60 sm:max-h-72 overflow-y-auto custom-scrollbar">
              <AnimatePresence>
                {cart.map(item => (
                  <div key={item.id} className="flex gap-3 sm:gap-4 items-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl overflow-hidden shrink-0 bg-(--color-light)">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-semibold text-(--color-dark) truncate">{item.name}</p>
                      <p className="text-[9px] sm:text-[10px] text-(--color-muted) font-bold uppercase tracking-widest">Qty {item.quantity}</p>
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-(--color-dark) shrink-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </AnimatePresence>
            </div>

            <div className="px-6 sm:px-8 py-5 sm:py-6 bg-(--color-light) space-y-3 border-t border-(--color-border)">
              <div className="flex justify-between text-xs text-(--color-muted) font-medium">
                <span>Subtotal</span><span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-(--color-muted) font-medium">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="text-(--color-primary) font-bold">Free</span> : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-xs text-(--color-muted) font-medium">
                <span>Tax (est. 8%)</span><span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-baseline pt-3 sm:pt-4 border-t border-(--color-border)">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-(--color-muted)">Total</span>
                <span className="text-2xl sm:text-3xl font-display text-(--color-dark)">${total.toFixed(2)}</span>
              </div>
              {shipping === 0 && (
                <p className="text-[9px] text-(--color-primary) font-bold uppercase tracking-widest text-center pt-1">
                  🌿 Free carbon-neutral shipping applied
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default CheckoutPage;
