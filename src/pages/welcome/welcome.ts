import { Component, OnInit } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginComponent } from '../login/login';
import { RegisterComponent } from '../register/register';
import { ShopLocationPage } from '../shoploc/shoploc';


@Component({
  selector: 'welcome-page',
  templateUrl: 'welcome.html'
})

export class WelcomePage implements OnInit {

    constructor(public navCtrl: NavController, public storage: Storage){}

    ngOnInit()
    {
      this.storage.get('riziki-store-token')
      .then((val) => { console.log(val); })
    }

    signIn()
    {
      this.navCtrl.push(LoginComponent)
    }
    signUp()
    {
      this.navCtrl.push(RegisterComponent);
      //this.navCtrl.push(ShopLocationPage)
    }
}
