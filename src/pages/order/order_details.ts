import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController ,NavParams , AlertController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { OrderPage } from './order';

@Component({
  selector: 'order-detail-page',
  templateUrl: 'order_detail.html'
})
export class OrderDetailPage implements OnInit{

  order: any = { };
  one: any = { };
  status: string;

  private ordersUrl = 'https://rizikiserver.herokuapp.com/order/';

  constructor(public navCtrl: NavController,
              public storage: Storage,
              public http: Http,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {

              }

    ngOnInit()
    {
      this.order = this.navParams.get('order');
    }

    private handleError(error: any): Promise<any>
     {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
    }

    openUp(one: any)
    {
      one.received = ' ';
    }

    add(one: any)
    {
      one.received++;
    }
    remove(one: any)
    {
      one.received--;
    }

    confirm(order: any)
    {
      let total = 0;

      let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });

    loader.present();

    for(let p = 0; p < order.products.length; p++)
        {
          if(order.products[p].received != '' && order.products[p].received != undefined)
          {
           total += order.products[p].price * parseInt(order.products[p].received);
           order.products[p].status = 'Received';
           order.total = total;
         }
         else if(order.products[p].received == '')
            {
              order.products[p].received = 0;
              order.products[p].status = 'Received';
            }
        }

        console.log(order);

       let id = order._id;
       order.status = 'received';
       const URL = `${this.ordersUrl}${id}`;
       this.http
                 .put(URL, order)
                 .toPromise()
                 .then(res => {

                    console.log(res);

                   setTimeout(() => {
                   this.navCtrl.push(OrderPage);
                 }, 3000);

                  })
                 .catch(this.handleError)

                 setTimeout(() => {
                 loader.dismiss();
               }, 3000);


    }



}
