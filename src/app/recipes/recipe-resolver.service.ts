import {Injectable} from '@angular/core';
import {Resolve,ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router'
import {Recipe} from './recipes.model';
import * as RecipesAction from './store/recipe.actions';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({providedIn:'root'})
export class RecipeResolverService implements Resolve<Recipe[]>{
    constructor(
        private store:Store<fromApp.AppState>,
        private actions$:Actions){}

    resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
        // const recipes=this.recipeService.getRecipes();
        // if(recipes.length===0){
        //     return this.dataStorageService.fetchRecipes();
        // }
        // else{
        //     return recipes;
        // }

        // return this.dataStorageService.fetchRecipes();
        return this.store.select('recipes').pipe(
            take(1),
            map(recipesState=>{
            return recipesState.recipes;
        }),
        switchMap(recipes=>{
            if(recipes.length===0){
                this.store.dispatch(new RecipesAction.FetchRecipes());   
                return this.actions$.pipe(
                ofType(RecipesAction.SET_RECIPES),
                take(1)
                );
        }
        else{
            return of(recipes);
        }
        })
        )
               
    }
}