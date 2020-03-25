import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ProductDetailPage } from '../product-detail/product-detail';
import { CartPage } from '../cart/cart';
import { ProductsPage } from './products';

import { CategoriesPage } from '../categories/categories';
import { FiltersPage } from '../filters/filters';
import { Product, Brand, Variations, illara, tuzo } from '../product-detail/product';
@Component({
  selector: 'page-grid',
  templateUrl: 'grid-view.html'
})
export class ProductsGridPage implements OnInit {

  products: Array<any> = [];
  total: number;
  items: number;
  carts: Array<any>;


  constructor(public navCtrl: NavController,
              public storage: Storage,
              public modalCtrl: ModalController,
              public loadingCtrl: LoadingController) {

  }

  ngOnInit()
  {
    let loader = this.loadingCtrl.create({
      content: "loading products...",
      duration: 2000
    });

    loader.present();

this.loadItems();
setTimeout(() => {

//this.tuzo = tuzo;
for(let i in illara)
    {
      for(let m in illara[i].variations)
      {
        this.products.push(illara[i].variations[m])
      }

    }

  },3000);

setTimeout(() => {
     loader.dismiss();
   }, 5000);

            this.loadItems();
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
  getTotalPrice(carts: Array<any>)
    {
      console.log(carts);
      this.total = 0;
      this.items = 0;

      for(let cart of carts)
          {

             this.total += cart.one.price * cart.qtty;
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

  goToList()
  {
  	this.navCtrl.push(ProductsPage);
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

}
