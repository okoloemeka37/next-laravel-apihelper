# Next Laravel API Helper

## Introduction
**Next Laravel API Helper** is a simple and efficient TypeScript library for interacting with Laravel APIs in Next.js applications. It provides a structured way to make HTTP requests with built-in authentication handling, error management, and support for common API operations.

## Features
- 🔹 **Easy API Calls**: Simplifies GET, POST, PUT, and DELETE requests.
- 🔹 **Authentication Support**: Includes token-based authentication.
- 🔹 **Error Handling**: Automatically catches and logs API errors.


## Installation
```sh
npm install next-laravel-apihelper
```
Or using Yarn:
```sh
yarn add next-laravel-apihelper
```

## Setup
### 1️⃣ Configure API Base URL
Ensure you set your **API base URL** in your **.env.local** file:
```sh
NEXT_PUBLIC_API_URL=https://your-laravel-api.com/api
```

### 2️⃣ Import and Use the Library
#### Example: Fetching Users
```ts
import { api } from "next-laravel-apihelper";

async function fetchUsers() {
  try {
    const users = await api.get("/users");
    console.log(users);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}
```

#### Example: Creating a User
```ts
async function createUser() {
  try {
    const response = await api.post("/users", {
      name: "John Doe",
      email: "john@example.com",
    });
    console.log("User Created:", response);
  } catch (error) {
    console.error("Error creating user:", error);
  }
}
```

## Authentication
it dynamically authenticate users using 'authToken' from localStorage

## Error Handling
Errors are automatically handled, but you can also customize error messages:
```ts
api.setErrorHandler((error) => {
  console.error("Custom Error:", error.message);
});
```

## Project Showcase 🎉
Check out the **Admin Dashboard Project** demonstrating this library in action! It features:
- **User Management** (Add, Edit, Delete Users)
- **Tailwind Styled UI**
- **NEXT.JS API Integration with Laravel Backend**

🔗 [Live Demo](https://admin-dashboard-project-w4rw.onrender.com)  
📂 [Source Code](Frontend:(https://github.com/okoloemeka37/Admin-Dashboard-Project)Backend:(https://github.com/okoloemeka37/laravel-backend-for-Admin-Dashboard-Project))

## Contributing
We welcome contributions! Feel free to fork this repository, submit issues, or create pull requests.

## License
MIT License. See `LICENSE` file for details.

