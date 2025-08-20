// Checkout Page JavaScript Functions

// Product prices
const PRODUCT_PRICES = {
    walletProtect: 6894,
    googleMap: 31891
};

const GST_RATE = 0.18; // 18%
const DEVELOPER_DISCOUNT = 1870;
const OTHER_DISCOUNT = 800;

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCheckoutPage();
});

function initializeCheckoutPage() {
    // Load user information
    loadUserInfo();
    
    // Calculate and display prices
    calculatePrices();
    
    // Add animations
    animateElements();
}

function loadUserInfo() {
    // Get user info from localStorage or use default values
    const userName = localStorage.getItem('userName') || 'Rohit Kumar';
    const developerId = localStorage.getItem('developerId') || 'GDV76235A98P6I';
    const upiId = '93059965556@ybl';
    
    // Update user info in header
    document.getElementById('userName').textContent = userName;
    document.getElementById('developerId').textContent = `ID: ${developerId}`;
    
    // Update payment details
    document.getElementById('accountHolder').textContent = userName;
    document.getElementById('paymentDeveloperId').textContent = developerId;
    document.getElementById('upiId').textContent = upiId;
}

function calculatePrices() {
    const product1Price = PRODUCT_PRICES.walletProtect;
    const product2Price = PRODUCT_PRICES.googleMap;
    
    // Calculate subtotal
    const subtotal = product1Price + product2Price;
    
    // Calculate GST
    const gst = subtotal * GST_RATE;
    
    // Calculate total amount
    const totalAmount = subtotal + gst;
    
    // Apply both discounts
    const totalDiscounts = DEVELOPER_DISCOUNT + OTHER_DISCOUNT;
    const netPayable = Math.max(0, totalAmount - totalDiscounts);
    
    // Update display
    updatePriceDisplay(product1Price, product2Price, subtotal, gst, totalAmount, netPayable);
}

function updatePriceDisplay(product1Price, product2Price, subtotal, gst, totalAmount, netPayable) {
    // Format currency
    const formatCurrency = (amount) => `₹${amount.toFixed(2)}`;
    
    // Update individual product prices
    document.getElementById('summaryProduct1').textContent = formatCurrency(product1Price);
    document.getElementById('summaryProduct2').textContent = formatCurrency(product2Price);
    
    // Update summary calculations
    document.getElementById('subtotal').textContent = formatCurrency(subtotal);
    document.getElementById('gst').textContent = formatCurrency(gst);
    document.getElementById('totalAmount').textContent = formatCurrency(totalAmount);
    document.getElementById('discount').textContent = `-${formatCurrency(DEVELOPER_DISCOUNT)}`;
    document.getElementById('otherDiscount').textContent = `-${formatCurrency(OTHER_DISCOUNT)}`;
    document.getElementById('netPayable').textContent = formatCurrency(netPayable);
    document.getElementById('finalAmount').textContent = formatCurrency(netPayable);
    
    // Update proceed button based on amount
    updateProceedButton(netPayable);
}

function updateProceedButton(netPayable) {
    const proceedBtn = document.getElementById('proceedBtn');
    const amountNote = document.querySelector('.amount-note');
    
    if (netPayable === 0) {
        proceedBtn.innerHTML = '<i class="fas fa-gift"></i> Claim Free Products';
        amountNote.style.display = 'flex';
    } else {
        proceedBtn.innerHTML = '<i class="fas fa-lock"></i> Proceed for Payment';
        amountNote.style.display = 'none';
    }
}

