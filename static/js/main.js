
// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-mode');
    }
    
    // Theme toggle button
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
            localStorage.setItem('theme', currentTheme);
        });
    }
    
    // Check for active page and highlight nav
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        if (currentPath.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        } else if (currentPath === '/' && link.getAttribute('href') === 'index.html') {
            link.classList.add('active');
        }
    });
    
    // Mock journey data
    const mockJourneyActive = false; // Set to true to show active journey
    
    if (mockJourneyActive) {
        const mainContent = document.getElementById('main-content');
        const journeyContent = document.getElementById('journey-content');
        
        if (mainContent && journeyContent) {
            mainContent.style.display = 'none';
            journeyContent.style.display = 'block';
            
            journeyContent.innerHTML = `
                <h2 class="journey-title">Journey in Progress</h2>
                <p class="journey-subtitle">Walking journey active...</p>
                <div class="journey-card">
                    <p>
                        Keep going! You're making a positive impact on the environment.
                    </p>
                </div>
            `;
        }
    }
});
