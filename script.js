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
function changeLanguage() {
    const select = document.getElementById('languageSelect');
    const selectedLang = select.value;

    // Indian language greetings
    const greetings = {
        en: "Hello! How can I help you with ChefMaster Pro today? 😊",
        hi: "नमस्ते! आज मैं ChefMaster Pro के बारे में आपकी कैसे मदद कर सकता हूँ? 😊",
        ta: "வணக்கம்! ChefMaster Pro பற்றி இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்? 😊",
        te: "నమస్కారం! ChefMaster Pro గురించి ఈరోజు నేను మీకు ఎలా సహాయం చేయగలను? 😊",
        bn: "নমস্কার! ChefMaster Pro সম্পর্কে আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি? 😊",
        mr: "नमस्कार! ChefMaster Pro बद्दल आज मी तुमची कशी मदत करू शकतो? 😊",
        gu: "નમસ્તે! ChefMaster Pro વિશે આજે હું તમારી કેવી રીતે મદદ કરી શકું? 😊",
        kn: "ನಮಸ್ಕಾರ! ChefMaster Pro ಬಗ್ಗೆ ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು? 😊",
        ml: "നമസ്കാരം! ChefMaster Pro കുറിച്ച് ഇന്ന് ഞാൻ നിങ്ങളെ എങ്ങനെ സഹായിക്കാം? 😊",
        pa: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ChefMaster Pro ਬਾਰੇ ਅੱਜ ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ? 😊"
    };

    setTimeout(() => {
        addMessage(greetings[selectedLang] || greetings.en);
    }, 500);
}

// Enhanced Bot Responses for Indian Context
function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    const currentLang = document.getElementById('languageSelect').value;

    // Basic responses in multiple Indian languages
    const responses = {
        en: {
            recipes: "🍳 ChefMaster Pro comes with 50+ recipes including Indian favorites like Butter Chicken, Biryani, Dal, and Sambar. What type of cuisine would you like to try?",
            price: "💰 ChefMaster Pro is available for ₹32,999 (originally ₹49,999) - that's 33% off! Free delivery across India. Would you like to place an order?",
            features: "✨ ChefMaster Pro features AI cooking, 50+ Indian recipes, app control, auto-stirring, and energy efficiency. Perfect for Indian kitchens!",
            shipping: "🚚 We offer FREE delivery across India! Orders reach metro cities in 2-3 days, other cities in 4-7 days.",
            warranty: "🛡️ 2-year warranty with free service at your doorstep. 30-day money-back guarantee. Call our India support: 1800-CHEF-PRO"
        },
        hi: {
            recipes: "🍳 ChefMaster Pro में 50+ व्यंजन हैं जिनमें बटर चिकन, बिरयानी, दाल, और सांभर शामिल हैं। आप कौन सा व्यंजन बनाना चाहते हैं?",
            price: "💰 ChefMaster Pro ₹32,999 में उपलब्ध है (मूल कीमत ₹49,999) - 33% की छूट! पूरे भारत में मुफ्त डिलीवरी।",
            features: "✨ ChefMaster Pro में AI कुकिंग, 50+ भारतीय व्यंजन, ऐप कंट्रोल और ऑटो-स्टिरिंग है। भारतीय रसोई के लिए बिल्कुल सही!",
            shipping: "🚚 पूरे भारत में मुफ्त डिलीवरी! मेट्रो शहरों में 2-3 दिन, अन्य शहरों में 4-7 दिन में डिलीवरी।",
            warranty: "🛡️ घर पर मुफ्त सर्विस के साथ 2 साल की वारंटी। 30 दिन पैसे वापसी की गारंटी।"
        }
        // Add more languages as needed
    };

    if (lowerMessage.includes('recipe') || lowerMessage.includes('व्यंजन') || lowerMessage.includes('खाना')) {
        return responses[currentLang]?.recipes || responses.en.recipes;
    } else if (lowerMessage.includes('price') || lowerMessage.includes('कीमत') || lowerMessage.includes('दाम')) {
        return responses[currentLang]?.price || responses.en.price;
    } else if (lowerMessage.includes('features') || lowerMessage.includes('विशेषताएं')) {
        return responses[currentLang]?.features || responses.en.features;
    } else if (lowerMessage.includes('shipping') || lowerMessage.includes('डिलीवरी')) {
        return responses[currentLang]?.shipping || responses.en.shipping;
    } else if (lowerMessage.includes('warranty') || lowerMessage.includes('वारंटी')) {
        return responses[currentLang]?.warranty || responses.en.warranty;
    } else {
        return currentLang === 'hi' ?
            "😊 धन्यवाद! मैं ChefMaster Pro के बारे में आपकी मदद कर सकता हूँ। व्यंजन, कीमत, या सुविधाओं के बारे में पूछें।" :
            "😊 Thanks for your message! I can help with ChefMaster Pro recipes, pricing, features, or support. What would you like to know?";
    }
}

