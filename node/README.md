# פרוייקט מתכונים - Recipe Management API

## תיאור הפרוייקט
מערכת ניהול מתכונים המאפשרת למשתמשים ליצור, לערוך ולנהל מתכונים וקטגוריות. המערכת כוללת אימות משתמשים ומערכת הרשאות.

## טכנולוגיות
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT, bcryptjs
- **Other**: CORS, dotenv

## התקנה והרצה
```bash
npm install
npm run dev
```

## API Documentation

### 🔐 Authentication
כל ה-endpoints המסומנים ב-🔒 דורשים JWT token בכותרת Authorization:
```
Authorization: Bearer <token>
```

---

## 📋 API Endpoints

### 👤 Users API (`/user`)

| Method | Endpoint | Description | Auth | Request Body | Response |
|--------|----------|-------------|------|--------------|----------|
| POST | `/user/login` | התחברות משתמש | ❌ | `{email, password}` | `{name, token, role}` |
| POST | `/user/register` | רישום משתמש חדש | ❌ | `{userName, password, email, address}` | `{name, token, role}` |
| GET | `/user/` | קבלת כל המשתמשים | ❌ | - | `[{users}]` |
| PUT | `/user/:id` | עדכון סיסמה | 🔒 | `{oldPassword, newPassword}` | `{message}` |
| DELETE | `/user/:id` | מחיקת משתמש | 🔒 | - | `{message}` |

### 🍳 Recipes API (`/recipe`)

| Method | Endpoint | Description | Auth | Request Body | Response |
|--------|----------|-------------|------|--------------|----------|
| GET | `/recipe/` | קבלת כל המתכונים (עם חיפוש ו-pagination) | ❌ | Query: `search`, `limit`, `page` | `[{recipes}]` |
| GET | `/recipe/` | קבלת המתכונים שלי | 🔒 | - | `[{my recipes}]` |
| GET | `/recipe/:id` | קבלת מתכון לפי ID | ❌ | - | `{recipe}` |
| GET | `/recipe/:preper-time` | קבלת מתכונים לפי זמן הכנה | ❌ | `{preparTime}` | `[{recipes}]` |
| POST | `/recipe/` | הוספת מתכון חדש | 🔒 | `{name, description, ingredients, instructions, preparTime, categories, isPrivate}` | `{new recipe}` |
| PUT | `/recipe/:id` | עדכון מתכון | 🔒 | `{recipe data}` | `{updated recipe}` |
| DELETE | `/recipe/:id` | מחיקת מתכון | 🔒 | `{_id}` | `{message}` |

### 📂 Categories API (`/category`)

| Method | Endpoint | Description | Auth | Request Body | Response |
|--------|----------|-------------|------|--------------|----------|
| GET | `/category/` | קבלת כל הקטגוריות | ❌ | - | `[{categories}]` |
| GET | `/category/` | קבלת קטגוריות עם מתכונים | ❌ | - | `[{categories with recipes}]` |
| GET | `/category/:id` | קבלת קטגוריה לפי ID עם מתכונים | ❌ | - | `{category with recipes}` |

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
- `search`: חיפוש לפי שם המתכון
- `limit`: מספר תוצאות מקסימלי
- `page`: מספר עמוד

**דוגמה:**
```
GET /recipe?search=עוגה&limit=10&page=1
```

---

## 🚨 Error Handling

כל ה-endpoints מחזירים שגיאות בפורמט:
```javascript
{
  message: "תיאור השגיאה",
  status: 400/401/403/404/409/500
}
```

### Status Codes
- `200` - הצלחה
- `201` - נוצר בהצלחה
- `204` - נמחק בהצלחה
- `400` - בקשה שגויה
- `401` - לא מורשה
- `403` - אסור
- `404` - לא נמצא
- `409` - קונפליקט
- `500` - שגיאת שרת

---

## 🔒 Authorization Rules

### Recipes
- **צפייה**: כל המתכונים הציבוריים + המתכונים הפרטיים של המשתמש המחובר
- **יצירה**: משתמשים מחוברים בלבד
- **עדכון**: רק בעלי המתכון
- **מחיקה**: בעלי המתכון או אדמין

### Users
- **עדכון סיסמה**: רק המשתמש עצמו
- **מחיקה**: רק המשתמש עצמו

---

## 🌐 Server Configuration
- **Port**: 5000 (default) או משתנה סביבה PORT
- **Database**: MongoDB
- **CORS**: מופעל לכל הדומיינים

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