import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { serverUrl } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class IndexService {

  constructor(private http: HttpClient) { }

  getStatBox = () => {
    const url = `${serverUrl}/index/stat`;
    return this.http.get(url);
  }

  getChartInfo = () => {
    const url = `${serverUrl}/index/chart`;
    return this.http.get(url);
  }

  getPromotionInfo = () => {
    const url = `${serverUrl}/index/promotion`;
    return this.http.get(url);
  }

  getCurrentPromotionInfo = () => {
    const url = `${serverUrl}/index/current-promotion`;
    return this.http.get(url);
  }

  getLastestProduct = () => {
    const url = `${serverUrl}/index/lastest-product`;
    return this.http.get(url);
  }

  getHotProduct = () => {
    const url = `${serverUrl}/index/hot-product`;
    return this.http.get(url);
  }

  getRandomProduct = () => {
    const url = `${serverUrl}/index/random-product`;
    return this.http.get(url);
  }
}
