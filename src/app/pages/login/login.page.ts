import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { User } from '../../shared/user';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm:FormGroup;
  user :User = {username:'',password:''};

  constructor(private formBuilder: FormBuilder,
    private storage: Storage,public modalCtrl:ModalController) {
      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        remember: true
      })

      storage.get('user').then(user =>
        {
          if(user){
            this.loginForm.patchValue({
              'username': this.user.username,
              'password': this.user.password
            })
          }
          else{
            console.log('not logging in');
          }
        }
        )



     }

  ngOnInit() {
  }

  dismiss(){
    this.modalCtrl.dismiss({'dismissed': true});
  }

  onSubmit() {
    this.user.username = this.loginForm.get('username').value;
    this.user.password = this.loginForm.get('password').value;
    if(this.loginForm.get('remember')){
      this.storage.set('user', this.user)
    }
    else{
      this.storage.remove('user');
    }
    console.log(this.loginForm.value);
    this.modalCtrl.dismiss({'dismissed':true})
  }

}
