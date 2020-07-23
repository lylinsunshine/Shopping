import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { serverUrl } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient) { }

  getAllPromotions = (pageNumber: number, size: number, promotionName: string, startDate: string, endDate: string, type: string): any => {
    let url = `${serverUrl}promotions?page=${pageNumber}&size=${size}`;
    if (promotionName != '') {
      url = url.concat(`&name=${promotionName}`);
    }
    if (startDate != '') {
      url = url.concat(`&startDate=${startDate}`);
    }
    if (endDate != '') {
      url = url.concat(`&endDate=${endDate}`);
    }
    if (type != '') {
      url = url.concat(`&type=${type}`);
    }
    return this.http.get(url);
  }

  addPromotion = (body: any): any => {
    const url = `${serverUrl}promotions`;
    return this.http.post(url, body);
  }

  addPromotionDetail = (promotionId:number, type: string, id: number): any => {
    const url = `${serverUrl}promotions/add-detail?promotionId=${promotionId}&type=${type}&id=${id}`;
    return this.http.get(url);
  }

  getPromotionInfo = (promotionId: number): any => {
    const url = `${serverUrl}promotions/${promotionId}`;
    return this.http.get(url);
  }

  getProductByPromotionId = (promotionId: number): any => {
    const url = `${serverUrl}promotions/${promotionId}/products`;
    return this.http.get(url);
  }
}
