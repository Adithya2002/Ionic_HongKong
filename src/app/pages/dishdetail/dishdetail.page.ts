import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../../services/favorite.service';
import { DishService } from '../../services/dish.service';
import { ActivatedRoute, Params } from '@angular/router'
import { ToastController, ActionSheetController, ModalController } from '@ionic/angular';

import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment'
import { CommentPage } from '../comment/comment.page'
import { switchMap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.page.html',
  styleUrls: ['./dishdetail.page.scss'],
})
export class DishdetailPage implements OnInit {

  dishid:string;
  dish:Dish;
  noOfComments:number;
  avgStars:string;
  numcomments:number;
  favorite: boolean =false;
  userInput: Comment



  constructor(
    private dishService:DishService,
    private favoriteService:FavoriteService,
    private route:ActivatedRoute,
    public toastController:ToastController,
    public actionSheetController:ActionSheetController,
    public modalController:ModalController,
    private storage:Storage
    ) {



    }

  ngOnInit() {
    console.log('nginit of dishdetail');
    this.route.params.pipe(switchMap((params:Params) =>  this.dishService.getDish(params['id'])
      )).subscribe((dish) => {
        this.dish = dish
        this.favorite = this.favoriteService.isfavorite(this.dish.id)
        this.noOfComments = this.dish.comments.length;
      let total = 0;
      this.dish.comments.forEach((comment) => total = total+ comment.rating)
      this.avgStars = (total/this.noOfComments).toFixed(2);
      this.numcomments = this.dish.comments.length;
      })
  }

  async presentActionSheet(){
    const actionSheet = await this.actionSheetController.create({
      header: 'Select options',
      buttons: [
        {
          text: 'Add to favorites',
          handler: () => this.addToFavorites()
        },
        {
          text: 'Add Comment',
          handler: () => this.openReserve()
        },
        {
          text: "Cancel",
          handler: () => actionSheet.dismiss()
        }
      ]
    })
    actionSheet.present();
  }

  async addToFavorites() {
    console.log('Adding to Favorites', this.dish.id);

    if(this.dish.id == 0){
      this.storage.set('fav0', this.dish.id)
    }
    else if (this.dish.id ==1){
      this.storage.set('fav1',this.dish.id )
    }
    else if (this.dish.id ==2){
      this.storage.set('fav2',this.dish.id )
    }
    else if (this.dish.id ==3){
      this.storage.set('fav3',this.dish.id )
    }
    this.favorite = this.favoriteService.addFavorites(this.dish.id);
    const toast = await this.toastController.create({
      message: 'Dish ' + this.dish.id + ' added as favorite successfully',
      duration: 2000,
      position: 'middle'
    })
    toast.present();
  }

  async openReserve() {

    let modal = await this.modalController.create({component: CommentPage});
    modal.onDidDismiss().then((data) => {
      this.userInput = data['data'];
      this.dish.comments.push(this.userInput)
     })

    return await modal.present()



  }

}
