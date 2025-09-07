// Portfolio data
const portfolioData = {
  "portfolio_projects": [
    {
      "id": 1,
      "title": "Digital Marketing Agency Brand Identity",
      "category": "Digital Marketing",
      "type": "Corporate Branding",
      "description": "Contemporary brand identity design for a digital marketing agency featuring flowing gradient elements, modern typography, and professional contact integration. The design emphasizes innovation and digital expertise.",
      "colors": ["#8B5CF6", "#EC4899", "#3B82F6"],
      "tools": ["Adobe Illustrator", "Adobe Photoshop"],
      "dimensions": "1131 x 1600px",
      "target_audience": "Business owners, entrepreneurs, companies seeking digital marketing services",
      "key_features": ["Gradient backgrounds", "Abstract flowing elements", "Professional typography", "Contact information integration"],
      "style_keywords": ["Modern", "Tech-focused", "Professional", "Abstract", "Gradient"]
    },
    {
      "id": 2,
      "title": "Khushee Diwali Festival Greeting",
      "category": "Event Design",
      "type": "Festival Marketing",
      "description": "Vibrant Diwali celebration design featuring traditional diya lamp with decorative patterns. The warm color palette and cultural elements create an authentic festive atmosphere perfect for seasonal marketing.",
      "colors": ["#FF6B35", "#F7931E", "#FFD700"],
      "tools": ["Adobe Illustrator", "Adobe Photoshop"],
      "dimensions": "1080 x 1080px",
      "target_audience": "Indian community, festival celebrants, cultural organizations",
      "key_features": ["Traditional diya lamp", "Decorative patterns", "Cultural authenticity", "Warm color palette"],
      "style_keywords": ["Traditional", "Festive", "Cultural", "Warm", "Celebratory"]
    },
    {
      "id": 3,
      "title": "Borcelle Laundry Service Advertisement",
      "category": "Service Marketing",
      "type": "Business Advertising",
      "description": "Professional service advertisement showcasing modern laundry facilities with clear service offerings. The clean design emphasizes reliability, professionalism, and comprehensive service options.",
      "colors": ["#2563EB", "#FFFFFF", "#F8FAFC"],
      "tools": ["Adobe Photoshop", "Adobe InDesign"],
      "dimensions": "1080 x 1350px",
      "target_audience": "Local residents, busy professionals, families needing laundry services",
      "key_features": ["Service photography", "Clear service listings", "Professional branding", "Contact integration"],
      "style_keywords": ["Clean", "Professional", "Service-oriented", "Trustworthy", "Modern"]
    },
    {
      "id": 4,
      "title": "Gourmet Burger Food Advertisement",
      "category": "Food & Beverage",
      "type": "Restaurant Marketing",
      "description": "Eye-catching food advertisement featuring premium burger photography with bold typography and strategic pricing display. The design creates appetite appeal and urgency for immediate action.",
      "colors": ["#FED500", "#000000", "#DC2626"],
      "tools": ["Adobe Photoshop", "Food Photography"],
      "dimensions": "1131 x 1600px",
      "target_audience": "Food lovers, restaurant customers, delivery app users",
      "key_features": ["High-quality food photography", "Bold typography", "Price highlighting", "Call-to-action button"],
      "style_keywords": ["Bold", "Appetizing", "Commercial", "Eye-catching", "Direct"]
    }
  ],
  "categories": ["All", "Digital Marketing", "Event Design", "Service Marketing", "Food & Beverage"]
};

// DOM elements
let portfolioGrid;
let filterButtons;
let modal;
let modalBody;
let modalOverlay;
let modalClose;
let navToggle;
let navList;

// State
let currentFilter = 'All';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    renderPortfolio();
    setupEventListeners();
});

// Initialize DOM elements
function initializeElements() {
    portfolioGrid = document.getElementById('portfolioGrid');
    filterButtons = document.querySelectorAll('.filter-btn');
    modal = document.getElementById('projectModal');
    modalBody = document.getElementById('modalBody');
    modalOverlay = document.getElementById('modalOverlay');
    modalClose = document.getElementById('modalClose');
    navToggle = document.querySelector('.nav__toggle');
    navList = document.querySelector('.nav__list');
}

// Render portfolio projects
function renderPortfolio(filterCategory = 'All') {
    if (!portfolioGrid) return;

    const filteredProjects = filterCategory === 'All' 
        ? portfolioData.portfolio_projects 
        : portfolioData.portfolio_projects.filter(project => project.category === filterCategory);

    portfolioGrid.innerHTML = '';

    filteredProjects.forEach(project => {
        const projectCard = createProjectCard(project);
        portfolioGrid.appendChild(projectCard);
    });
}

