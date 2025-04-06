
# Java Spring Boot API for EcoQuest

This directory will contain the Java Spring Boot implementation of the EcoQuest API.

## Features to implement:

1. User authentication (registration, login, password reset)
2. User profile management
3. Journey tracking and recording
4. Challenge management
5. Points and rewards system
6. Integration with Python services for carbon calculations

## Directory Structure:

```
java-api/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── ecoquest/
│   │   │           ├── controller/
│   │   │           ├── model/
│   │   │           ├── repository/
│   │   │           ├── service/
│   │   │           ├── config/
│   │   │           ├── security/
│   │   │           └── EcoQuestApplication.java
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── static/
│   │       └── templates/
│   └── test/
│       └── java/
│           └── com/
│               └── ecoquest/
├── pom.xml
└── README.md
```

## Core Models:

1. User
2. Journey
3. Challenge
4. Achievement
5. Reward
6. UserStats

## API Endpoints:

1. `/api/auth/*` - Authentication endpoints
2. `/api/users/*` - User management
3. `/api/journeys/*` - Journey tracking
4. `/api/challenges/*` - Challenge management
5. `/api/achievements/*` - User achievements
6. `/api/rewards/*` - Rewards marketplace
7. `/api/stats/*` - User statistics

## Dependencies:

- Spring Boot
- Spring Security
- Spring Data JPA
- PostgreSQL Driver
- Lombok
- MapStruct
- Springdoc OpenAPI (Swagger)
- jjwt (JSON Web Token)

## Coming Soon:

Full Java implementation of the API with proper Spring Boot architecture, security configuration, and RESTful endpoints.
