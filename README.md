# Petrr-LLM

Petrr-LLM is a project that provides a platform for generating personalized workout programs using OpenAI's language models. It includes a frontend for user interaction and a backend that handles API requests, connects to a MongoDB database, and interfaces with the OpenAI API.

This README provides instructions on how to set up and run the project using Docker and Docker Compose, including hot reloading for development.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup Steps](#setup-steps)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Create a `.env` File](#2-create-a-env-file)
  - [3. Build and Start the Docker Containers](#3-build-and-start-the-docker-containers)
  - [4. Access the Application](#4-access-the-application)
  - [5. Hot Reloading for Development](#5-hot-reloading-for-development)
  - [6. Stopping the Application](#6-stopping-the-application)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Important Notes](#important-notes)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Prerequisites

- **Docker**: Ensure Docker is installed and running on your machine.
- **Docker Compose**: Comes bundled with Docker Desktop on Windows and macOS.
- **OpenAI API Key**: You need a valid OpenAI API key to use the application.

---

## Setup Steps

### 1. Clone the Repository

Clone the project repository to your local machine:

```bash
git clone https://github.com/YourUsername/Petrr-LLM.git
cd Petrr-LLM
```

### 2. Create a `.env` File

In the project root directory (`Petrr-LLM`), create a `.env` file to store your environment variables:

```bash
touch .env
```

Add the following content to the `.env` file:

```env
OPENAI_API_KEY=your-openai-api-key
```

- Replace `your-openai-api-key` with your actual OpenAI API key.
- Ensure the `.env` file is included in your `.gitignore` to prevent sensitive information from being committed.

### 3. Build and Start the Docker Containers

Build the Docker images and start the containers using Docker Compose:

```bash
docker-compose up --build
```

This command will:

- Build Docker images for the backend, frontend, and MongoDB services.
- Start the containers and link them together as defined in `docker-compose.yml`.

### 4. Access the Application

- **Frontend**: Open your browser and navigate to `http://localhost:5173`.
- **Backend API**: The backend API is accessible at `http://localhost:5000`.

### 5. Hot Reloading for Development

The project is configured for hot reloading to enhance the development experience.

#### Backend

- Uses `ts-node-dev` for hot reloading.
- Changes in the `backend/src` directory will automatically restart the server.
- Volume mounts are set up in `docker-compose.yml` to reflect code changes in the container.

#### Frontend

- Uses the development server provided by the frontend framework (e.g., Vite).
- Supports hot module replacement for immediate reflection of code changes.

### 6. Stopping the Application

To stop the application and remove the containers, press `Ctrl+C` in the terminal where `docker-compose` is running, or run:

```bash
docker-compose down
```

---

## Project Structure

- **backend/**: Contains the backend code (TypeScript).
  - **Dockerfile**: Defines the Docker image for the backend service.
  - **src/**: Source code for the backend application.
  - **package.json**: Lists dependencies and scripts for the backend.
  - **tsconfig.json**: TypeScript configuration for the backend.

- **frontend/**: Contains the frontend code.
  - **Dockerfile**: Defines the Docker image for the frontend service.
  - **src/**: Source code for the frontend application.
  - **package.json**: Lists dependencies and scripts for the frontend.

- **docker-compose.yml**: Defines the services (backend, frontend, MongoDB) and their configurations.

- **.env**: Stores environment variables (not committed to version control).

---

## Environment Variables

The project uses environment variables for configuration:

- `OPENAI_API_KEY`: Your OpenAI API key.

These variables are loaded into the Docker containers using the `.env` file specified in `docker-compose.yml`.

---

## Important Notes

- **Security**: Do not commit your `.env` file or any sensitive information to version control. Ensure `.env` is included in `.gitignore`.

- **Dependencies**: All dependencies are installed inside the Docker containers. You don't need to install Node.js or npm on your local machine.

- **Docker Compatibility**: Ensure Docker and Docker Compose are installed and properly configured on your machine.

- **Port Conflicts**: If the default ports (`5000` for backend, `5173` for frontend) are already in use, you can adjust them in `docker-compose.yml`.

---

## Troubleshooting

- **Backend Not Starting**: If the backend container exits with an error, check the logs:

  ```bash
  docker-compose logs backend
  ```

- **Environment Variables Not Loaded**: Ensure that the `.env` file exists in the project root and contains the necessary variables.

- **MongoDB Connection Issues**: Verify that the `MONGODB_URI` is correct and that the MongoDB service is running.

- **Hot Reloading Not Working**:
  - Ensure volume mounts are correctly set up in `docker-compose.yml`.
  - Verify that `ts-node-dev` is installed and working inside the backend container.

- **Accessing the Backend Shell**: For debugging, you can access the backend container's shell:

  ```bash
  docker exec -it petrr-backend sh
  ```

  Inside the container, you can inspect environment variables or run commands.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the Repository**: Click on the 'Fork' button on the GitHub repository page.

2. **Clone Your Fork**:

   ```bash
   git clone https://github.com/YourUsername/Petrr-LLM.git
   ```

3. **Create a Feature Branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make Changes and Commit**:

   ```bash
   git add .
   git commit -m "Add your commit message"
   ```

5. **Push to Your Fork**:

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**: Open a pull request from your feature branch to the main repository.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

If you have any questions or need further assistance, please open an issue on the GitHub repository.

---

**Enjoy using Petrr-LLM!**