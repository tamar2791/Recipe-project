import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RecipeItemComponent } from '../../components/recipe-item/recipe-item';
import { RecipeService } from '../../shared/services/recipe.service';
import { CategoryService } from '../../shared/services/category.service';
import { AuthService } from '../../shared/services/auth.service';
import { Recipe } from '../../shared/models/recipe.model';
import { Category } from '../../shared/models/category.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-all-recipes',
  standalone: true,
  imports: [RecipeItemComponent, MatProgressSpinnerModule,
    MatIconModule,
    CommonModule, FormsModule, MatFormFieldModule, MatSelectModule,
    MatInputModule, MatButtonModule, MatCardModule, RouterModule
  ],
  templateUrl: './all-recipes.html',
  styleUrl: './all-recipes.scss'
})
export class AllRecipesComponent {
  private recipeService = inject(RecipeService);
  private categoryService = inject(CategoryService);
  private authService = inject(AuthService);

  recipes: Recipe[] = [];
  categories: any;//Category[] = [];
  allFilteredRecipes: Recipe[] = [];

  search: string = '';
  selectedCategory: string = '';
  selectedMaxTime: number | null = null;
  showMyRecipes = false;

  page = 1;
  limit = 10;
  total = 0;
  isLoading = false;



  ngOnInit() {
    this.loadCategories();
    this.loadRecipes();
  }

  loadCategories() {
    this.categories = this.categoryService.getAllCategories();
    // .subscribe({
    //   next: (res) => this.categories = res,
    //   error: (err) => console.error('Error loading categories:', err)
    // });
  }

  loadRecipes() {
    if (this.isLoading || (this.recipes.length >= this.total && this.total !== 0))
      // אם כבר טוענים או שאין עוד מתכונים להציג
      return;

    this.isLoading = true;

    const isClientSideFiltering = this.selectedCategory || this.selectedMaxTime !== null;
    const effectiveLimit = isClientSideFiltering ? 1000 : this.limit; // אם יש סינון, נשתמש ב-limit גבוה


    // בחירת השירות המתאים
    const recipeObservable = this.showMyRecipes 
      ? this.recipeService.getMyRecipes()
      : this.recipeService.getAllRecipes(this.search, this.page, effectiveLimit);

    recipeObservable.subscribe({
      next: (res: Recipe[]) => {
        let filtered = res;
        // סינון לפי קטגוריה אם נבחרה
        if (isClientSideFiltering) {
          if (this.selectedCategory) {
            // אם נבחרה קטגוריה, נסנן את המתכונים לפי הקטגוריה

            filtered = filtered.filter((recipe: Recipe) =>
              recipe.categories.some((category: any) => category === this.selectedCategory)
            );
          }

          // סינון לפי זמן מקסימלי אם נבחר
          if (this.selectedMaxTime !== null) {
            filtered = filtered.filter((recipe: Recipe) => recipe.time <= this.selectedMaxTime!);
          }
          // שמירה של המתכונים המסוננים
          this.allFilteredRecipes = filtered;
          // עדכון סך הכל מתכונים
          this.total = filtered.length;
          // עימוד ידני של כל המתכונים המסוננים
          const start = (this.page - 1) * this.limit;
          const end = start + this.limit;
          const pagedRecipes = filtered.slice(start, end);

          this.recipes.push(...pagedRecipes);
        } else {
          this.recipes.push(...filtered);
          this.total = filtered.length;
        }

        this.page++;
        // עדכון מצב טעינה
        this.isLoading = false;
      },
      error: (err: any) => {
        if (err.status === 401 && this.showMyRecipes) {
          alert('אתה צריך להתחבר כדי לראות את המתכונים שלך');
          this.showMyRecipes = false;
          this.onFilterChange();
        } else {
          console.error('שגיאה בטעינת המתכונים:', err);
        }
        this.isLoading = false;
      }
    });
  }
  onScroll() {
    // פונקציה זו תופעל כאשר המשתמש גולל למטה
    this.loadRecipes();
  }

  onFilterChange() {
    this.page = 1;
    this.recipes = [];
    this.total = 0;
    this.allFilteredRecipes = [];
    this.loadRecipes();
  }

  toggleMyRecipes() {
    this.showMyRecipes = !this.showMyRecipes;
    this.onFilterChange();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}