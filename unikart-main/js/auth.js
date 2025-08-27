// Authentication functionality
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.isSignupMode = false;
        this.isDarkMode = true;
        this.isOnboardingMode = false;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadTheme();
        this.checkAuthState();
    }

    bindEvents() {
        // Toggle between login and signup
        const toggleBtn = document.getElementById('toggleAuthBtn');
        const switchToLoginBtn = document.getElementById('switchToLogin');

        toggleBtn?.addEventListener('click', () => this.toggleAuthMode());
        switchToLoginBtn?.addEventListener('click', () => this.switchToLogin());

        // Form submissions
        const loginForm = document.getElementById('loginFormElement');
        const signupForm = document.getElementById('signupFormElement');

        loginForm?.addEventListener('submit', (e) => this.handleLogin(e));
        signupForm?.addEventListener('submit', (e) => this.handleSignup(e));

        // OAuth buttons
        const oauthButtons = document.querySelectorAll('.oauth-btn');
        oauthButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleOAuthLogin(e));
        });

        // Dark mode toggle
        const darkModeBtn = document.getElementById('darkModeBtn');
        darkModeBtn?.addEventListener('click', () => this.toggleDarkMode());
    }

    toggleAuthMode() {
        this.isSignupMode = !this.isSignupMode;
        this.updateUI();
    }

    switchToLogin() {
        this.isSignupMode = false;
        this.updateUI();
    }

    updateUI() {
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        const toggleBtn = document.getElementById('toggleAuthBtn');

        if (this.isSignupMode) {
            loginForm.style.display = 'none';
            signupForm.style.display = 'flex';
            toggleBtn.textContent = 'Log In';
        } else {
            loginForm.style.display = 'flex';
            signupForm.style.display = 'none';
            toggleBtn.textContent = 'Sign Up';
        }
    }

    handleLogin(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const loginData = {
            email: formData.get('email'),
            password: formData.get('password')
        };

        // Simulate login success
        const username = loginData.email.split('@')[0] || 'User';
        this.onLoginSuccess({ username });
    }

    handleSignup(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const signupData = {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
            dateOfBirth: formData.get('dateOfBirth')
        };

        // Validate passwords match
        if (signupData.password !== signupData.confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        // Simulate signup success
        this.onSignupComplete({
            name: signupData.username,
            email: signupData.email,
            dateOfBirth: signupData.dateOfBirth
        });
    }

    handleOAuthLogin(e) {
        const provider = e.currentTarget.dataset.provider;
        const action = e.currentTarget.dataset.action || 'login';
        
        console.log(`${action} with ${provider}`);
        
        // Simulate OAuth success
        if (action === 'signup') {
            this.onSignupComplete({ 
                name: `${provider}User`, 
                email: `${provider.toLowerCase()}@example.com` 
            });
        } else {
            this.onLoginSuccess({ username: `${provider}User` });
        }
    }

    onLoginSuccess(user) {
        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Navigate to home page or show authenticated state
        window.location.href = '../pages/home.html';
    }

    onSignupComplete(user) {
        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Switch to light mode for onboarding
        this.isDarkMode = false;
        this.applyTheme();
        
        // Hide navbar buttons during onboarding
        this.isOnboardingMode = true;
        this.updateNavbarVisibility();
        
        // Navigate to onboarding
        window.location.href = '../pages/onboarding.html';
    }

    toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
        this.applyTheme();
        this.saveTheme();
    }

    applyTheme() {
        const container = document.getElementById('authContainer');
        const darkModeBtn = document.getElementById('darkModeBtn');
        
        if (this.isDarkMode) {
            container.classList.add('dark');
            darkModeBtn.innerHTML = '🌞 Light Mode';
        } else {
            container.classList.remove('dark');
            darkModeBtn.innerHTML = '🌙 Dark Mode';
        }
    }

    updateNavbarVisibility() {
        const navbarButtons = document.getElementById('navbarButtons');
        if (this.isOnboardingMode) {
            navbarButtons.style.display = 'none';
        } else {
            navbarButtons.style.display = 'flex';
        }
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('darkMode');
        if (savedTheme !== null) {
            this.isDarkMode = JSON.parse(savedTheme);
        }
        this.applyTheme();
    }

    saveTheme() {
        localStorage.setItem('darkMode', JSON.stringify(this.isDarkMode));
    }

    checkAuthState() {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            // Could redirect to home page if already logged in
        }
    }
}

// Initialize auth manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.authManager = new AuthManager();
});
