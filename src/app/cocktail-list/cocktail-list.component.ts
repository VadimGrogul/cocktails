import { Component, HostListener, OnInit } from '@angular/core';

import { CocktailsService } from "../services/cocktails.service";
import { IDrinksData } from "../models/all-data.model";

@Component({
  selector: 'app-cocktail-list',
  templateUrl: './cocktail-list.component.html',
  styleUrls: ['./cocktail-list.component.scss']
})
export class CocktailListComponent implements OnInit {

  public drinksData: IDrinksData[];

  public categoryCount = 0;
  public isLoading = true;

  constructor(public cocktailsService: CocktailsService) { }

  ngOnInit(): void {
    this.cocktailsService.isLoadInitData.subscribe(isLoad => {
      if (isLoad) {
        this.loadCategory();
      } else {
        this.categoryCount = 1;
        this.isLoading = true;
      }
    });

    // if data will change we get it from subject that init in service
    this.cocktailsService.mainDataSubj.subscribe((drinks: IDrinksData[]) => {
      this.drinksData = drinks;
      this.isLoading = false;
    })
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    const document = event.target.documentElement;

    // this for scroll pagination
    if (this.categoryCount !== this.drinksData.length && !this.isLoading) {
      if ((document.scrollTop + document.clientHeight) === document.scrollHeight && !this.isLoading) {
        this.isLoading = true;
        this.loadCategory();
      }
    }
  }

  loadCategory() {
    this.isLoading = true;
    this.cocktailsService.getCategoryData(this.categoryCount);
    this.categoryCount += 1;
  }

}
