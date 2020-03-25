import { Component, OnInit } from '@angular/core';
import { NavController, ViewController, NavParams, ActionSheetController  } from 'ionic-angular';
import { ProductsPage } from '../products/products'
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise'
import { ListingPage } from './listing';
import {Category, Subs} from './model';

@Component({
  selector: 'page-cats',
  templateUrl: 'cats.html'
})
export class CatsComponent implements OnInit{

    cats: Category;
    subcats: Array<any> = [];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public actionSheetCtrl: ActionSheetController)
                {}

    ngOnInit()
    {
        this.cats = this.navParams.get('item');

        for(let n = 0; n < this.cats.sub_cat.length; n++)
            {
              this.subcats.push(this.cats.sub_cat[n]);
            }
    }


}