// Payment Methods Modal Functions
function showPaymentMethods() {
    const modal = document.getElementById('paymentModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function selectPaymentMethod(method) {
    closePaymentModal();
    
    switch(method) {
        case 'card':
            showComingSoon('Credit/Debit Card');
            break;
        case 'netbanking':
            showComingSoon('Net Banking');
            break;
        case 'wallet':
            showComingSoon('Wallet');
            break;
        case 'upi':
            showUpiPayment();
            break;
    }
}

function showComingSoon(methodName) {
    showSuccessMessage(`${methodName} payment coming soon! Please use UPI for now.`);
    setTimeout(() => {
        showPaymentMethods();
    }, 2000);
}

// UPI Payment Functions
function showUpiPayment() {
    const modal = document.getElementById('upiModal');
    const netPayable = parseFloat(document.getElementById('netPayable').textContent.replace('₹', '').replace(',', ''));
    
    // Update amount in UPI modal
    document.getElementById('upiAmount').textContent = `₹${netPayable.toLocaleString('en-IN')}`;
    
    // Generate QR Code
    generateUpiQR(netPayable);
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeUpiModal() {
    const modal = document.getElementById('upiModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function generateUpiQR(amount) {
    const upiId = '6307316819-2@ybl';
    const merchantName = 'Rohit Kumar';
    const transactionNote = 'API Purchase Payment';
    
    // UPI deep link format
    const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;
    
    // Clear previous QR code
    const qrContainer = document.getElementById('qrcode');
    qrContainer.innerHTML = '';
    
    // Generate QR code using a simple QR code library (you can use any QR library)
    // For now, we'll create a placeholder and use an online QR service
    const qrSize = 200;
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(upiUrl)}`;
    
    const qrImg = document.createElement('img');
    qrImg.src = qrApiUrl;
    qrImg.alt = 'UPI QR Code';
    qrImg.style.width = `${qrSize}px`;
    qrImg.style.height = `${qrSize}px`;
    qrImg.style.border = '2px solid #27ae60';
    qrImg.style.borderRadius = '10px';
    
    qrContainer.appendChild(qrImg);
}

function copyUpiId() {
    const upiId = '6307316819-2@ybl';
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(upiId).then(() => {
            showCopySuccess();
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = upiId;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showCopySuccess();
    }
}

function showCopySuccess() {
    const copyBtn = document.querySelector('.copy-btn');
    const originalText = copyBtn.innerHTML;
    
    copyBtn.innerHTML = '<i class="fas fa-check"></i>';
    copyBtn.style.background = '#27ae60';
    
    setTimeout(() => {
        copyBtn.innerHTML = originalText;
        copyBtn.style.background = '#27ae60';
    }, 2000);
}

function openUpiApp(appName) {
    const netPayable = parseFloat(document.getElementById('netPayable').textContent.replace('₹', '').replace(',', ''));
    const upiId = '6307316819-2@ybl';
    const merchantName = 'Rohit Kumar';
    const transactionNote = 'API Purchase Payment';
    
    let deepLink = '';
    
    switch(appName) {
        case 'phonepe':
            deepLink = `phonepe://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${netPayable}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;
            break;
        case 'paytm':
            deepLink = `paytmmp://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${netPayable}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;
            break;
        case 'googlepay':
            deepLink = `tez://upi/pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${netPayable}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;
            break;
    }
    
    // Try to open the app
    window.location.href = deepLink;
    
    // Fallback: if app doesn't open, show generic UPI link
    setTimeout(() => {
        const genericUpiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${netPayable}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;
        window.location.href = genericUpiUrl;
    }, 1000);
}

function verifyPayment() {
    const verifyBtn = document.querySelector('.verify-payment-btn');
    
    // Add loading state
    verifyBtn.disabled = true;
    verifyBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifying Payment...';
    
    // Simulate payment verification
    setTimeout(() => {
        closeUpiModal();
        showSuccessMessage('Payment verified successfully!');
        redirectToSuccess();
    }, 3000);
}

// Keep original function for backward compatibility
function proceedToPayment() {
    showPaymentMethods();
}

function showSuccessMessage(message) {
    // Create success notification
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle success-icon"></i>
            <h3>Success!</h3>
            <p>${message}</p>
        </div>
    `;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    const successContent = notification.querySelector('.success-content');
    successContent.style.cssText = `
        background: white;
        padding: 3rem;
        border-radius: 20px;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        max-width: 400px;
        width: 90%;
    `;
    
    const successIcon = notification.querySelector('.success-icon');
    successIcon.style.cssText = `
        font-size: 4rem;
        color: #34a853;
        margin-bottom: 1rem;
        display: block;
    `;
    
    document.body.appendChild(notification);
}

function redirectToSuccess() {
    setTimeout(() => {
        window.location.href = 'successR.html';
    }, 2000);
}

function goBack() {
    window.location.href = 'products.html';
}

function animateElements() {
    // Animate order items
    const orderItems = document.querySelectorAll('.order-item');
    orderItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Animate payment section
    const paymentSection = document.querySelector('.payment-section');
    paymentSection.style.opacity = '0';
    paymentSection.style.transform = 'translateX(20px)';
    
    setTimeout(() => {
        paymentSection.style.transition = 'all 0.8s ease';
        paymentSection.style.opacity = '1';
        paymentSection.style.transform = 'translateX(0)';
    }, 400);
    
    // Animate summary rows
    const summaryRows = document.querySelectorAll('.summary-row');
    summaryRows.forEach((row, index) => {
        row.style.opacity = '0';
        row.style.transform = 'translateX(-10px)';
        
        setTimeout(() => {
            row.style.transition = 'all 0.4s ease';
            row.style.opacity = '1';
            row.style.transform = 'translateX(0)';
        }, (index * 100) + 600);
    });
}

// Add hover effects to interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
    });
    
    // Add hover effects to order items
    const orderItems = document.querySelectorAll('.order-item');
    orderItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

function createRippleEffect(event, element) {
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

// Add CSS for ripple animation
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