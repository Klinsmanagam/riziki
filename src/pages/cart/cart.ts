import { Component, OnInit } from '@angular/core';
import { NavController , LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ProductsPage } from '../products/products';
import { CheckoutPage } from '../checkout/checkout';

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html'
})
export class CartPage implements OnInit{

  products: Array<any>;
  prods: Array<any>;
  total: number;
  items: number;
  promos: Array<any>;

  constructor(public navCtrl: NavController,
              public storage: Storage,
              public loadingCtrl: LoadingController) {

  }

  ngOnInit()
  {
    let loader = this.loadingCtrl.create({
      content: "Calculating cart totals...",
      duration: 5000
    });


      setTimeout(() => {

  		this.storage.get('products').then((data) =>
         {
            if(data == null)
            {
              data=[];
            }
            else
            {
              this.products = data;
              //console.log(this.products);
            }

            this.getTotalPrice(this.products);


         })
       }, 5000);
         setTimeout(() => {
         loader.dismiss();
       }, 5000);

       loader.present();
        //  this.promos = [{name: 'Elianto cooking oil',
        //       link: './assets/elianto2.png'},
        //       {name: 'Jogoo Maize Meal',
        //       link: './assets/jogoo.jpg'},
        //       {name: 'Royco mchuzi mix',
        //       link: './assets/royco.jpg'},
        //       {name: 'Omo detergent',
        //       link: './assets/omo-action.jpg'} ];
  }

    getTotalPrice(products: Array<any>)
    {
      console.log(products);
      this.total = 0;
      this.items = 0;

      for(let product of products)
          {

             this.total += product.price * product.qtty;
             this.items += parseInt(product.qtty);
          }
          console.log(this.total );
    }
    loadItems()
    {
      this.storage.get('products').then((data) =>
       {
          if(data == null || data == '')
          {
            data=[];
          }
            this.prods = data;
            console.log(this.prods);
            return this.prods;

       })

    }

    remove(product: any)
    {
      this.storage.get('products').then((data) =>
       {
          for(let d = 0; d < data.length; d++)
              {
                if(data[d].sku == product.sku)
                  {
                    console.log(data);
                    console.log(data[d]);
                    data.splice(data.indexOf(data[d]), 1)
                    let new_data = data;
                    this.updateProds(new_data, product);

                    this.storage.set('products', data);
                  }
              }
       })
    }

    updateProds(new_data: Array<any>, product: any)
    {
      let loader = this.loadingCtrl.create({
        content: "Please wait",
        duration: 1000
      });

      loader.present();

      setTimeout(() => {
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
      }, 1000);

      setTimeout(() => {
      loader.dismiss();
    }, 1000);

    }

    shopping()
      {
        this.navCtrl.push(ProductsPage);
      }
    checkout()
      {
        this.navCtrl.push(CheckoutPage);
      }
      home()
      {
        this.navCtrl.push(ProductsPage);
      }

}
