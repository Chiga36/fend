// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true
    });

    // Handle splash screen
    handleSplashScreen();

    // Initialize navigation
    initializeNavigation();

    // Initialize modal functionality
    initializeModals();

    // Initialize chat functionality
    initializeChat();

    // Initialize form handling
    initializeFormHandling();
});

// Splash Screen Handler
function handleSplashScreen() {
    setTimeout(() => {
        document.getElementById('splash-screen').style.display = 'none';
        document.getElementById('main-website').style.opacity = '1';
    }, 3000);
}

// Navigation
function initializeNavigation() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(26, 26, 46, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(26, 26, 46, 0.95)';
            navbar.style.backdropFilter = 'blur(15px)';
        }
    });
}

// Scroll to Section Function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Buy Modal
function showBuyModal() {
    const modal = new bootstrap.Modal(document.getElementById('buyModal'));
    modal.show();
}

// Quantity Controls
function changeQuantity(change) {
    const quantityInput = document.getElementById('quantity');
    let currentValue = parseInt(quantityInput.value);
    let newValue = currentValue + change;

    if (newValue >= 1 && newValue <= 10) {
        quantityInput.value = newValue;
        updateOrderTotal();
    }
}

function updateOrderTotal() {
    const quantity = parseInt(document.getElementById('quantity').value);
    const pricePerUnit = 399;
    const subtotal = quantity * pricePerUnit;

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('totalAmount').textContent = `$${subtotal.toFixed(2)}`;
}

// Modal Initialization
function initializeModals() {
    // Initialize quantity on modal show
    document.getElementById('buyModal').addEventListener('shown.bs.modal', function() {
        updateOrderTotal();
    });
}

