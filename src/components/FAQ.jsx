import { motion } from 'framer-motion';

function FAQ() {
  return (
    <section className="faq">
      <motion.details className="faq" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <summary>What is AI Trading Genie?</summary>
        <p>A platform for AI-driven trading insights.</p>
      </motion.details>
      <motion.details className="faq" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
        <summary>How does it work?</summary>
        <p>Uses AI to analyze markets and provide signals.</p>
      </motion.details>
    </section>
  );
}

export default FAQ;
