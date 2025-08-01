import { Category } from './category.model';
import { User } from './user.model';

// מייצג שכבה במתכון
export interface Layer {
    description: string;       // תיאור השכבה
    ingredients: string[];     // רשימת מרכיבים
}

// מייצג מתכון כפי שמתקבל מהשרת
export interface Recipe {
    _id?: string;              // מזהה שנוצר אוטומטית
    name: string;              // שם המתכון
    description: string;       // תיאור כללי
    categories: Category[] | string[]; // תלוי אם נשלחים אובייקטים שלמים או רק מזהים
    time: number;              // זמן הכנה בדקות
    level: number;             // דרגת קושי (1-5)
    date?: string;             // תאריך יצירה, מהשרת (ISO string)
    layers: Layer[];           // שכבות (למשל: עוגת שכבות)
    instructions: string[];    // הוראות הכנה
    img?: string;              // קישור לתמונה
    isPrivate: boolean;        // האם המתכון פרטי
    createdBy: string | User;  // מזהה המשתמש שיצר או אובייקט מלא אם נעשה populate
    owner?: {
        _id: string;
        name: string;
    };                         // בעל המתכון
}

// Pagination תוצאה של חיפוש מתכונים עם 
export interface RecipeSearchResponse {
    data: Recipe[];  // המתכונים שנמצאו
    total: number;   // סך הכל מתכונים תואמים
    page: number;    // מספר העמוד הנוכחי
    limit: number;   // כמה מתכונים בעמוד
}
