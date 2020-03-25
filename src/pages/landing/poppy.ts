import { Component, OnInit, Input, ViewChild  } from '@angular/core';
import { ModalController, NavController, LoadingController, PopoverController , ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Headers, Http } from '@angular/http';
import { Slides } from 'ionic-angular';

@Component({
  template: `
    <ion-list>
      <button ion-item (click)="close()">My Ordes</button>
      <button ion-item (click)="close()">Settings</button>
    </ion-list>
  `
})
export class PopoverPage {

  constructor(public viewCtrl: ViewController) {}

  close() {
    this.viewCtrl.dismiss();
  }
}
