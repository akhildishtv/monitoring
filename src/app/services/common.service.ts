import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment"

@Injectable({

  providedIn: 'root'
})
export class CommonService {
  API_ENDPOINT = environment.baseURL
  PRODUCTION_URL = environment.productionUrl
  headers: any
  ottApiUrl: string = `https://ottmobileapis.dishtv.in/Api/`;

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
  getWebSeriesData(value): Observable<any> {
    return this.http.post<any>(`https://restv4-as.ott.kaltura.com/v5_0_3/api_v3/service/asset/action/list`, value)
      .pipe(
        catchError(err => { return null })
      )
  }

  getVideoPlayerData(): Observable<any> {
    return this.http.get<any>(`http://a-fds.youborafds01.com/data?outputformat=json&system=dishindiadev&pluginVersion=6.7.35-adapterless-js&requestNumber=0.9426220496137825&timemark=1638955838474`)
      .pipe(
        catchError(err => { return null })
      )
  }

  getlocationData(data): Observable<any> {
    return this.http.post(`${this.API_ENDPOINT}/api/v1/analytics/channel/newslocationuser`, data, { headers: this.headers })
      .pipe(
        catchError(err => { return null })
      )
  }

  getAPIData(data): Observable<any> {
    return this.http.post(`${this.PRODUCTION_URL}/API/getAPIData`, data, { headers: this.headers })
      .pipe(
        catchError(err => { return null })
      )
  }

  getActiveSubscriptionData(): Observable<any> {
    return this.http.get<any>(`https://ottmobileapis.dishtv.in/API/SubscriptionManagement/GetActiveSubscriptions`)
      .pipe(
        catchError(err => { return null })
      )
  }

  getKalturaLogin(value): Observable<any> {
    return this.http.post<any>(`https://restv4-as.ott.kaltura.com/v5_0_3/api_v3/service/ottuser/action/login`, value)
      .pipe(
        catchError(err => { return null })
      )
  }

  getData(data): Observable<any> {
    return this.http.post(`${this.API_ENDPOINT}api/v1/analytics/impressions/dishbuzzuser`, data, { headers: this.headers })
      .pipe(
        catchError(err => { return null })
      )
  }

  getZee5Token(value): Observable<any> {
    return this.http.get<any>(`https://server.watcho.com/API/getZeeToken?mobileNumber=${value}`)
      .pipe(
        catchError(err => { return null })
      )
  }

  createZeeSubscription(value): Observable<any> {
    return this.http.post<any>(`https://server.watcho.com/API/createZeeSubscription`, value)
      .pipe(
        catchError(err => { return null })
      )
  }

  get1Data(data): Observable<any> {
    return this.http.post(`${this.API_ENDPOINT}api/v1/analytics/impressions/dishbuzztime`, data, { headers: this.headers })
      .pipe(
        catchError(err => { return null })
      )
  }

  getSonyLivToken(Pseudocode) {
    let URL = `https://tomcat4sony.mysmartstick.com/ServletSample/ServletFirstClass?Pseudocode=${Pseudocode}`
    return this.http.get(URL)
      .pipe((res: Observable<HttpResponse<any>>) => {
        return res
      });
  }
  getUA = () => {
    let device = "Unknown";
    const ua = {
      "Generic Linux": /Linux/i,
      "Android": /Android/i,
      "BlackBerry": /BlackBerry/i,
      "Bluebird": /EF500/i,
      "Chrome OS": /CrOS/i,
      "Datalogic": /DL-AXIS/i,
      "Honeywell": /CT50/i,
      "iPad": /iPad/i,
      "iPhone": /iPhone/i,
      "iPod": /iPod/i,
      "macOS": /Macintosh/i,
      "Windows": /IEMobile|Windows/i,
      "Zebra": /TC70|TC55/i,
    }
    Object.keys(ua).map(v => navigator.userAgent.match(ua[v]) && (device = v));
    return device;
  }
  getIPAddress() {
    return this.http.get("https://api.ipify.org/?format=json");
  }

  GetActiveSubscriptions(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.ottApiUrl}AppSubscriptionManagement/GetActiveSubscriptions`).pipe((res: Observable<HttpResponse<any>>) => {
      return res;
    });
  }

  GetDishD2hActiveSubscriptions(OttSubscriberID): Observable<HttpResponse<any>> {
    let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Ijk4NzMxNDI3MDMiLCJuYmYiOjE2NjUxMzM0NTUsImV4cCI6MTc1MTUzMzQ1NSwiaWF0IjoxNjY1MTMzNDU1LCJpc3MiOiJEaXNoT1RUIiwiYXVkIjoiRGlzaE9UVCJ9.hzNVYeJy2Pi_eMIe_08ivP2532skMg8FN6mFfDpgnEU`
    var headers = new HttpHeaders().set('Authorization', token);
    headers = headers.append('Content-Type', 'application/json');
    return this.http.get(`${this.ottApiUrl}AppSubscriptionManagement/GetActiveSubscriptions/${OttSubscriberID}`, { headers: headers }).pipe((res: Observable<HttpResponse<any>>) => {
      return res;
    });
  }

  getPrepaidBalance(OTTSubscriberID): Observable<HttpResponse<any>> {
    let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Ijk4NzMxNDI3MDMiLCJuYmYiOjE2NjUxMzM0NTUsImV4cCI6MTc1MTUzMzQ1NSwiaWF0IjoxNjY1MTMzNDU1LCJpc3MiOiJEaXNoT1RUIiwiYXVkIjoiRGlzaE9UVCJ9.hzNVYeJy2Pi_eMIe_08ivP2532skMg8FN6mFfDpgnEU`
    var headers = new HttpHeaders().set('Authorization', token);
    headers = headers.append('Content-Type', 'application/json');
    return this.http.get(`${this.ottApiUrl}SubscriptionManagement/GetPrepaidBalance/${OTTSubscriberID}`, { headers: headers }).pipe((res: Observable<HttpResponse<any>>) => {
      return res;
    });
  }

  getOTTPlansSubscriptionHistory(OttSubscriberID) {
    let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Ijk4NzMxNDI3MDMiLCJuYmYiOjE2NjUxMzM0NTUsImV4cCI6MTc1MTUzMzQ1NSwiaWF0IjoxNjY1MTMzNDU1LCJpc3MiOiJEaXNoT1RUIiwiYXVkIjoiRGlzaE9UVCJ9.hzNVYeJy2Pi_eMIe_08ivP2532skMg8FN6mFfDpgnEU`
    var headers = new HttpHeaders().set('Authorization', token);
    headers = headers.append('Content-Type', 'application/json');
    return this.http.get(`${this.ottApiUrl}AppSubscriptionManagement/SubscriptionHistory/${OttSubscriberID}`, { headers: headers }).pipe((res: Observable<HttpResponse<any>>) => {
      return res;
    });
  }
  ValidateKlikk(payload) {
    let URL = `https://server.watcho.com/API/getKlikkRedirectURL`
    // let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(URL, payload)
      .pipe((res: Observable<HttpResponse<any>>) => {
        return res
      });
  }
}
