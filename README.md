# Expense Tracking app idea

## Features
#### **Expense Tracking**:
- Allow users to connect to their bank account so that we can get all spending and earnings.
- Allow tracking of expenses with with categories, e.g., groceries, utilities, etc…
- Expense Visualization: Display summary statistics and visualizations (e.g., donughut charts, comparasions ...) to help users understand their spending patterns by category.

#### **Financial Markets Viewing**:

- Market Data Integration: Integrate with financial APIs to fetch market data, including stock prices, indices etc ...
- Watchlists and Favourites: Allow users to create favourite assets for quick access.

#### **Additional Features**:
- Multi-platform Support: Application is responsive to ensure accessibility across different devices and operating systems.
- Authentication: Allows users to create accounts and securely log in to the application.

## Tech Stack

1. **React Typescript with Vite**
2. **Tailwind CSS for Design**
3. **Express.js for Backend**
4. **SQL Database**

### What I Learned
- **ORM Models**: Utilized Sequelize ORM for defining and managing database models, facilitating easier data manipulation.
- **Custom Authentication Flow**: Implemented a custom authentication system, learning essential techniques for user login and session management.
- **Tailwind CSS**: Explored and implemented Tailwind CSS for styling, achieving a streamlined and responsive design.
- **Express-sessions**: Understood the main idea / concept of using sessions on the server; especially for authentication

### Problems Encountered and Changes Made
- Challenges with Authentication: Encountered difficulties in comprehending and implementing authentication processes.
- Using Express-Sessions: Express-Sessions for managing user sessions was difficult. Even with the understanding of what it does, implementation was not successful. 
- Passport.js Decision: Opted against using Passport.js initially due to complexity in integration.

### Current Problems
- **Persistent Login Sessions**: Addressing the issue of maintaining user login states over extended periods.
- **Removing Favorites**: Functionality to remove favorites from the marketview isn't working as intended; only in frontend, removing from database is as required
