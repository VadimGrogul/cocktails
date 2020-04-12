export interface IDrinksData {
  title: string,
  drinks: IDrink[]
}

export interface IFilterItem {
  strCategory: string
}

export interface IFilterFields {
  title: string,
  isChecked: boolean
}

export interface IDrink {
  strDrink: string,
  strDrinkThumb: string,
  idDrink?: number
}
