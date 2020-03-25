import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'car-listing',
  templateUrl: 'listing.html'
})
export class ListingPage implements OnInit{

  products: Array<any>;

  constructor(public navCtrl: NavController,
              public storage: Storage,
              public navParams: NavParams){}
  ngOnInit()
  {
    this.products = this.navParams.get('matched')
  }





}
