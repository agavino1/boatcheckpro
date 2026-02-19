/**
 * BoatCheckPro - Landing Page JavaScript
 * Handles form submissions and user interactions
 */

// Configuration
const API_CONFIG = {
    // In production, update this to your backend API URL
    apiUrl: process.env.REACT_APP_API_URL || 'https://api.boatcheckpro.es',
};

/**
 * Initialize app when DOM is ready
 */
document.addEventListener('DOMContentLoaded', function() {
    setupFormHandlers();
    setupSmoothScroll();
});

/**
 * Setup form submission handler
 */
function setupFormHandlers() {
    const form = document.getElementById('inspection-form');
    
    if (!form) {
        console.warn('Inspection form not found');
        return;
    }
    
    form.addEventListener('submit', handleFormSubmit);
}

/**
 * Handle form submission
 * @param {Event} e - Form submit event
 */
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    try {
        // Disable button during submission
        submitBtn.disabled = true;
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        
        // Validate form data
        if (!validateFormData(data)) {
            throw new Error('Por favor, completa todos los campos requeridos.');
        }
        
        // In development: Log data to console
        console.log('Form submitted with data:', data);
        
        // In production: Send to backend API
        // const response = await fetch(`${API_CONFIG.apiUrl}/api/inspections`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data),
        // });
        
        // if (!response.ok) {
        //     throw new Error('Error al enviar la solicitud. Intenta de nuevo.');
        // }
        
        // Success message
        showSuccessMessage(form);
        form.reset();
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        
    } catch (error) {
        console.error('Form submission error:', error);
        showErrorMessage(form, error.message);
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
}

/**
 * Validate form data
 * @param {Object} data - Form data object
 * @returns {boolean} - True if valid
 */
function validateFormData(data) {
    // Check required fields
    const required = ['name', 'email', 'phone', 'boat-type', 'length', 'location'];
    
    for (const field of required) {
        if (!data[field] || data[field].trim() === '') {
            return false;
        }
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return false;
    }
    
    // Validate phone format (basic)
    const phoneRegex = /^[\d\s\-\+]+$/;
    if (!phoneRegex.test(data.phone)) {
        return false;
    }
    
    return true;
}

/**
 * Show success message after form submission
 * @param {HTMLElement} form - Form element
 */
function showSuccessMessage(form) {
    const message = document.createElement('div');
    message.className = 'success-message';
    message.innerHTML = `
        <div class="success-content">
            <h3>✅ ¡Solicitud Recibida!</h3>
            <p>Nos pondremos en contacto contigo en las próximas 24 horas para confirmar los detalles de tu inspección.</p>
            <p style="font-size: 0.9rem; color: #666; margin-top: 10px;">Revisa tu email para más detalles.</p>
        </div>
    `;
    
    form.parentNode.insertBefore(message, form);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        message.remove();
    }, 5000);
}

/**
 * Show error message
 * @param {HTMLElement} form - Form element
 * @param {string} errorText - Error message text
 */
function showErrorMessage(form, errorText) {
    const message = document.createElement('div');
    message.className = 'error-message';
    message.innerHTML = `
        <div class="error-content">
            <h3>❌ Error al enviar</h3>
            <p>${errorText}</p>
            <p style="font-size: 0.9rem; color: #666; margin-top: 10px;">Intenta de nuevo o contacta a info@boatcheckpro.es</p>
        </div>
    `;
    
    form.parentNode.insertBefore(message, form);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        message.remove();
    }, 5000);
}

/**
 * Setup smooth scroll for navigation links
 */
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Utility: Log page view (for analytics)
 * @param {string} pageName - Page name
 */
function logPageView(pageName = 'landing') {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_path: '/',
            page_title: 'BoatCheckPro Landing',
        });
    }
}

/**
 * Utility: Track CTA clicks (for analytics)
 */
function trackCTAClick() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'cta_click', {
            event_label: 'inspection_form',
        });
    }
}

// Export for testing (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        handleFormSubmit,
        validateFormData,
        setupFormHandlers,
    };
}
