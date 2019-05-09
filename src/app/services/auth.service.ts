import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { baseURL } from '../shared/baseUrl';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PnotifyService } from './pnotify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  TOKEN_KEY = 'coupon';
  pnotify = undefined;
  redirectUrl = '/';
  constructor(private router: Router, private http: HttpClient, private pnotifyService: PnotifyService  ) {
    this.pnotify = pnotifyService.getPNotify();
  }

  getToken() {
    return JSON.parse(localStorage.getItem(this.TOKEN_KEY));
  }

  getIsAuthenticated() {
    if (localStorage.getItem(this.TOKEN_KEY)) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl(this.redirectUrl);
  }

  verify(code) {
    const body = JSON.stringify({ code });
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' });
    return this.http.post(baseURL + 'coupons/verify', body, { headers })
      .subscribe((res: any) => {
        localStorage.setItem(this.TOKEN_KEY, JSON.stringify(res.coupon));
        this.router.navigateByUrl('/vote');
      }, ({error}) => {

        this.pnotify.error({
          text: error.message
        });
      });
  }
}
