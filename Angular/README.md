# Recipe Management App - Angular Frontend

## Project Description
Angular application for recipe management with capabilities to add, edit, delete, and view recipes.

## Technologies
- Angular 18
- Angular Material
- TypeScript
- RxJS

## Installation and Running

### Prerequisites
- Node.js (version 18 and above)
- npm or yarn

### Installation
```bash
npm install
```

### Development Server
```bash
ng serve
```
The application will run on: `http://localhost:4200`

### Production Build
```bash
ng build
```

## Project Structure

### Main Components
- **LoginComponent** - System login
- **RegisterComponent** - System registration
- **AllRecipesComponent** - Display all recipes
- **RecipeDetailsComponent** - Specific recipe details
- **RecipeFormComponent** - Add and edit recipes
- **RecipeItemComponent** - Single recipe display in list
- **NavbarComponent** - Navigation menu

### Services
- **AuthService** - User authentication management
- **RecipeService** - Recipe management
- **CategoryService** - Category management

### Models
- **User** - User model
- **Recipe** - Recipe model
- **Category** - Category model

## Main Features
- ✅ Login and registration
- ✅ View recipes (including guests)
- ✅ Add recipes (logged-in users)
- ✅ Edit and delete my recipes
- ✅ Filter recipes
- ✅ Category management
- ✅ Support for layers and ingredients
- ✅ Image upload

## Environment Configuration
File `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5050'
};
```

## Routes
- `/` - Default (redirects to recipes)
- `/login` - Login
- `/register` - Registration
- `/recipes` - All recipes
- `/add` - Add new recipe
- `/recipe/:id` - Recipe details
- `/recipe-form/:id` - Edit recipe

## Security
- JWT Token authentication
- HTTP Interceptor for token sending
- Route guards (if required)

## Styling
- Angular Material Design
- Hebrew support (RTL)
- Responsive design