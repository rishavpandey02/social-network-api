# Social Network API Readme

## Description
This project provides an API for a basic social network, allowing users to interact through a variety of endpoints. You can create, read, update, and delete user profiles, thoughts, and reactions. Additionally, you can add or remove friends from a user's friend list.

---

## Table of Contents

- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Endpoints](#endpoints)
- [Contributors](#contributors)
- [License](#license)

---

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- Moment
- nodemon

---

## Installation

### Prerequisites
- Node.js
- MongoDB

1. Clone the repository:

```
git clone https://github.com/your-username/social-network-api.git
```

2. Navigate to the project directory:

```
cd social-network-api
```

3. Install dependencies:

```
npm install
```

4. Start the server:

```
npm start
```

---

## Usage

After running `npm start`, the server will start, and Mongoose models will be synced to the MongoDB database.

You can then use API testing tools like Insomnia or Postman to test the various endpoints.

---

## Testing

### Acceptance Criteria

- **Start Server and Connect to DB**
  - Run the `npm start` command, and the server will start running. The Mongoose models are automatically synced to MongoDB.

- **GET Routes**
  - Opening API GET routes for users and thoughts in Insomnia will display the data in formatted JSON.

- **POST, PUT, DELETE Routes**
  - Test API POST, PUT, and DELETE routes in Insomnia to create, update, and delete users and thoughts.

- **POST and DELETE Reactions and Friends**
  - Test API POST and DELETE routes in Insomnia to create and delete reactions to thoughts, and add or remove friends to/from a user's friend list.

---

## Endpoints

### Users

- GET all users: `/api/users`
- GET single user by ID: `/api/users/:id`
- POST new user: `/api/users`
- PUT update user: `/api/users/:id`
- DELETE user: `/api/users/:id`

### Thoughts

- GET all thoughts: `/api/thoughts`
- GET single thought by ID: `/api/thoughts/:id`
- POST new thought: `/api/thoughts`
- PUT update thought: `/api/thoughts/:id`
- DELETE thought: `/api/thoughts/:id`

### Reactions (Subdocument in Thoughts)

- POST new reaction: `/api/thoughts/:thoughtId/reactions`
- DELETE reaction: `/api/thoughts/:thoughtId/reactions/:reactionId`

### Friends (Subdocument in Users)

- POST add friend: `/api/users/:userId/friends/:friendId`
- DELETE remove friend: `/api/users/:userId/friends/:friendId`

---

## Contributors
- [Rishav Pandey](https://github.com/rishavpandey02)

Happy coding! :)