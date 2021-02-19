import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';

import { DishService } from '../../services/dish.service';

import { DishdetailPage } from '../dishdetail/dishdetail.page';
import { Dish } from '../../shared/dish';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  dishes:Dish[];

  constructor(private dishService:DishService, ) { }

  ngOnInit() {
    console.log('nginit of menu');
    this.dishService.getDishes().subscribe((dishes) => this.dishes = dishes );
  }



}
