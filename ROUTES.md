# API Routes Documentation

This document provides an overview of all the API routes available in the budget management application.

## Authentication

### Register a New User

- **URL**: `/auth/register`
- **Method**: `POST`
- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
    "username": "string",
    "name": "string",
    "email": "string",
    "contact_number": "string",
    "password": "string"
  }
  ```

### Login

- **URL**: `/auth/login`
- **Method**: `POST`
- **Description**: Authenticates a user and returns a token.
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

### Logout

- **URL**: `/auth/logout`
- **Method**: `POST`
- **Description**: Logs out the user.

## User Profile

### Get User Profile

- **URL**: `/users/:userId`
- **Method**: `GET`
- **Description**: Retrieves the profile of a specific user.

### Update User Profile

- **URL**: `/users/:userId`
- **Method**: `PUT`
- **Description**: Updates the profile of a specific user.
- **Request Body**:
  ```json
  {
    "username": "string",
    "name": "string",
    "email": "string",
    "contact_number": "string"
  }
  ```

### Delete User Account

- **URL**: `/users/:userId`
- **Method**: `DELETE`
- **Description**: Deletes a specific user account.

## Budgets

### Get All Budgets

- **URL**: `/budgets`
- **Method**: `GET`
- **Description**: Retrieves all budgets for the authenticated user.

### Create a New Budget

- **URL**: `/budgets`
- **Method**: `POST`
- **Description**: Creates a new budget.
- **Request Body**:
  ```json
  {
    "budget_name": "string",
    "total_budgeted_amount": "number",
    "currency": "currency_type",
    "start_date": "date",
    "end_date": "date"
  }
  ```

### Get a Specific Budget

- **URL**: `/budgets/:budgetId`
- **Method**: `GET`
- **Description**: Retrieves a specific budget by its ID.

### Update a Specific Budget

- **URL**: `/budgets/:budgetId`
- **Method**: `PUT`
- **Description**: Updates a specific budget.
- **Request Body**:
  ```json
  {
    "budget_name": "string",
    "total_budgeted_amount": "number",
    "currency": "currency_type",
    "start_date": "date",
    "end_date": "date"
  }
  ```

### Delete a Specific Budget

- **URL**: `/budgets/:budgetId`
- **Method**: `DELETE`
- **Description**: Deletes a specific budget.

## Budget Shares

### Get All Budget Shares

- **URL**: `/budgets/:budgetId/shares`
- **Method**: `GET`
- **Description**: Retrieves all users with whom the budget is shared.

### Share a Budget

- **URL**: `/budgets/:budgetId/shares`
- **Method**: `POST`
- **Description**: Shares the budget with another user.
- **Request Body**:
  ```json
  {
    "user_id": "string",
    "permission_level": "permission_level"
  }
  ```

### Remove a User from Shared Budget

- **URL**: `/budgets/:budgetId/shares/:userId`
- **Method**: `DELETE`
- **Description**: Removes a user from the shared budget.

## Accounts

### Get All Accounts

- **URL**: `/budgets/:budgetId/accounts`
- **Method**: `GET`
- **Description**: Retrieves all accounts for a specific budget.

### Create a New Account

- **URL**: `/budgets/:budgetId/accounts`
- **Method**: `POST`
- **Description**: Creates a new account in a specific budget.
- **Request Body**:
  ```json
  {
    "account_name": "string",
    "account_type": "account_type",
    "total_amount": "number",
    "currency": "currency_type"
  }
  ```

### Get a Specific Account

- **URL**: `/accounts/:accountId`
- **Method**: `GET`
- **Description**: Retrieves a specific account by its ID.

### Update a Specific Account

- **URL**: `/accounts/:accountId`
- **Method**: `PUT`
- **Description**: Updates a specific account.
- **Request Body**:
  ```json
  {
    "account_name": "string",
    "account_type": "account_type",
    "total_amount": "number",
    "currency": "currency_type"
  }
  ```

### Delete a Specific Account

- **URL**: `/accounts/:accountId`
- **Method**: `DELETE`
- **Description**: Deletes a specific account.

## Transactions

### Get All Transactions

- **URL**: `/budgets/:budgetId/transactions`
- **Method**: `GET`
- **Description**: Retrieves all transactions for a specific budget.

### Create a New Transaction

- **URL**: `/budgets/:budgetId/transactions`
- **Method**: `POST`
- **Description**: Creates a new transaction in a specific budget.
- **Request Body**:
  ```json
  {
    "account_id": "string",
    "category_id": "string",
    "amount": "number",
    "transaction_date": "date",
    "memo": "string",
    "transaction_type": "transaction_type",
    "is_recurring": "boolean",
    "frequency": "frequency_type",
    "next_occurrence_date": "date"
  }
  ```

### Get a Specific Transaction

- **URL**: `/transactions/:transactionId`
- **Method**: `GET`
- **Description**: Retrieves a specific transaction by its ID.

### Update a Specific Transaction

- **URL**: `/transactions/:transactionId`
- **Method**: `PUT`
- **Description**: Updates a specific transaction.
- **Request Body**:
  ```json
  {
    "account_id": "string",
    "category_id": "string",
    "amount": "number",
    "transaction_date": "date",
    "memo": "string",
    "transaction_type": "transaction_type",
    "is_recurring": "boolean",
    "frequency": "frequency_type",
    "next_occurrence_date": "date"
  }
  ```

### Delete a Specific Transaction

- **URL**: `/transactions/:transactionId`
- **Method**: `DELETE`
- **Description**: Deletes a specific transaction.

## Goals

### Get All Goals

- **URL**: `/budgets/:budgetId/goals`
- **Method**: `GET`
- **Description**: Retrieves all goals for a specific budget.

### Create a New Goal

- **URL**: `/budgets/:budgetId/goals`
- **Method**: `POST`
- **Description**: Creates a new goal in a specific budget.
- **Request Body**:
  ```json
  {
    "category_id": "string",
    "goal_name": "string",
    "target_amount": "number",
    "current_amount": "number",
    "due_date": "date"
  }
  ```

### Get a Specific Goal

- **URL**: `/goals/:goalId`
- **Method**: `GET`
- **Description**: Retrieves a specific goal by its ID.

### Update a Specific Goal

- **URL**: `/goals/:goalId`
- **Method**: `PUT`
- **Description**: Updates a specific goal.
- **Request Body**:
  ```json
  {
    "category_id": "string",
    "goal_name": "string",
    "target_amount": "number",
    "current_amount": "number",
    "due_date": "date"
  }
  ```

### Delete a Specific Goal

- **URL**: `/goals/:goalId`
- **Method**: `DELETE`
- **Description**: Deletes a specific goal.

## Notifications

### Get All Notifications

- **URL**: `/users/:userId/notifications`
- **Method**: `GET`
- **Description**: Retrieves all notifications for a user.

### Mark Notification as Read

- **URL**: `/notifications/:notificationId/read`
- **Method**: `PUT`
- **Description**: Marks a specific notification as read.

## User Settings

### Get User Settings

- **URL**: `/users/:userId/settings`
- **Method**: `GET`
- **Description**: Retrieves user settings.

### Update User Settings

- **URL**: `/users/:userId/settings`
- **Method**: `PUT`
- **Description**: Updates user settings.
- **Request Body**:
  ```json
  {
    "preferred_currency": "currency_type",
    "notification_preferences": "json"
  }
  ```

## Enumerations

### `user_role`

- `user`
- `admin

`

### `account_type`

- `savings`
- `debt`
- `investment`

### `notification_type`

- `reminder`
- `alert`
- `goal_update`

### `transaction_type`

- `expense`
- `income`
- `transfer`

### `frequency_type`

- `daily`
- `weekly`
- `biweekly`
- `monthly`
- `quarterly`
- `yearly`

### `currency_type`

- `usd`
- `eur`
- `gbp`
- `inr`
- `jpy`

### `permission_level`

- `read`
- `write`

```

This `ROUTES.md` file provides a comprehensive overview of your project's API endpoints, including the necessary request bodies for POST and PUT requests. This documentation will help me and the team understand and navigate the available routes in budget management application.