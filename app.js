// Application data
const profiles = [
  {id:"1", name:"Thandiwe N.", location:"Cape Town", ethnicity:"Zulu", orientation:"Heterosexual", price:2200, priceMax:3000, rating:4.9, reviews:12, tags:["Discreet","Evenings","Premium"], photo:"https://randomuser.me/api/portraits/women/65.jpg", isBoosted:true, bio:"Elegant, discreet companion with a love for fine wine and sunset conversations.", comments:[{n:"Lebo",t:"Unforgettable time!",r:5,d:"1 day ago"},{n:"J.",t:"Classy and elegant.",r:5,d:"2 days ago"}], isLive: true, lastSeen: "online", messagePreview: "Looking forward to our chat tonight! 💕"},
  {id:"2", name:"Lerato M.", location:"Johannesburg", ethnicity:"Sotho", orientation:"Bisexual", price:1700, priceMax:2600, rating:4.7, reviews:9, tags:["Intellectual","Warm"], photo:"https://randomuser.me/api/portraits/women/68.jpg", isBoosted:false, bio:"Warm presence, conversationalist, blends intellect with intimacy.", comments:[{n:"Sam",t:"Wonderful company.",r:5,d:"Today"}], isLive: false, lastSeen: "2 hours ago", messagePreview: "Thanks for the lovely evening! When can we meet again?"},
  {id:"3", name:"Aisha K.", location:"Durban", ethnicity:"Indian South African", orientation:"Pansexual", price:1400, priceMax:2400, rating:4.8, reviews:8, tags:["Cultural","Playful"], photo:"https://randomuser.me/api/portraits/women/85.jpg", isBoosted:false, bio:"Cultural charm with a playful side; ideal for both virtual and in-person sessions.", comments:[{n:"Mike",t:"Absolutely stunning!",r:5,d:"3 days ago"}], isLive: true, lastSeen: "online", messagePreview: "Hey handsome! How was your day? 😘"},
  {id:"4", name:"Zanele P.", location:"Pretoria", ethnicity:"Xhosa", orientation:"Heterosexual", price:1700, priceMax:2800, rating:4.6, reviews:5, tags:["Private","Refined"], photo:"https://randomuser.me/api/portraits/women/53.jpg", isBoosted:false, bio:"Refined companion focused on connection and privacy.", comments:[{n:"Vusi",t:"Perfectly discreet.",r:5,d:"2 days ago"}], isLive: false, lastSeen: "1 hour ago", messagePreview: "Discretion is my specialty. Let's arrange something special."},
  {id:"5", name:"Naomi S.", location:"Cape Town", ethnicity:"Coloured", orientation:"Lesbian", price:1600, priceMax:2500, rating:4.9, reviews:13, tags:["Creative","Genuine"], photo:"https://randomuser.me/api/portraits/women/56.jpg", isBoosted:true, bio:"Creative spirit who excels in genuine, unhurried interactions.", comments:[{n:"Anita",t:"Best in the city.",r:5,d:"1 day ago"}], isLive: true, lastSeen: "online", messagePreview: "Art gallery opening tomorrow - want to join me?"},
  {id:"6", name:"Mbali D.", location:"Port Elizabeth", ethnicity:"Zulu", orientation:"Bisexual", price:1500, priceMax:2200, rating:4.5, reviews:7, tags:["Energetic","Attentive"], photo:"https://randomuser.me/api/portraits/women/59.jpg", isBoosted:false, bio:"Energetic and attentive, perfect for social events or private chats.", comments:[{n:"Sipho",t:"Great company!",r:4,d:"4 days ago"}], isLive: false, lastSeen: "5 minutes ago", messagePreview: "Energy levels are high today! Ready for some fun? ⚡"}
];

const serviceTypes = [
  {name: "Virtual Chat", description: "Text-based conversation", baseMultiplier: 0.5},
  {name: "Video Call", description: "Private video session", baseMultiplier: 1.0},
  {name: "In-Person Meeting", description: "Face-to-face encounter", baseMultiplier: 1.5}
];

const timeSlots = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00"];

const durations = [
  {name: "30 minutes", value: 0.5},
  {name: "1 hour", value: 1.0},
  {name: "2 hours", value: 2.0},
  {name: "3 hours", value: 3.0}
];

