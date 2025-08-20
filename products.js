// Products Page JavaScript Functions

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeProductsPage();
});

function initializeProductsPage() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Display user info if available
    displayUserInfo();
    
    // Initialize product interactions
    initializeProductCards();
    
    // Add animations to cards
    animateProductCards();
}

function displayUserInfo() {
    const userName = localStorage.getItem('userName');
    const developerId = localStorage.getItem('developerId');
    
    if (userName && developerId) {
        document.getElementById('userName').textContent = userName;
        document.getElementById('developerId').textContent = 'ID: ' + developerId;
        document.getElementById('userInfo').style.display = 'block';
    }
}

function initializeProductCards() {
    // Add click handlers to buy buttons
    const buyButtons = document.querySelectorAll('.buy-btn');
    buyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            handleProductPurchase(this);
        });
    });
    
    // Add hover effects to product cards
    const productCards = document.querySelectorAll('.card.product');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function handleProductPurchase(button) {
    const card = button.closest('.card');
    const productName = card.querySelector('h3').textContent.trim();
    const price = card.querySelector('.price').textContent.trim();
    
    // Add loading state
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...';
    button.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        button.innerHTML = originalText;
        button.disabled = false;
        
        // Show success message
        showToast(`${productName} added successfully`);
        
        // Add to cart animation
        addToCartAnimation(button);
        
    }, 1000);
}

function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.textContent = message || 'Item added successfully';
    toast.style.display = 'block';
    toast.classList.add('show');
    
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(function(){
        toast.classList.remove('show');
        setTimeout(function(){ 
            toast.style.display = 'none'; 
        }, 250);
    }, 1500);
}

function addToCartAnimation(button) {
    // Create flying cart icon
    const flyingIcon = document.createElement('div');
    flyingIcon.innerHTML = '<i class="fas fa-shopping-cart"></i>';
    flyingIcon.style.cssText = `
        position: fixed;
        z-index: 9999;
        color: #4285f4;
        font-size: 1.5rem;
        pointer-events: none;
        transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
    `;
    
    const buttonRect = button.getBoundingClientRect();
    flyingIcon.style.left = buttonRect.left + 'px';
    flyingIcon.style.top = buttonRect.top + 'px';
    
    document.body.appendChild(flyingIcon);
    
    // Animate to checkout link
    const checkoutLink = document.querySelector('a[href="checkout.html"]');
    if (checkoutLink) {
        const checkoutRect = checkoutLink.getBoundingClientRect();
        
        setTimeout(() => {
            flyingIcon.style.left = checkoutRect.left + 'px';
            flyingIcon.style.top = checkoutRect.top + 'px';
            flyingIcon.style.transform = 'scale(0.5)';
            flyingIcon.style.opacity = '0';
        }, 100);
    }
    
    // Remove after animation
    setTimeout(() => {
        flyingIcon.remove();
    }, 1000);
}

function animateProductCards() {
    const cards = document.querySelectorAll('.card.product');
    
    // Simple staggered animation without hiding cards initially
    cards.forEach((card, index) => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        card.classList.add('fade-in');
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Search functionality (if needed in future)
function searchProducts(query) {
    const cards = document.querySelectorAll('.card.product');
    const searchTerm = query.toLowerCase();
    
    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('.desc').textContent.toLowerCase();
        const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
        
        const matches = title.includes(searchTerm) || 
                       description.includes(searchTerm) || 
                       tags.some(tag => tag.includes(searchTerm));
        
        if (matches) {
            card.style.display = 'block';
            card.classList.add('fade-in');
        } else {
            card.style.display = 'none';
        }
    });
}

// Filter products by category
function filterProducts(category) {
    const cards = document.querySelectorAll('.card.product');
    
    cards.forEach(card => {
        const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
        
        if (category === 'all' || tags.includes(category.toLowerCase())) {
            card.style.display = 'block';
            card.classList.add('fade-in');
        } else {
            card.style.display = 'none';
        }
    });
}

// Utility function to create ripple effect
function createRipple(event, element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effect to buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn')) {
        createRipple(e, e.target);
    }
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);