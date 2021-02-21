import { Injectable } from '@angular/core';

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators';

import { Storage } from '@ionic/storage';

import { Dish } from '../shared/dish'
import { DishService } from './dish.service';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  favorites:any = [];

  constructor(private dishService:DishService, private storage:Storage) { }

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
    this.storage.get('fav0').then(value => this.favorites.push(value))
    this.storage.get('fav1').then(value => this.favorites.push(value))
    this.storage.get('fav2').then(value => this.favorites.push(value))
    this.storage.get('fav3').then(value => this.favorites.push(value))
    return this.dishService.getDishes().pipe(
      map (dishes => dishes.filter(dish => this.favorites.some(
        el => el === dish.id)
      ))
    )
  }

  deleteFavorite(id:number):Observable<Dish[]>{


    let name = 'fav'+id;
    let index = this.favorites.indexOf(id);
    this.storage.get(name).then(() => {this.storage.remove(name); console.log('remove')} );
    this.favorites.splice(index, 1);
    return this.getFavorites();
  }
}
