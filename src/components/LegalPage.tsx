import { memo } from 'react';
import { motion } from 'motion/react';

const LegalPage = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="pt-28 sm:pt-36 lg:pt-48 pb-16 sm:pb-24 lg:pb-32 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
  >
    <span className="text-[10px] font-extrabold uppercase tracking-[0.4em] text-(--color-primary) mb-5 sm:mb-6 block">
      Legal
    </span>
    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-light text-(--color-dark) leading-tight mb-10 sm:mb-14 lg:mb-16 tracking-tight">
      Terms of <br />
      <span className="italic text-(--color-secondary)">Service.</span>
    </h1>

    <div className="space-y-8 sm:space-y-12 text-(--color-muted) leading-relaxed">
      <Section title="Acceptance">
        By placing an order or browsing paws&tail.com you agree to these terms. If you do not agree,
        please do not use our services. We reserve the right to update these terms at any time with
        14 days' notice posted on this page.
      </Section>
      <Section title="Products & Pricing">
        All prices are shown in USD and inclusive of applicable taxes unless stated otherwise.
        We reserve the right to correct pricing errors before an order is confirmed. Product images
        are representative; slight colour variations may occur in print.
      </Section>
      <Section title="Orders & Payment">
        An order confirmation email constitutes our acceptance of your purchase. We accept all
        major credit and debit cards via our secure payment processor. We reserve the right to
        cancel orders that appear fraudulent or in breach of these terms.
      </Section>
      <Section title="Shipping & Delivery">
        We ship worldwide. Estimated delivery windows are provided at checkout and are not
        guaranteed. Risk of loss transfers to you upon carrier acceptance. We are not responsible
        for delays caused by customs or carrier disruptions beyond our control.
      </Section>
      <Section title="Returns & Refunds">
        You may return unused, unopened items within 30 days of receipt for a full refund. Perishable
        wellness products (treats, oils) may not be returned once opened for hygiene reasons.
        Return shipping costs are the customer's responsibility unless the item is defective.
      </Section>
      <Section title="Intellectual Property">
        All content on this site — photography, copy, branding — is owned by Paws&Tail Studio and
        may not be reproduced without written permission.
      </Section>
      <Section title="Limitation of Liability">
        To the fullest extent permitted by law, Paws&Tail's liability is limited to the value of the
        goods purchased. We are not liable for indirect, incidental, or consequential damages.
      </Section>
      <Section title="Governing Law">
        These terms are governed by the laws of the State of New York, USA. Disputes shall be
        resolved in the courts of New York County.
      </Section>
      <p className="text-xs text-(--color-muted) pt-6 sm:pt-8 border-t border-(--color-border)">
        Last updated: April 2026 · Questions? legal@pawsandtail.com
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

export default LegalPage;
