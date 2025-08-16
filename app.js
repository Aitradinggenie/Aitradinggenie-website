// Mock data for dynamic updates
const mockData = {
  priceData: Array.from({ length: 20 }, (_, i) => ({
    x: i,
    y: 50000 + Math.random() * 1000
  })),
  signals: [
    { time: '10:00', type: 'Buy', confidence: 0.85 },
    { time: '10:15', type: 'Sell', confidence: 0.78 },
    { time: '10:30', type: 'Hold', confidence: 0.90 }
  ],
  pnlData: [60, 30, 10] // Profit, Loss, Neutral
};

// Initialize charts
function initCharts() {
  const priceChart = new Chart(document.getElementById('priceChart'), {
    type: 'line',
    data: {
      datasets: [{
        label: 'BTC/USDT',
        data: mockData.priceData,
        borderColor: '#0ea5e9',
        backgroundColor: '#0ea5e933',
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: { x: { display: false }, y: { beginAtZero: false } }
    }
  });

  const pnlChart = new Chart(document.getElementById('pnlChart'), {
    type: 'doughnut',
    data: {
      labels: ['Profit', 'Loss', 'Neutral'],
      datasets: [{
        data: mockData.pnlData,
        backgroundColor: ['#0ea5e9', '#ef4444', '#6b7280']
      }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  });

  // Update hero chart
  const heroChart = new Chart(document.getElementById('heroChart'), {
    type: 'line',
    data: {
      datasets: [{
        label: 'Price',
        data: mockData.priceData.slice(-10),
        borderColor: '#0ea5e9',
        backgroundColor: '#0ea5e933',
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: { x: { display: false }, y: { beginAtZero: false } }
    }
  });

  // Update signals list
  const signalsList = document.getElementById('signalsList');
  signalsList.innerHTML = mockData.signals.map(s => 
    `<li>${s.time}: ${s.type} (Confidence: ${s.confidence})</li>`
  ).join('');
}

// Smooth scroll navigation
function initNavigation() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Mobile menu toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.getElementById('navMenu');
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !expanded);
    navMenu.classList.toggle('active');
  });
}

// Form validation and submission
function initForms() {
  // Contact Form
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    let valid = true;

    // Reset errors
    contactForm.querySelectorAll('.error').forEach(err => err.classList.add('hidden'));
    const hint = document.getElementById('formHint');

    // Validation
    if (!data.name.trim()) {
      document.getElementById('nameError').classList.remove('hidden');
      valid = false;
    }
    if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      document.getElementById('emailError').classList.remove('hidden');
      valid = false;
    }
    if (!data.message.trim()) {
      document.getElementById('messageError').classList.remove('hidden');
      valid = false;
    }

    if (valid) {
      hint.textContent = 'Message sent successfully!';
      console.log('Contact Form Data:', data);
      contactForm.reset();
    } else {
      hint.textContent = 'Please fix the errors above.';
    }
  });

  // Subscription Form
  const subscribeForm = document.getElementById('subscribeForm');
  const subscribeButtons = document.querySelectorAll('[data-plan]');
  subscribeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const plan = btn.dataset.plan;
      subscribeForm.querySelector('input[name="plan"]').value = plan.charAt(0).toUpperCase() + plan.slice(1);
      subscribeForm.classList.remove('hidden');
      window.scrollTo({
        top: subscribeForm.offsetTop - 80,
        behavior: 'smooth'
      });
    });
  });

  subscribeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(subscribeForm);
    const data = Object.fromEntries(formData);
    const hint = document.getElementById('subscribeHint');

    if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      hint.textContent = 'Please enter a valid email.';
      return;
    }

    hint.textContent = `Subscribed to ${data.plan} (${data.billing})!`;
    console.log('Subscription Form Data:', data);
    subscribeForm.reset();
    subscribeForm.classList.add('hidden');
  });
}

// Pricing toggle
function initPricingToggle() {
  const buttons = document.querySelectorAll('.billing-switch .pill');
  const prices = document.querySelectorAll('[data-price]');
  const priceValues = {
    monthly: { starter: 19, pro: 49, ent: 129 },
    annual: { starter: 15, pro: 39, ent: 103 }
  };

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const period = btn.dataset.period;
      prices.forEach(price => {
        const plan = price.dataset.price;
        price.textContent = priceValues[period][plan];
      });
    });
  });
}

// Theme toggle
function initThemeToggle() {
  const themeSwitch = document.getElementById('themeSwitch');
  const dmToggle = document.getElementById('dmToggle');
  themeSwitch.addEventListener('click', () => {
    document.body.classList.toggle('theme-dark');
    dmToggle.checked = !dmToggle.checked;
    themeSwitch.textContent = dmToggle.checked ? '🌙' : '☀';
  });
  dmToggle.addEventListener('change', () => {
    document.body.classList.toggle('theme-dark');
    themeSwitch.textContent = dmToggle.checked ? '🌙' : '☀';
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initCharts();
  initNavigation();
  initForms();
  initPricingToggle();
  initThemeToggle();
  document.getElementById('year').textContent = new Date().getFullYear();
});
