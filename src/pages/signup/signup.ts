import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { MainPage } from '../../pages/pages';
import { User, Profiles } from '../../providers/providers';
import { LoginPage } from '../login/login';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
    imgs = [
        "assets/img/speakers/bear.jpg",
        "assets/img/speakers/cheetah.jpg",
        "assets/img/speakers/duck.jpg",
        "assets/img/speakers/eagle.jpg",
        "assets/img/speakers/elephant.jpg",
        "assets/img/speakers/mouse.jpg",
        "assets/img/speakers/puppy.jpg"
    ];
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { username: string, name: string, email: string, password: string, img: string } = {
    username: 'abc',
    name: 'Test Human',
    email: 'test@example.com',
    password: 'test',
    img: this.imgs[Math.floor(Math.random() * 7)]
  };

  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public profiles: Profiles,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
  }

  doSignup() {
    // Attempt to login in through our User service
    this.user.signup(this.account).subscribe((resp) => {
        console.log(resp);
        this.profiles.add({"img": this.account.img,"email" : this.account.email}).subscribe((res) => {
          this.navCtrl.push(LoginPage);
        });
    }, (err) => {

      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: this.signupErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