// Application state
let current = 0;
let filtered = profiles;
let currentChatCompanion = null;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  setupThemeToggle();
  setupTabNavigation();
  setupFeedNavigation();
  setupFilters();
  renderFeed();
  renderStreamingTab();
  renderMessagesTab();
  renderBookingsTab();
  
  // Load data from localStorage
  loadStoredData();
}

// Theme toggle functionality
function setupThemeToggle() {
  const themeBtn = document.getElementById('toggleTheme');
  themeBtn.onclick = () => {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    themeBtn.textContent = isDark ? "🌑" : "🌗";
  };
}

// Tab navigation
function setupTabNavigation() {
  const tabButtons = document.querySelectorAll('.nav-tab');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');
      
      // Remove active class from all tabs and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked tab and corresponding content
      button.classList.add('active');
      document.getElementById(`${targetTab}-tab`).classList.add('active');
    });
  });
}

// Feed functionality
function renderFeed() {
  const feed = document.getElementById('feed');
  feed.innerHTML = "";
  
  if (!filtered.length) {
    feed.innerHTML = "<div style='color:var(--secondary);font-size:1.2em;margin-top:3em'>No companions match your filters.</div>";
    return;
  }
  
  const p = filtered[current];
  const media = p.id % 5 === 0
    ? `<video src="https://www.w3schools.com/html/mov_bbb.mp4" poster="${p.photo}" controls loop playsinline style="background:#222"></video>`
    : `<img src="${p.photo}" alt="${p.name}" loading="lazy"/>`;

  feed.innerHTML = `
    <div class="post" tabindex="0">
      ${p.isBoosted ? `<div class="boosted">Promoted <span>★</span></div>` : ""}
      ${media}
      <div class="content">
        <div class="companion">
          <img class="avatar" src="${p.photo}" alt="${p.name}" />
          <span class="name">${p.name}</span>
          <span class="location">· ${p.location}</span>
        </div>
        <div class="bio">${p.bio}</div>
        <div class="actions">
          <button class="icon-btn" title="Like" onclick="likePost()">
            <span id="likeIcon">♡</span>
          </button>
          <button class="icon-btn" title="Comment" onclick="showModal(${current})">💬</button>
          <button class="icon-btn" title="Share" onclick="alert('Sharing soon!')">⤴️</button>
        </div>
        <div class="meta">
          <span class="star">★</span> ${p.rating} (${p.reviews} ratings)
          <span>·</span>
          <span>ZAR ${p.price}–${p.priceMax}</span>
          ${p.tags && p.tags.length ? `<span>· ${p.tags[0]}</span>` : ""}
        </div>
      </div>
    </div>
  `;
}

function setupFeedNavigation() {
  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if(document.getElementById("modalBg")) return;
    if(e.key === "ArrowUp" && current > 0) { current--; renderFeed(); }
    if(e.key === "ArrowDown" && current < filtered.length-1) { current++; renderFeed(); }
    if(e.key === "Enter") showModal(current);
  });
  
  // Touch navigation
  let touchStartY = null;
  document.getElementById('feed').addEventListener('touchstart', e => {
    if (e.touches.length === 1) touchStartY = e.touches[0].clientY;
  });
  
  document.getElementById('feed').addEventListener('touchend', e => {
    if (touchStartY === null) return;
    const touchEndY = e.changedTouches[0].clientY;
    if (touchEndY - touchStartY > 50 && current > 0) { current--; renderFeed(); }
    else if (touchStartY - touchEndY > 50 && current < filtered.length-1) { current++; renderFeed(); }
    touchStartY = null;
  });
}

function setupFilters() {
  document.getElementById('filterForm').onsubmit = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    filtered = profiles.filter(p => {
      if(data.get("location") && p.location !== data.get("location")) return false;
      if(data.get("ethnicity") && p.ethnicity !== data.get("ethnicity")) return false;
      if(data.get("orientation") && p.orientation !== data.get("orientation")) return false;
      if(data.get("minPrice") && p.price < parseInt(data.get("minPrice"))) return false;
      if(data.get("maxPrice") && p.priceMax > parseInt(data.get("maxPrice"))) return false;
      if(data.get("minRating")) {
        const min = parseFloat(data.get("minRating"));
        if(p.rating < min) return false;
      }
      return true;
    });
    current = 0; 
    renderFeed();
  };
}

function likePost() {
  const icon = document.getElementById("likeIcon");
  icon.textContent = icon.textContent === "♡" ? "♥" : "♡";
  icon.classList.toggle("liked");
}

