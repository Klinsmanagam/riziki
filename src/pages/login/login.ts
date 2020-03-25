import { Component, ViewChild , OnInit } from '@angular/core';
import { Nav, Platform , NavController, LoadingController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsPage } from '../products/products';
import { WelcomePage } from '../welcome/welcome';
import { Headers, Http } from '@angular/http';
import { ShopLocationPage } from '../shoploc/shoploc';

import { LandingComponent } from '../landing/land';

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})

export class LoginComponent implements OnInit {

  private headers = new Headers({'Content-Type': 'application/json'});
  private loginUrl = 'https://rizikiserver.herokuapp.com/login';
    
  loginForm: FormGroup;

  constructor(private storage: Storage,
              public fb: FormBuilder,
              public navCtrl: NavController,
              private http: Http,
              public loadingCtrl: LoadingController)
              {}



  ngOnInit()
  {
    this.checkUser();
    this.loginForm = this.fb.group({
              username: ['', Validators.required],
              password: ['', Validators.required]
      })
  }

  checkUser()
  {
    this.storage.get('riziki-store-token').then((val) => {
      if(val != 'undefined' && val != null)
      {
        this.navCtrl.push(LandingComponent);
      }
    })
  }

  login()
  {

    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });

    loader.present();
    setTimeout(() => {
     this.http
              .post(this.loginUrl, this.loginForm.value)
              .toPromise()
              .then(val => {

                this.storage.set('riziki-store-token', val.json().token);

                this.navCtrl.push(LandingComponent);

                //this.navCtrl.push(ProductsPage);

                //console.log(val.json());
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
