
// מייצג את המשתמשים כפי שמתקבלים מהשרת
export interface User {
    _id?: string; // מונגו יוצר מזהה, הוא לא חובה כששולחים בקשה
    username: string;
    email: string;
    address: string;
    role: 'admin' | 'guest_user' | 'registered_user'; // שלושת סוגי המשתמשים האפשריים
    // סיסמה לא מופיעה כאן כי היא לא נשלחת חזרה מהשרת
}

// תשובה מהשרת בזמן התחברות או הרשמה
export interface AuthResponse {
    username: string; // שם המשתמש המחובר
    userId: string;
    token: string;    // טוקן לצורך אימות (JWT)
}
