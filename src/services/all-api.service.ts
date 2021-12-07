import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
	providedIn: 'root'
})

export class AllApiService {
	headers: any

	constructor(
		private http: HttpClient,
		public apiUrl = environment.baseURL
	) {
		this.headers = {
			'Content-Type': 'application/json',
			'secrettoken': '/GScsTA$7HU+c4K5qtxt9Rq;'
		}

	}

	login(data): Observable<any> {
		return this.http.post(`${this.apiUrl}/api/v1/analytics/user/auth`, data)
		  .pipe(
			catchError(this.handleError('getUser', []))
		  );
	  }
	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(error); // log to console instead
			return of(result as T);
		};
	}
}
