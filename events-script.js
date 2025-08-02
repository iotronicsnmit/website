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
            if (e.target.tagName === 'A' || e.target.classList.contains('btn-primary') || e.target.classList.contains('btn-outline')) {
                return;
            }
            this.showEventDetails(event);
        });

        // Add specific click event for the View Details button
        const viewDetailsBtn = card.querySelector('.view-details-btn');
        if (viewDetailsBtn) {
            viewDetailsBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showEventDetails(event);
            });
        }

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

        // Set up calendar button
        const calendarBtn = document.getElementById('modalCalendarBtn');
        if (event.status === 'upcoming') {
            calendarBtn.style.display = 'inline-block';
            calendarBtn.onclick = () => this.addToCalendar(event);
        } else {
            calendarBtn.style.display = 'none';
        }

        // Show modal
        modal.style.display = 'block';
    }

    addToCalendar(event) {
        // Create calendar dropdown or directly add to Google Calendar
        const startDate = this.parseEventDate(event.date, event.time);
        const endDate = this.calculateEndDate(startDate, event.time);
        
        // Format dates for calendar URL
        const startDateStr = startDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        const endDateStr = endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        
        // Create Google Calendar URL
        const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDateStr}/${endDateStr}&details=${encodeURIComponent(event.description + '\n\nLocation: ' + event.location + '\n\nOrganized by: ' + (event.organizers ? event.organizers.join(', ') : 'IoTronics Club'))}&location=${encodeURIComponent(event.location)}`;
        
        // Show calendar options modal
        this.showCalendarOptions(event, googleCalendarUrl, startDate, endDate);
    }

    parseEventDate(date, time) {
        // Parse the event date and time
        const year = parseInt(date.year);
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = monthNames.indexOf(date.month);
        const day = parseInt(date.day);
        
        // Extract start time (assuming format like "2:00 PM - 6:00 PM")
        const timeMatch = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
        let hours = 14; // default 2 PM
        let minutes = 0;
        
        if (timeMatch) {
            hours = parseInt(timeMatch[1]);
            minutes = parseInt(timeMatch[2]);
            if (timeMatch[3].toUpperCase() === 'PM' && hours !== 12) hours += 12;
            if (timeMatch[3].toUpperCase() === 'AM' && hours === 12) hours = 0;
        }
        
        return new Date(year, month, day, hours, minutes);
    }

    calculateEndDate(startDate, timeString) {
        // Try to parse end time from time string
        const endTimeMatch = timeString.match(/- (\d{1,2}):(\d{2})\s*(AM|PM)/i);
        if (endTimeMatch) {
            let endHours = parseInt(endTimeMatch[1]);
            const endMinutes = parseInt(endTimeMatch[2]);
            if (endTimeMatch[3].toUpperCase() === 'PM' && endHours !== 12) endHours += 12;
            if (endTimeMatch[3].toUpperCase() === 'AM' && endHours === 12) endHours = 0;
            
            const endDate = new Date(startDate);
            endDate.setHours(endHours, endMinutes);
            return endDate;
        } else {
            // Default to 2 hours later
            const endDate = new Date(startDate);
            endDate.setHours(endDate.getHours() + 2);
            return endDate;
        }
    }

    showCalendarOptions(event, googleCalendarUrl, startDate, endDate) {
        // Create calendar options modal
        const calendarModal = document.createElement('div');
        calendarModal.className = 'calendar-modal';
        calendarModal.innerHTML = `
            <div class="calendar-modal-content">
                <div class="calendar-modal-header">
                    <h3>Add to Calendar</h3>
                    <span class="calendar-modal-close">&times;</span>
                </div>
                <div class="calendar-modal-body">
                    <p>Choose your preferred calendar:</p>
                    <div class="calendar-options">
                        <a href="${googleCalendarUrl}" target="_blank" class="calendar-option">
                            <span class="calendar-icon">📅</span>
                            <span>Google Calendar</span>
                        </a>
                        <button class="calendar-option" onclick="this.downloadICS(event)" data-event='${JSON.stringify(event)}' data-start='${startDate.toISOString()}' data-end='${endDate.toISOString()}'>
                            <span class="calendar-icon">📁</span>
                            <span>Download ICS File</span>
                        </button>
                        <button class="calendar-option" onclick="this.copyEventDetails(event)" data-event='${JSON.stringify(event)}'>
                            <span class="calendar-icon">📋</span>
                            <span>Copy Event Details</span>
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(calendarModal);
        calendarModal.style.display = 'block';

        // Add event listeners
        const closeBtn = calendarModal.querySelector('.calendar-modal-close');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(calendarModal);
        });

        calendarModal.addEventListener('click', (e) => {
            if (e.target === calendarModal) {
                document.body.removeChild(calendarModal);
            }
        });

        // Add ICS download functionality
        const icsBtn = calendarModal.querySelector('button[onclick*="downloadICS"]');
        icsBtn.onclick = () => this.downloadICS(event, startDate, endDate);

        // Add copy functionality
        const copyBtn = calendarModal.querySelector('button[onclick*="copyEventDetails"]');
        copyBtn.onclick = () => this.copyEventDetails(event);
    }

    downloadICS(event, startDate, endDate) {
        const icsContent = this.generateICS(event, startDate, endDate);
        const blob = new Blob([icsContent], { type: 'text/calendar' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${event.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.ics`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    generateICS(event, startDate, endDate) {
        const formatDate = (date) => {
            return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        };

        return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//IoTronics Club//Event Calendar//EN
BEGIN:VEVENT
UID:${event.id}@iotronics.club
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:${event.title}
DESCRIPTION:${event.description}\\n\\nLocation: ${event.location}\\n\\nOrganized by: ${event.organizers ? event.organizers.join(', ') : 'IoTronics Club'}
LOCATION:${event.location}
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR`;
    }

    copyEventDetails(event) {
        const eventDetails = `Event: ${event.title}
Date: ${event.date.month} ${event.date.day}, ${event.date.year}
Time: ${event.time}
Location: ${event.location}
Description: ${event.description}
Registration: ${event.registration.url}`;

        navigator.clipboard.writeText(eventDetails).then(() => {
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'copy-success';
            successMsg.textContent = 'Event details copied to clipboard!';
            document.body.appendChild(successMsg);
            
            setTimeout(() => {
                document.body.removeChild(successMsg);
            }, 2000);
        }).catch(() => {
            // Fallback for browsers that don't support clipboard API
            const textArea = document.createElement('textarea');
            textArea.value = eventDetails;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            const successMsg = document.createElement('div');
            successMsg.className = 'copy-success';
            successMsg.textContent = 'Event details copied to clipboard!';
            document.body.appendChild(successMsg);
            
            setTimeout(() => {
                document.body.removeChild(successMsg);
            }, 2000);
        });
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
