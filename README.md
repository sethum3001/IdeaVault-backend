# IdeaVault - Backend

## Overview
This is the backend component of the IdeaVault project. It provides RESTful APIs to handle CRUD operations for notes.

## Setup Instructions
1. **Clone Repository**: Clone this repository to your local machine.
2. **Navigate to Backend**: Navigate to the backend directory.
3. **Install Dependencies**: Run `npm install` to install dependencies.
4. **Environment Variables**: Create a `.env` file in the root of the backend directory according to the specified environment variables in .env.example file.
5. **Start Backend Development Server**: Run `npm run dev` to start the backend server.

## Folder Structure
- `/routes`: Contains route handlers for different API endpoints.
- `/models`: Contains database models for notes.
- `/middleware`: Contains middleware functions for authentication, error handling, etc.

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose 

## Authentication and Authorization
Implemented authentication and authorization using JWT (JSON Web Tokens) and Joi packages.

## Deployment
Deployed using Cyclic
