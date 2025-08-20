// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Add download tracking with forced file downloads
document.querySelectorAll('.download-item').forEach(item => {
  item.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default browser behavior
    
    // Add download animation
    const icon = this.querySelector('.download-icon');
    const originalIcon = icon.innerHTML;
    
    icon.style.transform = 'scale(0.9)';
    icon.style.background = 'linear-gradient(135deg, #38a169 0%, #2f855a 100%)';
    
    setTimeout(() => {
      icon.style.transform = 'scale(1)';
      icon.innerHTML = '<i class="fas fa-check"></i>';
    }, 200);
    
    setTimeout(() => {
      icon.innerHTML = originalIcon;
      icon.style.background = 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)';
    }, 2000);
    
    // Force download instead of opening in browser
    const link = document.createElement('a');
    link.href = this.href;
    link.download = this.href.split('/').pop(); // Get filename from path
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Log download for tracking
    console.log('Downloading:', this.querySelector('.download-title').textContent);
    console.log('File path:', this.href);
  });
});

// Add smooth scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.order-details, .downloads-section, .actions-section, .support-info').forEach(el => {
  observer.observe(el);
});

// Invoice generation functionality
document.getElementById('downloadInvoice').addEventListener('click', function(e) {
  e.preventDefault();
  generateInvoice();
});