// Modal functionality
function showModal(idx) {
  const p = filtered[idx];
  const c = p.comments || [];
  document.getElementById("modalContainer").innerHTML = `
    <div class="modal-bg" id="modalBg" onclick="closeModal(event)">
      <div class="modal" onclick="event.stopPropagation()">
        <button class="close" onclick="closeModal(event)" title="Close">✕</button>
        <img src="${p.photo}" alt="${p.name}" class="avatar-lg" />
        <div class="modal-name">${p.name}</div>
        <div class="modal-location">${p.location} · ${p.ethnicity} · ${p.orientation}</div>
        <div class="modal-bio">${p.bio}</div>
        <div class="modal-tags">${p.tags.map(t=>`<span class="tag">${t}</span>`).join(" ")}</div>
        <div class="modal-details">
          <div><span class="star">★</span> ${p.rating} (${p.reviews} reviews)</div>
          <div>Price: <b>ZAR ${p.price}–${p.priceMax}</b></div>
          <div>Availability: Fri & Sat evenings</div>
        </div>
        <button class="booking-btn" onclick="showBookingModal('${p.id}')">Book Appointment</button>
        <div class="comments-section">
          <h4>Ratings & Comments</h4>
          ${c.length ? c.map(cm=>`
            <div class="comment">
              <div class="commenter">${cm.n} <span class="star">${"★".repeat(cm.r)}</span></div>
              <div class="comment-text">${cm.t}</div>
              <div class="comment-meta">${cm.d}</div>
            </div>
          `).join("") : "<div style='color:var(--secondary)'>No reviews yet.</div>"}
        </div>
        <div class="trust">
          Identity-verified companion · Encrypted payment and chat available.<br>
          Your privacy and discretion are guaranteed.
        </div>
      </div>
    </div>
  `;
  document.body.style.overflow = "hidden";
}

function closeModal(e) {
  document.getElementById("modalContainer").innerHTML = "";
  document.body.style.overflow = "";
}

// Booking system
function showBookingModal(companionId) {
  const companion = profiles.find(p => p.id === companionId);
  if (!companion) return;
  
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  document.getElementById("modalContainer").innerHTML = `
    <div class="modal-bg" id="modalBg" onclick="closeModal(event)">
      <div class="modal" onclick="event.stopPropagation()">
        <button class="close" onclick="closeModal(event)" title="Close">✕</button>
        <h3>Book Appointment with ${companion.name}</h3>
        <form class="booking-form" id="bookingForm">
          <div class="date-time-grid">
            <div class="form-group">
              <label class="form-label">Date</label>
              <input type="date" id="bookingDate" class="form-control" min="${tomorrow.toISOString().split('T')[0]}" required>
            </div>
            <div class="form-group">
              <label class="form-label">Service Type</label>
              <select id="serviceType" class="form-control" required>
                ${serviceTypes.map(s => `<option value="${s.name}" data-multiplier="${s.baseMultiplier}">${s.name}</option>`).join('')}
              </select>
            </div>
          </div>
          
          <div class="form-group">
            <label class="form-label">Time Slot</label>
            <div class="time-slots" id="timeSlots">
              ${timeSlots.map(time => `<button type="button" class="time-slot" data-time="${time}">${time}</button>`).join('')}
            </div>
          </div>
          
          <div class="form-group">
            <label class="form-label">Duration</label>
            <select id="duration" class="form-control" required>
              ${durations.map(d => `<option value="${d.value}">${d.name}</option>`).join('')}
            </select>
          </div>
          
          <div class="price-display">
            <div class="price-label">Total Price</div>
            <div class="price-amount" id="totalPrice">ZAR 0</div>
          </div>
          
          <button type="submit" class="btn btn--primary" style="width: 100%;">Confirm Booking</button>
        </form>
      </div>
    </div>
  `;
  
  setupBookingForm(companion);
  document.body.style.overflow = "hidden";
}