// Chat Functionality
function initializeChat() {
    const chatMessages = document.getElementById('chatMessages');

    // Auto-scroll chat to bottom
    function scrollChatToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Add message to chat
    window.addMessage = function(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;

        const avatarClass = isUser ? 'fas fa-user' : 'fas fa-robot';
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="${avatarClass}"></i>
            </div>
            <div class="message-content">
                <p>${message}</p>
                <span class="message-time">${time}</span>
            </div>
        `;

        chatMessages.appendChild(messageDiv);
        scrollChatToBottom();

        // Add typing animation for bot responses
        if (!isUser) {
            messageDiv.style.opacity = '0';
            messageDiv.style.transform = 'translateY(20px)';
            setTimeout(() => {
                messageDiv.style.transition = 'all 0.3s ease';
                messageDiv.style.opacity = '1';
                messageDiv.style.transform = 'translateY(0)';
            }, 100);
        }
    };
}

// Send Message Function
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();

    if (message) {
        // Add user message
        addMessage(message, true);
        messageInput.value = '';

        // Simulate bot response
        setTimeout(() => {
            const botResponse = getBotResponse(message);
            addMessage(botResponse);
        }, 1000);
    }
}

// Handle Enter key in chat
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Quick Questions
function sendQuickQuestion(type) {
    const questions = {
        recipes: "Can you show me some recipe ideas for the ChefMaster Pro?",
        features: "What are the main features of the ChefMaster Pro?",
        support: "I need technical support with my cooking machine.",
        warranty: "What warranty coverage do I get with my purchase?"
    };

    const question = questions[type];
    if (question) {
        addMessage(question, true);

        setTimeout(() => {
            const response = getQuickResponse(type);
            addMessage(response);
        }, 1000);
    }
}

// Bot Response Logic
function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('recipe') || lowerMessage.includes('cook')) {
        return "🍳 I'd love to help with recipes! The ChefMaster Pro comes with 50+ built-in recipes including steaks, pasta, soups, and desserts. You can also download thousands more from our app. What type of cuisine interests you most?";
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
        return "💰 Great news! The ChefMaster Pro is currently on sale for $399 (originally $599) - that's 33% off! This includes free worldwide shipping, 2-year warranty, and 24/7 support. Would you like to place an order?";
    } else if (lowerMessage.includes('shipping') || lowerMessage.includes('delivery')) {
        return "🚚 We offer FREE worldwide shipping! Orders typically arrive within 3-5 business days in the US, and 7-10 days internationally. You'll receive tracking information as soon as your order ships.";
    } else if (lowerMessage.includes('warranty') || lowerMessage.includes('guarantee')) {
        return "🛡️ Your ChefMaster Pro comes with a comprehensive 2-year warranty covering all parts and labor, plus a 30-day money-back guarantee. We also provide 24/7 customer support for any questions!";
    } else if (lowerMessage.includes('features') || lowerMessage.includes('what')) {
        return "✨ The ChefMaster Pro features AI-powered cooking, app integration, 50+ recipes, energy-efficient design, auto-stirring, smart temperature control, and voice commands. Would you like me to explain any specific feature?";
    } else {
        return "😊 Thanks for your message! I'm here to help with any questions about the ChefMaster Pro. You can ask me about recipes, features, pricing, shipping, or technical support. How can I assist you today?";
    }
}

// Quick Response Logic
function getQuickResponse(type) {
    const responses = {
        recipes: "🍳 <strong>Popular Recipes:</strong><br>• Perfect Beef Steak (15 min)<br>• Creamy Pasta Primavera (20 min)<br>• Chicken Curry (25 min)<br>• Chocolate Lava Cake (12 min)<br>• Vegetable Stir-fry (10 min)<br><br>The app has 1000+ more recipes with step-by-step guidance!",
        features: "✨ <strong>Key Features:</strong><br>• AI-Powered Smart Cooking<br>• Mobile App Control<br>• 50+ Built-in Recipes<br>• Auto-Stirring Technology<br>• Energy Efficient (60% savings)<br>• Voice Command Support<br>• 6L Capacity<br>• Easy Cleanup Design",
        support: "🔧 <strong>Technical Support Available:</strong><br>• 24/7 Live Chat Support<br>• Video Troubleshooting<br>• Remote Diagnostics<br>• Free Repair Service<br>• Replacement Parts<br><br>What specific issue can I help you with?",
        warranty: "🛡️ <strong>Warranty Coverage:</strong><br>• 2-Year Full Warranty<br>• 30-Day Money-Back Guarantee<br>• Free Repairs & Replacements<br>• 24/7 Customer Support<br>• International Coverage<br><br>Register your product for extended benefits!"
    };

    return responses[type];
}

// Language Change
function changeLanguage() {
    const select = document.getElementById('languageSelect');
    const selectedLang = select.value;

    // Simulate language change (in a real app, you'd implement actual translation)
    const greetings = {
        en: "Hello! How can I help you today? 😊",
        es: "¡Hola! ¿Cómo puedo ayudarte hoy? 😊",
        fr: "Bonjour! Comment puis-je vous aider aujourd'hui? 😊",
        de: "Hallo! Wie kann ich Ihnen heute helfen? 😊",
        it: "Ciao! Come posso aiutarti oggi? 😊",
        pt: "Olá! Como posso ajudá-lo hoje? 😊",
        zh: "你好！我今天能为您做些什么？😊",
        ja: "こんにちは！今日はどのようにお手伝いできますか？😊",
        hi: "नमस्ते! आज मैं आपकी कैसे मदद कर सकता हूं? 😊"
    };

    setTimeout(() => {
        addMessage(greetings[selectedLang] || greetings.en);
    }, 500);
}

// Form Handling
function initializeFormHandling() {
    const purchaseForm = document.getElementById('purchaseForm');

    if (purchaseForm) {
        purchaseForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handlePurchaseSubmission();
        });
    }
}

function handlePurchaseSubmission() {
    const submitBtn = document.querySelector('.btn-complete-order');
    const originalText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Order...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Order Confirmed!';
        submitBtn.style.background = '#28a745';

        // Show success message
        setTimeout(() => {
            alert('🎉 Order confirmed! You will receive a confirmation email shortly. Thank you for choosing ChefMaster Pro!');

            // Reset form
            document.getElementById('purchaseForm').reset();
            updateOrderTotal();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';

            // Close modal
            bootstrap.Modal.getInstance(document.getElementById('buyModal')).hide();
        }, 2000);
    }, 3000);
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization
document.addEventListener('DOMContentLoaded', function() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Add hover effects
    const buttons = document.querySelectorAll('.btn, .action-btn, .question-btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = this.style.transform + ' scale(1.02)';
        });

        btn.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace(' scale(1.02)', '');
        });
    });
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('Error occurred:', e.error);
});

// Analytics tracking (placeholder)
function trackEvent(eventName, properties = {}) {
    console.log('Event tracked:', eventName, properties);
    // Replace with actual analytics code
}

// Track user interactions
document.addEventListener('click', function(e) {
    if (e.target.matches('.action-btn')) {
        trackEvent('Action_Button_Click', { button: e.target.textContent });
    }

    if (e.target.matches('.hotspot')) {
        trackEvent('Hotspot_Interaction', { hotspot: e.target.dataset.hotspot });
    }

    if (e.target.matches('.buy-now-btn')) {
        trackEvent('Buy_Now_Click', { section: 'Product_Explorer' });
    }
});
