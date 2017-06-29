import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { ItemCreatePage } from '../item-create/item-create';
import { ItemDetailPage } from '../item-detail/item-detail';

import { Items,Profiles } from '../../providers/providers';

import { Item } from '../../models/item';

@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {

  currentItems: Array<any> = [];
  name: any;
  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController, public profiles: Profiles,) {
    this.items.query().subscribe((res) => {
          this.currentItems = res.reverse();
          for (let item of this.currentItems){
            item.img1 = JSON.parse(item.img1);
            console.log(item.img1);
          }

    });
    if (localStorage.getItem('token')){
       this.name = JSON.parse(localStorage.getItem('token')).local.name;
    }
    this.getLocation();
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create(ItemCreatePage);
    addModal.onDidDismiss((item: Item) => {
      if (item) {
        console.log(item);
        this.items.add(item).subscribe((res) => {
          this.currentItems = res.reverse();
          for (let item of this.currentItems){
            item.img1 = JSON.parse(item.img1);
            console.log(item.img1);
          }
        });
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(id, item) {
    if(item.name == this.name){
      this.items.delete(id).subscribe((res) => {
            this.currentItems = res.reverse();
            for (let item of this.currentItems){
              item.img1 = JSON.parse(item.img1);
              console.log(item.img1);
            }
          });
    }
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }

  getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.showPosition);
      } else {
          console.log("wrong");
      }
  }

  showPosition(position) {
      console.log(position);
  }

  getImage(email){
      return this.profiles.getImage(email);
  }


}
