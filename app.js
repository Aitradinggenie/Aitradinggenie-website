/* HTML + CSS + Javascript — AI Trading Genie demo 🔨🤖🔧 */

// DOM shortcuts
const $ = (q, ctx = document) => ctx.querySelector(q);
const $$ = (q, ctx = document) => [...ctx.querySelectorAll(q)];

// Year
$("#year").textContent = new Date().getFullYear();

// Mobile menu
const toggleBtn = $(".nav-toggle");
const menu = $("#navMenu");
toggleBtn?.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  toggleBtn.setAttribute("aria-expanded", String(open));
});

// Theme
const root = document.body;
const dmToggle = $("#dmToggle");
const themeSwitch = $("#themeSwitch");

function setTheme(mode) {
  root.classList.toggle("theme-dark", mode === "dark");
  root.classList.toggle("theme-light", mode === "light");
  localStorage.setItem("theme", mode);
  themeSwitch.textContent = mode === "dark" ? "🌙" : "🌞";
  dmToggle.checked = mode === "dark";
}
const saved = localStorage.getItem("theme") || "dark";
setTheme(saved);
dmToggle?.addEventListener("change", e => setTheme(e.target.checked ? "dark" : "light"));
themeSwitch?.addEventListener("click", () => setTheme(root.classList.contains("theme-dark") ? "light" : "dark"));

// Billing switch
const prices = {
  monthly: { starter: 19, pro: 49, ent: 129 },
  annual:  { starter: 15, pro: 39, ent: 104 } // 20% off approx
};
function renderPrices(period = "monthly") {
  $("[data-price='starter']").textContent = prices[period].starter;
  $("[data-price='pro']").textContent     = prices[period].pro;
  $("[data-price='ent']").textContent     = prices[period].ent;
}
renderPrices("monthly");
$$(".billing-switch .pill").forEach(p => p.addEventListener("click", () => {
  $$(".billing-switch .pill").forEach(x => x.classList.remove("active"));
  p.classList.add("active");
  renderPrices(p.dataset.period);
}));

// Contact form (demo)
const form = $("#contactForm");
const formHint = $("#formHint");
form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  formHint.textContent = "Sending…";
  const data = Object.fromEntries(new FormData(form).entries());

  // Demo only; replace with your backend or a service like Netlify Forms
  await new Promise(r => setTimeout(r, 700));
  if (!data.email || !data.message) {
    formHint.textContent = "Please fill out all fields. ❗";
    return;
  }
  form.reset();
  formHint.textContent = "Thanks! We'll get back to you shortly. ✔️";
});

// --- Charts (simulated data) ---
function randWalk(len = 60, start = 68000) {
  const arr = []; let v = start;
  for (let i=0;i<len;i++){
    v += (Math.random() - 0.5) * 400; // volatility
    arr.push(Math.max(1000, v));
  }
  return arr;
}
function ema(values, period) {
  const k = 2/(period+1); const ema = []; let prev = values[0];
  for (let i=0;i<values.length;i++){ const v = values[i]*k + prev*(1-k); ema.push(v); prev = v; }
  return ema;
}

// Hero sparkline
const heroCtx = $("#heroChart")?.getContext("2d");
if (heroCtx) {
  const values = randWalk(50, 68500);
  new Chart(heroCtx, {
    type: "line",
    data: {
      labels: values.map((_,i)=>i),
      datasets: [{
        data: values,
        borderColor: getComputedStyle(document.body).getPropertyValue('--accent').trim(),
        borderWidth: 2,
        pointRadius: 0,
        fill: { target: 'origin', above: 'rgba(100,210,255,.12)'}
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display:false }, tooltip: { enabled: false }},
      scales: { x: { display:false }, y: { display:false } }
    }
  });
  // Randomize HUD
  const sigs = ["Strong Buy","Buy","Neutral","Sell","Strong Sell"];
  $("#signalBadge").textContent = sigs[(Math.random()*sigs.length)|0];
  $("#pnl24").textContent = (Math.random()>.4?"+":"-") + (Math.random()*3+0.2).toFixed(1) + "%";
  $("#pnl24").classList.toggle("good", $("#pnl24").textContent.startsWith("+"));
  $("#pnl24").classList.toggle("bad", $("#pnl24").textContent.startsWith("-"));
  $("#riskStat").textContent = ["Low","Medium","High"][(Math.random()*3)|0];
}

// Dashboard charts
const priceCtx = $("#priceChart")?.getContext("2d");
const pnlCtx = $("#pnlChart")?.getContext("2d");
if (priceCtx && pnlCtx) {
  const price = randWalk(120, 68750);
  const ema20 = ema(price, 20);
  const ema50 = ema(price, 50);

  new Chart(priceCtx, {
    type: "line",
    data: {
      labels: price.map((_, i) => i),
      datasets: [
        { label:"Price", data: price, borderColor:"#64d2ff", pointRadius:0, borderWidth:2, fill:false },
        { label:"EMA 20", data: ema20, borderColor:"#22c55e", pointRadius:0, borderDash:[4,4] },
        { label:"EMA 50", data: ema50, borderColor:"#f59e0b", pointRadius:0, borderDash:[6,6] }
      ]
    },
    options: {
      plugins: { legend: { labels:{ color:getComputedStyle(document.body).color } } },
      scales: {
        x: { ticks:{ display:false }, grid:{ display:false } },
        y: { ticks:{ color:getComputedStyle(document.body).color }, grid:{ color:"rgba(100,210,255,.08)"} }
      }
    }
  });

  const pnl = Array.from({length:12},()=> (Math.random()*8 - 2).toFixed(2));
  new Chart(pnlCtx, {
    type: "bar",
    data: {
      labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
      datasets: [{ label:"Monthly P&L %", data: pnl, backgroundColor: pnl.map(v => v>=0 ? "rgba(34,197,94,.7)" : "rgba(239,68,68,.7)") }]
    },
    options: { plugins:{ legend:{ display:false }}, scales:{ x:{ grid:{ display:false }}, y:{ grid:{ color:"rgba(100,210,255,.08)"} } } }
  });

  // Signals list (mock)
  const list = $("#signalsList");
  const sides = ["BUY","SELL"];
  const pairs = ["BTC/USDT","ETH/USDT","SOL/USDT","XRP/USDT","ADA/USDT"];
  for (let i=0;i<6;i++){
    const side = sides[(Math.random()*2)|0];
    const conf = (Math.random()*40 + 60)|0;
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${pairs[(Math.random()*pairs.length)|0]}</span>
      <span class="${side === "BUY" ? "good" : "bad"} badge">${side}</span>
      <span class="badge">${conf}%</span>
    `;
    list.appendChild(li);
  }
}

// Scroll‑reveal
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.animate([{opacity:0, transform:"translateY(14px)"},{opacity:1, transform:"translateY(0)"}],{duration:500, easing:"cubic-bezier(.2,.8,.2,1)", fill:"forwards"});
      observer.unobserve(e.target);
    }
  });
},{threshold:.15});
$$(".card, .feature, .price, .faq details").forEach(el=>observer.observe(el));