// Updated Quick Questions for Indian Context
function getQuickResponse(type) {
    const currentLang = document.getElementById('languageSelect').value;

    const responses = {
        en: {
            recipes: "🍳 <strong>Popular Indian Recipes:</strong><br>• Butter Chicken (25 min)<br>• Vegetable Biryani (30 min)<br>• Dal Tadka (15 min)<br>• Chicken Curry (35 min)<br>• Sambar (20 min)<br>• Rajma (40 min)<br><br>Plus 44 more recipes in the app!",
            features: "✨ <strong>Perfect for Indian Cooking:</strong><br>• AI-Powered Smart Cooking<br>• 50+ Indian Recipes<br>• Auto-Stirring for Curries<br>• Pressure Cooking Mode<br>• Rice Cooker Function<br>• Energy Efficient<br>• Easy Cleanup",
            support: "🔧 <strong>India Support:</strong><br>• Hindi & English Support<br>• Video Call Assistance<br>• Home Service Available<br>• Free Installation<br>• Toll-Free: 1800-CHEF-PRO<br>• WhatsApp: +91-98765-43210",
            warranty: "🛡️ <strong>India Warranty:</strong><br>• 2-Year Full Warranty<br>• 30-Day Money Back<br>• Home Service in 500+ Cities<br>• Free Annual Maintenance<br>• Authorized Service Centers<br>• Extended Warranty Available"
        },
        hi: {
            recipes: "🍳 <strong>लोकप्रिय भारतीय व्यंजन:</strong><br>• बटर चिकन (25 मिनट)<br>• वेज बिरयानी (30 मिनट)<br>• दाल तड़का (15 मिनट)<br>• चिकन करी (35 मिनट)<br>• सांभर (20 मिनट)<br>• राजमा (40 मिनट)<br><br>ऐप में 44 और भी व्यंजन!",
            features: "✨ <strong>भारतीय खाना बनाने के लिए बिल्कुल सही:</strong><br>• AI स्मार्ट कुकिंग<br>• 50+ भारतीय व्यंजन<br>• करी के लिए ऑटो-स्टिरिंग<br>• प्रेशर कुकिंग मोड<br>• राइस कुकर फंक्शन<br>• ऊर्जा बचाने वाला<br>• आसान सफाई",
            support: "🔧 <strong>भारत सपोर्ट:</strong><br>• हिंदी और अंग्रेजी सपोर्ट<br>• वीडियो कॉल सहायता<br>• घर पर सर्विस उपलब्ध<br>• मुफ्त इंस्टॉलेशन<br>• टोल-फ्री: 1800-CHEF-PRO<br>• व्हाट्सएप: +91-98765-43210",
            warranty: "🛡️ <strong>भारत वारंटी:</strong><br>• 2 साल की पूरी वारंटी<br>• 30 दिन पैसे वापसी<br>• 500+ शहरों में होम सर्विस<br>• मुफ्त वार्षिक रखरखाव<br>• अधिकृत सर्विस सेंटर<br>• विस्तारित वारंटी उपलब्ध"
        }
    };

    return responses[currentLang]?.[type] || responses.en[type];
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

// Newsletter Subscription Functionality
function subscribeNewsletter() {
    const emailInput = document.getElementById('newsletterEmail');
    const email = emailInput.value.trim();
    const messageDiv = document.getElementById('newsletterMessage');
    const button = document.getElementById('newsletterBtn');

    // Clear previous messages
    messageDiv.className = 'newsletter-message';
    messageDiv.textContent = '';
    emailInput.classList.remove('error', 'success');

    // Validate email
    if (!email) {
        showNewsletterError('Please enter your email address', emailInput, messageDiv);
        return;
    }

    if (!isValidEmail(email)) {
        showNewsletterError('Please enter a valid email address', emailInput, messageDiv);
        return;
    }

    // Show loading state
    const originalIcon = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    button.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Success state
        emailInput.classList.add('success');
        button.innerHTML = '<i class="fas fa-check"></i>';

        // Show success popup
        showSuccessPopup(email);

        // Clear form after delay
        setTimeout(() => {
            emailInput.value = '';
            emailInput.classList.remove('success');
            button.innerHTML = originalIcon;
            button.disabled = false;
            messageDiv.textContent = '';
        }, 3000);

    }, 1500); // Simulate network delay
}

