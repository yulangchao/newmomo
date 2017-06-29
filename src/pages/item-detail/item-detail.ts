import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Items } from '../../providers/providers';

@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any;
  imgs: Array<any> = [];
  constructor(public navCtrl: NavController, navParams: NavParams, items: Items) {
    this.item = navParams.get('item');

    items.getbyId(this.item._id).subscribe((res) => {
          this.imgs = JSON.parse(res.img);
          console.log(this.imgs.length);
    });
  }

}
