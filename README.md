# Budget Management System

Welcome to the Budget Management System! This application aims to provide the goodness of YNAB while keeping it simple
like GoodBudget. Manage your budgets, accounts, transactions, goals, and more with ease.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Schema](#database-schema)
- [API Routes](#api-routes)
- [Contributing](#contributing)
- [License](#license)

## Features

- User Registration and Authentication
- Manage Multiple Budgets
- Track Accounts and Transactions
- Set and Monitor Financial Goals
- Share Budgets with Other Users
- Receive Notifications and Alerts
- User Settings and Preferences

## Tech Stack

- **Backend**: Node.js, Express.js, Prisma
- **Database**: PostgreSQL
- **Authentication**: JSON Web Tokens (JWT)
- **Environment Variables**: dotenv

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- PostgreSQL
- npm

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/budget-management-system.git
    cd budget-management-system
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up the database:
    ```sh
    npx prisma migrate dev --name init
    ```

4. Seed the database (optional):
    ```sh
    npx prisma db seed
    ```

### Running the Application

Start the development server:

```sh
npm run dev
# or
yarn dev
```

The application should now be running on `http://localhost:3000`.

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```plaintext
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
JWT_SECRET=your_jwt_secret
```

## Database Schema

The database schema is defined using Prisma and includes models for users, budgets, accounts, transactions, goals,
notifications, and more. See the `prisma/schema.prisma` file for details.

## API Routes

### Full API Documentation

Refer to the [ROUTES.md](ROUTES.md) file for a full list of API routes and their details.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Thank you for using the Budget Management System! If you have any questions or need further assistance, feel free to
open an issue or reach out to the maintainers.
