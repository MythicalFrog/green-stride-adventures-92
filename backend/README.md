
# EcoQuest Backend

This directory contains the backend code for the EcoQuest application. The backend is built using Java and Python.

## Architecture

The backend is implemented with a microservices architecture:

1. **Java Spring Boot API** - Core application API that handles:
   - User authentication and management
   - Journey tracking and recording
   - Challenge management
   - Points and rewards system

2. **Python Data Processing** - Services for:
   - Carbon footprint calculations
   - Data analysis and statistics
   - Machine learning for journey predictions and recommendations

## Development Setup

### Java Spring Boot API

1. Install Java JDK 17+
2. Install Maven
3. Navigate to the `java-api` directory
4. Run `mvn spring-boot:run` to start the API server

### Python Services

1. Install Python 3.9+
2. Install requirements: `pip install -r requirements.txt`
3. Navigate to the `python-services` directory
4. Run the desired service: `python carbon_calculator.py`

## API Documentation

The REST API documentation is available at `/swagger-ui.html` when running the Java API.

## Database

The application uses PostgreSQL for data storage. See the `database` directory for schema definitions and migration scripts.

## Deployment

Deployment instructions for production environments are available in the `deployment` directory.
