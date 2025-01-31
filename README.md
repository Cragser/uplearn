# Uplearn: AI-Powered Adaptive Learning Platform

## Overview
Uplearn is an innovative educational platform that integrates Moodle LMS with Anki's spaced repetition system, powered by AI to optimize learning paths and address the Dunning-Kruger effect in education. The platform uses real-time performance data to create personalized learning experiences and bridge the gap between perceived and actual knowledge.

## Key Features
- **AI-Driven Content Generation**: Utilizes DeepSeek R1 and OpenAI models to create personalized educational content
- **Adaptive Learning Paths**: Automatically adjusts study plans based on student performance
- **Moodle Integration**: Seamless connection with Moodle LMS for comprehensive course management
- **Anki Integration**: Leverages spaced repetition for optimal knowledge retention
- **Real-time Analytics**: Monitors student progress and identifies knowledge gaps

## Technical Architecture

### Components
1. **Frontend (Next.js 14)**
   - Server Components for enhanced performance
   - App Router for intuitive navigation
   - Shadcn UI components with Tailwind CSS
   - Zustand for state management
   - React Query for data fetching

2. **Backend-for-Frontend (Next.js API)**
   - Orchestrates service interactions
   - Handles data transformation
   - Manages AI model integration

3. **LMS Backend (Moodle)**
   - PostgreSQL database
   - REST API with token authentication
   - Custom plugin (tnadvancemanage) for optimized operations

4. **Anki Integration**
   - AnkiConnect middleware for local API access
   - Cloud-compatible fallback system
   - Real-time synchronization

### Infrastructure
- Containerized deployment with Docker
- Horizontal scalability
- Error monitoring via Sentry
- Distributed caching system

## Getting Started

### Prerequisites
- Docker and Docker Compose
- Node.js (version specified in .nvmrc)
- Python for automation scripts
- Anki application installed 
- AnkiConnect installed

### Installation
1. Clone the repository
2. Set up environment variables
3. Run Docker Compose
4. Initialize Moodle configuration
5. Start the Next.js application

## Project Structure
```
/
├── doc/                 # Documentation
├── moodle-uplearn/     # Moodle configuration and plugins
├── site-uplearn/       # Next.js frontend application
└── requirements.txt    # Python dependencies
```

## Features

### AI-Powered Learning
- Automated content generation
- Personalized study plans
- Pattern recognition in learning behavior

### Spaced Repetition Integration
- Anki deck synchronization
- Performance tracking
- Adaptive intervals

### Learning Management
- Course organization
- Assessment tools
- Progress tracking

## Development

### Local Development
1. Set up local development environment
2. Install dependencies
3. Configure API endpoints
4. Run development servers

### Testing
- In progress

### Deployment
- Container orchestration
- Environment configuration
- Monitoring setup

## Contributing
Contributions are welcome! Please read our contributing guidelines for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- Moodle Community
- Anki Development Team
- DeepSeek and OpenAI for AI models