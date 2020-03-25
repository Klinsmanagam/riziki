import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, NavController, LoadingController, PopoverController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Headers, Http , RequestOptions} from '@angular/http';
import { Slides } from 'ionic-angular';
import { DistProdPage } from '../distprod/dist';
import { Product } from '../models/product';
import {PopoverPage} from './poppy';

import { SearchComponent } from '../search/search';
@Component({
  selector: 'page-landing',
  templateUrl: 'land.html'
})

export class LandingComponent implements OnInit
{
  @ViewChild('banner') slider: Slides;
  @ViewChild('brands') slider2: Slides;
  @Input() Slides;
  
  public banners = {cost: '', 
            dateCreated: '',
            end_date: '', 
            start_date: '', 
            owner: '', 
            photo: '', 
            position: '',
            status: '',
            title: '',
            _id: ''};
  
  adverts = [];
  products: Product;
  
  private productsUrl = 'https://rizikiserver.herokuapp.com/allproducts';
  private prodImgUrl = 'https://rizikiserver.herokuapp.com/prodimage/';
  private catsUrl = 'https://rizikiserver.herokuapp.com/categories/';
  private advertsUrl = 'https://rizikiserver.herokuapp.com/adverts/';
  
  images: Array<any> = [];
  brandy: Array<any>  = [];
  categories: Array<any>  = [];
  items: Array<Product> = [];
  
  constructor(public navCtrl: NavController,
              public storage: Storage,
              public http: Http,
              public modalCtrl: ModalController,
              public popoverCtrl: PopoverController,
              public loadingCtrl: LoadingController){}

 ngOnInit()
 {
    this.getProducts();
    this.getCategories();   
    this.getAdverts()
        .then((msg: any) =>
        {
            console.log(msg);
            
            this.banners = msg;
            console.log(this.banners);
        })
    
   this.images = [
                   'assets/img/pure-health.png','assets/img/Unga-Group-Products.jpg',
                   'assets/img/traditional-biscuits.png','assets/img/our-brands-banner.jpg',
                   'assets/img/delamere.jpg','assets/img/images.jpeg','assets/img/jus.jpg'
                 ];

   this.brandy = ['assets/img/brand_bid.png',
                  'assets/img/brand_brook.jpg',
                  'assets/img/brand_fest.jpeg',
                  'assets/img/brand_pamp.png',
                  'assets/img/brand_saf.png',
                  'assets/img/brand_uni.png',
                  'assets/img/brand_bid.png',
                                 'assets/img/brand_brook.jpg',
                                 'assets/img/brand_fest.jpeg',
                                 'assets/img/brand_pamp.png',
                                 'assets/img/brand_saf.png',
                                 'assets/img/brand_uni.png',
                                 'assets/img/brand_bid.png',
                                                'assets/img/brand_brook.jpg',
                                                'assets/img/brand_fest.jpeg',
                                                'assets/img/brand_pamp.png',
                                                'assets/img/brand_saf.png',
                                                'assets/img/brand_uni.png']
 }
 
 getAdverts(): Promise<any>
 {
    return this.http
             .get(this.advertsUrl)
             .toPromise()
             .then(res => {
                    console.log(res.json())
                    this.adverts =  res.json();
                    
                    for(let i of this.adverts)
                        {
                            
                            if(i.position == 'Banner' && i.status == 'active')
                            {
                                console.log(i.position == 'Banner' && i.status == 'active');
                                return i;
                            }
                        }
                        
                       
                    
                            })
             .catch(this.handleError);

 }
 getCategories()
 {
    this.http
             .get(this.catsUrl)
             .toPromise()
             .then(res => {
                    console.log(res.json())
                    this.categories =  res.json();
                            })
             .catch(this.handleError)
 }
 getProducts()
 {
       this.http
              .get(this.productsUrl)
              .toPromise()
              .then(res => {
                             this.products =  res.json();
                             console.log(res.json());
                             
                             this.addBrand(this.products);
                             
                             })
              .catch(this.handleError)
  
 }
   presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }
  
  private handleError(error: any): Promise<any> 
  {
  console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }
    
  addBrand(products: any)
  {
    
    this.storage.get('riziki-store-token')
   .then((val) =>
    {


      console.log(val);

      //let headers = new Headers({Authorization :'Bearer ' + val});
      let headers = new Headers({'Content-Type': 'application/json'});
      headers.append('Authorization', 'Bearer ' + val);
      let requestOptions = new RequestOptions({ headers: headers });
      
    for(let i = 0; i < products.length; i++)
        {
            let id = products[i].brand;
            const URL = `${this.prodImgUrl}${id}`;
            
            this.http
              .get(URL, requestOptions)
              .toPromise()
              .then(res => {
                             let prodImg = res.json();
                             
                             products[i].photo =  res.json().img_url;
                             products[i].prodtitle =  res.json().img_title;
                             
                             console.log(res.json());
                             
                             })
              .catch(this.handleError)
            
        
        }
        
        this.items = products;
        
        })
  }
  
  getCategory(one)
  {
    console.log(one);
    
  }
  
  toSearch()
  {
    this.navCtrl.push(SearchComponent);
  }
  
  detail($event, product)
  {
    this.navCtrl.push(DistProdPage, {'product' : product});
  }


 }
