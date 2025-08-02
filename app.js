// Cumpani App JavaScript
class CumpaniApp {
    constructor() {
        this.isVerified = localStorage.getItem('ageVerified') === 'true';
        this.isPremium = localStorage.getItem('isPremium') === 'true';
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        // Application data
        this.companions = [
            {
                id: 1,
                name: "Sophia Rose",
                age: 25,
                location: "Manhattan, NY",
                verified: true,
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=400",
                bio: "Elite companion specializing in upscale social events and private encounters. Harvard graduate with a passion for art and fine dining.",
                rating: 4.9,
                price: "$500/hour",
                availability: "Available this week",
                services: ["Dinner Companion", "Social Events", "Private Sessions"],
                gallery: [
                    "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=400",
                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400"
                ]
            },
            {
                id: 2,
                name: "Isabella Chen",
                age: 28,
                location: "Beverly Hills, CA",
                verified: true,
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
                bio: "Sophisticated companion with expertise in business entertainment and luxury travel. Fluent in 4 languages.",
                rating: 4.8,
                price: "$600/hour",
                availability: "Booking for next month",
                services: ["Business Events", "Travel Companion", "Cultural Experiences"],
                gallery: [
                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
                    "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=400"
                ]
            }
        ];

        this.posts = [
            {
                id: 1,
                companionId: 1,
                companionName: "Sophia Rose",
                companionAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=400",
                content: "Just finished an amazing evening at the Met Opera. There's nothing quite like experiencing culture with the right company ✨",
                image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600",
                likes: 234,
                comments: 18,
                isPromoted: true,
                timestamp: "2 hours ago",
                isLiked: false
            },
            {
                id: 2,
                companionId: 2,
                companionName: "Isabella Chen",
                companionAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
                content: "Sunset views from my penthouse. Ready for an elegant evening with a distinguished gentleman 🌅",
                image: "https://images.unsplash.com/photo-1516815231560-8f41ec531527?w=600",
                likes: 189,
                comments: 12,
                isPromoted: false,
                timestamp: "4 hours ago",
                isLiked: false
            }
        ];

        this.events = [
            {
                id: 1,
                title: "Exclusive Wine Tasting Evening",
                date: "2025-08-15",
                time: "7:00 PM EST",
                type: "In-Person",
                location: "Private Manhattan Venue",
                price: "$250",
                memberPrice: "Included",
                description: "Join our elite companions for an intimate wine tasting featuring rare vintages",
                attendees: 12,
                maxAttendees: 20,
                image: "https://images.unsplash.com/photo-1558346648-9757f2fa4474?w=400"
            },
            {
                id: 2,
                title: "Virtual Poetry & Champagne Night",
                date: "2025-08-12",
                time: "9:00 PM EST",
                type: "Virtual",
                location: "Zoom",
                price: "$75",
                memberPrice: "Included",
                description: "An evening of poetry, conversation, and champagne with our most eloquent companions",
                attendees: 28,
                maxAttendees: 50,
                image: "https://images.unsplash.com/photo-1564069114553-7215e1ff1890?w=400"
            }
        ];

        this.liveStreams = [
            {
                id: 1,
                companionName: "Sophia Rose",
                companionAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=400",
                title: "Evening Chat & Wine",
                viewers: 147,
                isLive: true,
                thumbnail: "https://images.unsplash.com/photo-1516815231560-8f41ec531527?w=400"
            }
        ];

        this.init();
    }

    init() {
        this.initTheme();
        this.setupEventListeners();
        
        if (!this.isVerified) {
            this.showAgeVerification();
        } else {
            this.loadApp();
        }
    }

