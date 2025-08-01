import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Recipe } from "../models/recipe.model";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class RecipeService {
    private apiUrl = `${environment.apiUrl}/recipe`;

    constructor(private http: HttpClient) { }

    // קבלת כל המתכונים
    getAllRecipes(search: string = '', page: number = 1, limit: number = 10): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(`${this.apiUrl}?search=${search}&limit=${limit}&page=${page}`);
    }

    // קבלת מתכון לפי מזהה
    getById(id: string): Observable<Recipe> {
        return this.http.get<Recipe>(`${this.apiUrl}/${id}`);
    }

    // קבלת מתכונים לפי זמן הכנה
    getByPreparTime(preparTime: number): Observable<Recipe[]> {
        return this.http.post<Recipe[]>(`${this.apiUrl}/preper-time`, { preparTime });
    }

    // הוספת מתכון
    addRecipe(recipe: Recipe): Observable<Recipe> {
        return this.http.post<Recipe>(this.apiUrl, recipe);
    }

    // עדכון מתכון
    updateRecipe(id: string, recipe: Partial<Recipe>): Observable<Recipe> {
        return this.http.put<Recipe>(`${this.apiUrl}/${id}`, { ...recipe, _id: id });
    }

    // מחיקת מתכון
    deleteRecipe(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`, {
            body: { _id: id }
        });
    }

    // קבלת המתכונים של המשתמש המחובר
    getMyRecipes(): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(`${this.apiUrl}/my-recipes`);
    }
}