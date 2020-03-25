import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController , AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { OrderDetailPage } from './order_details';

@Component({
  selector: 'page-order',
  templateUrl: 'order.html'
})
export class OrderPage implements OnInit{

  private headers = new Headers({'Content-Type': 'application/json'});
  private ordersUrl = 'https://rizikiserver.herokuapp.com/orders/';
  orders: Array<any>;
  total: number;
  items: number;


  constructor(public navCtrl: NavController,
              public storage: Storage,
              public http: Http,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {

  }

  ngOnInit()
  {
    this.storage.get('riziki-store-token')
   .then((val) =>
    {


      console.log(val);

      //let headers = new Headers({Authorization :'Bearer ' + val});
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

  private handleError(error: any): Promise<any>
   {
  console.error('An error occurred', error); // for demo purposes only
  return Promise.reject(error.message || error);
  }

  // received(one: any)
  // {
  //
  //    let prompt = this.alertCtrl.create({
  //     title: 'Quantities Received',
  //     message: "Enter quantities received",
  //     inputs: [
  //       {
  //         name: 'total_rec',
  //         placeholder: 'enter quantities received'
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: data => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Save',
  //         handler: data => {
  //           this.updateOrder(total_rec)
  //         }
  //       }
  //     ]
  //   });
  //   prompt.present();
  // }
  //
  // updateOrder(total_rec)
  // {
  //   console.log(total_rec);
  //
  //   const updateUrl = `${this.ordersUrl}${one._id}`;
  //   this.http
  //              .put(updateUrl, total_rec)
  //              .toPromise()
  //              .then(res => {
  //
  //                setTimeout(() => {
  //                this.navCtrl.push(OrderPage);
  //                }, 1000);
  //                       //  this.navCtrl.push();
  //                         })
  //              .catch(this.handleError)
  // }

goDetail(order: any)
{
    this.navCtrl.push(OrderDetailPage, {'order' : order});
}

}
