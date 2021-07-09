import {Recipe} from './recipes.model';
import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class RecipeService{
    recipesChanged=new Subject<Recipe[]>();
    recipeselected=new EventEmitter<Recipe>();
    // private recipes:Recipe[]=[
    //     new Recipe("Recipe 1",
    //     "Tamilnadu special",
    //     "https://pixnio.com/free-images/2019/09/02/2019-09-02-08-18-26-1200x800.jpg",
    //     [
    //         new Ingredient('Air pump',1),
    //         new Ingredient('Needle',1),
    //     ]),
    //     new Recipe("Recipe 2",
    //     "Andhra special"
    //     ,"https://libreshot.com/wp-content/uploads/2016/03/football-ball-861x646.jpg",
    //     [
    //         new Ingredient('Air pump',1),
    //         new Ingredient('Needle',1),
    //     ])
    // ];

    private recipes:Recipe[]=[];

    constructor(
        private store:Store<fromApp.AppState>
    ){}

    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(ind:number){
        return this.recipes[ind];
    }

    addIngredientsToShoppingLIst(ing:Ingredient[]){
        // this.slService.addIngredients(ing);
        this.store.dispatch(new ShoppingListActions.AddIngredients(ing));
    }

    addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index:number,newRecipe:Recipe){
        this.recipes[index]=newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
    }

    setRecipes(recipes:Recipe[]){
        this.recipes=recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

}