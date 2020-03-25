import { Component, OnInit, NgZone,  ViewChild, ElementRef } from '@angular/core';
import { NavController, LoadingController ,NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Product } from '../product-detail/product';
import { ProductDetailPage } from '../product-detail/product-detail';

import 'rxjs/add/operator/toPromise';

declare var google;

@Component({
  selector: 'page-distprods',
  templateUrl: 'dist.html'
})
export class DistProdPage implements OnInit
{
      @ViewChild('map') mapElement: ElementRef;
      product: any ;
      GoogleAutocomplete: any;
      autocompleteItems = [];
      autocomplete = { input: ''};
      markers = [];
      geocoder: any;
      distributors = [];
      desc: string = '';
      map: any;
      
     private distsUrl = 'https://rizikiserver.herokuapp.com/distributors/';
     private prodsUrl = 'https://rizikiserver.herokuapp.com/distprod/';
     
     constructor(public navCtrl: NavController,
              public storage: Storage,
              public http: Http,
              public navParams: NavParams,
               private zone: NgZone, 
              public loadingCtrl: LoadingController)
              {
               this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
              }

    ngOnInit()
    {
      this.product = this.navParams.get('product');
      
    }
    
    updateSearchResults()
     {
        if (this.autocomplete.input == '') {
            this.autocompleteItems = [];
            return;
          }
          this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
            (predictions, status) => {
            this.autocompleteItems = [];
            this.zone.run(() => {
              predictions.forEach((prediction) => {
                this.autocompleteItems.push(prediction);
              });
            });
          });
     }
     
     selectSearchResult(item)
     {
            this.autocompleteItems.length =0 ;
            let str = item.structured_formatting.main_text;
            console.log(item.structured_formatting.main_text);
            let res = str.split(" ");
            this.autocomplete.input = item.description;
            this.desc = item.structured_formatting.main_text
            this.getDists(this.desc);
            
     }
    
     getDists(desc)
     {
       
        
        this.storage.get('riziki-store-token')
       .then((val) =>
        {


          console.log(val);

          //let headers = new Headers({Authorization :'Bearer ' + val});
          let headers = new Headers({'Content-Type': 'application/json'});
          headers.append('Authorization', 'Bearer ' + val);
          let requestOptions = new RequestOptions({ headers: headers });
          
        this.http.get(this.distsUrl, requestOptions )
                 .toPromise()
                 .then(res => { 
                            
                            let rcvd = res.json();
                            
                            for(let i = 0; i < rcvd.length; i++)
                                {
                                    console.log(rcvd[i].coverage);
                                    
                                    if(rcvd[i].coverage.length > 0)
                                    {
                                    for(let n = 0; n < rcvd[i].coverage.length ; n++)
                                        {
                                             
                                            if(rcvd[i].coverage[n].title == this.desc)
                                                {
                                                 this.distributors.push(rcvd[i]);
                                                }
                                        }
                                        
                                    }
                                }
                                
                                console.log('We are dist',this.distributors);
                        })
                 .catch(this.handleError)
        })
     }
     
    private handleError(error: any): Promise<any>
    {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }
    
    proDetail(product: any, one: any)
    {
        console.log('My product',product );
        console.log('One', one)
        
        this.storage.get('riziki-store-token')
       .then((val) =>
        {


          console.log(val);

          //let headers = new Headers({Authorization :'Bearer ' + val});
          let headers = new Headers({'Content-Type': 'application/json'});
          headers.append('Authorization', 'Bearer ' + val);
          let requestOptions = new RequestOptions({ headers: headers });
          
        let id = one._id;
        const URL = `${this.prodsUrl}${id}`;
        this.http.get(URL, requestOptions)
            .toPromise()
            .then(res => { 
                        console.log(res.json);
                        let prods = res.json();
                        for(let i = 0; i < prods.length; i++)
                            {
                                if(prods[i].brand == product.img_title)
                                    {
                                        this.navCtrl.push(ProductDetailPage, {'product' : product});  
                                        
                                    }
                            }
                        
                        
                        
                        
                        })
            .catch(this.handleError)
    })
    
    
    
    }
}