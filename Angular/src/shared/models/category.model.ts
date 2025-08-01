import { Recipe } from './recipe.model';

// מייצג קטגוריה
export interface Category {
  _id?: string;                 // מזהה אוטומטי של מונגו
  description: string;         // שם הקטגוריה
  numrecipes?: number;         // כמה מתכונים יש בקטגוריה (לא תמיד מחזירים מהשרת)
  recipes?: string[] | Recipe[]; // רשימת מתכונים, או מזהים אם אין populate
}
