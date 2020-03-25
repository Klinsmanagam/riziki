import { Component, ViewChild, OnInit } from '@angular/core';
import { Nav, Platform ,NavController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Headers, Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { WelcomePage } from '../welcome/welcome';
import { ShopLocationPage } from '../shoploc/shoploc';
//import { LandingComponent } from '../pages/landing/land';

import 'rxjs/add/operator/toPromise';

import { ProductsPage } from '../products/products';

@Component({
  selector: 'register-page',
  templateUrl: 'register.html'
})

export class RegisterComponent implements OnInit
{

registerForm: FormGroup;
private headers = new Headers({'Content-Type': 'application/json'});
private userUrl = 'https://rizikiserver.herokuapp.com/session/create';

constructor(private http: Http,
            public navCtrl: NavController,
            public fb: FormBuilder,
            private storage: Storage,
           public loadingCtrl: LoadingController){}

ngOnInit()
{
  this.registerForm = this.fb.group({

            username: ['', Validators.required],
            password: ['', Validators.required],
            phone   : ['', Validators.required],
            location: ['', Validators.required]

    })
}

onSubmit()
{
  let loader = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 3000
  });

  loader.present();
  setTimeout(() => {
   this.http
          .post(this.userUrl,this.registerForm.value)
          .toPromise()
          .then(res => {
            this.storage.set('riziki-store-token', res.json().token);
            //this.navCtrl.push(LandingComponent);
            this.navCtrl.push(ShopLocationPage);
          })
          .catch(this.handleError)

        }, 1000);
          setTimeout(() => {
          loader.dismiss();
        }, 5000);
}


 private handleError(error: any): Promise<any>
 {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  back()
  {
    this.navCtrl.push(WelcomePage);
  }

}