// Email Validation Function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Basic validation checks
    if (!emailRegex.test(email)) return false;
    if (email.length < 5) return false;
    if (email.length > 254) return false;

    // Check for common email providers (optional)
    const domain = email.split('@')[1].toLowerCase();
    const commonDomains = [
        'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com',
        'rediffmail.com', 'yahoo.in', 'gmail.in', 'live.com',
        'icloud.com', 'protonmail.com', 'yandex.com'
    ];

    // If it's a common domain, it's definitely valid
    if (commonDomains.includes(domain)) return true;

    // For other domains, check if it has proper structure
    return domain.includes('.') && domain.split('.').every(part => part.length > 0);
}

// Show Error Message
function showNewsletterError(message, inputElement, messageElement) {
    inputElement.classList.add('error');
    messageElement.className = 'newsletter-message error';
    messageElement.textContent = message;

    // Shake animation for input
    inputElement.style.animation = 'shake 0.5s ease';
    setTimeout(() => {
        inputElement.style.animation = '';
    }, 500);
}

// Show Success Popup
function showSuccessPopup(email) {
    // Create popup if it doesn't exist
    let popup = document.getElementById('newsletterPopup');
    if (!popup) {
        popup = document.createElement('div');
        popup.id = 'newsletterPopup';
        popup.className = 'newsletter-popup';
        popup.innerHTML = `
            <div class="newsletter-popup-content">
                <div class="newsletter-popup-icon">
                    <i class="fas fa-bell"></i>
                </div>
                <h4>Subscription Confirmed!</h4>
                <p>Thank you for subscribing! You'll receive all the latest updates about ChefMaster Pro, including new recipes, features, and exclusive offers.</p>
                <p><strong>We'll send notifications to:</strong><br><span id="confirmedEmail"></span></p>
                <button class="newsletter-popup-close" onclick="closeNewsletterPopup()">
                    <i class="fas fa-check"></i> Got it!
                </button>
            </div>
        `;
        document.body.appendChild(popup);
    }

    // Update email in popup
    document.getElementById('confirmedEmail').textContent = email;

    // Show popup
    popup.classList.add('show');

    // Auto-close after 5 seconds
    setTimeout(() => {
        closeNewsletterPopup();
    }, 5000);
}

// Close Success Popup
function closeNewsletterPopup() {
    const popup = document.getElementById('newsletterPopup');
    if (popup) {
        popup.classList.remove('show');
    }
}

// Handle Enter key in newsletter input
document.addEventListener('DOMContentLoaded', function() {
    const newsletterInput = document.getElementById('newsletterEmail');
    if (newsletterInput) {
        newsletterInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                subscribeNewsletter();
            }
        });
    }
});

// Add shake animation CSS
const shakeCSS = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}
`;

// Add shake animation to CSS if not already present
if (!document.querySelector('#shakeAnimation')) {
    const style = document.createElement('style');
    style.id = 'shakeAnimation';
    style.textContent = shakeCSS;
    document.head.appendChild(style);
}
