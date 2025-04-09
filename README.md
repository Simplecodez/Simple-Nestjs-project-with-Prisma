# Digital Vision Assessment

This project is a backend application built with NestJS, PostgreSQL (running in Docker), and Prisma for ORM. This README provides step-by-step instructions for setting up the development environment, including running PostgreSQL in Docker, setting up the environment variables, and configuring Prisma for database interactions and migrations.

## Prerequisites

Ensure the following are installed on your machine:

- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/) (preferably LTS version)
- [Prisma CLI](https://www.prisma.io/docs/getting-started)
  - You can install Prisma CLI globally with:
    ```bash
    npm install -g prisma
    ```

## Project Setup

### 1. Clone the Repository

Clone the project repository:

```bash
git clone https://github.com/simplecodez/Digital_Vision-Assessment.git
cd Digital_Vision-Assessment

```

### 2. Install npm packages

```bash
npm install
```

### 3. Add the Environment variables

```
DATABASE_URL=
JWT_SECRET=
JWT_EXPIRES_IN=
```

### 4. Run Postgres on docker

```bash
docker-compose up -d
```

### 5. Run Prisma migration

```bash
npx prisma migrate dev --name init
```

### 6. Running and Testing Endpoints

```bash
npm run start:dev
```

Then enter "localhost:2201/graphql" to test out the graphql endpoints
