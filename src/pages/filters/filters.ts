import { Component, OnInit } from '@angular/core';
import { NavController, ViewController  } from 'ionic-angular';
import { ProductsPage } from '../products/products'

@Component({
  selector: 'page-filters',
  templateUrl: 'filters.html'
})
export class FiltersPage implements OnInit {
	
  weight: Array<any>;
  litres: Array<any>;
  brands: Array<any>;
  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {}

  ngOnInit()
  {
  	this.weight = ['2KG','1KG', '500mg', '250mg', '100mg' ];  
    this.brands = ['Unilever','Bidco', 'Kapa Oil'];   
    this.litres = ['20Litres', '10Litres', '5Litres', '1Litre', '1.5Litres'] 
  }

    back()
    {
      this.navCtrl.push(ProductsPage);
    }

	  dismiss() {
	   let data = { 'foo': 'bar'};
	   this.viewCtrl.dismiss(data);
	 }
  
 }
  
