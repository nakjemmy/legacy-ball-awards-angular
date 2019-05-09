import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, Nominee, Vote } from '../shared/vote';
import { map } from 'rxjs/operators';
import { baseURL } from '../shared/baseUrl';
// import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http: HttpClient, private router: Router) { }
  TOKEN_KEY = 'coupon';
  getCategories(): Observable<any> {
    return this.http.get(baseURL + 'categories')
    .pipe(
      map((data: any) => data.categories)
    );
  }

  getNominees(): Observable<any> {
    return this.http.get(baseURL + 'nominees')
    .pipe(
      map((data: any) => data.nominees)
    );
  }

  getCategoriesWithNominees(): Observable<any> {
    return this.http.get(baseURL + 'categories/withnominees')
    .pipe(
      map((data: any) => data.categories)
    );
  }

  postVote(votes: Vote[]): Observable<any> {
    const body = JSON.stringify({votes, coupon: this.getCouponFromLocalStore()});
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest'});
    return this.http.post(baseURL + 'votes/castvote', body, {headers});
  }

  getCouponFromLocalStore() {
    return JSON.parse(localStorage.getItem(this.TOKEN_KEY));
  }

  getVotes() {
    return this.http.get(baseURL + 'votes')
    .pipe(
      map((data: any) => data.votes)
    );
  }
}
