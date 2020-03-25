import { Component, OnInit } from '@angular/core';
import { NavController, ViewController  } from 'ionic-angular';
import { ProductsPage } from '../products/products'
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise'
import { ListingPage } from './listing';
import { CatsComponent } from './cats';

@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html'
})
export class CategoriesPage implements OnInit {

  categories: Array<any> = [ ];
  matched: Array<any> = [];
  private catsUrl = 'https://rizikiserver.herokuapp.com/categories/';

  constructor(public navCtrl: NavController, public http: Http) {}

  ngOnInit()
  {
    this.getProducts();
  }
  
  getProducts()
  {
   this.http
             .get(this.catsUrl)
             .toPromise()
             .then(res => {
                    console.log(res.json())
                    this.categories =  res.json();
                            })
             .catch(this.handleError)
  }
  
 

  private handleError(error: any): Promise<any>
   {
  console.error('An error occurred', error); // for demo purposes only
  return Promise.reject(error.message || error);
  }
  back()
    {
      this.navCtrl.push(ProductsPage);
    }

    itemSelected(item: any)
    {
      this.navCtrl.push(CatsComponent, {'item': item});
    }


 }
