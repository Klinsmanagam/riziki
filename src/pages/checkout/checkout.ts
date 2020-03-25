import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { ProductsPage } from '../products/products'
import { CartPage } from '../cart/cart';
import { OrderPage } from '../order/order';

@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html'
})
export class CheckoutPage implements OnInit {

  user: any = {};
	regions: Array<any>;
  token: string = '';
  total: number;
  order: any = {};
  orders: Array<any>;
  products: Array<any>;
  items: number;
  checkForm: FormGroup;
  //private headers = new Headers({'Content-Type': 'application/json'});
  private ordersUrl = 'https://rizikiserver.herokuapp.com/orders/';
  private newOrdersUrl = 'https://rizikiserver.herokuapp.com/order/';
  private usersUrl = 'https://rizikiserver.herokuapp.com/settings/';


  constructor(public navCtrl: NavController,
              public storage: Storage,
              public http: Http,
              public fb: FormBuilder,
              private alertCtrl: AlertController) {

  }

  ngOnInit()
  {

      this.getDetails();

  		this.regions = ['Embakassi North',
  						'Embakassi East',
  						'Embakassi West',
  						'Embakassi South',
  						'Nairobi West',
  						'Parklands'];

    this.checkForm = this.fb.group({

                name : ['', Validators.required],
                phone: ['', Validators.required]

        })
      this.storage.get('products').then((data) =>
         {
            if(data == null)
            {
              data=[];
            }
            else
            {
              this.products = data;
              console.log(this.products);
            }
            this.getTotalPrice(this.products);
         })
         this.getOrders();
  }
  getOrders(): Promise<Array<any>>
  {
    return this.storage.get('riziki-store-token')
   .then((val) =>
    {

    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', 'Bearer ' + val);
    let requestOptions = new RequestOptions({ headers: headers });

    return this.http
               .get(this.ordersUrl, requestOptions)
               .toPromise()
               .then(res => { this.orders =  res.json();
                              console.log(res.json());})
               .catch(this.handleError)
            });
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


     back()
    {
      this.navCtrl.push(ProductsPage);
    }

    onSubmit()
    {
      //console.log(this.checkForm.value);
      console.log(this.products);
      console.log(this.orders)

      let new_no: number = 0;

      if(this.orders.length > 0)
      {
        let lastItem = this.orders[this.orders.length - 1];
        let order_no = parseInt(lastItem.order_no);
        new_no = order_no + 1;
      }
      else if(this.orders.length <= 0)
      {
        new_no = 1001;
      }

      let order = {from : {name: '', phone: '', loc_lat: '', loc_lng: ''}, products: [], payment: '', order_no: 0,
                  status: '', total: 0};
                  
      order.from.loc_lat = this.user.loc_lat;
      order.from.loc_lng = this.user.loc_lng;
      order.from.name = this.user.username;
      order.from.phone = this.user.phone;
      order.products = this.products;
      order.payment = 'Cash On Delivery',
      order.order_no = new_no;
      order.status = 'processing';
      order.total = this.total;
      
      console.log(order);

      this.uploadData(order);
      this.storage.remove('products');
      this.navCtrl.push(ProductsPage);

    }
    getDetails()
    {
      this.storage.get('riziki-store-token')
     .then((val) =>
      {

      let headers = new Headers({'Content-Type': 'application/json'});
      headers.append('Authorization', 'Bearer ' + val);
      let requestOptions = new RequestOptions({ headers: headers });

      this.http
          .get(this.usersUrl, requestOptions)
          .toPromise()
          .then(res => {
                         this.user = res.json();
                         console.log(this.user);
                      })
          .catch(this.handleError)

        })
    }

    getUser()
    {

      return this.storage.get('riziki-store-token')
      .then((val) =>
       {
         this.token =  val;
      });
    }

    uploadData(order: any)
    {
       this.storage.get('riziki-store-token')
      .then((val) =>
       {

         this.token =  val;

         console.log(val);

         //let headers = new Headers({Authorization :'Bearer ' + val});
         let headers = new Headers({'Content-Type': 'application/json'});
         headers.append('Authorization', 'Bearer ' + val);
         let requestOptions = new RequestOptions({ headers: headers });

         this.send(requestOptions, order);
         this.navCtrl.push(OrderPage);

      })
    }

    send(requestOptions: any, order: any): Promise<any>
    {
      return this.http
                 .post(this.newOrdersUrl, order, requestOptions)
                 .toPromise()
                 .then(res => {
                                //this.orders =  res.json();
                                console.log(res.json());
                              })
                 .catch(this.handleError)
    }

    confirm()
    {
      let confirm = this.alertCtrl.create({
        title: 'Confirm Order',
        message: '<h2>Buy goods worth KSH'+ this.total + '? <h2>',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {

              this.navCtrl.push(CartPage);
            }
          },
          {
            text: 'Ok',
            handler: () => {
              this.onSubmit();

            }
          }
        ]
      });
      confirm.present();
    }

    private handleError(error: any): Promise<any>
    {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }
}
