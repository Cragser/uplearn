# Project Overview and Vision

## Project Description
UpLearn is an integrated learning platform that addresses the challenge of overconfidence in learning through an automated system that generates personalized resources based on student performance data from Anki tests. The platform combines a customized Moodle installation with a modern NextJs web interface, integrating AI models (DeepSeek and OpenAI) to create adaptive study plans and pedagogical content.

## Problem Statement
The project addresses several key challenges in self-learning:
- Overconfidence in concept mastery (Dunning-Kruger effect)
- Limitations of pure memorization techniques
- Gap between perceived and actual knowledge
- Need for personalized learning paths

## Technical Implementation
- Frontend: NextJs with Shadcn components and Tailwind CSS
- State Management: Zustand
- LMS Backend: Moodle with PostgreSQL
- Integration: AnkiConnect API for local development
- Containerization: Docker for reproducible deployment

## Main Objectives
1. Create a seamless integration between Moodle, Anki, and a modern web frontend
2. Generate personalized learning resources based on performance data
3. Implement adaptive study plans using AI models
4. Enhance user experience through a contemporary interface design
5. Maintain robust learning management capabilities
6. Provide a scalable and maintainable architecture

## Technical Considerations
- Local API integration with AnkiConnect
- Fallback mechanisms for cloud deployment
- Docker containerization for development and deployment
- Modern frontend architecture with state management

## Expected Outcomes
- Reduced gap between perceived and actual knowledge
- Improved learning effectiveness through personalized content
- Enhanced student self-assessment capabilities
- Efficient content delivery and management
- Seamless authentication and authorization
- Enhanced reporting and analytics capabilities

## Research Foundation
The project is based on established research in cognitive psychology and educational technology:
- Dunning-Kruger effect in educational contexts
- Ebbinghaus' spaced repetition principles
- Sloan and Scharff's work on student self-assessment
- Karpicke & Blunt's studies on knowledge transfer
- Schendel's research on reflective learning practices