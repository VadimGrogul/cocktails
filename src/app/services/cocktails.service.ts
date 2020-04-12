import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, Subject } from "rxjs";
import { pluck } from "rxjs/operators";
import { IDrinksData, IFilterFields, IFilterItem } from "../models/all-data.model";

@Injectable({ providedIn: 'root' })

export class CocktailsService {
  private filterUrlList = 'https://www.thecocktaildb.com/api/json/v1/1/list.php';
  private categoryDrinksUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php';

  public mainDataList: IDrinksData[] = [];
  public filters: IFilterItem[];
  public isLoadInitData: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public mainDataSubj: Subject<IDrinksData[]> = new Subject();

  constructor(private http: HttpClient) {
    this.getInitialData();
  }

  getInitialData(): void {
    this.getFilters()
      .subscribe(filters => {
        this.filters = filters;
        filters.forEach((filter: IFilterItem) => {
          this.mainDataList.push({
            title: filter.strCategory,
            drinks: []
          });
        });
        this.isLoadInitData.next(true);
      });
  }

  getCategoryData(idx) {
    const categoryName = this.mainDataList[idx].title;
    return this.getCocktailsByCategory(categoryName)
      .subscribe(categoryDrinks => {
        this.mainDataList[idx].drinks = categoryDrinks.drinks;

        // after get new data, we past it on subject, to get this data on list component
        this.mainDataSubj.next(this.mainDataList);
      })
  }

  getFilters(): Observable<any> {
    return this.http.get(`${this.filterUrlList}?c=list`)
      .pipe(pluck('drinks'));
  }

  getCocktailsByCategory(filterName: string): Observable<any> {
    return this.http.get(`${this.categoryDrinksUrl}?c=${filterName}`);
  }

  applyFilter(fields: IFilterFields[]) {
    this.isLoadInitData.next(false);

    // here we rewrite our drinks array, and past there new filtered categories
    this.mainDataList.splice(0, this.mainDataList.length);
    fields.forEach((filter, i) => {
      this.mainDataList.push({
        title: filter.title,
        drinks: []
      });
    });

    // load first category drinks for first initialization after filter apply
    this.getCategoryData(0);
  }
}
