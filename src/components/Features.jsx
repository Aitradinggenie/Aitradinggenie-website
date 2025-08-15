import { motion } from 'framer-motion';

function Features() {
  return (
    <section className="features">
      <motion.div className="feature" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h3>Feature 1</h3>
        <p>Real-time market analysis.</p>
      </motion.div>
      <motion.div className="feature" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
        <h3>Feature 2</h3>
        <p>AI-powered trading signals.</p>
      </motion.div>
      <motion.div className="feature" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <h3>Feature 3</h3>
        <p>Customizable dashboards.</p>
      </motion.div>
    </section>
  );
}

export default Features;
