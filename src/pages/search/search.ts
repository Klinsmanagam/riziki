import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, NavController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Headers, Http } from '@angular/http';
import { Slides } from 'ionic-angular';

import { ProductDetailPage } from '../product-detail/product-detail';
import { DistProdPage } from '../distprod/dist';

@Component({

  selector: 'search-page',
  templateUrl: './search.html'

})

export class SearchComponent implements OnInit
{

  auto: string = "on";
  products: Array<any> = [];
  prods: Array<any> = [];
  items: string[];
  latestItems: Array<any> = [ ];
  itemsList: Array<any> = [ ];

  private headers = new Headers({'Content-Type': 'application/json'});
  private productsUrl = 'https://rizikiserver.herokuapp.com/prodimage';

  constructor(public navCtrl: NavController,
              private http: Http){}

  ngOnInit()
  {
    this.getItems();
  }

  getItems()
  {

    this.http
               .get(this.productsUrl)
               .toPromise()
               .then(res => {
                            setTimeout(() => {

                              this.products =  res.json();
                              console.log(res.json());
                              for(let p of this.products)
                               {
                                 
                                    this.prods.push(p.img_title);
                                  
                               }
                                console.log(this.prods);
                                this.itemsList = this.prods;
                                this.latestItems = this.prods;
                             }, 250)
                           })
               .catch(this.handleError)



  //this.prods = ['Ilara Fresh 500ml', 'ILara Fresh 200ml', 'Brookside UHT 500ml'];
 }

 initializeItems()
 {
    this.itemsList = this.latestItems;
 }

  private handleError(error: any): Promise<any>
  {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  onInput(ev: any)
  {

    this.initializeItems();
     let val = ev.target.value;
     console.log(val);

     if (val && val.trim() != '') {
       this.itemsList = this.itemsList.filter((item) => {
         return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
       })
    }

  }

  send(item: any)
  {
    console.log(item);
    console.log(this.products);

    for(let p = 0; p < this.products.length;  p++)
        {
          if(item.toLowerCase() == this.products[p].img_title.toLowerCase())
            {
              console.log(this.products[p]);
              
              this.goDetail(this.products[p]);
            
          }
        }

  }

  goDetail(product: any)
  {
      this.navCtrl.push(DistProdPage, {'product' : product});
  }


}
