import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule }   from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation';
import { Toast } from '@ionic-native/toast';

import { MyApp } from './app.component';
import { WelcomePage } from '../pages/welcome/welcome';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { ProductsPage } from '../pages/products/products';
import { ProductDetailPage } from '../pages/product-detail/product-detail';
import { CartPage } from '../pages/cart/cart';
import { CheckoutPage } from '../pages/checkout/checkout';
import { OrderPage } from '../pages/order/order';
import { MpesaPage } from '../pages/payments/mpesa';
import { ProductsGridPage } from '../pages/products/grid-view';
import { CategoriesPage } from '../pages/categories/categories';
import { FiltersPage } from '../pages/filters/filters';
import { ListingPage } from '../pages/categories/listing';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RegisterComponent } from '../pages/register/register';
import { LoginComponent } from '../pages/login/login';

import { ShopLocationPage } from '../pages/shoploc/shoploc';
import { OrderDetailPage } from '../pages/order/order_details';
import { SearchComponent } from '../pages/search/search';
import { CatsComponent } from '../pages/categories/cats';
import { LandingComponent } from '../pages/landing/land';
import { DistProdPage } from '../pages/distprod/dist';
import { PopoverPage } from '../pages/landing/poppy';

@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    HomePage,
    LandingComponent,
    ListPage,
    ProductsPage,
    ProductDetailPage,
    CartPage,
    CheckoutPage,
    OrderPage,
    MpesaPage,
    ProductsGridPage,
    CategoriesPage,
    FiltersPage,
    ListingPage,
    RegisterComponent,
    LoginComponent,
    OrderDetailPage,
    SearchComponent,
    CatsComponent,
    PopoverPage,
    ShopLocationPage,
    DistProdPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    LandingComponent,
    HomePage,
    ListPage,
    ProductsPage,
    ProductDetailPage,
    CartPage,
    CheckoutPage,
    OrderPage,
    MpesaPage,
    ProductsGridPage,
    CategoriesPage,
    FiltersPage,
    ListingPage,
    RegisterComponent,
    LoginComponent,
    //DistPage,
    //DistDetailPage,
    OrderDetailPage,
    SearchComponent,
    CatsComponent,
    PopoverPage,
    ShopLocationPage,
    DistProdPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Toast,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
