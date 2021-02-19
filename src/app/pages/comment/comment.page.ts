import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { Comment } from '../../shared/comment'

@Component({
  selector: 'app-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {
  value:number;
  comment:FormGroup;

  constructor(public modalCtrl:ModalController,private formBuilder:FormBuilder ) {
    this.comment = this.formBuilder.group({
      author: '',
      rating: this.value,
      comment: '',
      date: new Date().toISOString().slice(0, 10)

    })
  }

  ngOnInit() {
  }

  dismiss(){
    this.modalCtrl.dismiss();
  }

  onSubmit() {
    //console.log(this.comment.value);
    this.modalCtrl.dismiss(this.comment.value)
  }

}
