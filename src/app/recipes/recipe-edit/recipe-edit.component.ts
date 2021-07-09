import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute,Params,Router} from '@angular/router';
import {FormGroup,FormControl,FormArray,Validators} from '@angular/forms';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as fromApp from '../../store/app.reducer';
import * as RecipeActions from '../store/recipe.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit,OnDestroy {
  id:number;
  editMode=false;
  recipeForm:FormGroup;

  private storeSub:Subscription;


  constructor(
    private route:ActivatedRoute
    ,private router:Router
    ,private store:Store<fromApp.AppState>) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params)=>{
        this.id=+params['id'];
        this.editMode=params['id'] !=null;
        this.initForm();
      }
    );
  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }

  onSubmit(){
    // const newRecipe=new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']
    // )
    if(this.editMode){
      // this.recipeService.updateRecipe(this.id,newRecipe);
      
      console.log(this.recipeForm.value);
      this.store.dispatch(new RecipeActions.UpdateRecipe(
        {index:this.id,
        newRecipe:this.recipeForm.value        
        }
      ));
    }
    else{
      // this.recipeService.addRecipe(newRecipe);
      this.store.dispatch(new RecipeActions.AddRecipe(this.recipeForm.value));
    }
    this.onCancel();
  }

  private initForm(){
    let recipeName='';
    let recipeImagePath='';
    let recipeDescription='';
    let recipeIngredients=new FormArray([]);

    if(this.editMode)
    {
      // const recipe=this.recipeService.getRecipe(this.id);
      this.storeSub=this.store.select('recipes').pipe(
        map(recipesState=>{
          return recipesState.recipes.find((recipe,index)=>{
            return index===this.id;
          });
        })
      )
      .subscribe(recipe=>{
        recipeName=recipe.name;
      recipeImagePath=recipe.imagePath;
      recipeDescription=recipe.description;
      if(recipe['ingredients']){
        for (let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name':new FormControl(ingredient.name,Validators.required),
              'amount':new FormControl(ingredient.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
      });
      
    }
    
    this.recipeForm=new FormGroup({
      'name':new FormControl(recipeName,Validators.required),
      'imagePath':new FormControl(recipeImagePath,Validators.required),
      'description':new FormControl(recipeDescription,Validators.required),
      'ingredients':recipeIngredients
    });
  }
  get ingredientControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name':new FormControl(null,Validators.required),
        'amount':new FormControl(null,[
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  
ngOnDestroy(){
  if(this.storeSub){
    this.storeSub.unsubscribe();
  }
  
}
}