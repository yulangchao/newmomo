import { Injectable } from '@angular/core';
import { Http,  Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { Api } from './api';


@Injectable()
export class Profiles {
  headers = new Headers().append('Content-Type', 'application/json');;
  img: any;
  AllProfiles: Array<any> = [];
  constructor(public http: Http, public api: Api) {
    this.query().subscribe((res) => {
       this.AllProfiles = res;
    });
  }

  query(params?: any) {
    return this.api.get('profile', params)
      .map(resp => resp.json());
  }

  add(profile: any) {
    console.log(profile);
    return this.api.post('profile', profile)
      .map(resp => resp.json());
  }

  delete(id: any) {
    return this.api.delete('profile/'+id)
      .map(resp => resp.json());
  }

  getImage(email){
      this.AllProfiles.find((profile) => {
           if (profile.email === email){
              this.img = profile.img;
           }
           return profile.email === email;
      });
      return this.img;

  }

}
