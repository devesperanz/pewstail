import { memo } from 'react';
import { motion } from 'motion/react';

const PrivacyPage = memo(() => (
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
      Privacy <br />
      <span className="italic text-(--color-secondary)">Invariant.</span>
    </h1>

    <div className="space-y-8 sm:space-y-12 text-(--color-muted) leading-relaxed">
      <Section title="What We Collect">
        We collect only what is necessary to fulfil your order: your name, shipping address, email,
        and payment details. Payment data is processed by our PCI-compliant provider and never
        stored on our servers. We do not buy, sell, or trade personal information.
      </Section>
      <Section title="How We Use Your Data">
        Your information is used exclusively to process orders, send shipping confirmations, and
        provide customer support. With your explicit consent we may send product updates — you can
        unsubscribe at any time with a single click.
      </Section>
      <Section title="Cookies">
        We use essential session cookies to keep your cart intact and analytics cookies (anonymised)
        to understand which pages resonate. You can opt out of analytics via the banner on your first
        visit or at any time from your browser settings.
      </Section>
      <Section title="Third Parties">
        We share data only with the carriers needed to deliver your order (UPS, FedEx, DHL) and our
        payment processor. No data is shared with advertising networks.
      </Section>
      <Section title="Your Rights">
        You have the right to access, correct, or delete your personal data at any time. Email us at
        privacy@pawsandtail.com and we will respond within 72 hours. EU and UK residents may also
        lodge a complaint with their local supervisory authority.
      </Section>
      <Section title="Retention">
        Order records are retained for seven years as required by tax law. All other personal data is
        deleted 90 days after your last interaction with us.
      </Section>
      <Section title="Changes">
        We will post any material changes to this page and notify you by email at least 14 days in
        advance. Continued use of our services after that date constitutes acceptance.
      </Section>
      <p className="text-xs text-(--color-muted) pt-6 sm:pt-8 border-t border-(--color-border)">
        Last updated: April 2026 · Questions? privacy@pawsandtail.com
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

export default PrivacyPage;
