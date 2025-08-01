# אפליקציית מתכונים - Angular Frontend

## תיאור הפרויקט
אפליקציית Angular לניהול מתכונים עם אפשרות להוספה, עריכה, מחיקה וצפייה במתכונים.

## טכנולוגיות
- Angular 18
- Angular Material
- TypeScript
- RxJS

## התקנה והרצה

### דרישות מוקדמות
- Node.js (גרסה 18 ומעלה)
- npm או yarn

### התקנה
```bash
npm install
```

### הרצה במצב פיתוח
```bash
ng serve
```
האפליקציה תרוץ על: `http://localhost:4200`

### בניית הפרויקט לפרודקשן
```bash
ng build
```

## מבנה הפרויקט

### קומפוננטים עיקריים
- **LoginComponent** - התחברות למערכת
- **RegisterComponent** - הרשמה למערכת
- **AllRecipesComponent** - תצוגת כל המתכונים
- **RecipeDetailsComponent** - פרטי מתכון ספציפי
- **RecipeFormComponent** - הוספה ועריכה של מתכונים
- **RecipeItemComponent** - תצוגת מתכון בודד ברשימה
- **NavbarComponent** - תפריט ניווט

### שירותים
- **AuthService** - ניהול אימות משתמשים
- **RecipeService** - ניהול מתכונים
- **CategoryService** - ניהול קטגוריות

### מודלים
- **User** - מודל משתמש
- **Recipe** - מודל מתכון
- **Category** - מודל קטגוריה

## תכונות עיקריות
- ✅ התחברות והרשמה
- ✅ צפייה במתכונים (כולל אורחים)
- ✅ הוספת מתכונים (משתמשים מחוברים)
- ✅ עריכה ומחיקה של מתכונים שלי
- ✅ סינון מתכונים
- ✅ ניהול קטגוריות
- ✅ תמיכה בשכבות ומרכיבים
- ✅ העלאת תמונות

## הגדרות סביבה
קובץ `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5050'
};
```

## נתיבים
- `/` - ברירת מחדל (מפנה ל-recipes)
- `/login` - התחברות
- `/register` - הרשמה
- `/recipes` - כל המתכונים
- `/add` - הוספת מתכון חדש
- `/recipe/:id` - פרטי מתכון
- `/recipe-form/:id` - עריכת מתכון

## אבטחה
- JWT Token authentication
- HTTP Interceptor לשליחת טוקן
- Route guards (אם נדרש)

## סגנון
- Angular Material Design
- תמיכה בעברית (RTL)
- עיצוב רספונסיבי