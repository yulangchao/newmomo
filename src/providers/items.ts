import { Injectable } from '@angular/core';
import { Http,  Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { Api } from './api';

import { Item } from '../models/item';

@Injectable()
export class Items {
  headers = new Headers().append('Content-Type', 'application/json');;

  constructor(public http: Http, public api: Api) {
  }

  query(params?: any) {
    return this.api.get('pyq', params)
      .map(resp => resp.json());
  }

  add(item: Item) {
    console.log("1111");
    return this.api.post('pyq', item)
      .map(resp => resp.json());
  }

  delete(id: any) {
    return this.api.delete('pyq/'+id)
      .map(resp => resp.json());
  }

}