function setupBookingForm(companion) {
  const form = document.getElementById('bookingForm');
  const timeSlots = document.querySelectorAll('.time-slot');
  const serviceSelect = document.getElementById('serviceType');
  const durationSelect = document.getElementById('duration');
  const priceDisplay = document.getElementById('totalPrice');
  let selectedTime = null;
  
  // Time slot selection
  timeSlots.forEach(slot => {
    slot.addEventListener('click', () => {
      timeSlots.forEach(s => s.classList.remove('selected'));
      slot.classList.add('selected');
      selectedTime = slot.dataset.time;
      updatePrice();
    });
  });
  
  // Price calculation
  function updatePrice() {
    const service = serviceTypes.find(s => s.name === serviceSelect.value);
    const duration = parseFloat(durationSelect.value);
    const basePrice = companion.price;
    const total = Math.round(basePrice * service.baseMultiplier * duration);
    priceDisplay.textContent = `ZAR ${total}`;
  }
  
  serviceSelect.addEventListener('change', updatePrice);
  durationSelect.addEventListener('change', updatePrice);
  
  // Initial price calculation
  updatePrice();
  
  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (!selectedTime) {
      alert('Please select a time slot');
      return;
    }
    
    const bookingData = {
      id: 'b' + Date.now(),
      companionId: companion.id,
      companionName: companion.name,
      companionPhoto: companion.photo,
      date: document.getElementById('bookingDate').value,
      time: selectedTime,
      service: serviceSelect.value,
      duration: durationSelect.options[durationSelect.selectedIndex].text,
      price: parseInt(priceDisplay.textContent.replace('ZAR ', '')),
      status: 'pending'
    };
    
    showPaymentModal(bookingData);
  });
}

function showPaymentModal(bookingData) {
  document.getElementById("modalContainer").innerHTML = `
    <div class="modal-bg" id="modalBg" onclick="closeModal(event)">
      <div class="modal" onclick="event.stopPropagation()">
        <button class="close" onclick="closeModal(event)" title="Close">✕</button>
        <h3>Payment</h3>
        
        <div class="payment-summary">
          <div class="summary-row">
            <span>Service:</span>
            <span>${bookingData.service}</span>
          </div>
          <div class="summary-row">
            <span>Duration:</span>
            <span>${bookingData.duration}</span>
          </div>
          <div class="summary-row">
            <span>Date & Time:</span>
            <span>${bookingData.date} at ${bookingData.time}</span>
          </div>
          <div class="summary-row summary-total">
            <span>Total:</span>
            <span>ZAR ${bookingData.price}</span>
          </div>
        </div>
        
        <form class="payment-form" id="paymentForm">
          <div class="form-group card-input">
            <label class="form-label">Card Number</label>
            <input type="text" id="cardNumber" class="form-control" placeholder="1234 5678 9012 3456" maxlength="19" required>
            <div class="card-icons">
              <div class="card-icon" style="background-image: url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 16%22><rect width=%2224%22 height=%2216%22 fill=%22%234285f4%22 rx=%222%22/><path fill=%22white%22 d=%22M12 6h2v4h-2z%22/></svg>')"></div>
            </div>
          </div>
          
          <div class="billing-grid">
            <div class="form-group">
              <label class="form-label">Expiry Date</label>
              <input type="text" id="expiryDate" class="form-control" placeholder="MM/YY" maxlength="5" required>
            </div>
            <div class="form-group">
              <label class="form-label">CVV</label>
              <input type="text" id="cvv" class="form-control" placeholder="123" maxlength="3" required>
            </div>
          </div>
          
          <div class="form-group">
            <label class="form-label">Cardholder Name</label>
            <input type="text" id="cardholderName" class="form-control" placeholder="John Doe" required>
          </div>
          
          <button type="submit" class="btn btn--primary" style="width: 100%;" id="paymentBtn">
            Process Payment - ZAR ${bookingData.price}
          </button>
        </form>
      </div>
    </div>
  `;
  
  setupPaymentForm(bookingData);
  document.body.style.overflow = "hidden";
}

function setupPaymentForm(bookingData) {
  const form = document.getElementById('paymentForm');
  const cardNumberInput = document.getElementById('cardNumber');
  const expiryInput = document.getElementById('expiryDate');
  const paymentBtn = document.getElementById('paymentBtn');
  
  // Format card number input
  cardNumberInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    e.target.value = formattedValue;
  });
  
  // Format expiry date
  expiryInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0,2) + '/' + value.substring(2,4);
    }
    e.target.value = value;
  });
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulate payment processing
    paymentBtn.innerHTML = '<span class="loading-spinner"></span> Processing...';
    paymentBtn.disabled = true;
    
    setTimeout(() => {
      // Save booking to localStorage
      saveBooking(bookingData);
      
      // Show success message
      document.getElementById("modalContainer").innerHTML = `
        <div class="modal-bg" id="modalBg" onclick="closeModal(event)">
          <div class="modal" onclick="event.stopPropagation()">
            <button class="close" onclick="closeModal(event)" title="Close">✕</button>
            <div class="text-center">
              <h3 style="color: var(--success); margin-bottom: 20px;">Payment Successful!</h3>
              <p>Your booking with ${bookingData.companionName} has been confirmed.</p>
              <p><strong>Date:</strong> ${bookingData.date} at ${bookingData.time}</p>
              <p><strong>Service:</strong> ${bookingData.service}</p>
              <p><strong>Amount Paid:</strong> ZAR ${bookingData.price}</p>
              <button class="btn btn--primary mt-15" onclick="closeModal(event)">Close</button>
            </div>
          </div>
        </div>
      `;
      
      // Refresh bookings tab
      renderBookingsTab();
    }, 2000);
  });
}

