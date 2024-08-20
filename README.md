# Library System Microservices

This repository contains the code for a Library System implemented as a set of microservices. The system is built using Node.js with MongoDB and Docker for containerization. The system handles various functionalities, including user management, book catalog management, and notifications for users.

## Features

- **User Management Microservice**: Handles user registration, authentication, profile management, and role management.
- **Book Catalog Microservice**: Manages book data including creating, updating, and deleting books.
- **Notification Microservice**: Sends notifications to users about due dates, new book arrivals, and reminders for returning borrowed books.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Containerization**: Docker, Docker Compose

## Microservices Overview

### 1. User Management Microservice

- Handles user registration, login, and profile management.
- Roles: `student`, `librarian`, `admin`.

### 2. Book Catalog Microservice

- Manages book information (title, author, genre, availability).
- CRUD operations on books.

### 3. Notification Microservice

- Sends email or SMS notifications for book due dates and new arrivals.
- Reminders for returning borrowed books.

## Project Structure

```bash
.
├── user-management-microservice
│   ├── app.js
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── config
│   └── Dockerfile
├── book-catalog-microservice
│   ├── app.js
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── config
│   └── Dockerfile
├── notification-microservice
│   ├── app.js
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── config
│   └── Dockerfile
└── docker-compose.yml
```

## Prerequisites

- [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/) installed on your machine.

## Running the Application

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/library-system-microservices.git
cd library-system-microservices
```

### 2. Create Environment Files

For each microservice, create a `.env` file in the respective directories (e.g., `user-management-microservice/.env`). Populate it with the following:

```plaintext
# MongoDB
MONGO_URI=mongodb://mongo:27017/<microservice-database-name>

# JWT Secret
JWT_SECRET=your_jwt_secret_key
```

### 3. Build and Run with Docker Compose

```bash
docker-compose up --build
```

This command will build the Docker images for each microservice and start the containers. The services will be available at the following ports:

- **User Management Microservice**: http://localhost:5000
- **Book Catalog Microservice**: http://localhost:5001
- **Notification Microservice**: http://localhost:5002

### 4. Accessing the Services

- **User Management Microservice**: Handles user-related requests like registration and login.
- **Book Catalog Microservice**: Handles requests related to book management.
- **Notification Microservice**: Manages notifications for due dates, new arrivals, and reminders.

## Testing the Application

You can use tools like [Postman](https://www.postman.com/) to test the API endpoints exposed by each microservice.

## API Endpoints

### Book Catalog Service

- `GET /books` - Retrieve all books.
- `POST /books` - Add a new book.
- `PUT /books/:id` - Update a book.
- `DELETE /books/:id` - Delete a book.

### User Management Service

- `POST /users/register` - Register a new user.
- `POST /users/login` - Authenticate a user.
- `GET /users/:id` - Get user details.
- `PUT /users/:id` - Update user profile.

### Notification Service

- `GET /notifications` - Retrieve all notifications.
- `POST /notifications` - Create a new notification.
- `PUT /notifications/:id` - Update a notification.
- `DELETE /notifications/:id` - Delete a notification.


## Docker Cleanup

To stop and remove the Docker containers, use:

```bash
docker-compose down
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review.

## License

This project is licensed under the MIT License.

---
