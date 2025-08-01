import { HttpInterceptorFn } from '@angular/common/http';

export const recipeInterceptor: HttpInterceptorFn = (req, next) => {
  // אם זה בקשה לקבלת מתכון ספציפי
  if (req.url.includes('/recipe/') && req.method === 'GET') {
    // מחליף את הנתיב מ-/recipe/id ל-/recipe?_id=id
    const urlParts = req.url.split('/recipe/');
    if (urlParts.length === 2) {
      const id = urlParts[1];
      const newUrl = urlParts[0] + '/recipe?_id=' + id;
      const modifiedReq = req.clone({
        url: newUrl
      });
      return next(modifiedReq);
    }
  }
  
  return next(req);
};