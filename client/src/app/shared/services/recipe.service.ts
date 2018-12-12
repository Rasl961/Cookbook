import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../interfaces/recipe';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  getRecipes() {
    return this.http.get ('http://localhost:3000/api/recipes');
  }

  createRecipe(recipe) {
    return this.http.post ('http://localhost:3000/api/recipes/create', recipe);
  }

  deleteRecipe(id) {
    return this.http.delete ('http://localhost:3000/api/recipes/delete/' + `${id}`);
  }
  editRecipe(id, recipe): Observable<Recipe> {
    return this.http.patch<Recipe> ('http://localhost:3000/api/recipes/edit/' + `${id}`, recipe);
  }
}
