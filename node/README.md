# Recipe Management API

## Project Description
A recipe management system that allows users to create, edit, and manage recipes and categories. The system includes user authentication and authorization system.

## Technologies
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT, bcryptjs
- **Other**: CORS, dotenv

## Installation and Running
```bash
npm install
npm run dev
```

## API Documentation

### 🔐 Authentication
All endpoints marked with 🔒 require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

---

## 📋 API Endpoints

### 👤 Users API (`/user`)

| Method | Endpoint | Description | Auth | Request Body | Response |
|--------|----------|-------------|------|--------------|----------|
| POST | `/user/login` | User login | ❌ | `{email, password}` | `{name, token, role}` |
| POST | `/user/register` | Register new user | ❌ | `{userName, password, email, address}` | `{name, token, role}` |
| GET | `/user/` | Get all users | ❌ | - | `[{users}]` |
| PUT | `/user/:id` | Update password | 🔒 | `{oldPassword, newPassword}` | `{message}` |
| DELETE | `/user/:id` | Delete user | 🔒 | - | `{message}` |

### 🍳 Recipes API (`/recipe`)

| Method | Endpoint | Description | Auth | Request Body | Response |
|--------|----------|-------------|------|--------------|----------|
| GET | `/recipe/` | Get all recipes (with search and pagination) | ❌ | Query: `search`, `limit`, `page` | `[{recipes}]` |
| GET | `/recipe/` | Get my recipes | 🔒 | - | `[{my recipes}]` |
| GET | `/recipe/:id` | Get recipe by ID | ❌ | - | `{recipe}` |
| GET | `/recipe/:preper-time` | Get recipes by preparation time | ❌ | `{preparTime}` | `[{recipes}]` |
| POST | `/recipe/` | Add new recipe | 🔒 | `{name, description, ingredients, instructions, preparTime, categories, isPrivate}` | `{new recipe}` |
| PUT | `/recipe/:id` | Update recipe | 🔒 | `{recipe data}` | `{updated recipe}` |
| DELETE | `/recipe/:id` | Delete recipe | 🔒 | `{_id}` | `{message}` |

### 📂 Categories API (`/category`)

| Method | Endpoint | Description | Auth | Request Body | Response |
|--------|----------|-------------|------|--------------|----------|
| GET | `/category/` | Get all categories | ❌ | - | `[{categories}]` |
| GET | `/category/` | Get categories with recipes | ❌ | - | `[{categories with recipes}]` |
| GET | `/category/:id` | Get category by ID with recipes | ❌ | - | `{category with recipes}` |

---

## 📝 Data Models

### User Model
```javascript
{
  userName: String,
  email: String,
  password: String (hashed),
  address: String,
  role: String (default: 'user')
}
```

### Recipe Model
```javascript
{
  name: String,
  description: String,
  ingredients: [String],
  instructions: [String],
  preparTime: Number,
  categories: [ObjectId],
  isPrivate: Boolean,
  owner: {
    _id: ObjectId,
    name: String
  }
}
```

### Category Model
```javascript
{
  desc: String,
  recipes: [ObjectId],
  recipesArr: [{
    _id: ObjectId,
    name: String,
    desc: String,
    ownerName: String
  }],
  recipesCount: Number
}
```

---

## 🔍 Query Parameters

### Recipes Search
- `search`: Search by recipe name
- `limit`: Maximum number of results
- `page`: Page number

**Example:**
```
GET /recipe?search=cake&limit=10&page=1
```

---

## 🚨 Error Handling

All endpoints return errors in the format:
```javascript
{
  message: "Error description",
  status: 400/401/403/404/409/500
}
```

### Status Codes
- `200` - Success
- `201` - Created successfully
- `204` - Deleted successfully
- `400` - Bad request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not found
- `409` - Conflict
- `500` - Server error

---

## 🔒 Authorization Rules

### Recipes
- **View**: All public recipes + private recipes of the logged-in user
- **Create**: Logged-in users only
- **Update**: Recipe owners only
- **Delete**: Recipe owners or admin

### Users
- **Update password**: User themselves only
- **Delete**: User themselves only

---

## 🌐 Server Configuration
- **Port**: 5000 (default) or PORT environment variable
- **Database**: MongoDB
- **CORS**: Enabled for all domains

---

## 📁 Project Structure
```
node/
├── config/
│   └── db.js
├── controllers/
│   ├── category.controller.js
│   ├── recipe.controller.js
│   └── user.controller.js
├── middleweres/
│   ├── checkAuth.middleware.js
│   └── error.middleware.js
├── models/
│   ├── category.model.js
│   ├── recipe.model.js
│   └── user.model.js
├── routers/
│   ├── category.router.js
│   ├── recipe.router.js
│   └── user.router.js
├── .env
├── app.js
└── package.json
```