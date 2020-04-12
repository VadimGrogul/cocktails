import { Pipe, PipeTransform } from '@angular/core';
import { IDrinksData } from "./models/all-data.model";

@Pipe({
  name: 'cocktailsCount',
  pure: false
})
export class CocktailsCountPipe implements PipeTransform {

  transform(values: IDrinksData[], ...args: unknown[]): IDrinksData[] {
    return values.filter((category: IDrinksData) => category.drinks.length);
  }

}
