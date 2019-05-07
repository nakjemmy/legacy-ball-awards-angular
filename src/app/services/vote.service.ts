import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, Nominee } from '../shared/vote';
import { map } from 'rxjs/operators';
import { baseURL } from '../shared/baseUrl';
// import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http: HttpClient, private router: Router) { }

  getCategories(): Observable<any> {
    return this.http.get(baseURL + 'categories')
    .pipe(
      map((data: any) => data.categories)
    );
  }

  getCategoriesWithNominees(): Observable<any> {
    return this.http.get(baseURL + 'categories/withnominees')
    .pipe(
      map((data: any) => data.categories)
    );
  }

  // postVote(content: Nominee[], voterId: number): Observable<any> {
  //   const token = this.auth.getToken();
  //   const body = JSON.stringify({candidates: content, voter_id: voterId});
  //   const headers = new HttpHeaders({'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest'});
  //   return this.http.post(baseURL + 'api/castvote?token=' + token, body, {headers: headers});
  // }

  // logout() {
  //   localStorage.clear();
  //   this.router.navigateByUrl('/');
  // }
}
