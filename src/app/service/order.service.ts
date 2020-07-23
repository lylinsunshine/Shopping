import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { serverUrl } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getUserInfo = (body: any) => {
    const url = `${serverUrl}clients/order`;
    return this.http.post(url, body);
  }

  getOrderHistory = (username: string) => {
    const url = `${serverUrl}clients/order/get-order-info`;
    let body = {username: username}
    return this.http.post(url, body);
  }

  getOrderDetail = (orderId: number) => {
    const url = `${serverUrl}clients/order/order-detail/${orderId}`;
    return this.http.get(url);
  }

  getAllOrders = (pageNumber: number, size: number, address: string, paymentMethod: string, deliveryStatus: string, paymentStatus: string): any => {
    let url = `${serverUrl}orders?page=${pageNumber}&size=${size}`;
    if (address != '') {
      url = url.concat(`&address=${address}`);
    }
    if (paymentMethod != '') {
      url = url.concat(`&paymentMethod=${paymentMethod}`);
    }
    if (deliveryStatus != '') {
      url = url.concat(`&deliveryStatus=${deliveryStatus}`);
    }
    if (paymentStatus != '') {
      url = url.concat(`&paymentStatus=${paymentStatus}`);
    }
    return this.http.get(url);
  }
  
  confirmPayment = (orderId: number) => {
    const url = `${serverUrl}/orders/confirm/${orderId}`;
    return this.http.get(url);
  }

  cancelOrder = (orderId: number) => {
    const url = `${serverUrl}/orders/cancel/${orderId}`;
    return this.http.get(url);
  }
}
