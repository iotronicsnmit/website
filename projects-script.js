// Projects Page Specific JavaScript

// Enhanced projects data with more details for the projects page
let projectsDetailData = null;

// Load projects from JSON for projects page
async function loadProjectsDetailed() {
    try {
        const response = await fetch('data/projects.json');
        if (!response.ok) {
            throw new Error('Failed to load projects data');
        }
        const data = await response.json();
        
        // Enhance projects with additional details for the projects page
        projectsDetailData = {
            projects: data.projects.map(project => ({
                ...project,
                features: getProjectFeatures(project.id),
                techStack: getProjectTechStack(project.category),
                detailedDescription: getDetailedDescription(project.id)
            }))
        };
        
        renderAllProjects();
        setupProjectFilters();
        console.log('Detailed projects loaded successfully');
    } catch (error) {
        console.error('Error loading projects:', error);
        loadFallbackProjectsDetailed();
    }
}

// Get project features based on project ID
function getProjectFeatures(projectId) {
    const featuresMap = {
        'smart-campus': [
            'Real-time environmental monitoring',
            'Energy consumption tracking',
            'Automated lighting and HVAC control',
            'Mobile dashboard for facility management'
        ],
        'ai-assistant': [
            'Personalized learning paths',
            'Natural language processing',
            'Progress tracking and analytics',
            'Multi-modal content support'
        ],
        'energy-monitor': [
            'Smart meter integration',
            'Predictive energy optimization',
            'Carbon footprint calculation',
            'Automated energy saving recommendations'
        ],
        'smart-parking': [
            'Real-time space detection',
            'Mobile app integration',
            'Payment gateway integration',
            'Analytics dashboard'
        ],
        'weather-station': [
            'Multi-sensor data collection',
            'Weather prediction algorithms',
            'Alert system integration',
            'Historical data analysis'
        ]
    };
    return featuresMap[projectId] || ['Coming soon...'];
}

// Get tech stack based on category
function getProjectTechStack(category) {
    const techStackMap = {
        'IoT Systems': ['IoT', 'Arduino', 'WiFi', 'Sensors'],
        'AI/ML': ['AI/ML', 'Python', 'TensorFlow', 'Neural Networks'],
        'Sustainability': ['Sustainability', 'Sensors', 'Analytics', 'Dashboard'],
        'Environmental': ['Weather', 'Sensors', 'Prediction', 'Alerts'],
        'Robotics': ['Robotics', 'Computer Vision', 'ROS', 'Navigation']
    };
    return techStackMap[category] || ['Technology', 'Innovation'];
}

// Get detailed description
function getDetailedDescription(projectId) {
    const descriptionsMap = {
        'smart-campus': 'A comprehensive IoT-enabled campus monitoring system with real-time data analytics, environmental sensing, and automated building management capabilities.',
        'ai-assistant': 'A machine learning powered educational companion that provides personalized learning experiences and adaptive content delivery for students.',
        'energy-monitor': 'Real-time energy consumption tracking and optimization system that helps reduce carbon footprint through intelligent monitoring and automated controls.',
        'smart-parking': 'Automated parking management system with real-time space detection, mobile app integration, and intelligent routing.',
        'weather-station': 'Comprehensive weather monitoring system with predictive analytics, environmental sensors, and automated alert systems.'
    };
    return descriptionsMap[projectId] || 'Innovative technology solution addressing real-world challenges.';
}

// Render all projects on projects page
function renderAllProjects() {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer || !projectsDetailData) return;

    projectsContainer.innerHTML = projectsDetailData.projects.map(project => `
        <div class="project-card-detailed" data-category="${project.category.toLowerCase().replace(/\s+/g, '-').replace('/', '-')}">
            <div class="project-image-detailed">
                <div class="project-tech-stack">
                    ${project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
            <div class="project-content-detailed">
                <h3>${project.title}</h3>
                <p class="project-description">
                    ${project.detailedDescription}
                </p>
                <div class="project-features">
                    <ul>
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                <div class="project-status">
                    <span class="status-badge ${project.status}">${getStatusLabel(project.status)}</span>
                </div>
                <a href="${project.detailPage}" class="btn-outline">View Details</a>
            </div>
        </div>
    `).join('');
}

// Setup project filters
function setupProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card-detailed');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                } else {
                    const cardCategory = card.getAttribute('data-category');
                    if (cardCategory.includes(filterValue)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
}

// Get status label (same as in main script.js)
function getStatusLabel(status) {
    const statusLabels = {
        'active': 'Active Development',
        'development': 'In Development',
        'planning': 'Planning Phase',
        'completed': 'Completed',
        'on-hold': 'On Hold',
        'research': 'Research Phase'
    };
    return statusLabels[status] || status;
}

// Fallback projects data for projects page
function loadFallbackProjectsDetailed() {
    projectsDetailData = {
        projects: [
            {
                id: "smart-campus",
                title: "Smart Campus Network",
                description: "IoT-enabled campus monitoring system with real-time data analytics.",
                placeholder: "Smart Campus",
                status: "active",
                category: "IoT Systems",
                featured: true,
                detailPage: "project-smart-campus.html",
                features: getProjectFeatures('smart-campus'),
                techStack: getProjectTechStack('IoT Systems'),
                detailedDescription: getDetailedDescription('smart-campus')
            },
            {
                id: "ai-assistant",
                title: "AI Learning Assistant",
                description: "Machine learning powered educational companion for students.",
                placeholder: "AI Assistant",
                status: "development",
                category: "AI/ML",
                featured: true,
                detailPage: "project-ai-assistant.html",
                features: getProjectFeatures('ai-assistant'),
                techStack: getProjectTechStack('AI/ML'),
                detailedDescription: getDetailedDescription('ai-assistant')
            },
            {
                id: "energy-monitor",
                title: "Sustainable Energy Monitor",
                description: "Real-time energy consumption tracking and optimization system.",
                placeholder: "Green Tech",
                status: "planning",
                category: "Sustainability",
                featured: true,
                detailPage: "project-energy-monitor.html",
                features: getProjectFeatures('energy-monitor'),
                techStack: getProjectTechStack('Sustainability'),
                detailedDescription: getDetailedDescription('energy-monitor')
            }
        ]
    };
    renderAllProjects();
    setupProjectFilters();
}

// Initialize projects page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadProjectsDetailed();
});
