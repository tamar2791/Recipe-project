# 🍳 אפליקציית מתכונים - Recipe Management System

## תיאור הפרויקט
מערכת מקיפה לניהול מתכונים הבנויה עם Node.js ו-Angular. המערכת מאפשרת למשתמשים להוסיף, לערוך, למחוק ולצפות במתכונים עם תמיכה בקטגוריות, שכבות ומרכיבים.

## ארכיטקטורה
הפרויקט מורכב משני חלקים עיקריים:
- **Backend (Node.js)** - שרת API עם MongoDB
- **Frontend (Angular)** - ממשק משתמש

## 🛠️ טכנולוgiות

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs להצפנת סיסמאות
- CORS support

### Frontend
- Angular 18
- Angular Material
- TypeScript
- RxJS
- HTTP Client

## 📁 מבנה הפרויקט
```
פרוייקט מתכונים/
├── node/                    # Backend (Node.js)
│   ├── controllers/         # קונטרולרים
│   ├── models/             # מודלים של MongoDB
│   ├── routers/            # נתיבי API
│   ├── middleweres/        # Middleware functions
│   └── app.js              # קובץ הכניסה הראשי
├── Angular/                # Frontend (Angular)
│   ├── src/
│   │   ├── components/     # קומפוננטים
│   │   ├── pages/          # עמודים
│   │   ├── shared/         # שירותים ומודלים משותפים
│   │   └── interceptors/   # HTTP Interceptors
│   └── README.md
└── README.md               # קובץ זה
```

## 🚀 התקנה והרצה

### דרישות מוקדמות
- Node.js (גרסה 18 ומעלה)
- MongoDB
- Angular CLI

### התקנת Backend
```bash
cd node
npm install
```

### התקנת Frontend
```bash
cd Angular
npm install
```

### הרצת המערכת

#### 1. הפעלת MongoDB
ודא ש-MongoDB רץ על המחשב שלך

#### 2. הרצת השרת (Backend)
```bash
cd node
npm start
```
השרת ירוץ על: `http://localhost:5050`

#### 3. הרצת הממשק (Frontend)
```bash
cd Angular
ng serve
```
הממשק ירוץ על: `http://localhost:4200`

## 📊 מסד הנתונים

### Collections
- **users** - משתמשים
- **recipes** - מתכונים
- **categories** - קטגוריות

### מודל משתמש (User)
```javascript
{
  userName: String,
  email: String,
  password: String (מוצפן),
  address: String,
  role: String (default: 'user')
}
```

### מודל מתכון (Recipe)
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
- `POST /user/login` - התחברות
- `POST /user/register` - הרשמה

### Recipes
- `GET /recipe` - קבלת כל המתכונים
- `GET /recipe/my-recipes` - המתכונים שלי (דורש אימות)
- `GET /recipe/:id` - מתכון ספציפי
- `POST /recipe` - הוספת מתכון (דורש אימות)
- `PUT /recipe/:id` - עדכון מתכון (דורש אימות)
- `DELETE /recipe/:id` - מחיקת מתכון (דורש אימות)

### Categories
- `GET /category` - קבלת כל הקטגוריות
- `POST /category` - הוספת קטגוריה (דורש אימות)

## ✨ תכונות עיקריות

### למשתמשים לא מחוברים
- ✅ צפייה במתכונים ציבוריים
- ✅ חיפוש וסינון מתכונים
- ✅ צפייה בפרטי מתכון

### למשתמשים מחוברים
- ✅ כל התכונות של משתמש לא מחובר
- ✅ הוספת מתכונים חדשים
- ✅ עריכה ומחיקה של המתכונים שלי
- ✅ צפייה במתכונים הפרטיים שלי
- ✅ ניהול קטגוריות

### תכונות מתקדמות
- 🔒 אבטחה עם JWT
- 📱 עיצוב רספונסיבי
- 🌐 תמיכה בעברית (RTL)
- 🖼️ תמיכה בתמונות
- 📊 ניהול שכבות ומרכיבים מורכבים

## 🔧 הגדרות

### משתני סביבה (Backend)
```
JWT_SECRET=your_jwt_secret_key
MONGODB_URI=mongodb://localhost:27017/recipes
PORT=5050
```

### הגדרות Angular
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5050'
};
```

## 🤝 תרומה לפרויקט
1. Fork את הפרויקט
2. צור branch חדש (`git checkout -b feature/amazing-feature`)
3. Commit את השינויים (`git commit -m 'Add amazing feature'`)
4. Push ל-branch (`git push origin feature/amazing-feature`)
5. פתח Pull Request

## 📝 רישיון
פרויקט זה הוא לצרכי לימוד ופיתוח.

## 👨‍💻 מפתחים
- תמי - Full Stack Developer

## 📞 יצירת קשר
לשאלות ובעיות, אנא פתח issue בפרויקט.