// Live Streaming
function renderStreamingTab() {
  const liveCompanions = profiles.filter(p => p.isLive);
  const streamsGrid = document.getElementById('streamsGrid');
  
  streamsGrid.innerHTML = liveCompanions.map(companion => `
    <div class="stream-card">
      <div class="stream-video">
        <img src="${companion.photo}" alt="${companion.name}">
        <div class="live-indicator">LIVE</div>
        <div class="stream-overlay">
          <button class="join-stream-btn" onclick="joinStream('${companion.id}')">JOIN STREAM</button>
        </div>
      </div>
      <div class="stream-info">
        <div class="stream-companion">
          <img src="${companion.photo}" alt="${companion.name}" class="avatar">
          <div>
            <div style="font-weight: 600; color: var(--primary)">${companion.name}</div>
            <div style="color: var(--secondary); font-size: 0.9rem">${companion.location}</div>
          </div>
        </div>
        <div class="viewer-count">${Math.floor(Math.random() * 200) + 50} viewers</div>
      </div>
    </div>
  `).join('');
  
  // Setup Go Live button
  document.getElementById('goLiveBtn').addEventListener('click', () => {
    alert('Go Live feature coming soon! Start your own stream and connect with clients.');
  });
}

function joinStream(companionId) {
  const companion = profiles.find(p => p.id === companionId);
  alert(`Joining ${companion.name}'s live stream! Premium streaming feature coming soon.`);
}

// Messages functionality
function renderMessagesTab() {
  const conversationsList = document.getElementById('conversationsList');
  
  // Get companions with messages
  const companionsWithMessages = profiles.filter(p => p.messagePreview);
  
  conversationsList.innerHTML = companionsWithMessages.map(companion => `
    <div class="conversation-item" onclick="openChat('${companion.id}')">
      <div style="position: relative">
        <img src="${companion.photo}" alt="${companion.name}" class="avatar">
        <div class="online-status ${companion.lastSeen === 'online' ? 'online' : 'offline'}"></div>
      </div>
      <div class="conversation-info">
        <div class="conversation-name">${companion.name}</div>
        <div class="conversation-preview">${companion.messagePreview}</div>
      </div>
      <div>
        <div class="conversation-time">${companion.lastSeen === 'online' ? 'Now' : companion.lastSeen}</div>
        ${Math.random() > 0.5 ? '<div class="unread-indicator"></div>' : ''}
      </div>
    </div>
  `).join('');
}

function openChat(companionId) {
  currentChatCompanion = profiles.find(p => p.id === companionId);
  
  // Hide inbox, show chat
  document.getElementById('inboxView').classList.add('hidden');
  document.getElementById('chatView').classList.remove('hidden');
  
  // Update chat header
  document.getElementById('chatAvatar').src = currentChatCompanion.photo;
  document.getElementById('chatName').textContent = currentChatCompanion.name;
  document.getElementById('chatStatus').textContent = currentChatCompanion.lastSeen === 'online' ? 'Online' : `Last seen ${currentChatCompanion.lastSeen}`;
  
  // Load chat messages
  loadChatMessages(companionId);
  
  // Setup back button
  document.getElementById('backToInbox').addEventListener('click', () => {
    document.getElementById('chatView').classList.add('hidden');
    document.getElementById('inboxView').classList.remove('hidden');
  });
  
  // Setup send message
  const sendBtn = document.getElementById('sendMessageBtn');
  const messageInput = document.getElementById('messageInput');
  
  sendBtn.addEventListener('click', sendMessage);
  messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
}

