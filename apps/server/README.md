# MindLog

MindLog is a web application that allows users to easily create, share, and manage their own blog posts. Besides writing, users can also browse, read, and discover posts from the community, creating a rich space for sharing knowledge and personal experiences. MindLog focuses on simplicity, convenience, and connecting people through valuable stories and ideas.

## Features

- Register, login, JWT authentication, and Google OAuth2
- User management
- Create, edit, delete posts
- Comment on posts
- Like posts
- Tagging posts
- Manage data with Prisma ORM
- Powerful and extensible GraphQL API

## Technologies Used

- [NestJS](https://nestjs.com/): A powerful Node.js framework supporting modular architecture
- [GraphQL](https://graphql.org/): Flexible API, optimized data queries
- [Prisma ORM](https://www.prisma.io/): Database management and querying
- [MySQL](https://www.mysql.com/): Database management system
- [Passport](http://www.passportjs.org/): User authentication (JWT, Google)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/): GraphQL server implementation
- [Docker](https://www.docker.com/): Database deployment

## Project Structure

- **src/**
  - **auth/**: Authentication, security, JWT, Google OAuth2
  - **user/**: User management
  - **post/**: Post management
  - **comment/**: Comment management
  - **like/**: Like management
  - **tag/**: Tag management
  - **prisma/**: Database connection and operations
  - **graphql/**: Auto-generated GraphQL schemas
  - **main.ts**: Application entry point

## Database Structure (Prisma)

- **User**: Users, linked to posts, comments, likes
- **Post**: Posts, linked to authors, comments, tags, likes
- **Comment**: Comments, linked to posts and users
- **Tag**: Tags, linked to multiple posts
- **Like**: Likes, linking users and posts

## Installation & Run Instructions

1. **Clone the project:**

```bash
git clone https://github.com/Hai1205/MindLog.git
cd MindLog/apps/server
```

2. **Install dependencies:**

```bash
npm install
```

3. **Configure environment variables:**

- Create a `.env` file and fill in the necessary information.

4. **Run migrations:**

```bash
npx prisma migrate dev
```

**Optionally, seed sample data:**

```bash
npm run db:seed
```

5. **Run the server in development mode:**

```bash
npm run dev
```

6. **Build for production:**

```bash
npm run build
npm run start:prod
```

## Customization

- You can modify the Prisma schema in `prisma/schema.prisma` and re-run the migration.
- Configure GraphQL in `src/app.module.ts`.