import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

export class ShoppingListService{
    ingredientsChanged=new Subject<Ingredient[]>();
    startedEditing=new Subject<number>();
    private ingredients:Ingredient[]=[new Ingredient("Grapes",10),new Ingredient("Jackfruit",15)];

    getIngredients(){
        return this.ingredients.slice();  
    }

    getIngredient(index:number){
        return this.ingredients[index];
    }

    addIngredient(ing:Ingredient){
        this.ingredients.push(ing);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    addIngredients(ing:Ingredient[]){
        this.ingredients.push(...ing);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredient(index:number,newIngredient:Ingredient){
        this.ingredients[index]=newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index:number){
        this.ingredients.splice(index,1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}