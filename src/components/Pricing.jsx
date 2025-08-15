import { useState } from 'react';
import { motion } from 'framer-motion';

const prices = {
  monthly: { starter: 19, pro: 49, ent: 129 },
  annual: { starter: 15, pro: 39, ent: 104 },
};

function Pricing() {
  const [period, setPeriod] = useState('monthly');

  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
  };

  return (
    <section className="pricing">
      <div className="billing-switch">
        <button
          className={`pill ${period === 'monthly' ? 'active' : ''}`}
          data-period="monthly"
          onClick={() => handlePeriodChange('monthly')}
        >
          Monthly
        </button>
        <button
          className={`pill ${period === 'annual' ? 'active' : ''}`}
          data-period="annual"
          onClick={() => handlePeriodChange('annual')}
        >
          Annual
        </button>
      </div>
      <div className="price-list">
        <motion.div className="price" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h3>Starter</h3>
          <p><span data-price="starter">{prices[period].starter}</span>/mo</p>
        </motion.div>
        <motion.div className="price" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <h3>Pro</h3>
          <p><span data-price="pro">{prices[period].pro}</span>/mo</p>
        </motion.div>
        <motion.div className="price" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <h3>Enterprise</h3>
          <p><span data-price="ent">{prices[period].ent}</span>/mo</p>
        </motion.div>
      </div>
    </section>
  );
}

export default Pricing;
