import { Component, OnInit } from '@angular/core';
import { CocktailsService } from "../services/cocktails.service";
import { IFilterFields } from "../models/all-data.model";


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  public filterFields: IFilterFields[] = [];

  constructor(public cocktailsService: CocktailsService) { }

  ngOnInit(): void {
    this.cocktailsService.isLoadInitData.subscribe(isLoad => {
      if (isLoad) {
        this.getData();
      }
    })
  }

  getData() {
    this.cocktailsService.filters.forEach(filter => {
      this.filterFields.push({
        title: filter.strCategory,
        isChecked: true
      })
    })
  }

  applyFilter() {
    this.cocktailsService.applyFilter(this.filterFields.filter(field => field.isChecked));
  }

}
