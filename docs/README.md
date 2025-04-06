
# EcoQuest Documentation

This directory contains the documentation for the EcoQuest application.

## Project Architecture

EcoQuest is built using a combination of technologies:

- **Frontend**: HTML, CSS, and JavaScript
- **Backend**: Java (Spring Boot) and Python
- **Database**: PostgreSQL

The application follows a client-server architecture where:

1. The frontend is responsible for user interface and experience
2. The Java backend handles core business logic, authentication, and data persistence
3. Python services handle specialized tasks like carbon calculations and data analysis

## Frontend

The frontend is built using standard web technologies:

- HTML5 for structure
- CSS3 for styling and responsive design
- JavaScript for interactivity
- THREE.js for Earth visualization

## Backend

The backend consists of two main components:

### Java Spring Boot API

The Java API handles:
- User authentication and management
- Journey tracking and recording
- Challenge management
- Points and rewards system
- Database interactions

### Python Services

Python is used for specialized services:
- Carbon footprint calculations
- Data analysis and statistics
- Machine learning for predictions
- Recommendation engine
- Geospatial processing

## Database

PostgreSQL is used for data storage with the following main tables:

- Users
- Journeys
- Challenges
- Achievements
- Rewards
- UserStats

## Deployment

The application can be deployed using:

- Docker containers for each component
- Kubernetes for orchestration (in larger installations)
- Traditional VM deployment for simpler setups

## Development Setup

1. Clone the repository
2. Set up the frontend environment
3. Set up the Java backend (see backend/java-api/README.md)
4. Set up the Python services (see backend/python-services/README.md)
5. Configure the database
6. Run the development servers

## API Documentation

API documentation is available in the OpenAPI/Swagger format when running the Java API server.

## Future Enhancements

- Mobile app using native technologies
- Integration with fitness trackers and smart devices
- Social features for community engagement
- Advanced gamification elements
