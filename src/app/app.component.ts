import { Component, ViewChild } from '@angular/core';
import { Nav, Platform , NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppUpdate } from '@ionic-native/app-update';
import { WelcomePage } from '../pages/welcome/welcome';
import { Headers, Http } from '@angular/http';
import { Toast } from '@ionic-native/toast';

import { ProductsPage } from '../pages/products/products';
//import { DistPage } from '../pages/dist/dist';
import { ProductDetailPage } from '../pages/product-detail/product-detail';
import { CartPage } from '../pages/cart/cart';
import { CheckoutPage } from '../pages/checkout/checkout';
import { OrderPage } from '../pages/order/order';
import { MpesaPage } from '../pages/payments/mpesa';
import { LoginComponent } from '../pages/login/login';
import { RegisterComponent } from '../pages/register/register';
import { LandingComponent } from '../pages/landing/land';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

    dropd = false;
    categories: Array<any> = [ ];
    sub_cats = [];
  rootPage: any = WelcomePage;

  pages: Array<{title: string, component: any}>;

  private catsUrl = 'https://rizikiserver.herokuapp.com/categories/';
  
  constructor(public platform: Platform,
              public toastCtrl: Toast,
              public statusBar: StatusBar,
              public http: Http,
              public splashScreen: SplashScreen) {
    this.initializeApp();

    //const updateUrl = 'http://your-remote-api.com/update.xml';
    //this.appUpdate.checkAppUpdate(updateUrl);
    
    
    

    // used for an example of ngFor and navigation
    this.pages = [
     // { title: 'Distributors', component: DistPage  },
      { title: 'Home', component: LandingComponent },
      
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      var lastTimeBackPress=0;
      var timePeriodToExit=2000;
      
       //this.mlab
       this.platform.registerBackButtonAction(() => {
     // get current active page
          let view = this.nav.getActive();
        if(view.component.name=="TabsPage"){
                        //Double check to exit app                  
                        if(new Date().getTime() - lastTimeBackPress < timePeriodToExit){
                             this.platform.exitApp(); //Exit from app
                        }else{
                             let toast = this.toastCtrl.show(
                                'Press back again to exit App?',
                                '3000',
                                'bottom');
                                //toast.present();     
                                //lastTimeBackPress=new Date().getTime();
                        }
                }else{
                     // go to previous page
                      this.nav.pop({});
            }
          });

        });
   
    this.getProducts();
  }
  
  getProducts()
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
  
  itemSelected(item)
  {
    this.sub_cats = [];
    
    for(let i in this.categories)
    {
        if(item.cat_title == this.categories[i].cat_title)
            {
                this.sub_cats = this.categories[i].sub_cats;
            }
    }
  }
  
  goHome()
  {
    
  }
  
  private handleError(error: any): Promise<any>
  {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
