# Events Management System

## How to Add New Events

The events system now uses a JSON-based approach for easy event management. All event data is stored in `data/events.json`.

### Quick Start

1. Open `data/events.json`
2. Copy the template from the `eventSchema.template` section
3. Fill in your event details
4. Add it to the `events` array
5. Save the file - events will update automatically!

### Event Template

```json
{
  "id": "your-event-id-here",
  "title": "Your Event Title",
  "type": "Workshop",
  "status": "upcoming",
  "date": {
    "month": "Aug",
    "day": "15",
    "year": "2025",
    "full": "2025-08-15"
  },
  "time": "2:00 PM - 6:00 PM",
  "location": "Your Event Location",
  "description": "Detailed description of your event...",
  "capacity": {
    "total": 25,
    "registered": 10,
    "available": 15
  },
  "tags": ["Tag1", "Tag2", "Tag3"],
  "registration": {
    "url": "#",
    "buttonText": "Register Now"
  }
}
```

### Field Explanations

| Field | Description | Required | Example |
|-------|-------------|----------|---------|
| `id` | Unique identifier (URL-friendly) | ✅ | `"iot-workshop-aug-2025"` |
| `title` | Event name | ✅ | `"IoT Fundamentals Workshop"` |
| `type` | Event category | ✅ | `"Workshop"`, `"Hackathon"`, `"Tech Talk"` |
| `status` | Event status | ✅ | `"upcoming"` or `"past"` |
| `date.month` | 3-letter month | ✅ | `"Aug"`, `"Sep"`, `"Dec"` |
| `date.day` | Day number | ✅ | `"15"` |
| `date.year` | 4-digit year | ✅ | `"2025"` |
| `date.full` | ISO date format | ✅ | `"2025-08-15"` |
| `time` | Time range | ✅ | `"2:00 PM - 6:00 PM"` |
| `location` | Venue/location | ✅ | `"Innovation Lab, Room 302"` |
| `description` | Event description | ✅ | Detailed description text |
| `capacity.total` | Maximum capacity | ❌ | `25` |
| `capacity.registered` | Current registrations | ❌ | `10` |
| `capacity.available` | Available spots | ❌ | `15` (calculated) |
| `capacity.unit` | Unit type | ❌ | `"teams"` (default: individuals) |
| `tags` | Array of tags | ✅ | `["Beginner", "Hands-on"]` |
| `registration.url` | Registration link | ✅ | `"#"` for placeholder |
| `registration.buttonText` | Button text | ✅ | `"Register Now"` |

### Common Event Types

- `"Workshop"` - Hands-on learning sessions
- `"Hackathon"` - Competitive coding events
- `"Tech Talk"` - Presentations and lectures
- `"Competition"` - Contests and challenges
- `"Networking"` - Social and networking events

### Example: Adding a New Event

1. Open `data/events.json`
2. In the `events` array, add your new event:

```json
{
  "events": [
    // ... existing events ...
    {
      "id": "robotics-workshop-nov-2025",
      "title": "Introduction to Robotics",
      "type": "Workshop",
      "status": "upcoming",
      "date": {
        "month": "Nov",
        "day": "20",
        "year": "2025",
        "full": "2025-11-20"
      },
      "time": "1:00 PM - 5:00 PM",
      "location": "Robotics Lab",
      "description": "Learn robotics fundamentals with hands-on projects using Arduino and sensors.",
      "capacity": {
        "total": 20,
        "registered": 5,
        "available": 15
      },
      "tags": ["Robotics", "Arduino", "Beginner"],
      "registration": {
        "url": "https://forms.google.com/robotics-workshop",
        "buttonText": "Register Now"
      }
    }
  ]
}
```

3. Save the file
4. Refresh the website - your event will appear automatically!

### Tips

- **Unique IDs**: Use lowercase letters, numbers, and hyphens only
- **Chronological Order**: Events are automatically sorted by `date.full`
- **Capacity**: For past events, you can omit capacity or use attendance data
- **Tags**: Keep them short and relevant for filtering
- **URLs**: Use `"#"` for placeholder links during development

### Filtering System

Events are automatically filterable by:
- Status: `upcoming`, `past`
- Type: `workshop`, `hackathon`, `talk`, etc.
- Or show `all` events

The filtering system works automatically with your event data!
