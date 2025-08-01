import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../shared/models/recipe.model';
import { RecipeService } from '../../shared/services/recipe.service';
import { AuthService } from '../../shared/services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule,
    MatSnackBarModule, MatDialogModule],
  templateUrl: './recipe-details.html',
  styleUrl: './recipe-details.scss'
})
export class RecipeDetailsComponent implements OnInit {
  recipe!: Recipe;
  userId: string | null = null;
  categoriesNames: string = '';


  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.recipeService.getById(id).subscribe({
      next: (data) => {
        this.recipe = data;
        this.categoriesNames = this.getCategoriesNames();
      },
      error: (err) => {
        if (err.status === 404) {
          this.snackBar.open('המתכון לא נמצא', 'סגור', { duration: 3000 });
          this.router.navigate(['/recipes']);
        } else {
          this.snackBar.open('שגיאה בטעינת המתכון', 'סגור', { duration: 3000 });
        }
      }
    });

    const user = this.authService.getUser();
    this.userId = user ? user.username : null;
  }

  getDifficulityArray(): boolean[] {
    return Array.from({ length: 5 }, (_, i) => i < this.recipe.level);

  }

  isOwner(): boolean {
    if (!this.authService.isLoggedIn() || !this.recipe?.owner) {
      return false;
    }
    
    const currentUser = this.authService.getUser();
    
    // פיענוח הטוקן לקבלת ה-ID האמיתי
    let currentUserId = null;
    if (currentUser?.token) {
      try {
        const tokenPayload = JSON.parse(atob(currentUser.token.split('.')[1]));
        currentUserId = tokenPayload.id;
      } catch (e) {
        console.error('Error parsing token:', e);
      }
    }
    
    return currentUserId === this.recipe.owner._id;
  }

  deleteRecipe(templateRef?: any): void {
    if (!this.recipe._id) return;

    // פותח את הדיאלוג
    this.dialog.open(templateRef, {
      width: '300px'
    });
  }

  // פונקציה שבאמת מוחקת
  onConfirmDelete(): void {
    if (!this.recipe._id) return;

    this.recipeService.deleteRecipe(this.recipe._id).subscribe({
      next: () => {
        this.snackBar.open('המתכון נמחק בהצלחה!', 'סגור', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.dialog.closeAll();
        this.router.navigate(['/recipes']);
      },
      error: (err) => {
        this.snackBar.open('שגיאה במחיקת המתכון', 'סגור', { duration: 3000 });
        console.error(err);
      }
    });
  }


  getCategoriesNames(): string {
    if (!this.recipe?.categories) return '';
    return this.recipe.categories
      .map(c => typeof c === 'string' ? c : c.description)
      .join(', ');
  }

  editRecipe(): void {
    if (this.recipe?._id) {
      this.router.navigate(['/recipe-form', this.recipe._id]);
    }
  }

}
