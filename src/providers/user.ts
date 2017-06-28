// GLOBAL IMPORT
import {Injectable, Inject} from '@angular/core';
import {Http, Headers, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from "rxjs/Subject";
import 'rxjs/Rx';
Injectable()
export class User{
	// for change the navbar state between online and offline
	private authenticate = new Subject<boolean>();
	authenticateState$ = this.authenticate.asObservable();

	constructor(@Inject(Http) private http: Http){}

	signup(data): Observable<any> {
		let headers = new Headers();

		headers.append('Content-Type', 'application/json');
		return this.http.post('http://us.richardyych.cc/api/auth/signup', JSON.stringify(data),
			{headers: headers})
		.map(res => res);
	}

	signin(username: string, password: string): Observable<any> {
		let headers = new Headers();

		headers.append('Content-Type', 'application/json');
		return this.http.post('http://us.richardyych.cc/api/auth/login', JSON.stringify({ username: username, password: password }),{headers: headers})
            .map((response: Response) => {
				// login successful if there's a jwt token in the response
				let user = response.json();
				if (user) {

					// store user details and jwt token in local storage to keep user logged in between page refreshes

		  console.log(user);
          delete user["local"]["password"];
          delete user["local"]["username"];
					this.saveToken(JSON.stringify(user));
				}
			});
	}

	// delete the token in localStorage and change the navbar state
	logout(): void {
      	localStorage.removeItem('token');
      	this.authenticate.next(false);
		location.reload();
    }

    // save the token in localStorage and change the navbar state
	saveToken(token: string): void {
		localStorage.setItem('token', token);
		this.authenticate.next(true);
	}

	// return if the user is authenticate
	isAuthenticate(): boolean {
		let isAuth: boolean;
		if(localStorage.getItem('token')){
			isAuth = true;
		}else{
			isAuth = false;
		}
		return isAuth;
	}

}
