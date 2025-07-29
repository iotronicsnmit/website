# How to Add New Projects - Iotronics Website

This guide explains how to easily add new projects to your Iotronics website using the JSON-based system.

## 📁 Project Management System

Projects are managed through a simple JSON file located at:
```
data/projects.json
```

## ➕ Adding a New Project

### Step 1: Edit the JSON File

Open `data/projects.json` and add a new project object to the `projects` array:

```json
{
  "id": "your-project-id",
  "title": "Your Project Title",
  "description": "Brief description for homepage (1-2 lines)",
  "placeholder": "Short Name",
  "status": "active",
  "category": "IoT Systems",
  "featured": true,
  "detailPage": "project-your-project.html"
}
```

### Step 2: Project Properties Explained

| Property | Description | Example Values |
|----------|-------------|----------------|
| `id` | Unique identifier (lowercase, hyphenated) | `"smart-parking"` |
| `title` | Full project name | `"Smart Parking System"` |
| `description` | Brief summary (50-100 characters) | `"Automated parking with real-time detection"` |
| `placeholder` | Short name for project card | `"Parking Tech"` |
| `status` | Current development phase | See status options below |
| `category` | Project type | See category options below |
| `featured` | Show on homepage? | `true` or `false` |
| `detailPage` | Link to detail page | `"project-smart-parking.html"` |

### Step 3: Status Options

```json
"status": "active"        // Green - Active Development
"status": "development"   // Pink - In Development  
"status": "planning"      // Orange - Planning Phase
"status": "completed"     // Blue - Completed
"status": "on-hold"       // Gray - On Hold
"status": "research"      // Teal - Research Phase
```

### Step 4: Category Options

```json
"category": "IoT Systems"     // IoT devices and sensors
"category": "AI/ML"           // Artificial Intelligence
"category": "Sustainability"  // Green technology
"category": "Environmental"   // Weather, sensors
"category": "Robotics"        // Autonomous systems
```

## 📝 Complete Example

Here's how to add a new "Smart Greenhouse" project:

```json
{
  "id": "smart-greenhouse",
  "title": "Smart Greenhouse Controller",
  "description": "Automated greenhouse management with climate control and crop monitoring.",
  "placeholder": "Greenhouse IoT",
  "status": "development",
  "category": "IoT Systems",
  "featured": true,
  "detailPage": "project-smart-greenhouse.html"
}
```

## 🔄 How It Works

1. **Homepage**: Shows projects where `"featured": true`
2. **Projects Page**: Shows all projects with filtering by category
3. **Automatic Features**: 
   - Tech stack tags generated based on category
   - Feature lists populated automatically
   - Status badges styled based on status
   - Filtering works automatically

## 📋 Project Features (Auto-Generated)

The system automatically generates appropriate features based on project ID. To customize features for a specific project, modify the `getProjectFeatures()` function in `projects-script.js`.

## 🎨 Tech Stack Tags (Auto-Generated)

Tech stack tags are automatically assigned based on category:
- **IoT Systems**: IoT, Arduino, WiFi, Sensors
- **AI/ML**: AI/ML, Python, TensorFlow, Neural Networks  
- **Sustainability**: Sustainability, Sensors, Analytics, Dashboard
- **Environmental**: Weather, Sensors, Prediction, Alerts
- **Robotics**: Robotics, Computer Vision, ROS, Navigation

## 🚀 Quick Add Process

1. Open `data/projects.json`
2. Copy an existing project object
3. Change the values to match your new project
4. Save the file
5. Refresh the website - new project appears automatically!

## 📱 Featured vs All Projects

- Set `"featured": true` to show on homepage
- Set `"featured": false` to show only on projects page
- Homepage shows maximum 3-4 featured projects

## 🔗 Creating Detail Pages

For each project, create a detail page (optional):
1. Copy `project-smart-campus.html` as a template
2. Rename to match your `detailPage` value
3. Customize the content for your specific project

## 💡 Tips

- Keep descriptions concise for better layout
- Use meaningful project IDs (they become part of URLs)
- Choose appropriate categories for proper filtering
- Update project status as development progresses
- Featured projects should be your best/most interesting work

---

*No server restart or build process required - just edit the JSON and refresh!*
