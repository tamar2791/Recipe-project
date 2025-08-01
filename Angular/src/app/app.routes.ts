import { Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/login';
import { RegisterComponent } from '../pages/register/register';
import { AllRecipesComponent } from '../pages/all-recipes/all-recipes';
import { RecipeFormComponent } from '../components/recipe-form/recipe-form';
import { RecipeDetailsComponent } from '../components/recipe-details/recipe-details';
// import { NavbarComponent } from '../components/navbar/navbar';

export const routes: Routes = [
    { path: '', redirectTo: 'recipes', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'recipes', component: AllRecipesComponent },
    { path: 'add', component: RecipeFormComponent },
    { path: 'recipe-form/:id', component: RecipeFormComponent },
    { path: 'recipe/:id', component: RecipeDetailsComponent },
    // { path: 'navbar', component: NavbarComponent },


];
