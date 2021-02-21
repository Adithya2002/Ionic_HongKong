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

  addFavorite(id: number): boolean {
    if (!this.isfavorite(id))
      this.favorites.push(id);
      if(id ==0)this.storage.set('fav0', id);
      if(id ==1)this.storage.set('fav1', id);
      if(id ==2)this.storage.set('fav2', id);
      if(id ==3)this.storage.set('fav3', id);
    console.log('favorites', this.favorites);
    this.getFavorites();
    return true;
  }

  isfavorite(id:number):boolean{
    return this.favorites.some(el => el === id);
  }


  getFavorites(): Observable<Dish[]> {
    this.storage.get('fav0').then(value => this.favorites.push(value))
    this.storage.get('fav1').then(value => this.favorites.push(value))
    this.storage.get('fav2').then(value => this.favorites.push(value))
    this.storage.get('fav3').then(value => this.favorites.push(value))
    return this.dishService.getDishes().pipe(
      map(dishes => dishes.filter(dish => this.favorites.some(el => el === dish.id))));
  }

  deleteFavorite(id: number): Observable<Dish[]> {
    if(id ==0)this.storage.remove('fav0');
    if(id ==1)this.storage.remove('fav1');
    if(id ==2)this.storage.remove('fav2');
    if(id ==3)this.storage.remove('fav3');
    let index = this.favorites.indexOf(id);
    if (index >= 0) {
      this.favorites.splice(index,1);
      return this.getFavorites();
    }
    else {
      console.log('Deleting non-existant favorite', id);
      return Observable.throw('Deleting non-existant favorite' + id);
    }
  }
}
