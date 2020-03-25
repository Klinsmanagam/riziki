import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, NavController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Headers, Http } from '@angular/http';
import { Slides } from 'ionic-angular';

import 'rxjs/add/operator/toPromise';

import { ProductDetailPage } from '../product-detail/product-detail';
import { CartPage } from '../cart/cart';
import { ProductsGridPage } from './grid-view';
import { CategoriesPage } from '../categories/categories';
import { FiltersPage } from '../filters/filters';
import { SearchComponent } from '../search/search';
import { Cart } from '../cart/cart-modal';
import { Product, Brand, Variations, illara, tuzo } from '../product-detail/product';

@Component({
  selector: 'page-products',
  templateUrl: 'products.html'
})
export class ProductsPage implements OnInit {

  @ViewChild('banner') slider: Slides;
  token = '';
  private headers = new Headers({'Content-Type': 'application/json'});
  private productsUrl = 'https://rizikiserver.herokuapp.com/product';
	products: Array<any> = [ ];
  @Input() Slides;
  auto = 100;
  prods: Array<any> = [ ];
  ilara: Array<any> = [ ];
  tuzo : Array<any> = [ ];
  total: number;
  items: number;
  carts: Array<any>;
  images: Array<string>;

  constructor(public navCtrl: NavController,
              public storage: Storage,
              public http: Http,
              public modalCtrl: ModalController,
              public loadingCtrl: LoadingController) {}

  ngOnInit()
  {


                  let loader = this.loadingCtrl.create({
                    content: "loading products...",
                    duration: 2000
                  });

                  loader.present();

          this.loadItems();
              setTimeout(() => {
              this.ilara = illara;
              //this.tuzo = tuzo;
              for(let i in illara)
                  {
                    for(let m in illara[i].variations)
                    {
                      this.products.push(this.ilara[i].variations[m])
                    }

                  }

                },3000);

        setTimeout(() => {
                   loader.dismiss();
                 }, 5000);
//                           }

  //  this.http
  //            .get(this.productsUrl)
  //            .toPromise()
  //            .then(res => {
  //                             setTimeout(() => {
  //                           this.products =  res.json();
  //                           console.log(res.json());
  //                           // for(let p of this.products)
  //                           //  {
  //                           //    for(let o in p.variations)
  //                           //     {
  //                           //       this.prods.push(p.variations[o]);
  //                           //     }
  //                           //  }
  //                          }, 3000)
  //                           })
  //            .catch(this.handleError)
   //
  //            setTimeout(() => {
  //            loader.dismiss();
  //          }, 5000);
  }



  loadItems()
  {
    this.storage.get('products').then((data) =>
         {
            if(data == null)
            {
              data=[];
            }
            else
            {
              this.carts = data;
              console.log(this.carts);
            }
            this.getTotalPrice(this.carts);
         })
  }
  getTotalPrice(carts: Cart[])
    {

      this.total = 0;
      this.items = 0;

      let cart: Cart;
      for(cart of carts)
          {

             this.total += cart.price * cart.qtty;
             this.items += parseInt(cart.qtty);
          }
          console.log(this.total);
    }

  detail($event, product)
  {
    this.navCtrl.push(ProductDetailPage, {'product' : product});
  }

  toCart()
  {
    this.navCtrl.push(CartPage);
  }

  toGrid()
  {
   this.navCtrl.push(ProductsGridPage);
  }

  toSearch()
  {
    this.navCtrl.push(SearchComponent);
  }

   category()
  {
    this.navCtrl.push(CategoriesPage);
  }

  filters()
  {
     let profileModal = this.modalCtrl.create(FiltersPage);
     profileModal.present();
  }

  private handleError(error: any): Promise<any> {
  console.error('An error occurred', error); // for demo purposes only
  return Promise.reject(error.message || error);
}

}
