import { useState, useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Plus, PawPrint, Menu, X } from 'lucide-react';
import { PRODUCTS } from './constants';
import { Product, CartItem } from './types';
import HeroSection from './components/HeroSection';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center pt-32">
    <div className="w-10 h-10 rounded-full border-4 border-(--color-border) border-t-(--color-primary) animate-spin" />
  </div>
);

const MissionPage  = lazy(() => import('./components/MissionPage'));
const PrivacyPage  = lazy(() => import('./components/PrivacyPage'));
const LegalPage    = lazy(() => import('./components/LegalPage'));
const CarbonPage   = lazy(() => import('./components/CarbonPage'));
const CheckoutPage = lazy(() => import('./components/CheckoutPage'));

type Page = 'shop' | 'mission' | 'privacy' | 'legal' | 'carbon' | 'checkout';

const NAV_CATS = ['all', 'dogs', 'cats', 'wellness'] as const;

const BRAND_FEATURES = [
  { icon: '🌿', label: 'Sustainable', sub: 'Recycled Materials' },
  { icon: '🦴', label: 'Vet Approved', sub: 'Orthopedic Support' },
  { icon: '📦', label: 'Eco-Express', sub: 'Carbon Neutral' },
  { icon: '⭐', label: '4.9/5 Rating', sub: 'True Community' },
] as const;

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('shop');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        setShowScrollTop(window.scrollY > 500);
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => { window.removeEventListener('scroll', handleScroll); cancelAnimationFrame(rafId); };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  }, [currentPage]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const scrollToTop = useCallback(() => window.scrollTo({ top: 0, behavior: 'smooth' }), []);

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((id: string) => setCart(prev => prev.filter(item => item.id !== id)), []);

  const updateQuantity = useCallback((id: string, delta: number) => {
    setCart(prev =>
      prev.map(item => item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item)
          .filter(item => item.quantity > 0)
    );
  }, []);

  const { cartTotal, cartCount } = useMemo(() => ({
    cartTotal: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    cartCount: cart.reduce((sum, item) => sum + item.quantity, 0),
  }), [cart]);

  const filteredProducts = useMemo(() =>
    PRODUCTS.filter(p => {
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }), [selectedCategory, searchQuery]
  );

  const goToShop = useCallback((cat: string) => { setCurrentPage('shop'); setSelectedCategory(cat); }, []);
  const handleExplore = useCallback(() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }), []);
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => { setSearchQuery(e.target.value); setCurrentPage('shop'); }, []);
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const goToCheckout = useCallback(() => { setIsCartOpen(false); setCurrentPage('checkout'); }, []);
  const confirmCheckout = useCallback(() => { setCurrentPage('shop'); setCart([]); }, []);

  const isShopCatActive = (cat: string) => currentPage === 'shop' && selectedCategory === cat;

  return (
    <div className="min-h-screen selection:bg-(--color-primary)/20">

      {/* Announcement Bar */}
      <div role="banner" aria-label="Promotional announcement" className="bg-(--color-primary) text-white text-[9px] sm:text-[10px] py-1.5 text-center font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase z-50 relative px-4">
        Free Express Shipping on all Pet Wellness Kits over $75
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'mt-6 mx-3 sm:mt-8 sm:mx-6 rounded-2xl sm:rounded-3xl bg-white/90 backdrop-blur-xl shadow-lg border border-white/20 py-2.5 sm:py-3'
            : 'mt-6 sm:mt-7 py-3 sm:py-5 bg-white/95 backdrop-blur-md shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo */}
          <button type="button" onClick={() => goToShop('all')} aria-label="Paws & Tail — go to shop" className="flex items-center gap-2 group cursor-pointer shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-(--color-primary) rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-(--color-primary)/20">
              <PawPrint className="text-white" size={18} />
            </div>
            <h1 className="text-base sm:text-xl font-black tracking-tighter text-(--color-dark) group-hover:text-(--color-primary) transition-colors">
              PAWS&TAIL
            </h1>
          </button>

          {/* Desktop Nav */}
          <nav aria-label="Main navigation" className="hidden lg:flex gap-1">
            {NAV_CATS.map(cat => (
              <button key={cat} type="button" onClick={() => goToShop(cat)}
                aria-current={isShopCatActive(cat) ? 'page' : undefined}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all ${
                  isShopCatActive(cat)
                    ? 'bg-(--color-primary)/10 text-(--color-primary)'
                    : 'text-(--color-dark)/70 hover:text-(--color-dark) hover:bg-(--color-border)/40'
                }`}
              >{cat}</button>
            ))}
            <button type="button" onClick={() => setCurrentPage('mission')}
              aria-current={currentPage === 'mission' ? 'page' : undefined}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all ${
                currentPage === 'mission'
                  ? 'bg-(--color-primary)/10 text-(--color-primary)'
                  : 'text-(--color-dark)/70 hover:text-(--color-dark) hover:bg-(--color-border)/40'
              }`}
            >Our Mission</button>
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search — tablet+ */}
            <div className="hidden md:flex items-center bg-(--color-border)/50 rounded-full px-4 py-2.5 border border-(--color-border)">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-(--color-muted)" aria-hidden="true">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="search"
                placeholder="Find essentials..."
                aria-label="Search products"
                className="bg-transparent border-0 outline-none focus:outline-none focus:ring-0 text-xs font-medium w-32 lg:w-36 ml-2 text-(--color-dark) placeholder:text-(--color-muted)/60"
                value={searchQuery} onChange={handleSearchChange}
              />
            </div>

            {/* Cart */}
            <button
              type="button"
              onClick={openCart}
              aria-label={`Open cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
              className="bg-(--color-dark) text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-[10px] sm:text-xs font-extrabold uppercase tracking-widest flex items-center gap-2 sm:gap-3 hover:bg-(--color-primary) transition-all shadow-lg active:scale-95"
            >
              Cart
              <span aria-hidden="true" className="w-4 h-4 sm:w-5 sm:h-5 bg-white/25 rounded-md flex items-center justify-center text-[9px] sm:text-[10px] font-black">
                {cartCount}
              </span>
            </button>

            {/* Hamburger — mobile/tablet */}
            <button
              onClick={() => setMobileMenuOpen(v => !v)}
              className="lg:hidden p-2 rounded-xl hover:bg-(--color-border)/40 transition-all"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden border-t border-(--color-border)/30 mt-2"
            >
              <div className="px-4 py-4 space-y-1">
                {/* Mobile search */}
                <div className="flex items-center bg-(--color-border)/40 rounded-xl px-4 py-3 mb-3 border border-(--color-border)">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-(--color-muted)">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                  <input type="text" placeholder="Find essentials..."
                    className="bg-transparent border-0 outline-none focus:outline-none focus:ring-0 text-sm font-medium flex-1 ml-2 text-(--color-dark) placeholder:text-(--color-muted)/60"
                    value={searchQuery} onChange={handleSearchChange}
                  />
                </div>
                {NAV_CATS.map(cat => (
                  <button key={cat} onClick={() => goToShop(cat)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-extrabold uppercase tracking-widest transition-all ${
                      isShopCatActive(cat)
                        ? 'bg-(--color-primary)/10 text-(--color-primary)'
                        : 'text-(--color-dark)/70 hover:text-(--color-dark) hover:bg-(--color-border)/40'
                    }`}
                  >{cat}</button>
                ))}
                <button onClick={() => setCurrentPage('mission')}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-extrabold uppercase tracking-widest transition-all ${
                    currentPage === 'mission'
                      ? 'bg-(--color-primary)/10 text-(--color-primary)'
                      : 'text-(--color-dark)/70 hover:text-(--color-dark) hover:bg-(--color-border)/40'
                  }`}
                >Our Mission</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Pages */}
      <AnimatePresence mode="wait">
        {currentPage === 'shop' && (
          <motion.div key="shop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <HeroSection onExplore={handleExplore} />
            <ProductGrid products={filteredProducts} selectedCategory={selectedCategory} onAddToCart={addToCart} />
          </motion.div>
        )}
        {currentPage === 'mission'  && <Suspense key="mission"  fallback={<PageLoader />}><MissionPage /></Suspense>}
        {currentPage === 'privacy'  && <Suspense key="privacy"  fallback={<PageLoader />}><PrivacyPage /></Suspense>}
        {currentPage === 'legal'    && <Suspense key="legal"    fallback={<PageLoader />}><LegalPage /></Suspense>}
        {currentPage === 'carbon'   && <Suspense key="carbon"   fallback={<PageLoader />}><CarbonPage /></Suspense>}
        {currentPage === 'checkout' && (
          <Suspense key="checkout" fallback={<PageLoader />}>
            <CheckoutPage cart={cart} cartTotal={cartTotal} onBack={() => setCurrentPage('shop')} onConfirm={confirmCheckout} />
          </Suspense>
        )}
      </AnimatePresence>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop} aria-label="Scroll to top"
            className="fixed bottom-6 right-6 z-50 p-3.5 sm:p-4 bg-(--color-dark) text-white rounded-2xl shadow-2xl hover:bg-(--color-primary) transition-all active:scale-90"
          >
            <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <Plus className="rotate-45" size={22} />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Brand Features */}
      <section className="bg-white border-y border-(--color-border) py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {BRAND_FEATURES.map((feat, i) => (
            <motion.div key={i} whileHover={{ y: -5 }} className="flex gap-3 sm:gap-5 items-center group cursor-default">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-(--color-light) rounded-2xl sm:rounded-3xl flex items-center justify-center text-xl sm:text-2xl shadow-sm border border-(--color-border)/50 group-hover:bg-white group-hover:shadow-xl transition-all shrink-0">
                {feat.icon}
              </div>
              <div>
                <h4 className="text-[10px] sm:text-xs font-bold text-(--color-dark) uppercase tracking-widest">{feat.label}</h4>
                <p className="text-[9px] sm:text-[10px] text-(--color-muted) font-medium mt-0.5">{feat.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen} cart={cart} cartCount={cartCount} cartTotal={cartTotal}
        onClose={closeCart} onRemove={removeFromCart} onUpdateQuantity={updateQuantity} onCheckout={goToCheckout}
      />

      {/* Footer */}
      <footer className="bg-(--color-dark) text-white py-16 sm:py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-14 lg:gap-20">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-(--color-primary) rounded-xl flex items-center justify-center">
                <PawPrint size={18} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold tracking-tighter">PAWS&TAIL</h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-xs font-medium">
              Curating essential natural goods for the modern pet companion.
              Designed with clinical precision and boutique aesthetics.
            </p>
            <div className="flex gap-6">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="20" height="20" className="text-slate-500 hover:text-(--color-primary) transition-all cursor-pointer">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="20" height="20" className="text-slate-500 hover:text-(--color-primary) transition-all cursor-pointer">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" className="text-slate-500 hover:text-(--color-primary) transition-all cursor-pointer">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase text-[10px] tracking-widest border-b border-white/10 pb-4 inline-block">Shop</h4>
            <ul className="space-y-4 text-xs text-slate-400 font-medium">
              {[
                { label: 'Dog Wellness', cat: 'dogs' },
                { label: 'Cat Studio', cat: 'cats' },
                { label: 'Accessory Edit', cat: 'accessories' },
                { label: 'Organic Edibles', cat: 'wellness' },
              ].map(({ label, cat }) => (
                <li key={label} onClick={() => goToShop(cat)} className="hover:text-white cursor-pointer transition-colors">{label}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase text-[10px] tracking-widest border-b border-white/10 pb-4 inline-block">Studio Circle</h4>
            <p className="text-[10px] text-slate-400 mb-6 tracking-widest font-bold">15% OFF YOUR FIRST ORDER</p>
            <div className="flex gap-2">
              <input type="email" placeholder="studio@paws.com"
                className="bg-white/5 border border-white/10 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-xs flex-1 focus:outline-none focus:border-(--color-primary) transition-all placeholder:text-slate-600"
              />
              <button className="bg-(--color-primary) px-4 sm:px-5 py-3 sm:py-4 rounded-2xl hover:opacity-90 transition-all flex items-center justify-center active:scale-95">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 sm:mt-20 lg:mt-32 pt-10 sm:pt-12 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-8 text-[9px] text-slate-500 uppercase tracking-[0.15em] sm:tracking-[0.2em] font-extrabold">
          <p className="text-center sm:text-left">© 2026 PAWS&TAIL STUDIO. ETHICALLY SOURCED.</p>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-12">
            <button onClick={() => setCurrentPage('privacy')} className="hover:text-white transition-colors">Privacy</button>
            <button onClick={() => setCurrentPage('legal')}   className="hover:text-white transition-colors">Legal Terms</button>
            <button onClick={() => setCurrentPage('carbon')}  className="hover:text-white transition-colors">Carbon Report</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
