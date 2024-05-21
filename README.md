# Expense Tracking app idea

## Features of the system

### Authentication

- Allow users to create accounts and securely log in to the application. Decide if we’re going to implement it ourselves or use a third party.

### **Expense Tracking**:

- Allow users to connect to their bank account so that we can get all spending and earnings.
- Allow tracking of expenses with with categories, e.g., groceries, utilities, etc…
- Expense Visualization: Display summary statistics and visualizations (e.g., pie charts, bar graphs) to help users understand their spending patterns over time and by category.

### **Financial Markets Viewing**:

- Market Data Integration: Integrate with financial data providers or APIs to fetch real-time market data, including stock prices, indices, currency exchange rates, and commodities.
- Watchlists and Favourites: Allow users to create watchlists of stocks or other financial instruments they're interested in tracking and mark favourite assets for quick access.
- Portfolio Integration (Optional): allow users to link their investment portfolios to the application to track overall portfolio performance alongside market data.

### **Additional Features**:

- Personalized Recommendations: Offer personalized recommendations and insights based on users' spending habits, financial goals, and market interests.
- Multi-platform Support: Develop the application as a web platform and/or mobile app to ensure accessibility across different devices and operating systems.

## Pushing Limits → **Expense Logging with NLP**

- Allow users to input expenses using natural language commands or text input.
- Implement a parser that can extract relevant information from user input, such as the amount spent, category, and date.
- For example, a user might input "Spent $50 on groceries yesterday," and the parser would extract "$50" as the amount, "groceries" as the category, and "yesterday" as the date.

# Tech Stack

1. **React with Vite**: Using React with Vite is a great choice for frontend development. Vite offers fast development and hot module replacement, making the development process efficient.
2. **Tailwind CSS for Design**: Tailwind CSS is an excellent choice for quickly styling your application with utility-first CSS classes. It provides flexibility and efficiency in designing user interfaces.
3. **Express.js for Backend**: Express.js is a lightweight and flexible framework for building backend services in Node.js. It's well-suited for small to medium-sized applications and offers robust middleware support for handling HTTP requests and routing.
4. P**ostgreSQL for database:** This approach would offer more flexibility and control over your application's architecture while minimizing dependencies on external services.
5. **Passport.js with JWT for authentication**: Integrating Google authentication with Passport.js  middleware is straightforward and well-documented.


### Problems and overall idea changes

- Chose not to use passport js for now due to difficulty  in implementation
- Using sequelize ORM which helps me build different models, to make it easier to implement in database
- Using bcrypt to manually encrypt passwords 
- Learning about good methods of implementing databases and how to work around auth
- Authentication has been very difficult in terms of understanding and implementation 
- Understanding express-sessions better and how to use them