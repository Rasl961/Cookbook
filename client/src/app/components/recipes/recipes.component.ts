import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { Recipe } from '../../shared/interfaces/recipe';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
 public modalRef: BsModalRef;
 public recipeForm: FormGroup;
 public editRecipeForm: FormGroup;

 public recipes: any;
 public selectedRecipe: any;
 public searchText: string;

 constructor(private modalService: BsModalService, private recipeService: RecipeService) {}

 ngOnInit() {
   this.getRecipes();
  this.recipeForm = new FormGroup({
    'name': new FormControl(null, [Validators.required]),
    'description': new FormControl(null, [
      Validators.required
    ]),
  });
}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openEditModal(editRecipePopUp: TemplateRef<any>, recipe) {
    this.selectedRecipe = recipe;
    this.recipeForm.setValue({
      name: this.selectedRecipe.name,
      description: this.selectedRecipe.description
    });
    this.modalRef = this.modalService.show(editRecipePopUp);
  }

  getRecipes() {
    this.recipeService.getRecipes().subscribe(data => {
      console.log(data);
      this.recipes = data;
    });
  }

  onSubmit() {
    const recipe = {
      name: this.recipeForm.value.name,
      description: this.recipeForm.value.description
    };
     this.recipeForm.disable();
    this.recipeService.createRecipe(recipe).subscribe(data => {
      this.recipes.push(data);
      this.modalRef.hide();
      this.ngOnInit();
    },
      error => {
        console.error(error);
      });
  }

  deleteRecipe(id) {
    this.recipeService.deleteRecipe(id).subscribe(data => {
    });
    this.recipes = this.recipes.filter(recipe => recipe._id !== id);
  }

  editRecipe() {
    const recipe = {
      name: this.recipeForm.value.name,
      description: this.recipeForm.value.description
    };
   this.recipeService.editRecipe(this.selectedRecipe._id, recipe).subscribe(data => {
      this.modalRef.hide();
      this.getRecipes();
   });
  }
}
