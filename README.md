# Iotronics - IoT & Innovation Club Website

A modern, responsive website for the Iotronics college club showcasing IoT innovations, projects, and events with cutting-edge design and interactive animations.

## 🌐 Live Website

The website is automatically deployed via Netlify and updates whenever changes are pushed to the main branch.
**Live URL**: [\[https://iotronics.netlify.app\]](https://iotronics.netlify.app/)

## 🚀 Key Features

### 🎯 Interactive IoT Animation System
- **Custom IoT Logo Animation**: Letter-by-letter animated "IOTRONICS" display
- **Floating IoT Objects**: 8 different IoT devices (sensors, smart devices, networks, microcontrollers)
- **Signal Wave Effects**: Animated signal waves emanating from each IoT object
- **Connection Lines**: SVG-based animated connection paths between objects
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices

### 📱 Complete Website Structure
- **Homepage**: Hero section with IoT animations, about, featured projects, team preview, events preview
- **Projects Page**: Dedicated page with JSON-based project management system
- **Team Page**: Complete team member profiles with LinkedIn integration and mobile-responsive cards
- **Events Page**: Dynamic events system with JSON-based management, filtering, and capacity tracking
- **Individual Project Pages**: Detailed project showcases

### ⚡ Technical Excellence
- **JSON-Based Content Management**: Easy content management through `data/projects.json` and `data/events.json`
- **Dynamic Event System**: Automatic event loading, filtering, and responsive design
- **Mobile-First Design**: Responsive navigation with hamburger menu and optimized layouts
- **Modern CSS**: Glassmorphism effects, gradient backgrounds, smooth transitions
- **Vanilla JavaScript**: No external dependencies, fast loading
- **SEO Optimized**: Semantic HTML structure and meta tags

### 🎨 Design Features
- **Modern UI/UX**: Clean, professional interface with tech-focused aesthetics
- **Dark Theme**: Sleek dark background with blue accent colors
- **Typography**: Inter font family for excellent readability
- **Animations**: Smooth scroll effects, hover states, and micro-interactions
- **Accessibility**: Keyboard navigation, focus indicators, semantic structure

## 📁 Project Structure

```
iotronics-website/
├── index.html              # Main homepage
├── projects.html           # Projects showcase page
├── team.html              # Team members page
├── events.html            # Events and workshops page
├── project-smart-campus.html  # Sample project detail page
├── style.css              # Main stylesheet with responsive design
├── script.js              # Homepage JavaScript functionality
├── projects-script.js     # Projects page specific functionality
├── events-script.js       # Events page dynamic loading and filtering
├── data/
│   ├── projects.json      # JSON database for easy project management
│   └── events.json        # JSON database for events management
├── HOW-TO-ADD-PROJECTS.md # Documentation for adding new projects
├── EVENTS_README.md       # Documentation for adding and managing events
├── README.md              # This file
└── .gitignore            # Git ignore rules
```

## 🎯 Content Management Systems

### 📊 Projects Management
- **File**: `data/projects.json`
- **Documentation**: `HOW-TO-ADD-PROJECTS.md`
- **Features**: JSON-based project addition, dynamic filtering, responsive cards
- **Easy Updates**: Simply edit JSON file - no HTML knowledge required

### 📅 Events Management  
- **File**: `data/events.json`
- **Documentation**: `EVENTS_README.md` 
- **Features**: JSON-based event addition, automatic filtering, capacity tracking, dynamic loading
- **Event Types**: Workshops, Hackathons, Tech Talks, Competitions, Networking
- **Smart Display**: Automatic upcoming/past event categorization

### 👥 Team Management
- **File**: `team.html`
- **Features**: Responsive team cards, LinkedIn integration, mobile-optimized layout
- **Recent Fixes**: Text overflow issues resolved, center alignment improved, mobile responsiveness enhanced

### 🔧 Technical Features
- **Dynamic Loading**: All content loads from JSON files automatically
- **Responsive Design**: Mobile-first approach with optimized breakpoints
- **Performance**: Fast loading with no external dependencies
- **Accessibility**: Proper semantic HTML and keyboard navigation

## 🚀 Automatic Deployment

This repository is connected to **Netlify** for automatic deployment:

- ✅ **Auto-Deploy**: Every push to `main` branch automatically updates the live website
- ✅ **Build Process**: No build step required - direct static file deployment
- ✅ **Custom Domain**: Can be configured with your own domain name
- ✅ **HTTPS**: Automatic SSL certificate and HTTPS enabled
- ✅ **CDN**: Global content delivery network for fast loading

### Deployment Workflow:
1. Make changes to code
2. Commit and push to main branch
3. Netlify automatically detects changes
4. Website updates live within 1-2 minutes

## 👥 Contributing Workflow

**⚠️ IMPORTANT: Always use branches for development work!**

## 🚀 Quick Start Guide

### ⚡ Adding New Content (No Coding Required!)

#### 📊 Adding a New Project
1. Open `data/projects.json`
2. Copy the template from `HOW-TO-ADD-PROJECTS.md`
3. Fill in your project details
4. Save and commit - project appears automatically!

#### 📅 Adding a New Event
1. Open `data/events.json`
2. Copy the template from the `eventSchema` section
3. Fill in your event details
4. Save and commit - event appears automatically!

#### 👥 Updating Team Information
1. Open `team.html`
2. Find the team member card to update
3. Edit name, role, department, bio, or LinkedIn URL
4. Save and commit changes

### Branch-Based Development:
1. Create a new branch for your feature/fix
2. Work on your changes in that branch
3. Push the branch to GitHub
4. Create a Pull Request to merge into `main`
5. Once approved, your changes will auto-deploy to the live site

## 🛠️ Complete Setup Guide (Step-by-Step)

### Prerequisites
- Git installed on your computer
- VS Code installed
- GitHub account created

### Step 1: Clone the Repository in VS Code

1. **Open VS Code**
2. **Open Command Palette**: Press `Ctrl+Shift+P` (Windows) or `Cmd+Shift+P` (Mac)
3. **Type**: `Git: Clone`
4. **Enter Repository URL**: `https://github.com/iotronicsnmit/website.git`
5. **Choose Location**: Select a folder on your computer where you want to save the project
6. **Open Project**: Click "Open" when VS Code asks if you want to open the cloned repository

### Step 2: Install Git Extension (if not already installed)

1. **Open Extensions Panel**: Click the Extensions icon in the left sidebar (📦) or press `Ctrl+Shift+X`
2. **Search for**: "GitLens" and install it for better Git integration
3. **Search for**: "Live Server" and install it for local testing

### Step 3: Understanding the File Structure

In VS Code Explorer (left sidebar), you'll see:
- `index.html` - Main homepage
- `style.css` - All styling
- `script.js` - JavaScript functionality
- `data/projects.json` - Project database
- Other HTML pages for different sections

### Step 4: Making Changes

#### Option A: Edit Projects (Easiest)
1. **Open**: `data/projects.json`
2. **Add your project** following the existing format
3. **Save the file**: `Ctrl+S`

#### Option B: Edit Website Content
1. **Open the file** you want to edit (e.g., `index.html`)
2. **Make your changes**
3. **Save the file**: `Ctrl+S`
4. **Test locally**: Right-click on `index.html` → "Open with Live Server"

### Step 5: Working with Git Branches

#### Creating a New Branch:
1. **Open Source Control Panel**: Click the Source Control icon (🔄) in left sidebar or press `Ctrl+Shift+G`
2. **Current Branch**: Look at bottom-left corner of VS Code - it shows current branch (probably "main")
3. **Create New Branch**: 
   - Click on branch name in bottom-left corner
   - Select "Create new branch"
   - Enter branch name: `feature/your-feature-name` or `fix/your-fix-name`
   - Press Enter

#### Alternative Method:
1. **Open Terminal in VS Code**: `Ctrl+Shift+` (backtick)
2. **Create and switch to new branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Step 6: Committing Changes

#### Method 1: Using VS Code Interface
1. **Open Source Control Panel**: `Ctrl+Shift+G`
2. **Stage Changes**: Click the `+` icon next to files you want to commit
3. **Write Commit Message**: In the text box at top, write a clear message like:
   - "Add new IoT sensor project"
   - "Fix mobile navigation issue"
   - "Update team member information"
4. **Commit**: Click the ✓ "Commit" button

#### Method 2: Using Terminal
1. **Open Terminal**: `Ctrl+Shift+` (backtick)
2. **Add files**:
   ```bash
   git add .
   ```
3. **Commit with message**:
   ```bash
   git commit -m "Your commit message here"
   ```

### Step 7: Pushing Changes to GitHub

#### Using VS Code:
1. **After committing**, click the "Sync Changes" button in Source Control panel
2. **Or click** the ↑ arrow next to branch name in bottom-left corner

#### Using Terminal:
```bash
git push origin your-branch-name
```

### Step 8: Creating a Pull Request

1. **Go to GitHub**: Visit `https://github.com/iotronicsnmit/website`
2. **You'll see a banner**: "Compare & pull request" for your recent branch
3. **Click "Compare & pull request"**
4. **Fill out the form**:
   - **Title**: Brief description of your changes
   - **Description**: Detailed explanation of what you changed and why
5. **Click "Create pull request"**

### Step 9: Pull Request Review Process

1. **Team members will review** your changes
2. **They may request changes** - make them in your branch and push again
3. **Once approved**, a maintainer will merge your branch
4. **Your changes go live** automatically via Netlify deployment

### Step 10: Staying Updated

#### Switching Back to Main Branch:
1. **Click branch name** in bottom-left corner of VS Code
2. **Select "main"** from the dropdown

#### Getting Latest Changes:
1. **Open Terminal**: `Ctrl+Shift+` (backtick)
2. **Pull latest changes**:
   ```bash
   git pull origin main
   ```

## 🔧 Adding New Projects

The easiest way to add projects is through the JSON system:

1. **Open**: `data/projects.json`
2. **Add your project** following this format:
```json
{
  "id": "your-project-id",
  "title": "Your Project Title",
  "description": "Brief description of your project",
  "category": "IoT/AI/Web/Mobile/Hardware",
  "status": "Completed/In Progress/Planning",
  "technologies": ["Arduino", "Python", "React"],
  "image": "project-placeholder.jpg",
  "link": "project-detail.html",
  "featured": true
}
```

For detailed instructions, see `HOW-TO-ADD-PROJECTS.md`

## 🧪 Testing Your Changes

### Local Testing:
1. **Install Live Server extension** in VS Code
2. **Right-click** on `index.html`
3. **Select** "Open with Live Server"
4. **Your browser opens** with live-reloading local version

### Mobile Testing:
1. **Use browser developer tools**: Press `F12`
2. **Click device icon** to simulate mobile devices
3. **Test different screen sizes**

## 🚨 Important Guidelines

### Branch Naming:
- `feature/` - for new features (e.g., `feature/add-projects-page`)
- `fix/` - for bug fixes (e.g., `fix/mobile-navigation`)
- `update/` - for content updates (e.g., `update/team-members`)

### Commit Messages:
- Use clear, descriptive messages
- Start with a verb: "Add", "Fix", "Update", "Remove"
- Keep it under 50 characters for the title

### Before Pushing:
- ✅ Test your changes locally
- ✅ Make sure mobile responsiveness works
- ✅ Check that no files are broken
- ✅ Ensure your changes don't break existing functionality

## 📞 Need Help?

### For Technical Issues:
- **Check**: Existing issues on GitHub
- **Create**: New issue with detailed description
- **Ask**: Team members in your communication channel

### For Content Updates:
- **Projects**: Edit `data/projects.json`
- **Team**: Edit `team.html`
- **Events**: Edit `events.html`
- **Contact Info**: Edit contact section in `index.html`

## 🏆 Project Highlights

- **Fully Responsive**: Works perfectly on all devices
- **Easy Content Management**: JSON-based project system
- **Modern Tech Stack**: HTML5, CSS3, Vanilla JS
- **Zero Dependencies**: No external libraries required
- **Fast Loading**: Optimized for performance
- **SEO Ready**: Semantic HTML and meta tags
- **Accessible**: Keyboard navigation and screen reader friendly

---

**Built with 💙 by the IoTronics Team**  
*Innovating Tomorrow, Today*
