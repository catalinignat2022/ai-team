// App Creator Frontend JavaScript - Enhanced functionality
class AppCreator {
    constructor() {
        this.apiBaseUrl = window.location.origin;
        this.currentRequest = null;
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        // Auto-resize textarea
        const textarea = document.getElementById('appRequest');
        if (textarea) {
            textarea.addEventListener('input', () => {
                textarea.style.height = 'auto';
                textarea.style.height = textarea.scrollHeight + 'px';
            });
            
            // Auto-save to localStorage
            textarea.addEventListener('input', () => {
                localStorage.setItem('appRequest', textarea.value);
            });
            
            // Load saved content
            const saved = localStorage.getItem('appRequest');
            if (saved) {
                textarea.value = saved;
                textarea.style.height = textarea.scrollHeight + 'px';
            }
        }
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                this.createApp();
            }
        });
    }
    
    fillExample(element) {
        const textarea = document.getElementById('appRequest');
        textarea.value = element.textContent;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
        textarea.focus();
    }
    
    async createApp() {
        const request = document.getElementById('appRequest').value.trim();
        
        if (!request) {
            this.showAlert('Te rog descrie aplicația pe care vrei să o creez!', 'warning');
            return;
        }
        
        if (request.length < 20) {
            this.showAlert('Te rog să fii mai specific în descrierea aplicației (minim 20 caractere).', 'warning');
            return;
        }
        
        this.currentRequest = request;
        
        // Show loading state
        this.showLoading();
        this.disableForm();
        
        try {
            const response = await fetch(`${this.apiBaseUrl}/api/create-app`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    request: request,
                    timestamp: new Date().toISOString(),
                    client_info: {
                        user_agent: navigator.userAgent,
                        language: navigator.language,
                        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
                    }
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const result = await response.json();
            this.showResult(result);
            
            // Clear saved content on success
            if (result.success) {
                localStorage.removeItem('appRequest');
            }
            
        } catch (error) {
            console.error('App creation error:', error);
            this.showResult({
                success: false,
                message: 'Eroare la comunicarea cu serverul: ' + error.message,
                error_type: 'network_error'
            });
        } finally {
            this.hideLoading();
            this.enableForm();
        }
    }
    
    showLoading() {
        document.getElementById('loading').style.display = 'block';
        document.getElementById('result').style.display = 'none';
        
        // Animate progress steps
        this.animateProgress();
    }
    
    hideLoading() {
        document.getElementById('loading').style.display = 'none';
        
        // Reset progress steps
        const steps = document.querySelectorAll('.progress-step');
        steps.forEach(step => {
            step.classList.remove('active', 'completed');
        });
    }
    
    animateProgress() {
        const steps = ['step1', 'step2', 'step3', 'step4', 'step5', 'step6', 'step7'];
        let currentStep = 0;
        
        this.progressInterval = setInterval(() => {
            if (currentStep > 0) {
                const prevStep = document.getElementById(steps[currentStep - 1]);
                if (prevStep) {
                    prevStep.classList.remove('active');
                    prevStep.classList.add('completed');
                }
            }
            
            if (currentStep < steps.length) {
                const currentStepEl = document.getElementById(steps[currentStep]);
                if (currentStepEl) {
                    currentStepEl.classList.add('active');
                }
                currentStep++;
            } else {
                clearInterval(this.progressInterval);
            }
        }, Math.random() * 2000 + 1500); // Random delay between 1.5-3.5 seconds
    }
    
    disableForm() {
        document.querySelector('.create-btn').disabled = true;
        document.getElementById('appRequest').disabled = true;
    }
    
    enableForm() {
        document.querySelector('.create-btn').disabled = false;
        document.getElementById('appRequest').disabled = false;
        
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
        }
    }
    
    showResult(result) {
        const resultDiv = document.getElementById('result');
        const titleElement = document.getElementById('resultTitle');
        const messageElement = document.getElementById('resultMessage');
        const linksElement = document.getElementById('resultLinks');
        
        resultDiv.style.display = 'block';
        
        if (result.success) {
            resultDiv.className = 'result success';
            titleElement.textContent = '🎉 Aplicația a fost creată cu succes!';
            messageElement.innerHTML = this.formatSuccessMessage(result);
            linksElement.innerHTML = this.generateResultLinks(result);
            
            // Show celebration animation
            this.showCelebration();
            
        } else {
            resultDiv.className = 'result error';
            titleElement.textContent = '❌ Eroare la crearea aplicației';
            messageElement.innerHTML = this.formatErrorMessage(result);
            linksElement.innerHTML = this.generateErrorActions(result);
        }
        
        // Scroll to result
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    formatSuccessMessage(result) {
        let message = result.message || 'Aplicația ta a fost generată cu succes!';
        
        if (result.details) {
            message += '<br><br><strong>Detalii:</strong><br>';
            if (result.details.technology_stack) {
                message += `• Stack tehnologic: ${result.details.technology_stack}<br>`;
            }
            if (result.details.features) {
                message += `• Funcționalități: ${result.details.features.join(', ')}<br>`;
            }
            if (result.details.deployment_time) {
                message += `• Timp de deployment: ${result.details.deployment_time}<br>`;
            }
        }
        
        return message;
    }
    
    formatErrorMessage(result) {
        let message = result.message || 'A apărut o eroare necunoscută.';
        
        if (result.error_type) {
            message += `<br><br><strong>Tip eroare:</strong> ${result.error_type}`;
        }
        
        if (result.suggestions) {
            message += '<br><br><strong>Sugestii:</strong><br>';
            result.suggestions.forEach(suggestion => {
                message += `• ${suggestion}<br>`;
            });
        }
        
        return message;
    }
    
    generateResultLinks(result) {
        let links = '';
        
        if (result.repository_url) {
            links += `<a href="${result.repository_url}" target="_blank" rel="noopener">📱 Vezi Repository</a>`;
        }
        if (result.app_url) {
            links += `<a href="${result.app_url}" target="_blank" rel="noopener">🌐 Accesează Aplicația</a>`;
        }
        if (result.admin_url) {
            links += `<a href="${result.admin_url}" target="_blank" rel="noopener">⚙️ Panel Admin</a>`;
        }
        if (result.documentation_url) {
            links += `<a href="${result.documentation_url}" target="_blank" rel="noopener">📚 Documentație</a>`;
        }
        
        return links;
    }
    
    generateErrorActions(result) {
        let actions = '';
        
        if (result.error_type === 'network_error') {
            actions += '<a href="#" onclick="location.reload()">🔄 Reîncearcă</a>';
        }
        
        actions += '<a href="#" onclick="appCreator.contactSupport()">📞 Contact Support</a>';
        
        return actions;
    }
    
    showCelebration() {
        // Create confetti effect
        const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                this.createConfetti(colors[Math.floor(Math.random() * colors.length)]);
            }, i * 50);
        }
    }
    
    createConfetti(color) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${color};
            top: -10px;
            left: ${Math.random() * 100}vw;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: confetti-fall 3s linear forwards;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 3000);
    }
    
    showAlert(message, type = 'info') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            max-width: 400px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            background: ${type === 'warning' ? '#ff9800' : type === 'error' ? '#f44336' : '#2196f3'};
            animation: slideIn 0.3s ease-out;
        `;
        alertDiv.textContent = message;
        
        document.body.appendChild(alertDiv);
        
        setTimeout(() => {
            alertDiv.style.animation = 'slideOut 0.3s ease-in forwards';
            setTimeout(() => alertDiv.remove(), 300);
        }, 4000);
    }
    
    contactSupport() {
        const subject = 'App Creator - Cerere Support';
        const body = `Salut,

Am încercat să creez o aplicație cu următoarea descriere:
"${this.currentRequest || 'N/A'}"

Dar am întâmpinat o problemă. Te rog să mă ajuți.

Mulțumesc!`;
        
        const mailtoLink = `mailto:support@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(mailtoLink);
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes confetti-fall {
        0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize the app creator
const appCreator = new AppCreator();

// Global functions for onclick handlers
function fillExample(element) {
    appCreator.fillExample(element);
}

function createApp() {
    appCreator.createApp();
}
