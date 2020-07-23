import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { serverUrl } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class ClientCategoryService {

  constructor(private http: HttpClient) { }

  getAllProducts = (pageNumber: number, size: number, productName: string, priceFrom: number, priceTo: number, manufacturerId: number, categoryId: number, sortBy: number, initCategoryId: number): any => {
    let url = `${serverUrl}clients/products?page=${pageNumber}&size=${size}&initCategoryId=${initCategoryId}`;
    if (productName != '') {
      url = url.concat(`&name=${productName}`);
    }
    if (priceFrom != 0) {
      url = url.concat(`&priceFrom=${priceFrom}`);
    }
    if (priceTo != 0) {
      url = url.concat(`&priceTo=${priceTo}`);
    }
    if (manufacturerId != 0) {
      url = url.concat(`&manufacturerId=${manufacturerId}`);
    }
    if (categoryId != 0) {
      url = url.concat(`&categoryId=${categoryId}`);
    }
    if (sortBy != 0) {
      url = url.concat(`&sortBy=${sortBy}`);
    }
    return this.http.get(url);
  }

  getAllProductsSearch = (pageNumber: number, size: number, productName: string, priceFrom: number, priceTo: number, manufacturerId: number, categoryId: number, sortBy: number): any => {
    let url = `${serverUrl}clients/products/search?page=${pageNumber}&size=${size}`;
    if (productName != '') {
      url = url.concat(`&name=${productName}`);
    }
    if (priceFrom != 0) {
      url = url.concat(`&priceFrom=${priceFrom}`);
    }
    if (priceTo != 0) {
      url = url.concat(`&priceTo=${priceTo}`);
    }
    if (manufacturerId != 0) {
      url = url.concat(`&manufacturerId=${manufacturerId}`);
    }
    if (categoryId != 0) {
      url = url.concat(`&categoryId=${categoryId}`);
    }
    if (sortBy != 0) {
      url = url.concat(`&sortBy=${sortBy}`);
    }
    return this.http.get(url);
  }
}
