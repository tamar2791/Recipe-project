# 🍳 Recipe Management System

## Project Description
A comprehensive recipe management system built with Node.js and Angular. The system allows users to add, edit, delete, and view recipes with support for categories, layers, and ingredients.

## Architecture
The project consists of two main parts:
- **Backend (Node.js)** - API server with MongoDB
- **Frontend (Angular)** - User interface

## 🛠️ Technologies

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs for password encryption
- CORS support

### Frontend
- Angular 18
- Angular Material
- TypeScript
- RxJS
- HTTP Client

## 📁 Project Structure
```
Recipe Project/
├── node/                    # Backend (Node.js)
│   ├── controllers/         # Controllers
│   ├── models/             # MongoDB models
│   ├── routers/            # API routes
│   ├── middleweres/        # Middleware functions
│   └── app.js              # Main entry file
├── Angular/                # Frontend (Angular)
│   ├── src/
│   │   ├── components/     # Components
│   │   ├── pages/          # Pages
│   │   ├── shared/         # Shared services and models
│   │   └── interceptors/   # HTTP Interceptors
│   └── README.md
└── README.md               # This file
```

## 🚀 Installation and Running

### Prerequisites
- Node.js (version 18 and above)
- MongoDB
- Angular CLI

### Backend Installation
```bash
cd node
npm install
```

### Frontend Installation
```bash
cd Angular
npm install
```

### Running the System

#### 1. Start MongoDB
Ensure MongoDB is running on your computer

#### 2. Run the Server (Backend)
```bash
cd node
npm start
```
Server will run on: `http://localhost:5050`

#### 3. Run the Interface (Frontend)
```bash
cd Angular
ng serve
```
Interface will run on: `http://localhost:4200`

## 📊 Database

### Collections
- **users** - Users
- **recipes** - Recipes
- **categories** - Categories

### User Model
```javascript
{
  userName: String,
  email: String,
  password: String (encrypted),
  address: String,
  role: String (default: 'user')
}
```

### Recipe Model
```javascript
{
  name: String,
  description: String,
  categories: [ObjectId],
  time: Number,
  level: Number (1-5),
  layers: [{
    description: String,
    ingredients: [String]
  }],
  instructions: [String],
  img: String,
  isPrivate: Boolean,
  owner: {
    _id: ObjectId,
    name: String
  }
}
```

## 🔐 API Endpoints

### Authentication
- `POST /user/login` - Login
- `POST /user/register` - Registration

### Recipes
- `GET /recipe` - Get all recipes
- `GET /recipe/my-recipes` - My recipes (requires authentication)
- `GET /recipe/:id` - Specific recipe
- `POST /recipe` - Add recipe (requires authentication)
- `PUT /recipe/:id` - Update recipe (requires authentication)
- `DELETE /recipe/:id` - Delete recipe (requires authentication)

### Categories
- `GET /category` - Get all categories
- `POST /category` - Add category (requires authentication)

## ✨ Main Features

### For Non-logged Users
- ✅ View public recipes
- ✅ Search and filter recipes
- ✅ View recipe details

### For Logged Users
- ✅ All features of non-logged users
- ✅ Add new recipes
- ✅ Edit and delete my recipes
- ✅ View my private recipes
- ✅ Category management

### Advanced Features
- 🔒 JWT Security
- 📱 Responsive design
- 🌐 Hebrew support (RTL)
- 🖼️ Image support
- 📊 Complex layers and ingredients management

## 🔧 Configuration

### Environment Variables (Backend)
```
JWT_SECRET=your_jwt_secret_key
MONGODB_URI=mongodb://localhost:27017/recipes
PORT=5050
```

### Angular Configuration
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5050'
};
```

## 🤝 Contributing to the Project
1. Fork the project
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit the changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License
This project is for educational and development purposes.

## 👨‍💻 Developers
- Tami - Full Stack Developer

## 📞 Contact
For questions and issues, please open an issue in the project.