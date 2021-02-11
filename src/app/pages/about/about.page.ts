import { Component, OnInit } from '@angular/core';

import { LeaderService } from '../../services/leader.service'
import { Leader } from '../../shared/leader'

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  leaders: Leader[]

  constructor( private leaderService:LeaderService) { }

  ngOnInit() {
    this.leaderService.getLeaders().subscribe((leaders) => this.leaders = leaders);
  }

}
