import { Component, OnInit } from '@angular/core';
import { CocktailsService } from "./services/cocktails.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public isLoading = true;
  constructor(private cocktailsService: CocktailsService) {}

  ngOnInit(): void {
    this.cocktailsService.isLoadInitData.subscribe(isReady => {
      isReady ? this.isLoading = false : true;
    })
  }
}
