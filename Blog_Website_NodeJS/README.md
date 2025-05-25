# Blog Website Node.js

## Overview
This project is a simple blog website built using Node.js. It allows users to create, read, update, and delete articles, as well as comment on them. The application is structured using the MVC (Model-View-Controller) pattern and utilizes a SQLite database for data storage.

## Features
- User registration and authentication (not implemented in this version)
- Create, read, update, and delete articles
- Commenting on articles
- Basic reaction system (likes, loves, etc.)
- Article status management (Draft, Published)

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)
- SQLite (for database management)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd Blog_Website_NodeJS
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Set up the database:
   - Open the `db_schema.sql` file and execute the SQL commands in your SQLite database management tool to create the necessary tables.

### Running the Application
1. Start the server:
   ```
   node src/app.js
   ```

2. Open your browser and navigate to `http://localhost:3000` to access the blog website.

## Usage
- To create a new article, navigate to the article creation page and fill out the form.
- To view articles, go to the homepage where all published articles are listed.
- Users can comment on articles by filling out the comment form on each article's page.
- Articles can be edited or deleted by the author.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any changes or improvements.

## License
This project is licensed under the MIT License. See the LICENSE file for details.