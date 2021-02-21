import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';


import { FavoriteService } from '../../services/favorite.service';
import { Dish } from '../../shared/dish'

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  favorites:Dish[];

  constructor(private favoriteService:FavoriteService, private router:Router, public toastCtrl:ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {

   }

  ngOnInit() {

      console.log('nginit of favorites');
      this.favoriteService.getFavorites().subscribe((favorites) => this.favorites = favorites );
      console.log(this.favorites);



  }



  async deleteFavorite(id:number) {

   // this.favoriteService.deleteFavorite(id).subscribe(favorites => this.favorites = favorites);

    const toast = await this.toastCtrl.create({
      message: 'Dish deleted sucessfully',
      duration: 2000
    });




    const alert = await this.alertCtrl.create({
      header: "Confirm Delete?",
      message: "Do you want to delete Dish",
      buttons:  [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Delete cancelled');
          }
        },
        {
          text: 'Delete',
          handler:async () => {
            const load = await this.loadingCtrl.create({
              message: 'Deleting...'
            })
            load.present();


            this.favoriteService.deleteFavorite(id).subscribe(favorites => {this.favorites = favorites; load.dismiss(); toast.present();});


          }
        }
      ]
    })

    alert.present()

  }

}