function loadChatMessages(companionId) {
  const chatMessages = document.getElementById('chatMessages');
  
  // Sample conversation
  const messages = [
    { sender: 'companion', text: currentChatCompanion.messagePreview, time: '2:30 PM' },
    { sender: 'user', text: 'Hello! I saw your profile and I\'m interested in booking a session.', time: '2:35 PM' },
    { sender: 'companion', text: 'That sounds wonderful! What type of session were you thinking about?', time: '2:36 PM' },
    { sender: 'user', text: 'I was thinking about a video call session. What are your rates?', time: '2:38 PM' },
  ];
  
  chatMessages.innerHTML = messages.map(msg => `
    <div class="message ${msg.sender}">
      <div>${msg.text}</div>
      <div class="message-time">${msg.time}</div>
    </div>
  `).join('');
  
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendMessage() {
  const messageInput = document.getElementById('messageInput');
  const message = messageInput.value.trim();
  
  if (!message) return;
  
  const chatMessages = document.getElementById('chatMessages');
  const now = new Date();
  const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  
  // Add user message
  const userMessage = document.createElement('div');
  userMessage.className = 'message user';
  userMessage.innerHTML = `
    <div>${message}</div>
    <div class="message-time">${timeString}</div>
  `;
  chatMessages.appendChild(userMessage);
  
  // Clear input
  messageInput.value = '';
  
  // Scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;
  
  // Simulate companion response after 2 seconds
  setTimeout(() => {
    const responses = [
      "That sounds perfect! Let me check my availability.",
      "I'd love to arrange that with you. When works best?",
      "Thank you for reaching out! I'm excited to connect.",
      "Let's discuss the details. I have some great ideas!",
      "I appreciate your interest. When would you like to schedule?"
    ];
    
    const companionMessage = document.createElement('div');
    companionMessage.className = 'message companion';
    companionMessage.innerHTML = `
      <div>${responses[Math.floor(Math.random() * responses.length)]}</div>
      <div class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
    `;
    chatMessages.appendChild(companionMessage);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 2000);
}

// Bookings functionality
function renderBookingsTab() {
  const bookingsList = document.getElementById('bookingsList');
  const bookings = getStoredBookings();
  
  if (bookings.length === 0) {
    bookingsList.innerHTML = `
      <div style="text-align: center; color: var(--secondary); margin-top: 50px;">
        <p>No bookings yet.</p>
        <p>Book an appointment with a companion to see it here.</p>
      </div>
    `;
    return;
  }
  
  bookingsList.innerHTML = bookings.map(booking => `
    <div class="booking-item">
      <div class="booking-header">
        <div class="booking-companion">
          <img src="${booking.companionPhoto}" alt="${booking.companionName}" class="avatar">
          <div>
            <div style="font-weight: 600; color: var(--primary)">${booking.companionName}</div>
            <div style="color: var(--secondary); font-size: 0.9rem">Booking ID: ${booking.id}</div>
          </div>
        </div>
        <div class="booking-status ${booking.status}">${booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</div>
      </div>
      <div class="booking-details">
        <div class="booking-detail">
          <div class="booking-detail-label">Date</div>
          <div class="booking-detail-value">${booking.date}</div>
        </div>
        <div class="booking-detail">
          <div class="booking-detail-label">Time</div>
          <div class="booking-detail-value">${booking.time}</div>
        </div>
        <div class="booking-detail">
          <div class="booking-detail-label">Service</div>
          <div class="booking-detail-value">${booking.service}</div>
        </div>
        <div class="booking-detail">
          <div class="booking-detail-label">Duration</div>
          <div class="booking-detail-value">${booking.duration}</div>
        </div>
        <div class="booking-detail">
          <div class="booking-detail-label">Price Paid</div>
          <div class="booking-detail-value">ZAR ${booking.price}</div>
        </div>
      </div>
    </div>
  `).join('');
}

// Local Storage functions
function saveBooking(bookingData) {
  const bookings = getStoredBookings();
  bookingData.status = 'confirmed';
  bookings.push(bookingData);
  localStorage.setItem('cumpani_bookings', JSON.stringify(bookings));
}

function getStoredBookings() {
  const stored = localStorage.getItem('cumpani_bookings');
  return stored ? JSON.parse(stored) : [];
}

function loadStoredData() {
  // Load any stored data and update UI if needed
  const bookings = getStoredBookings();
  if (bookings.length > 0) {
    renderBookingsTab();
  }
}