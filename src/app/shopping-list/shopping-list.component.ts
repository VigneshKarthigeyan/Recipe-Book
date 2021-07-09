import { Component, OnInit,OnDestroy } from '@angular/core';
import {Subscription,Observable} from 'rxjs';
import {Ingredient} from '../shared/ingredient.model';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients:Observable<{ingredients:Ingredient[]}>;
  // private subscription:Subscription;

  constructor(
    private store:Store<fromApp.AppState>
    ) { }

  ngOnInit(){
    this.ingredients=this.store.select('shoppingList')
    // this.ingredients=this.slService.getIngredients();
    // this.subscription=this.slService.ingredientsChanged.subscribe(
    //   (ing:Ingredient[])=>{
    //     this.ingredients=ing;
    //   }
    // )
  }

  // ngOnDestroy(){
  //   this.subscription.unsubscribe();
  // }

  // onIngredientAdded(ing:Ingredient){
  //    this.ingredients.push(ing);

  // }

  onEditItem(index:number){
    // this.slService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

}