// Create project card element
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-project-id', project.id);

    // Create color swatches
    const colorSwatches = project.colors.map(color => 
        `<div class="color-swatch" style="background-color: ${color}"></div>`
    ).join('');

    card.innerHTML = `
        <div class="project-card__image">
            <span>${project.title}</span>
        </div>
        <div class="project-card__content">
            <div class="project-card__category">${project.category}</div>
            <h3 class="project-card__title">${project.title}</h3>
            <p class="project-card__description">${project.description.substring(0, 120)}...</p>
            <div class="project-card__colors">
                ${colorSwatches}
            </div>
            <div class="project-card__dimensions">${project.dimensions}</div>
        </div>
    `;

    // Add click listener to open modal
    card.addEventListener('click', () => openProjectModal(project));

    return card;
}

// Open project modal
function openProjectModal(project) {
    if (!modal || !modalBody) return;

    // Create color swatches for modal
    const modalColorSwatches = project.colors.map(color => 
        `<div class="modal__color-swatch" style="background-color: ${color}" title="${color}"></div>`
    ).join('');

    // Create tools list
    const toolsList = project.tools.map(tool => `<li>${tool}</li>`).join('');

    // Create key features list
    const featuresList = project.key_features.map(feature => `<li>${feature}</li>`).join('');

    // Create style keywords
    const styleKeywords = project.style_keywords.join(', ');

    modalBody.innerHTML = `
        <div class="modal__image">
            <span>${project.title} - ${project.type}</span>
        </div>
        <h2 class="modal__title">${project.title}</h2>
        <div class="modal__category">${project.category} • ${project.type}</div>
        <p class="modal__description">${project.description}</p>
        
        <div class="modal__details">
            <div class="modal__detail">
                <h4>Dimensions</h4>
                <p>${project.dimensions}</p>
            </div>
            <div class="modal__detail">
                <h4>Tools Used</h4>
                <ul>${toolsList}</ul>
            </div>
            <div class="modal__detail">
                <h4>Target Audience</h4>
                <p>${project.target_audience}</p>
            </div>
            <div class="modal__detail">
                <h4>Style Keywords</h4>
                <p>${styleKeywords}</p>
            </div>
            <div class="modal__detail">
                <h4>Key Features</h4>
                <ul>${featuresList}</ul>
            </div>
            <div class="modal__detail">
                <h4>Color Palette</h4>
                <div class="modal__colors">
                    ${modalColorSwatches}
                </div>
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Close project modal
function closeProjectModal() {
    if (!modal) return;
    
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Setup event listeners
function setupEventListeners() {
    // Filter button listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update current filter and render
            currentFilter = category;
            renderPortfolio(category);
        });
    });

    // Modal close listeners
    if (modalClose) {
        modalClose.addEventListener('click', closeProjectModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeProjectModal);
    }

    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
            closeProjectModal();
        }
    });

    // Navigation toggle for mobile
    if (navToggle && navList) {
        navToggle.addEventListener('click', () => {
            navList.style.display = navList.style.display === 'flex' ? 'none' : 'flex';
        });
    }

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

    // Close mobile menu when clicking on nav links
    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            if (navList && window.innerWidth <= 768) {
                navList.style.display = 'none';
            }
        });
    });

    // Handle window resize for mobile menu
    window.addEventListener('resize', () => {
        if (navList && window.innerWidth > 768) {
            navList.style.display = 'flex';
        } else if (navList && window.innerWidth <= 768) {
            navList.style.display = 'none';
        }
    });
}

// Utility function to debounce events
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

// Add loading animation utility
function addLoadingAnimation(element) {
    element.classList.add('loading');
    setTimeout(() => {
        element.classList.remove('loading');
    }, 1000);
}

// Initialize loading animations for portfolio cards
function initializeCardAnimations() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        }, index * 100);
    });
}

// Enhanced portfolio rendering with animations
function renderPortfolioWithAnimations(filterCategory = 'All') {
    renderPortfolio(filterCategory);
    setTimeout(() => {
        initializeCardAnimations();
    }, 50);
}

// Update the filter button event listeners to use animations
function updateFilterListeners() {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update current filter and render with animations
            currentFilter = category;
            renderPortfolioWithAnimations(category);
        });
    });
}

// Export functions for potential future use
window.DesignPortfolio = {
    renderPortfolio,
    openProjectModal,
    closeProjectModal,
    portfolioData
};