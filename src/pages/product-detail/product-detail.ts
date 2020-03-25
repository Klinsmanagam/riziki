import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CartPage } from '../cart/cart';
import { ProductsPage } from '../products/products';
import { Product } from '../models/product';

@Component({
  selector: 'page-products-detail',
  templateUrl: 'product-detail.html'
})
export class ProductDetailPage implements OnInit {

   product: Product;
  //brand = {};
  item = { };
  selectOptions = {};
  //one = { };
  //main = { };
  //selectOptions: object = {};
  products: Array<any>;
  promos: Array<any>;
  items: Array<any>;
  total: number;


  constructor(public navCtrl: NavController,
              public storage: Storage,
              public navParams: NavParams,
              public actionSheetCtrl: ActionSheetController)
              {}



  ngOnInit()
  {
      this.product = this.navParams.get('product');

      console.log(this.product);

      this.promos = [
              {name: 'Elianto cooking oil',
              link: './assets/elianto2.png'},
              {name: 'Jogoo Maize Meal',
              link: './assets/jogoo.jpg'},
              {name: 'Royco mchuzi mix',
              link: './assets/royco.jpg'},
              {name: 'Omo detergent',
              link: './assets/omo-action.jpg'}
            ];


          //this.storage.set('products', '');
          this.loadItems();
      }

      loadItems()
      {
        this.storage.get('products').then((data) =>
         {
            if(data == null || data == '')
            {
              data=[];
            }
              this.items = data;
              console.log(this.items);
              return this.items;

         })

      }

      add(product: any)
      {
            
          console.log('Iam the variable product', product);
          console.log('Iam the this var product', this.product);
          
          let products = product.one;
          
           products.dist = this.product.user;
          
          products.qtty = parseInt(product.qtty);

          console.log(products);
          this.addItem(products);

      }

      addItem(products: any)
      {
        console.log(products)

        let qtty = parseInt(products.qtty);

        if(qtty != 0 )
          {

            for(let i in this.items)
                {
                   if(this.items[i].sku == products.sku)
                      {
                          this.items[i].qtty = parseInt(this.items[i].qtty) + qtty;
                      }

                }

                console.log(this.items);
              if(this.items.length == 0)
                {
                  this.items.push(products);
                  console.log(this.items);
                }
              else if((this.items.some(x => x.sku == products.sku)) == false)
                {   console.log(products);
                   console.log(this.items.some(x => x.sku == products.sku))
                   this.items.push(products);
                }

          }
        this.saveItems();
        this.toCart();


      }


      saveItems(): void
      {
          this.storage.set('products', this.items);
      }

      toCart(): void
      {
        this.navCtrl.push(CartPage);
      }
      home(): void
      {
        this.navCtrl.push(ProductsPage);
      }
}
