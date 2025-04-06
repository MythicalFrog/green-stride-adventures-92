
document.addEventListener('DOMContentLoaded', function() {
    // Login form handling
    const loginForm = document.getElementById('loginForm');
    const loginBtn = document.getElementById('loginBtn');
    const loginLoading = document.getElementById('loginLoading');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            if (loginBtn) loginBtn.style.display = 'none';
            if (loginLoading) loginLoading.style.display = 'block';
            
            // Get form data
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Mock API call - would connect to Java/Python backend in real implementation
            setTimeout(function() {
                console.log('Login attempt:', { email });
                
                // Simulate successful login
                window.location.href = 'index.html';
                
                // In case of error, would show:
                // loginBtn.style.display = 'block';
                // loginLoading.style.display = 'none';
                // Show error message
            }, 1500);
        });
    }
    
    // Signup form handling
    const signupForm = document.getElementById('signupForm');
    const signupBtn = document.getElementById('signupBtn');
    const signupLoading = document.getElementById('signupLoading');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            if (signupBtn) signupBtn.style.display = 'none';
            if (signupLoading) signupLoading.style.display = 'block';
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Validate password
            if (password.length < 8) {
                alert('Password must be at least 8 characters long');
                signupBtn.style.display = 'block';
                signupLoading.style.display = 'none';
                return;
            }
            
            // Mock API call - would connect to Java/Python backend in real implementation
            setTimeout(function() {
                console.log('Signup attempt:', { name, email });
                
                // Simulate successful signup
                window.location.href = 'index.html';
                
                // In case of error, would show:
                // signupBtn.style.display = 'block';
                // signupLoading.style.display = 'none';
                // Show error message
            }, 1500);
        });
    }
});
