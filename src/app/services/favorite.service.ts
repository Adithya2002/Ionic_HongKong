import { Injectable } from '@angular/core';

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators';

import { Dish } from '../shared/dish'
import { DishService } from './dish.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  favorites:any = [];

  constructor(private dishService:DishService) { }

  addFavorites(id:number):boolean{

    console.log(id);
    if (!this.isfavorite(id)){
      this.favorites.push(id);
    }

    console.log(this.favorites)
    return true;
  }

  isfavorite(id:number):boolean{
    return this.favorites.some(el => el === id);
  }

  getFavorites():Observable<Dish[]>{
    console.log('get favorites')
    return this.dishService.getDishes().pipe(
      map (dishes => dishes.filter(dish => this.favorites.some(
        el => el === dish.id)
      ))
    )
  }

  deleteFavorite(id:number):Observable<Dish[]>{
    let index = this.favorites.indexOf(id);
    this.favorites.splice(index, 1);
    return this.getFavorites();
  }
}
