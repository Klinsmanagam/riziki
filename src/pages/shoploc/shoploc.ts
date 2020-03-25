import { Component, NgZone ,ViewChild, ElementRef  } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { ProductsPage } from '../products/products';
import { Headers, Http , RequestOptions} from '@angular/http';
import { Storage } from '@ionic/storage';
import { LandingComponent } from '../landing/land';

import 'rxjs/add/operator/toPromise';

declare var google;

@Component({
  selector: 'page-shoploc',
  templateUrl: 'shoploc.html'
})
export class ShopLocationPage {
  
  @ViewChild('map') mapElement: ElementRef;
  GoogleAutocomplete: any;
  autocompleteItems = [];
  autocomplete = { input: ''};
  markers = [];
  geocoder: any;
  map: any;
  
  private updateUrl = 'https://rizikiserver.herokuapp.com/location';
  
  constructor(public http: Http, 
              public storage: Storage,
              public navCtrl: NavController, 
              public navParams: NavParams,
              private zone: NgZone, 
              private geolocation: Geolocation) 
  {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.geocoder = new google.maps.Geocoder;
    this.tryGeolocation();
  }
    
  ionViewDidEnter()
  {
	//Set latitude and longitude of some place
	this.map = new google.maps.Map(document.getElementById('map'), {
		center: { lat: -34.9011, lng: -56.1645 },
		zoom: 15
        });
   }
 
 /*clearMarkers()
 {
    this.markers.length = 0;
 }*/
 
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
  this.clearMarkers();
  this.autocompleteItems = [];

      this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
        if(status === 'OK' && results[0]){
          let position = {
              lat: results[0].geometry.location.lat,
              lng: results[0].geometry.location.lng
          };
          let marker = new google.maps.Marker({
            position: results[0].geometry.location,
            map: this.map,
          });
          this.markers.push(marker);
          this.map.setCenter(results[0].geometry.location);
        }
      })
      console.log(this.markers);
  }
  
      tryGeolocation()
      {
      this.clearMarkers();
      this.geolocation.getCurrentPosition().then((resp?) => {
        let pos = {
          lat: resp.coords.latitude,
          lng: resp.coords.longitude
        };
        let marker = new google.maps.Marker({
          position: pos,
          map: this.map,
          title: 'I am here!'
        });
        this.markers.push(marker);
        this.map.setCenter(pos);
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    }
    
    addMarker()
    {
        
        this.deleteMarkers();
        
        this.storage.get('riziki-store-token')
        .then((val) =>
        {
        
        console.log(val);
        
        let headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Authorization', 'Bearer ' + val);
        let requestOptions = new RequestOptions({ headers: headers });
        
        let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: this.map.getCenter()
          });
          
          let location = {loc_lat : '', loc_lng: ''};
          
          location.loc_lat = this.map.getCenter().lat();
          location.loc_lng = this.map.getCenter().lng();
          
          this.http.post(this.updateUrl, location, requestOptions)
                   .toPromise()
                   .then(res => { let resp = res.json();
                                  console.log(resp);
                                  this.navCtrl.push(LandingComponent);
                        })
                   .catch(this.handleError)
        })

     }
    
     setMapOnAll(map) 
     {
        console.log(this.markers.length);
        
        for (var i = 0; i < this.markers.length; i++) {
          this.markers[i].setMap(map);
        }
      }
    
    clearMarkers()
    {
        this.setMapOnAll(null);
    }
    
    deleteMarkers()
    {
        this.clearMarkers();
        this.markers = [];
    }
    
    finish()
    {
        this.navCtrl.push(ProductsPage);
    }
    
    private handleError(error: any): Promise<any>
     {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
      }
    
}