function generateInvoice() {
  var userInfo = {
    name: 'Neeraj Sahu',
    email: 'justvisitepluse@gmail.com',
    phone: '8299493913',
    address: '230 Bahar Khanderao Gate, Jhansi, Uttar Pradesh, India'
  };

  var orderInfo = {
    orderNumber: 'DM20250820',
    orderDate: 'Aug 20, 2025',
    items: [
      { name: 'Wallet Protect Patch API', description: 'Advanced security API with documentation', price: 7743 },
      { name: 'Google Map API', description: 'Premium mapping service access', price: 36452 }
    ],
    total: 44195
  };

  var newWindow = window.open('', '_blank', 'width=800,height=600');
  
  var invoiceHTML = '';
  invoiceHTML += '<!DOCTYPE html>';
  invoiceHTML += '<html>';
  invoiceHTML += '<head>';
  invoiceHTML += '<meta charset="utf-8">';
  invoiceHTML += '<meta name="viewport" content="width=device-width, initial-scale=1">';
  invoiceHTML += '<title>Invoice - ' + orderInfo.orderNumber + '</title>';
  invoiceHTML += '<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">';
  invoiceHTML += '<style>';
  invoiceHTML += '* { margin: 0; padding: 0; box-sizing: border-box; }';
  invoiceHTML += 'body { font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background: #f8f9fa; color: #333; line-height: 1.6; }';
  invoiceHTML += '.invoice-container { max-width: 800px; margin: 0 auto; background: white; border: 1px solid #e9ecef; border-radius: 12px; padding: 40px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); }';
  invoiceHTML += '.invoice-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; border-bottom: 3px solid #4285f4; padding-bottom: 20px; }';
  invoiceHTML += '.company-info { display: flex; align-items: center; gap: 15px; }';
  invoiceHTML += '.company-logo { width: 60px; height: 60px; background: linear-gradient(135deg, #4285f4 0%, #34a853 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; }';
  invoiceHTML += '.company-details h1 { background: linear-gradient(45deg, #4285f4, #34a853, #fbbc04, #ea4335); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin: 0; font-size: 2rem; font-weight: 700; }';
  invoiceHTML += '.company-details p { margin: 5px 0; color: #666; }';
  invoiceHTML += '.invoice-title { text-align: right; }';
  invoiceHTML += '.invoice-title h2 { color: #333; margin: 0; font-size: 1.8rem; font-weight: 700; }';
  invoiceHTML += '.invoice-title p { margin: 5px 0; color: #666; }';
  invoiceHTML += '.billing-section { display: flex; justify-content: space-between; margin-bottom: 40px; gap: 40px; }';
  invoiceHTML += '.billing-info { background: #f8f9fa; padding: 20px; border-radius: 8px; border: 1px solid #e9ecef; flex: 1; }';
  invoiceHTML += '.billing-info h3 { color: #333; margin-bottom: 15px; border-bottom: 2px solid #4285f4; padding-bottom: 5px; font-size: 1.1rem; }';
  invoiceHTML += '.billing-info p { margin: 8px 0; color: #555; }';
  invoiceHTML += '.items-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; background: white; border-radius: 8px; overflow: hidden; border: 1px solid #e9ecef; }';
  invoiceHTML += '.items-table th { background: linear-gradient(135deg, #4285f4 0%, #34a853 100%); color: white; padding: 15px; text-align: left; font-weight: 600; }';
  invoiceHTML += '.items-table td { padding: 15px; border-bottom: 1px solid #e9ecef; color: #333; }';
  invoiceHTML += '.items-table tr:nth-child(even) { background: #f8f9fa; }';
  invoiceHTML += '.items-table tr:last-child td { border-bottom: none; }';
  invoiceHTML += '.total-section { background: #f8f9fa; padding: 25px; border-radius: 8px; border: 1px solid #e9ecef; margin-top: 30px; }';
  invoiceHTML += '.total-row { display: flex; justify-content: space-between; margin-bottom: 12px; padding: 8px 0; color: #555; }';
  invoiceHTML += '.total-final { border-top: 3px solid #4285f4; padding-top: 20px; margin-top: 15px; font-size: 1.4rem; font-weight: bold; color: #333; background: linear-gradient(135deg, rgba(66, 133, 244, 0.1) 0%, rgba(52, 168, 83, 0.1) 100%); padding: 20px; border-radius: 8px; }';
  invoiceHTML += '.footer { margin-top: 50px; text-align: center; color: #666; border-top: 1px solid #e9ecef; padding-top: 20px; }';
  invoiceHTML += '.payment-status { background: linear-gradient(135deg, rgba(52, 168, 83, 0.1) 0%, rgba(52, 168, 83, 0.15) 100%); color: #34a853; padding: 12px 24px; border-radius: 25px; display: inline-flex; align-items: center; gap: 8px; margin-bottom: 20px; border: 1px solid rgba(52, 168, 83, 0.3); font-weight: 600; }';
  invoiceHTML += '.item-name { font-weight: 600; color: #333; }';
  invoiceHTML += '.item-description { color: #666; font-size: 0.9rem; }';
  invoiceHTML += '.amount { font-weight: 600; color: #34a853; }';
  invoiceHTML += '@media print { body { background: white; } .invoice-container { box-shadow: none; border: 1px solid #ddd; } }';
  invoiceHTML += '</style>';
  invoiceHTML += '</head>';
  invoiceHTML += '<body>';
  invoiceHTML += '<div class="invoice-container">';
  invoiceHTML += '<div class="invoice-header">';
  invoiceHTML += '<div class="company-info">';
  invoiceHTML += '<div class="company-logo"><i class="fab fa-google"></i></div>';
  invoiceHTML += '<div class="company-details">';
  invoiceHTML += '<h1>Google Console</h1>';
  invoiceHTML += '<p>Secure Digital Marketplace</p>';
  invoiceHTML += '<p>Email: support@googleconsole.com</p>';
  invoiceHTML += '<p>https://console.google.com</p>';
  invoiceHTML += '</div>';
  invoiceHTML += '</div>';
  invoiceHTML += '<div class="invoice-title">';
  invoiceHTML += '<h2>INVOICE</h2>';
  invoiceHTML += '<p><strong>Invoice #:</strong> ' + orderInfo.orderNumber + '</p>';
  invoiceHTML += '<p><strong>Date:</strong> ' + orderInfo.orderDate + '</p>';
  invoiceHTML += '<div class="payment-status"><i class="fas fa-check-circle"></i> PAID</div>';
  invoiceHTML += '</div>';
  invoiceHTML += '</div>';
  invoiceHTML += '<div class="billing-section">';
  invoiceHTML += '<div class="billing-info">';
  invoiceHTML += '<h3>Bill To:</h3>';
  invoiceHTML += '<p><strong>' + userInfo.name + '</strong></p>';
  invoiceHTML += '<p>' + userInfo.email + '</p>';
  invoiceHTML += '<p>' + userInfo.phone + '</p>';
  invoiceHTML += '<p>' + userInfo.address + '</p>';
  invoiceHTML += '</div>';
  invoiceHTML += '<div class="billing-info">';
  invoiceHTML += '<h3>Payment Method:</h3>';
  invoiceHTML += '<p>Creadit Card SBI (**** **** **** 6832) </p>';
  invoiceHTML += '<p>Transaction ID: TXN' + 34567865456 + '</p>';
  invoiceHTML += '<p>Status: Completed</p>';
  invoiceHTML += '</div>';
  invoiceHTML += '</div>';
  invoiceHTML += '<table class="items-table">';
  invoiceHTML += '<thead>';
  invoiceHTML += '<tr>';
  invoiceHTML += '<th>Item</th>';
  invoiceHTML += '<th>Description</th>';
  invoiceHTML += '<th>Amount</th>';
  invoiceHTML += '</tr>';
  invoiceHTML += '</thead>';
  invoiceHTML += '<tbody>';
  
  for (var i = 0; i < orderInfo.items.length; i++) {
    var item = orderInfo.items[i];
    invoiceHTML += '<tr>';
    invoiceHTML += '<td><div class="item-name">' + item.name + '</div></td>';
    invoiceHTML += '<td>' + item.description + '</td>';
    invoiceHTML += '<td class="amount">₹ ' + item.price.toLocaleString() + '</td>';
    invoiceHTML += '</tr>';
  }
  
  invoiceHTML += '</tbody>';
  invoiceHTML += '</table>';
  invoiceHTML += '<div class="total-section">';
  invoiceHTML += '<div class="total-row">';
  invoiceHTML += '<span>Subtotal:</span>';
  invoiceHTML += '<span>₹ ' + orderInfo.subtotal.toLocaleString() + '</span>';
  invoiceHTML += '</div>';
  invoiceHTML += '<div class="total-row">';
  invoiceHTML += '<span>GST (18%):</span>';
  invoiceHTML += '<span>₹ ' + orderInfo.gst.toLocaleString() + '</span>';
  invoiceHTML += '</div>';
  invoiceHTML += '<div class="total-row">';
  invoiceHTML += '<span>Total Amount:</span>';
  invoiceHTML += '<span>₹ ' + orderInfo.totalAmount.toLocaleString() + '</span>';
  invoiceHTML += '</div>';
  invoiceHTML += '<div class="total-row">';
  invoiceHTML += '<span>Developer Discount:</span>';
  invoiceHTML += '<span>-₹ ' + orderInfo.developerDiscount.toLocaleString() + '</span>';
  invoiceHTML += '</div>';
  invoiceHTML += '<div class="total-row">';
  invoiceHTML += '<span>Other Discount:</span>';
  invoiceHTML += '<span>-₹ ' + orderInfo.otherDiscount.toLocaleString() + '</span>';
  invoiceHTML += '</div>';
  invoiceHTML += '<div class="total-row total-final">';
  invoiceHTML += '<span><i class="fas fa-rupee-sign"></i> Final Amount Paid:</span>';
  invoiceHTML += '<span>₹ ' + orderInfo.finalAmount.toLocaleString() + '</span>';
  invoiceHTML += '</div>';
  invoiceHTML += '</div>';
  invoiceHTML += '<div class="footer">';
  invoiceHTML += '<p><i class="fas fa-heart"></i> Thank you for choosing Google Console!</p>';
  invoiceHTML += '<p>This is a computer-generated invoice. No signature required.</p>';
  invoiceHTML += '<p>Copyright ' + new Date().getFullYear() + ' Google Console - All rights reserved</p>';
  invoiceHTML += '</div>';
  invoiceHTML += '</div>';
  invoiceHTML += '</body>';
  invoiceHTML += '</html>';
  
  
  newWindow.document.write(invoiceHTML);
  newWindow.document.close();

  var btn = document.getElementById('downloadInvoice');
  var originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-check"></i> Invoice Opened';
  btn.style.background = 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)';
  btn.style.color = 'white';

  setTimeout(function() {
    btn.innerHTML = originalText;
    btn.style.background = 'white';
    btn.style.color = '#4a5568';
  }, 3000);
}