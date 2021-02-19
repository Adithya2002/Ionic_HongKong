import { Component, OnInit, Inject } from '@angular/core';

import { DishService } from 'src/app/services/dish.service';
import { Dish } from '../../shared/dish';
import { LeaderService } from 'src/app/services/leader.service';
import { Leader } from '../../shared/leader';
import { PromotionService } from 'src/app/services/promotion.service';
import { Promotion } from '../../shared/promotion';

import { baseURL } from '../../shared/baseurl';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  BaseUrl:string = baseURL;
  dishes: Dish[];
  dish:Dish;
  leader:Leader;
  promotion:Promotion;

  constructor(private dishService:DishService, private leaderService:LeaderService, private promotionService:PromotionService, @Inject('BaseURL') public BaseURL ) { }

  ngOnInit() {
    console.log('nginit of home');
    this.dishService.getDishes().subscribe((dishes) => this.dishes = dishes)
    this.dishService.getFeaturedDish().subscribe((dish) => this.dish = dish);
    this.leaderService.getFeaturedLeader().subscribe((leader) => this.leader = leader);
    this.promotionService.getFeaturedPromotion().subscribe((promotion) => this.promotion = promotion);
  }


}
