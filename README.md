# Expense Tracking app idea

## Features of the system

### Authentication

- Allows users to create accounts and securely log in to the application.

### **Expense Tracking**:

- Allow users to connect to their bank account so that we can get all spending and earnings.
- Allow tracking of expenses with with categories, e.g., groceries, utilities, etc…
- Expense Visualization: Display summary statistics and visualizations (e.g., donughut charts, comparasions ...) to help users understand their spending patterns by category.

### **Financial Markets Viewing**:

- Market Data Integration: Integrate with financial APIs to fetch market data, including stock prices, indices etc ...
- Watchlists and Favourites: Allow users to create favourite assets for quick access.

### **Additional Features**:
- Multi-platform Support: Application is responsive to ensure accessibility across different devices and operating systems.

# Tech Stack

1. **React Typescript with Vite**
2. **Tailwind CSS for Design**.
3. **Express.js for Backend**
4. **SQL Database:**

### What I learned
- Tailwind css
- The idea and use of ORM models
- Implementing custom authentication flow

### Problems and overall idea changes

- Chose not to use passport js for now due to difficulty  in implementation
- Using sequelize ORM which helps me build different models, to make it easier to implement in database
- Using bcrypt to manually encrypt passwords 
- Learning about good methods of implementing databases and how to work around auth
- Authentication has been very difficult in terms of understanding and implementation 
- Understanding express-sessions better and how to use them

### Current Problems
- Remembering logged in user for an extended period of time
- Removing favourites correctly in the market view section


### What I Learned
- **Tailwind CSS**: Explored and implemented Tailwind CSS for styling, achieving a streamlined and responsive design.
- **ORM Models**: Utilized Sequelize ORM for defining and managing database models, facilitating easier data manipulation.
- **Custom Authentication Flow**: Implemented a custom authentication system, learning essential techniques for user login and session management.
Database Implementation: Gained insights into effective database strategies and authentication methods.

### Problems Encountered and Changes Made
Passport.js Decision: Opted against using Passport.js initially due to complexity in integration.
Challenges with Authentication: Encountered difficulties in comprehending and implementing authentication processes.
Understanding Express-Sessions: Improved understanding and usage of Express-Sessions for managing user sessions.

### Current Challenges
Persistent Login Sessions: Addressing the issue of maintaining user login states over extended periods.
Removing Favorites: Implementing correct functionality to remove favorites within the market view section.