# GymManager API

Gym management system with:

- Member registration
- Plans (monthly, quarterly, annual)
- Payments
- Workout sheets (Workout A/B/C)
- Exercises
- QR Code check-in
- Active members dashboard
- JWT authentication
- Password hashing with bcrypt
- Swagger documentation
- Docker + Docker Compose

## Stack

- Node.js (ESM)
- Express.js
- Sequelize
- SQLite
- JWT (jsonwebtoken)
- bcrypt
- validator
- Swagger (swagger-ui-express)
- dotenv
- ESLint
- Nodemon
- Docker + Docker Compose
- Git (Conventional Commits)

## Folder structure

```bash
src/
  config/
    database.cjs
  database/
    index.js
    migrations/
    seeders/
  models/
  controllers/
  services/
  routes/
  middlewares/
  helpers/
  docs/
