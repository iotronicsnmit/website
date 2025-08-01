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
            this.initializeModal();
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
        card.setAttribute('data-event-id', event.id);
        card.style.cursor = 'pointer';

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
                <div class="event-actions">
                    <button class="btn-outline view-details-btn">View Details</button>
                    <a href="${event.registration.url}" class="${isPast ? 'btn-outline' : 'btn-primary'}">${event.registration.buttonText}</a>
                </div>
            </div>
        `;

        // Add click event listener for the entire card
        card.addEventListener('click', (e) => {
            // Don't trigger modal if clicking on buttons or links
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
                return;
            }
            this.showEventDetails(event);
        });

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

    showEventDetails(event) {
        const modal = document.getElementById('eventModal');
        
        // Populate modal with event data
        document.getElementById('modalTitle').textContent = event.title;
        document.getElementById('modalMonth').textContent = event.date.month;
        document.getElementById('modalDay').textContent = event.date.day;
        document.getElementById('modalYear').textContent = event.date.year;
        document.getElementById('modalTime').textContent = event.time;
        document.getElementById('modalLocation').textContent = event.location;
        document.getElementById('modalType').textContent = event.type;
        document.getElementById('modalDescription').textContent = event.description;
        
        // Handle capacity information
        const capacityElement = document.getElementById('modalCapacity');
        if (event.capacity) {
            if (event.status === 'past') {
                capacityElement.innerHTML = `
                    <h4>Attendance</h4>
                    <p>Attended: ${event.capacity.registered} ${event.capacity.unit || 'participants'}</p>
                `;
            } else {
                document.getElementById('modalAvailable').textContent = event.capacity.available;
                document.getElementById('modalTotal').textContent = event.capacity.total;
                const unit = event.capacity.unit || 'spots';
                capacityElement.querySelector('p').innerHTML = `Available ${unit}: <span id="modalAvailable">${event.capacity.available}</span>/<span id="modalTotal">${event.capacity.total}</span>`;
            }
        } else {
            capacityElement.style.display = 'none';
        }

        // Handle agenda (if available in event data)
        const agendaElement = document.getElementById('modalAgenda');
        if (event.agenda && event.agenda.length > 0) {
            const agendaList = document.getElementById('modalAgendaList');
            agendaList.innerHTML = event.agenda.map(item => `<li>${item}</li>`).join('');
            agendaElement.style.display = 'block';
        } else {
            // Default agenda based on event type
            const defaultAgendas = {
                'Workshop': [
                    'Welcome & Introduction',
                    'Hands-on Learning Session',
                    'Q&A and Discussion',
                    'Wrap-up & Next Steps'
                ],
                'Hackathon': [
                    'Registration & Team Formation',
                    'Problem Statement Reveal',
                    'Development Phase',
                    'Presentation & Judging'
                ],
                'Talk': [
                    'Speaker Introduction',
                    'Main Presentation',
                    'Interactive Q&A Session',
                    'Networking'
                ]
            };
            const agendaList = document.getElementById('modalAgendaList');
            const agenda = defaultAgendas[event.type] || ['Event details to be announced'];
            agendaList.innerHTML = agenda.map(item => `<li>${item}</li>`).join('');
        }

        // Handle prerequisites
        const prereqElement = document.getElementById('modalPrerequisites');
        const prereqText = document.getElementById('modalPrereqText');
        if (event.prerequisites) {
            prereqText.textContent = event.prerequisites;
        } else {
            // Default prerequisites based on tags
            if (event.tags.includes('Beginner Friendly')) {
                prereqText.textContent = 'No prior experience required';
            } else if (event.tags.includes('Advanced')) {
                prereqText.textContent = 'Prior experience in relevant technologies recommended';
            } else {
                prereqText.textContent = 'Basic technical knowledge helpful';
            }
        }

        // Handle organizers
        const organizersList = document.getElementById('modalOrganizersList');
        if (event.organizers && event.organizers.length > 0) {
            organizersList.innerHTML = event.organizers.map(org => `<span class="organizer">${org}</span>`).join('');
        } else {
            organizersList.innerHTML = '<span class="organizer">IoTronics Core Team</span>';
        }

        // Handle tags
        const tagsContainer = document.getElementById('modalTags');
        const tagsHTML = event.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        tagsContainer.innerHTML = tagsHTML;

        // Set registration button
        const registerBtn = document.getElementById('modalRegisterBtn');
        registerBtn.href = event.registration.url;
        registerBtn.textContent = event.registration.buttonText;
        registerBtn.className = event.status === 'past' ? 'btn-outline' : 'btn-primary';

        // Show modal
        modal.style.display = 'block';
    }

    closeModal() {
        const modal = document.getElementById('eventModal');
        modal.style.display = 'none';
    }

    initializeModal() {
        const modal = document.getElementById('eventModal');
        const closeBtn = modal.querySelector('.modal-close');
        const closeSecondaryBtn = modal.querySelector('.modal-close-btn');

        // Close modal when clicking X or Close button
        closeBtn.addEventListener('click', () => this.closeModal());
        closeSecondaryBtn.addEventListener('click', () => this.closeModal());

        // Close modal when clicking outside of it
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                this.closeModal();
            }
        });
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
