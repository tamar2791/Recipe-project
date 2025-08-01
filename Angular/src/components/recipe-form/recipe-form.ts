import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../shared/services/recipe.service';
import { Recipe } from '../../shared/models/recipe.model';
import { CategoryService } from '../../shared/services/category.service';
import { Category } from '../../shared/models/category.model';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';



@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatDividerModule,
    MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule,
    MatSelectModule, MatButtonModule, MatCheckboxModule, MatSnackBarModule
  ],
  templateUrl: './recipe-form.html',
  styleUrl: './recipe-form.scss'
})
export class RecipeFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private recipeService = inject(RecipeService);
  private categoryService = inject(CategoryService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar)

  form!: FormGroup;
  isEditMode = false;
  recipeId: string | null = null;
  allCategories: Category[] = [];
  newCategory: string = '';

  ngOnInit() {
    this.initForm();
    this.loadCategories();

    this.recipeId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.recipeId;

    if (this.isEditMode) {
      this.recipeService.getById(this.recipeId!).subscribe(recipe => this.patchForm(recipe));
    }

  }

  private initForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      categories: [[], Validators.required],
      time: [null, [Validators.required, Validators.min(1)]],
      level: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
      layers: this.fb.array([]),
      instructions: this.fb.array([]),
      img: ['', [Validators.required, Validators.pattern(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i)]],
      isPrivate: [false]

    });

    this.addInstruction();// מתחילים עם שורה אחת
    this.addLayer(); // מתחילים עם שכבה אחת
  }

  addNewCategory() {
    const desc = this.newCategory.trim();
    if (!desc) return;
    // הוספה לקטגוריות המקומיות (לא לשרת עדיין)
    const tempId = 'new-' + Date.now();
    this.allCategories.push({ _id: tempId, description: desc });
    // סימון בבחירה
    const current = this.form.get('categories')?.value || [];
    this.form.get('categories')?.setValue([...current, tempId]);
    this.newCategory = '';
  }


  private patchForm(recipe: Recipe) {
    this.form.patchValue({
      name: recipe.name,
      description: recipe.description,
      categories: recipe.categories.map((c: any) => typeof c === 'string' ? c : c._id),
      time: recipe.time,
      level: recipe.level,
      img: recipe.img,
      isPrivate: recipe.isPrivate
    });

    // הוראות
    this.instructions.clear();
    recipe.instructions.forEach(i => this.instructions.push(this.fb.control(i)));
    // נוסיף תיבה ריקה רק אם האחרונה מלאה
    const lastInstruction = this.instructions.at(this.instructions.length - 1)
    if (!lastInstruction || lastInstruction.value.trim()) {
      this.addInstruction(); // מוסיפים שורה נוספת כדי לאפשר הוספת הוראה חדשה

    }

    // שכבות
    this.layers.clear();
    recipe.layers.forEach(layer => {
      const group = this.fb.group({
        description: [layer.description, Validators.required],
        ingredients: this.fb.array(layer.ingredients.map(i => this.fb.control(i, Validators.required)))
      });
      this.layers.push(group);
    });
    // מוסיפים שכבה ריקה נוספת רק אם האחרונה מלאה (ולא ריקה לגמרי)
    const lastLayer = this.layers.at(this.layers.length - 1);
    if (
      lastLayer &&
      lastLayer.get('description')?.value.trim() &&
      (lastLayer.get('ingredients') as FormArray).controls.some(c => c.value.trim())
    ) {
      this.addLayer();
    }
    // מוסיפים שכבה נוספת כדי לאפשר הוספת שכבה חדשה
  }

  get instructions() {
    return this.form.get('instructions') as FormArray;
  }

  get layers() {
    return this.form.get('layers') as FormArray;
  }

  getIngredients(layerIndex: number): FormArray {
    return this.layers.at(layerIndex).get('ingredients') as FormArray;
  }


  private addInstruction() {
    const last = this.instructions.at(this.instructions.length - 1);
    if (!last || last.value.trim()) {
      this.instructions.push(this.fb.control(''));
    }
  }

  onInstructionsChange(index: number) {
    const current = this.instructions.at(index);
    const next = this.instructions.at(index + 1);

    // אם יש ערך בתבה הנוכחית ואין תיבה הבאה - נוסיף
    if (current.value.trim() && !next) {
      this.addInstruction();
    }

    // אם אין ערך בתיבה הנוכחית ויש תיבה אחרי שהיא ריקה - נמחק אותה
    if (!current.value.trim() && next && !next.value.trim()) {
      this.instructions.removeAt(index + 1);
    }
  }

  addLayer() {
    const group = this.fb.group({
      description: ['', Validators.required],
      ingredients: this.fb.array([this.fb.control('', Validators.required)])
    });
    this.layers.push(group);
  }

  removeLayer(index: number) {
    this.layers.removeAt(index);
  }

  private addIngredient(layerIndex: number) {
    const ingredients = this.getIngredients(layerIndex);
    const last = ingredients.at(ingredients.length - 1);
    if (!last || last.value.trim()) {
      ingredients.push(this.fb.control(''));
    }
  }

  onIngredientChange(layerIndex: number, ingIndex: number) {
    const ingredients = this.getIngredients(layerIndex);
    const current = ingredients.at(ingIndex);
    const next = ingredients.at(ingIndex + 1);

    if (current.value.trim() && !next) {
      ingredients.push(this.fb.control(''));
    }

    if (!current.value.trim() && next && !next.value.trim()) {
      ingredients.removeAt(ingIndex + 1);
    }
  }

  private loadCategories() {
    this.categoryService.getAllCategories().subscribe(cats => {
      this.allCategories = cats;
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    // הסרת תיבות ריקות
    const cleanedInstructions = this.instructions.controls
      .map(c => c.value)
      .filter(v => v.trim());

    const cleanedLayers = this.layers.controls.map(layerGroup => ({
      description: layerGroup.get('description')?.value,
      ingredients: (layerGroup.get('ingredients') as FormArray).controls
        .map(c => c.value)
        .filter(v => v.trim())
    })).filter(l => l.description && l.ingredients.length > 0);

    const categoryValues: string[] = (this.form.get('categories')?.value || [])
      .map((catId: string) => {
        const cat = this.allCategories.find(c => c._id === catId);
        return cat ? cat.description : catId;
      });

    const data = {
      ...this.form.value,
      instructions: cleanedInstructions,
      layers: cleanedLayers,
      categories: categoryValues
    };

    const obs = this.isEditMode && this.recipeId
      ? this.recipeService.updateRecipe(this.recipeId, data)
      : this.recipeService.addRecipe(data as Recipe);


    console.log('🟡 נתונים שנשלחים:', data);


    obs.subscribe({
      next: () => {
        this.snackBar.open(
          this.isEditMode ? 'המתכון עודכן בהצלחה' : 'המתכון נוסף בהצלחה',
          'סגור',
          { duration: 3000 }
        );
        this.router.navigate(['/recipes']);
      },
      error: (err) => {
        console.error('🔴 שגיאה מהשרת:', err);
        this.snackBar.open(
          'אירעה שגיאה בעת שמירת המתכון',
          'סגור',
          { duration: 3000 });
      }

    });
  }
}


