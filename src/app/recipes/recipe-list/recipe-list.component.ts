import { Component, OnInit,OnDestroy} from '@angular/core';

import {Recipe} from '../recipes.model';
import { ActivatedRoute,Router } from '@angular/router';
import {Subscription} from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
  recipes:Recipe[];
  subscription:Subscription;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private store:Store<fromApp.AppState>) { }

  ngOnInit(){
    this.subscription=this.store.select('recipes')
    .pipe(map(recipesState=>recipesState.recipes))
    .subscribe(
      (recipes:Recipe[])=>{
        this.recipes=recipes;
      }
    )
  }

  onNewRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route});
  }
  
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
