// Events Management System
class EventsManager {
    constructor() {
        this.events = [];
        this.filteredEvents = [];
        this.currentFilter = 'all';
    }

    async loadEvents() {
        try {
            const response = await fetch('data/events.json');
            const data = await response.json();
            this.events = data.events;
            this.filteredEvents = [...this.events];
            this.renderEvents();
            this.initializeFilters();
            console.log('Events loaded successfully:', this.events.length);
        } catch (error) {
            console.error('Error loading events:', error);
            this.showErrorMessage();
        }
    }

    renderEvents() {
        const upcomingContainer = document.getElementById('upcoming-events-container');
        const pastContainer = document.getElementById('past-events-container');
        
        if (!upcomingContainer || !pastContainer) {
            console.error('Event containers not found');
            return;
        }

        // Clear existing content
        upcomingContainer.innerHTML = '';
        pastContainer.innerHTML = '';

        // Separate upcoming and past events
        const upcomingEvents = this.filteredEvents.filter(event => event.status === 'upcoming');
        const pastEvents = this.filteredEvents.filter(event => event.status === 'past');

        // Render upcoming events
        upcomingEvents.forEach(event => {
            upcomingContainer.appendChild(this.createEventCard(event));
        });

        // Render past events
        pastEvents.forEach(event => {
            pastContainer.appendChild(this.createEventCard(event, true));
        });

        // Show/hide section titles
        this.toggleSectionVisibility('upcoming-section', upcomingEvents.length > 0);
        this.toggleSectionVisibility('past-section', pastEvents.length > 0);
    }

    createEventCard(event, isPast = false) {
        const card = document.createElement('div');
        card.className = `event-card-detailed ${isPast ? 'past-event' : ''}`;
        card.setAttribute('data-category', `${event.status} ${event.type.toLowerCase()}`);

        // Calculate capacity display
        let capacityDisplay = '';
        if (event.capacity) {
            if (isPast) {
                capacityDisplay = `<div class="event-attendance">Attended by: ${event.capacity.registered} ${event.capacity.unit || 'students'}</div>`;
            } else {
                const unit = event.capacity.unit || 'spots';
                capacityDisplay = `<div class="event-capacity">Available ${unit}: ${event.capacity.available}/${event.capacity.total}</div>`;
            }
        }

        // Create tags HTML
        const tagsHTML = event.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

        card.innerHTML = `
            <div class="event-date-card">
                <div class="event-month">${event.date.month}</div>
                <div class="event-day">${event.date.day}</div>
                <div class="event-year">${event.date.year}</div>
            </div>
            <div class="event-content-card">
                <div class="event-type">${event.type}</div>
                <h3>${event.title}</h3>
                <p class="event-description">${event.description}</p>
                <div class="event-details">
                    <div class="event-time">${event.time}</div>
                    <div class="event-location">${event.location}</div>
                    ${capacityDisplay}
                </div>
                <div class="event-tags">
                    ${tagsHTML}
                </div>
                <a href="${event.registration.url}" class="${isPast ? 'btn-outline' : 'btn-primary'}">${event.registration.buttonText}</a>
            </div>
        `;

        return card;
    }

    toggleSectionVisibility(sectionId, show) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.style.display = show ? 'block' : 'none';
        }
    }

    initializeFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                
                // Apply filter
                const filter = e.target.getAttribute('data-filter');
                this.applyFilter(filter);
            });
        });
    }

    applyFilter(filter) {
        this.currentFilter = filter;
        
        if (filter === 'all') {
            this.filteredEvents = [...this.events];
        } else {
            this.filteredEvents = this.events.filter(event => {
                const matchesStatus = filter === event.status;
                const matchesType = filter === event.type.toLowerCase();
                return matchesStatus || matchesType;
            });
        }
        
        this.renderEvents();
    }

    showErrorMessage() {
        const container = document.querySelector('.events-detailed .container');
        if (container) {
            container.innerHTML = `
                <div class="error-message">
                    <h3>Unable to load events</h3>
                    <p>Please check your connection and try again.</p>
                </div>
            `;
        }
    }
}

// Initialize events when page loads
document.addEventListener('DOMContentLoaded', () => {
    const eventsManager = new EventsManager();
    eventsManager.loadEvents();
});
