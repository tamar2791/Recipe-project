import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Category } from "../models/category.model";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class CategoryService {
    private apiUrl = `${environment.apiUrl}/category`;


    constructor(private http: HttpClient) { }

    // קבלת כל הקטגוריות
    getAllCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(`${this.apiUrl}`);
    }

    // קבלת קטגוריה לפי מזהה
    getCategoryById(id: string): Observable<Category> {
        return this.http.get<Category>(`${this.apiUrl}/${id}`);
    }
}
