import { useState } from 'react';
import { motion } from 'framer-motion';

function Contact() {
  const [formHint, setFormHint] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormHint('Sending…');
    const form = e.target;
    const data = Object.fromEntries(new FormData(form).entries());

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 700));
    if (!data.email || !data.message) {
      setFormHint('Please fill out all fields. ❗');
      return;
    }
    form.reset();
    setFormHint("Thanks! We'll get back to you shortly. ✔️");
  };

  return (
    <section className="contact">
      <motion.form
        id="contactForm"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <input type="email" name="email" placeholder="Email" required />
        <textarea name="message" placeholder="Message" required></textarea>
        <button type="submit">Send</button>
        <p id="formHint">{formHint}</p>
      </motion.form>
    </section>
  );
}

export default Contact;