    setupEventListeners() {
        // Age verification - Set up immediately
        const verifyBtn = document.getElementById('verifyAge');
        if (verifyBtn) {
            verifyBtn.addEventListener('click', () => this.verifyAge());
        }

        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Navigation
        document.querySelectorAll('.sidebar-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const tab = e.target.closest('.sidebar-item').dataset.tab;
                if (tab) this.switchTab(tab);
            });
        });

        // Membership buttons
        const membershipBtn = document.getElementById('membershipBtn');
        if (membershipBtn) {
            membershipBtn.addEventListener('click', () => this.showMembershipModal());
        }
        
        const upgradeBtn = document.getElementById('upgradeBtn');
        if (upgradeBtn) {
            upgradeBtn.addEventListener('click', () => this.showMembershipModal());
        }

        // Modal close buttons
        const closeButtons = [
            { id: 'closeCompanionModal', modal: 'companionModal' },
            { id: 'closeMembershipModal', modal: 'membershipModal' },
            { id: 'closeCommentsModal', modal: 'commentsModal' },
            { id: 'closeLiveStreamModal', modal: 'liveStreamModal' }
        ];

        closeButtons.forEach(button => {
            const element = document.getElementById(button.id);
            if (element) {
                element.addEventListener('click', () => this.closeModal(button.modal));
            }
        });

        // Companion profile actions
        const messageBtn = document.getElementById('messageBtn');
        if (messageBtn) {
            messageBtn.addEventListener('click', () => this.handleMessage());
        }
        
        const bookBtn = document.getElementById('bookBtn');
        if (bookBtn) {
            bookBtn.addEventListener('click', () => this.handleBooking());
        }

        // Search functionality
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        }

        // Comments
        const submitComment = document.getElementById('submitComment');
        if (submitComment) {
            submitComment.addEventListener('click', () => this.submitComment());
        }

        // Live stream chat
        const sendChatMessage = document.getElementById('sendChatMessage');
        if (sendChatMessage) {
            sendChatMessage.addEventListener('click', () => this.sendChatMessage());
        }

        // Gift buttons
        document.querySelectorAll('.gift-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.sendGift(e.target.textContent));
        });

        // Modal background click to close
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal.id);
                }
            });
        });

        // Notification button
        const notificationBtn = document.getElementById('notificationBtn');
        if (notificationBtn) {
            notificationBtn.addEventListener('click', () => {
                alert('💎 New message from Sophia Rose!\n📅 Upcoming event reminder\n✨ 3 new companion profiles');
            });
        }
    }

    showAgeVerification() {
        const modal = document.getElementById('ageVerificationModal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }

    verifyAge() {
        const birthDateInput = document.getElementById('birthDate');
        const termsCheckbox = document.getElementById('termsAccept');
        
        if (!birthDateInput || !termsCheckbox) {
            console.error('Age verification elements not found');
            return;
        }

        const birthDate = birthDateInput.value;
        const termsAccepted = termsCheckbox.checked;

        if (!birthDate) {
            alert('Please enter your birth date.');
            return;
        }

        if (!termsAccepted) {
            alert('Please accept the terms and conditions.');
            return;
        }

        const age = this.calculateAge(new Date(birthDate));
        
        if (age < 18) {
            alert('You must be 18 years or older to access this website.');
            return;
        }

        // Verification successful
        localStorage.setItem('ageVerified', 'true');
        this.isVerified = true;
        
        const modal = document.getElementById('ageVerificationModal');
        if (modal) {
            modal.style.display = 'none';
        }
        
        this.loadApp();
    }

    calculateAge(birthDate) {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        return age;
    }

    initTheme() {
        document.documentElement.setAttribute('data-color-scheme', this.currentTheme);
        this.updateThemeIcon();
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-color-scheme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
        this.updateThemeIcon();
    }

    updateThemeIcon() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.textContent = this.currentTheme === 'light' ? '🌙' : '☀️';
        }
    }

    loadApp() {
        this.loadFeed();
        this.loadCompanions();
        this.loadEvents();
        this.loadLiveStreams();
        this.updateMembershipStatus();
    }

    switchTab(tabName) {
        // Update sidebar active state
        document.querySelectorAll('.sidebar-item').forEach(item => {
            item.classList.remove('active');
        });
        const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        const tabContent = document.getElementById(`${tabName}Tab`);
        if (tabContent) {
            tabContent.classList.add('active');
        }
    }

    loadFeed() {
        const feedContainer = document.getElementById('feedContainer');
        if (!feedContainer) return;
        
        feedContainer.innerHTML = '';

        this.posts.forEach(post => {
            const postElement = this.createPostElement(post);
            feedContainer.appendChild(postElement);
        });
    }

    createPostElement(post) {
        const postDiv = document.createElement('div');
        postDiv.className = 'feed-post';
        
        postDiv.innerHTML = `
            <div class="post-header">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <img src="${post.companionAvatar}" alt="${post.companionName}" class="companion-avatar">
                    <div class="companion-info">
                        <h4>${post.companionName}</h4>
                        <span class="timestamp">${post.timestamp}</span>
                    </div>
                </div>
                ${post.isPromoted ? '<span class="promoted-badge">Promoted</span>' : ''}
            </div>
            <img src="${post.image}" alt="Post" class="post-image">
            <div class="post-content">
                <p>${post.content}</p>
                <div class="post-actions">
                    <div class="action-buttons">
                        <button class="action-btn like-btn ${post.isLiked ? 'liked' : ''}" data-post-id="${post.id}">
                            ❤️ <span>${post.likes}</span>
                        </button>
                        <button class="action-btn comment-btn" data-post-id="${post.id}">
                            💬 <span>${post.comments}</span>
                        </button>
                        <button class="action-btn share-btn" data-post-id="${post.id}">
                            📤 Share
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Add event listeners
        const likeBtn = postDiv.querySelector('.like-btn');
        if (likeBtn) {
            likeBtn.addEventListener('click', () => this.toggleLike(post.id));
        }

        const commentBtn = postDiv.querySelector('.comment-btn');
        if (commentBtn) {
            commentBtn.addEventListener('click', () => this.showComments(post.id));
        }

        const shareBtn = postDiv.querySelector('.share-btn');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => this.sharePost(post.id));
        }

        // Double-tap to like on mobile
        let tapTimeout;
        const postImage = postDiv.querySelector('.post-image');
        if (postImage) {
            postImage.addEventListener('click', (e) => {
                if (tapTimeout) {
                    clearTimeout(tapTimeout);
                    tapTimeout = null;
                    this.toggleLike(post.id);
                } else {
                    tapTimeout = setTimeout(() => {
                        tapTimeout = null;
                    }, 300);
                }
            });
        }

        return postDiv;
    }

    toggleLike(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (post) {
            post.isLiked = !post.isLiked;
            post.likes += post.isLiked ? 1 : -1;
            
            const likeBtn = document.querySelector(`[data-post-id="${postId}"].like-btn`);
            if (likeBtn) {
                likeBtn.classList.toggle('liked', post.isLiked);
                const span = likeBtn.querySelector('span');
                if (span) {
                    span.textContent = post.likes;
                }
            }
        }
    }

    loadCompanions() {
        const companionsGrid = document.getElementById('companionsGrid');
        if (!companionsGrid) return;
        
        companionsGrid.innerHTML = '';

        this.companions.forEach(companion => {
            const companionElement = this.createCompanionCard(companion);
            companionsGrid.appendChild(companionElement);
        });
    }

    createCompanionCard(companion) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'companion-card';
        cardDiv.addEventListener('click', () => this.showCompanionProfile(companion.id));

        cardDiv.innerHTML = `
            <img src="${companion.avatar}" alt="${companion.name}" class="companion-card-image">
            <div class="companion-card-overlay">
                <div class="companion-card-name">${companion.name}</div>
                <div class="companion-card-info">
                    <span>${companion.location}</span>
                    <span class="verified-badge">✓ Verified</span>
                </div>
            </div>
        `;

        return cardDiv;
    }

    showCompanionProfile(companionId) {
        if (!this.isPremium) {
            this.showMembershipModal();
            return;
        }

        const companion = this.companions.find(c => c.id === companionId);
        if (!companion) return;

        // Populate modal with companion data
        const elements = {
            companionName: companion.name,
            companionAge: `Age: ${companion.age}`,
            companionLocation: `Location: ${companion.location}`,
            companionPrice: `Rate: ${companion.price}`,
            companionRating: companion.rating,
            companionBio: companion.bio
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        });

        const mainImage = document.getElementById('companionMainImage');
        if (mainImage) {
            mainImage.src = companion.avatar;
        }

        // Load services
        const servicesContainer = document.getElementById('companionServices');
        if (servicesContainer) {
            servicesContainer.innerHTML = '';
            companion.services.forEach(service => {
                const serviceTag = document.createElement('span');
                serviceTag.className = 'service-tag';
                serviceTag.textContent = service;
                servicesContainer.appendChild(serviceTag);
            });
        }

        // Setup gallery dots
        const galleryDots = document.getElementById('galleryDots');
        if (galleryDots) {
            galleryDots.innerHTML = '';
            companion.gallery.forEach((image, index) => {
                const dot = document.createElement('span');
                dot.className = `gallery-dot ${index === 0 ? 'active' : ''}`;
                dot.addEventListener('click', () => this.switchGalleryImage(companion.gallery, index));
                galleryDots.appendChild(dot);
            });
        }

        this.showModal('companionModal');
    }

    switchGalleryImage(gallery, index) {
        const mainImage = document.getElementById('companionMainImage');
        if (mainImage) {
            mainImage.src = gallery[index];
        }
        
        document.querySelectorAll('.gallery-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    loadEvents() {
        const eventsGrid = document.getElementById('eventsGrid');
        if (!eventsGrid) return;
        
        eventsGrid.innerHTML = '';

        this.events.forEach(event => {
            const eventElement = this.createEventCard(event);
            eventsGrid.appendChild(eventElement);
        });
    }

    createEventCard(event) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'event-card';

        cardDiv.innerHTML = `
            <img src="${event.image}" alt="${event.title}" class="event-image">
            <div class="event-content">
                <h3 class="event-title">${event.title}</h3>
                <div class="event-meta">
                    <div>📅 ${event.date} at ${event.time}</div>
                    <div>📍 ${event.location}</div>
                    <div>👥 ${event.type}</div>
                </div>
                <div class="event-price">
                    <span class="price-guest">Guest: ${event.price}</span>
                    <span class="price-member">Member: ${event.memberPrice}</span>
                </div>
                <div class="event-attendees">
                    ${event.attendees}/${event.maxAttendees} attendees
                </div>
                <button class="btn btn--primary btn--full-width">
                    ${this.isPremium ? 'Join Event' : 'Upgrade to Join'}
                </button>
            </div>
        `;

        const joinBtn = cardDiv.querySelector('button');
        if (joinBtn) {
            joinBtn.addEventListener('click', () => {
                if (!this.isPremium) {
                    this.showMembershipModal();
                } else {
                    alert(`Joining ${event.title}!`);
                }
            });
        }

        return cardDiv;
    }

    loadLiveStreams() {
        const liveStreamsGrid = document.getElementById('liveStreamsGrid');
        if (!liveStreamsGrid) return;
        
        liveStreamsGrid.innerHTML = '';

        this.liveStreams.forEach(stream => {
            const streamElement = this.createLiveStreamCard(stream);
            liveStreamsGrid.appendChild(streamElement);
        });
    }

    createLiveStreamCard(stream) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'live-stream-card';
        cardDiv.addEventListener('click', () => this.showLiveStream(stream));

        cardDiv.innerHTML = `
            <img src="${stream.thumbnail}" alt="${stream.title}" class="stream-thumbnail">
            <div class="live-indicator">🔴 LIVE</div>
            <div class="viewer-count">${stream.viewers} viewers</div>
            <div class="stream-info">
                <div class="stream-title">${stream.title}</div>
                <div class="stream-companion">${stream.companionName}</div>
            </div>
        `;

        return cardDiv;
    }

    showLiveStream(stream) {
        if (!this.isPremium) {
            this.showMembershipModal();
            return;
        }

        const streamThumbnail = document.getElementById('streamThumbnail');
        const viewerCount = document.getElementById('viewerCount');
        
        if (streamThumbnail) {
            streamThumbnail.src = stream.thumbnail;
        }
        if (viewerCount) {
            viewerCount.textContent = `${stream.viewers} viewers`;
        }
        
        this.showModal('liveStreamModal');
    }

    showComments(postId) {
        const commentsList = document.getElementById('commentsList');
        if (commentsList) {
            commentsList.innerHTML = `
                <div class="comment">
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32" alt="User" class="comment-avatar">
                    <div class="comment-content">
                        <div class="comment-author">Distinguished_Gentleman</div>
                        <div class="comment-text">Absolutely stunning! Such elegance and class.</div>
                    </div>
                </div>
                <div class="comment">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32" alt="User" class="comment-avatar">
                    <div class="comment-content">
                        <div class="comment-author">Sophisticate_NYC</div>
                        <div class="comment-text">Would love to accompany you to such events.</div>
                    </div>
                </div>
            `;
        }
        
        this.showModal('commentsModal');
    }

    submitComment() {
        const commentInput = document.getElementById('commentInput');
        if (!commentInput) return;
        
        const comment = commentInput.value.trim();
        
        if (!comment) return;
        
        if (!this.isPremium) {
            this.showMembershipModal();
            return;
        }

        alert('Comment posted!');
        commentInput.value = '';
        this.closeModal('commentsModal');
    }

    sendChatMessage() {
        const chatInput = document.getElementById('chatInput');
        if (!chatInput) return;
        
        const message = chatInput.value.trim();
        
        if (!message) return;
        
        if (!this.isPremium) {
            this.showMembershipModal();
            return;
        }

        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'chat-message';
            messageDiv.innerHTML = `<strong>You:</strong> ${message}`;
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        chatInput.value = '';
    }

    sendGift(giftText) {
        if (!this.isPremium) {
            this.showMembershipModal();
            return;
        }
        
        alert(`Sent ${giftText}!`);
    }

    sharePost(postId) {
        if (navigator.share) {
            navigator.share({
                title: 'Check out this post on Cumpani',
                url: window.location.href
            });
        } else {
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(() => {
                alert('Link copied to clipboard!');
            });
        }
    }

    handleMessage() {
        if (!this.isPremium) {
            this.showMembershipModal();
            return;
        }
        
        alert('Opening private message...');
        this.closeModal('companionModal');
    }

    handleBooking() {
        if (!this.isPremium) {
            this.showMembershipModal();
            return;
        }
        
        alert('Opening booking interface...');
        this.closeModal('companionModal');
    }

    handleSearch(query) {
        if (!query) {
            this.loadCompanions();
            return;
        }
        
        const filteredCompanions = this.companions.filter(companion => 
            companion.name.toLowerCase().includes(query.toLowerCase()) ||
            companion.location.toLowerCase().includes(query.toLowerCase()) ||
            companion.services.some(service => 
                service.toLowerCase().includes(query.toLowerCase())
            )
        );
        
        const companionsGrid = document.getElementById('companionsGrid');
        if (companionsGrid) {
            companionsGrid.innerHTML = '';
            
            filteredCompanions.forEach(companion => {
                const companionElement = this.createCompanionCard(companion);
                companionsGrid.appendChild(companionElement);
            });
        }
    }

    showMembershipModal() {
        this.showModal('membershipModal');
    }

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }

    updateMembershipStatus() {
        const statusElement = document.getElementById('membershipStatus');
        if (statusElement) {
            statusElement.textContent = this.isPremium ? 'Premium Member' : 'Guest';
            statusElement.style.color = this.isPremium ? 'var(--color-primary)' : 'var(--color-text-secondary)';
        }
        
        // Update navigation buttons
        const membershipBtn = document.getElementById('membershipBtn');
        if (membershipBtn && this.isPremium) {
            membershipBtn.textContent = 'Premium Member';
            membershipBtn.style.background = 'var(--color-success)';
        }
    }

    // Simulate premium upgrade (for demo purposes)
    upgradeToPremium() {
        this.isPremium = true;
        localStorage.setItem('isPremium', 'true');
        this.updateMembershipStatus();
        this.closeModal('membershipModal');
        alert('Welcome to Cumpani Premium! You now have full access to all features.');
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new CumpaniApp();
    
    // Add premium upgrade functionality to membership modal
    const membershipUpgradeBtn = document.querySelector('.membership-modal-content .btn--primary');
    if (membershipUpgradeBtn) {
        membershipUpgradeBtn.addEventListener('click', () => {
            app.upgradeToPremium();
        });
    }

    // Mobile sidebar toggle
    const createMobileToggle = () => {
        if (window.innerWidth <= 1024) {
            const navLeft = document.querySelector('.nav-left');
            let mobileToggle = document.getElementById('mobileToggle');
            
            if (!mobileToggle && navLeft) {
                mobileToggle = document.createElement('button');
                mobileToggle.id = 'mobileToggle';
                mobileToggle.className = 'nav-icon';
                mobileToggle.innerHTML = '☰';
                mobileToggle.style.marginRight = '12px';
                navLeft.insertBefore(mobileToggle, navLeft.firstChild);
                
                mobileToggle.addEventListener('click', () => {
                    const sidebar = document.getElementById('sidebar');
                    if (sidebar) {
                        sidebar.classList.toggle('open');
                    }
                });
            }
        }
    };

    createMobileToggle();
    window.addEventListener('resize', createMobileToggle);

    // Close sidebar on outside click (mobile)
    document.addEventListener('click', (e) => {
        const sidebar = document.getElementById('sidebar');
        const mobileToggle = document.getElementById('mobileToggle');
        
        if (sidebar && sidebar.classList.contains('open') && 
            !sidebar.contains(e.target) && 
            e.target !== mobileToggle) {
            sidebar.classList.remove('open');
        }
    });

    // Add scroll effects for feed
    let isLoading = false;
    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
            if (!isLoading) {
                isLoading = true;
                setTimeout(() => {
                    console.log('Loading more posts...');
                    isLoading = false;
                }, 1000);
            }
        }
    });
});