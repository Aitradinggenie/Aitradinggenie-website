import { useState } from 'react';
import axios from 'axios';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('Please fill out all fields.');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/contact', formData);
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('Error sending message. Try again later.');
    }
  };

  return (
    <section className="section" id="contact">
      <div className="container grid-2">
        <div>
          <header className="section__head">
            <h2>Let’s talk</h2>
            <p className="muted">Questions, partnerships, or a custom plan? Send a note.</p>
          </header>
          <ul className="ticks ticks--compact">
            <li>Response within 1–2 business days</li>
            <li>We never ask for secret keys over email</li>
            <li>Demo walkthrough available</li>
          </ul>
        </div>
        <form className="card form" onSubmit={handleSubmit} aria-labelledby="contactTitle">
          <h3 id="contactTitle">Contact form</h3>
          <label>
            <span>Name</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="name"
            />
          </label>
          <label>
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </label>
          <label>
            <span>Message</span>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </label>
          <div className="form__actions">
            <button className="btn btn--primary" type="submit">Send</button>
            <p className="form__hint" role="status" aria-live="polite">{status}</p>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Contact;
