import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-mpesa',
  templateUrl: 'mpesa.html'
})
export class MpesaPage implements OnInit{
	
  products: Array<any>;
  total: number;
  items: number;

  constructor(public navCtrl: NavController,
              public storage: Storage) {

  }

  ngOnInit()
  {
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
  }

    getTotalPrice(products: Array<any>)
    {
      console.log(products);
      this.total = 0;
      this.items = 0;

      for(let product of products)
          {
            
             this.total += product.one.price * product.qtty; 
             this.items += parseInt(product.qtty);
          }
          console.log(this.total );
    }
}
