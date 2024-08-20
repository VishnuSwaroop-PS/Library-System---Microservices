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








Here is the complete README file for your Library System project:

---

# Library System - Microservices Architecture

This Library System is built using a microservices architecture. The system consists of three microservices:

1. **Book Catalog Service**: Manages book data.
2. **User Management Service**: Handles user registration, authentication, and profile management.
3. **Notification Service**: Sends notifications related to due dates, new book arrivals, and reminders.

Each microservice is independently developed, deployed, and scaled. The services communicate with each other, allowing for a flexible and modular system. Docker and Docker Compose are used to manage and orchestrate the microservices.

## Features

- **Book Catalog Service**: CRUD operations on books.
- **User Management Service**: User registration, authentication, and profile management. Includes role management (e.g., student, librarian, admin).
- **Notification Service**: Sends email or SMS notifications for due dates, new arrivals, and return reminders.

## Tech Stack

- **Node.js**: Server-side JavaScript runtime.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database used by all microservices.
- **Docker**: Containerization platform.
- **Docker Compose**: Tool for defining and running multi-container Docker applications.


## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Running the Services Locally

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/library-system-microservices.git
    cd library-system-microservices
    ```

2. **Build and Start the Services**:
    ```bash
    docker-compose up --build
    ```

   This command will build the Docker images for each microservice and start the containers.

3. **Access the Services**:
    - Book Catalog Service: `http://localhost:5001`
    - User Management Service: `http://localhost:5002`
    - Notification Service: `http://localhost:5003`

### Running the Services Individually

If you need to run a specific microservice:

1. **Navigate to the Service Directory**:
    ```bash
    cd backend/book-catalog-microservice
    ```
    or
    ```bash
    cd backend/user-management-microservice
    ```
    or
    ```bash
    cd backend/notification-microservice
    ```

2. **Build the Docker Image**:
    ```bash
    docker build -t service-name .
    ```

3. **Run the Docker Container**:
    ```bash
    docker run -p <port>:<port> service-name
    ```

## Environment Variables

Each service requires a `.env` file for configuration. Below are the required environment variables for each service:

### Book Catalog Service

```env
MONGO_URI=mongodb://mongo:27017/book-catalog-db
PORT=5001
```

### User Management Service

```env
MONGO_URI=mongodb://mongo:27017/user-management-db
JWT_SECRET=your_jwt_secret
PORT=5002
```

### Notification Service

```env
MONGO_URI=mongodb://mongo:27017/notification-db
PORT=5003
```

## Docker Configuration

### Dockerfile

Each microservice has its own `Dockerfile` to define how the service is built into a Docker image.

### Docker Compose

The `docker-compose.yml` file orchestrates the three microservices and a MongoDB service:

```yaml
version: '3.8'

services:
  book-catalog:
    build: ./backend/book-catalog-microservice
    ports:
      - '5001:5001'
    environment:
      - MONGO_URI=mongodb://mongo:27017/book-catalog-db

  user-management:
    build: ./backend/user-management-microservice
    ports:
      - '5002:5002'
    environment:
      - MONGO_URI=mongodb://mongo:27017/user-management-db
      - JWT_SECRET=your_jwt_secret

  notification:
    build: ./backend/notification-microservice
    ports:
      - '5003:5003'
    environment:
      - MONGO_URI=mongodb://mongo:27017/notification-db

  mongo:
    image: mongo
    ports:
      - '27017:27017'
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

## Conclusion

This Library System demonstrates how to build a microservices architecture with Node.js, Express, and MongoDB, using Docker and Docker Compose for containerization and orchestration. Each service is independent, scalable, and communicates with other services, making the system robust and flexible.

Feel free to contribute, report issues, or suggest features. Happy coding!

---

You can copy and paste this into a `README.md` file in your project. If you have any other requests or need further adjustments, let me know!
