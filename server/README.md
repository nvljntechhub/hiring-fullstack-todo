## 📝 To-Do Application

> **A scalable and robust To-Do List application backend built using the NestJS framework and MongoDB as the persistence layer.**
>
> This application provides a full set of CRUD (Create, Read, Update, Delete) endpoints for managing tasks, complete with validation and a clear module structure.

---

## ✨ Features

- **Task Management (CRUD):** Complete functionality for creating, retrieving, updating, and deleting To-Do items.
- **MongoDB Integration:** Uses the `@nestjs/mongoose` module and the **Mongoose ODM** for simple and effective database interaction.
- **TypeScript:** Fully written in TypeScript for type safety and better maintainability.
- **Data Transfer Objects (DTOs):** Utilizes `class-validator` for robust input validation on incoming requests (e.g., ensuring a task `title` is provided).
- **Modular Architecture:** Organized using NestJS Modules, Controllers, and Services for clean separation of concerns.
- **Environment Configuration:** Uses `.env` files for secure and flexible configuration management.

---

## 🛠️ Technologies Used

- **Framework:** NestJS
- **Language:** NodeJS, TypeScript
- **Database:** MongoDB
- **ODM:** Mongoose
- **Tools:** Docker

---

## ⚙️ Installation and Setup

### **Prerequisites**

- **Node.js** (v18.x or higher)
- **npm** or **yarn**
- **Docker & Docker Compose** (Highly recommended for running MongoDB locally)

### **Steps**

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/nvljntechhub/hiring-fullstack-todo.git
    cd /server
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure Environment Variables and Database:**
    - **Create the `.env` file:**
      ```bash
      mv .env.example .env
      ```
    - **Edit the `.env` file** and populate the database credentials.

    **`.env` Configuration Example:**

    ```env
    # --- Application Settings ---
    PORT=3000
    NODE_ENV=development

    # --- MongoDB Configuration ---
    # Set these values before running Docker
    # The complete URI used by NestJS Mongoose Module

    MONGO_URI=mongodb://${MONGO_ROOT_USERNAME}:${MONGO_ROOT_PASSWORD}@localhost:${MONGO_HOST_PORT}/${MONGO_DATABASE_NAME}?authSource=admin
    MONGO_HOST_PORT=27017
    MONGO_ROOT_USERNAME=adminUser
    MONGO_ROOT_PASSWORD=strongPassword123
    MONGO_DATABASE_NAME=todo_app_db
    ```

4.  **Start the Database (using Docker):**
    If you have a `docker-compose.yml` file configured for MongoDB:

    ```bash
    docker-compose up -d
    ```

---

## ▶️ Running the Application

### **Development Mode (Hot Reload)**

This command starts the application using `nest-cli` with file watching enabled.

```bash
npm run start
```
