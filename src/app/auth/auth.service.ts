import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { serverUrl } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login = (username: string, password: string) => {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Authorization': 'Basic ' + btoa('shopping:shopping'),
    //     'Content-type': 'application/x-www-form-urlencoded'
    //   }),
    // };

    // const body = 'client_id=shopping&client_secret=shopping&grant_type=password&' +
    //   'username=' + username + '&password=' + password;
    // return this.http.post(`${serverUrl}oauth/token`, body, httpOptions);
    //const body = 'username=' + username + '&password=' + password;
    return this.http.get(`${serverUrl}login?username=${username}&password=${password}`);
  }

  clientLogin = (body: any) => {
    const url = `${serverUrl}clients/user/login`;
    return this.http.post(url, body);
  }

  refreshToken = (refresh_token: string) => {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa('shopping:shopping'),
        'Content-type': 'application/x-www-form-urlencoded'
      }),
    };
    const body = 'client_id=shopping&client_secret=shopping&' +
      'grant_type=refresh_token&refresh_token=' + refresh_token;

    return this.http.post(`${serverUrl}oauth/token`, body, httpOptions);
  }

  logout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  }

  isLoggedIn = () => {
    return (localStorage.getItem('token') === null && sessionStorage.getItem('token')===null) ? false : true;
  }

  getUserId = () => {
    if (localStorage.getItem('token') !== null)
      return localStorage.getItem('token');
    else if (sessionStorage.getItem('token') !== null)
      return sessionStorage.getItem('token');
    else return null;
  }
}
