import { memo } from 'react';
import { motion } from 'motion/react';
import { Leaf } from 'lucide-react';

const STATS = [
  { value: '0 kg',  label: 'Net CO₂ per shipment',   sub: 'Fully offset via reforestation' },
  { value: '100%',  label: 'Recycled packaging',      sub: 'FSC-certified, compostable mailers' },
  { value: '2,400+', label: 'Trees planted to date',  sub: 'Partner: One Tree Planted' },
  { value: '−62%',  label: 'Scope 1 & 2 reduction',  sub: 'vs. 2022 baseline' },
];

const CarbonPage = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="pt-28 sm:pt-36 lg:pt-48 pb-16 sm:pb-24 lg:pb-32 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
  >
    <span className="text-[10px] font-extrabold uppercase tracking-[0.4em] text-(--color-primary) mb-5 sm:mb-6 block">
      Sustainability
    </span>
    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-light text-(--color-dark) leading-tight mb-4 sm:mb-6 tracking-tight">
      Carbon <br />
      <span className="italic text-(--color-secondary)">Report.</span>
    </h1>
    <p className="text-base sm:text-lg text-(--color-muted) font-medium mb-12 sm:mb-16 lg:mb-20 max-w-xl leading-relaxed">
      We measure, reduce, and offset every gram of CO₂ we generate — then publish the numbers so
      you can hold us accountable.
    </p>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-16 sm:mb-20 lg:mb-24">
      {STATS.map(({ value, label, sub }) => (
        <div key={label} className="bg-white rounded-[20px] sm:rounded-[28px] p-5 sm:p-8 border border-(--color-border) shadow-sm">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-(--color-primary)/10 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4">
            <Leaf size={15} className="text-(--color-primary)" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-display text-(--color-dark) mb-1">{value}</h3>
          <p className="text-[9px] sm:text-[10px] font-bold text-(--color-dark) uppercase tracking-widest mb-1">{label}</p>
          <p className="text-[9px] sm:text-[10px] text-(--color-muted)">{sub}</p>
        </div>
      ))}
    </div>

    <div className="space-y-8 sm:space-y-12 text-(--color-muted) leading-relaxed">
      <Section title="Our Approach">
        We follow the GHG Protocol to measure Scope 1 (direct operations), Scope 2 (purchased
        electricity), and material Scope 3 (product shipping, packaging, supplier transport) emissions.
        Reports are reviewed annually by a third-party auditor.
      </Section>
      <Section title="Packaging">
        Every mailer is made from 100% post-consumer recycled content and is home-compostable.
        Inner tissue and void fill are FSC-certified paper. We eliminated all single-use plastic from
        our supply chain in Q1 2024.
      </Section>
      <Section title="Shipping">
        We batch fulfilment to maximise load efficiency and offset remaining carrier emissions through
        Pachama-verified forest protection projects in the Amazon and Pacific Northwest.
      </Section>
      <Section title="Suppliers">
        We audit tier-1 suppliers annually against our Supplier Code of Conduct, which requires
        science-based targets aligned with a 1.5 °C pathway by 2026.
      </Section>
      <Section title="Roadmap">
        By end of 2026 we are committed to verified net-zero across all Scope 3 categories and to
        publishing a full TCFD-aligned climate disclosure.
      </Section>
      <p className="text-xs text-(--color-muted) pt-6 sm:pt-8 border-t border-(--color-border)">
        Last updated: April 2026 · Questions? sustainability@pawsandtail.com
      </p>
    </div>
  </motion.div>
));

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <h2 className="text-sm sm:text-base lg:text-lg font-bold text-(--color-dark) uppercase tracking-widest mb-2 sm:mb-3">{title}</h2>
    <p className="text-sm sm:text-base font-medium">{children}</p>
  </div>
);

export default CarbonPage;
