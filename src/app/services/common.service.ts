import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment"

@Injectable({

  providedIn: 'root'
})
export class CommonService {
  API_ENDPOINT = environment.baseURL
  headers: any
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.headers = {
      'Content-Type': 'application/json',
      'secrettoken': '/GScsTA$7HU+c4K5qtxt9Rq;'
    }
  }

  login(value) {
    return this.http.post<any>(`${this.API_ENDPOINT}/api/v1/analytics/user/auth`, value, { headers: this.headers })
      .pipe(map(user => {
        if (user && user.data.token) {
          this.setToken(user.data.token);
        }
        return user;
      }));
  }

  setToken(token) {
    window.localStorage.setItem('token', token);
  }

  getToken() {
    return window.localStorage.getItem('token');
  }

  logout() {
    window.localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  getChannelList(value): Observable<any> {
    return this.http.post<any>(`${this.API_ENDPOINT}/api/v1/analytics/channel/news`, value, { headers: this.headers })
      .pipe(
        catchError(err => { return null })
      )
  }

  getLanguageList(value): Observable<any> {
    return this.http.post<any>(`${this.API_ENDPOINT}/api/v1/analytics/language/newslanguages`, value, { headers: this.headers })
      .pipe(
        catchError(err => { return null })
      )
  }

  getProgramList(value): Observable<any> {
    return this.http.post<any>(`${this.API_ENDPOINT}/api/v1/analytics/event/newsevents`, value, { headers: this.headers })
      .pipe(
        catchError(err => { return null })
      )
  }
  getAllProgramList(value): Observable<any> {
    return this.http.post<any>(`${this.API_ENDPOINT}/api/v1/analytics/event/newsevent`, value, { headers: this.headers })
      .pipe(
        catchError(err => { return null })
      )
  }
}
