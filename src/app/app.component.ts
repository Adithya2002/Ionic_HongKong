import { prepareSyntheticListenerFunctionName } from '@angular/compiler/src/render3/util';
import { Component } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { ReservationPage } from './pages/reservation/reservation.page'
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  // public appPages = [
  //   { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
  //   { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
  //   { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
  //   { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
  //   { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
  //   { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  // ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  public pages = [
    { title: 'home', url: '/home', icon: 'home' },
    { title: 'about', url: '/about', icon: 'information-circle' },
    { title: 'contact', url: '/contact', icon: 'call' },
    { title: 'menu', url: '/menu', icon: 'grid' },
    { title: 'favorites', url: '/favorites', icon: 'heart'},
    { title: 'reservation', url:'/reservation', icon:'restaurant'}

  ];

  constructor(public modalController: ModalController) {}

  async openReserve() {

    let modal = await this.modalController.create({component: ReservationPage});
    return await modal.present()
  }
}
