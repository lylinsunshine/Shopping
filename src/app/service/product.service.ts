import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { serverUrl } from '../constant/constant';
import { product } from '../model/product';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts = (pageNumber: number, size: number, productName: string, priceFrom: number, priceTo: number, manufacturerId: number): any => {
    let url = `${serverUrl}products?page=${pageNumber}&size=${size}`;
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
    return this.http.get(url);
  }

  addProduct = (body: any): any => {
    const url = `${serverUrl}products`;
    return this.http.post(url, body);
  }

  updateProduct = (body: any): any => {
    const url = `${serverUrl}products`;
    return this.http.patch(url, body);
  }

  deleteProduct = (id: number): any => {
    const url = `${serverUrl}products/${id}`;
    return this.http.delete(url);
  }

  getOneProduct = (id: number): Observable<product> => {
    const url = `${serverUrl}products/${id}`;
    return this.http.get<product>(url);
  }

  isNameExist = (name: string) => {
    const url = `${serverUrl}products/checkname/${name}`;
    return this.http.get(url);
  }

  isSkuExist = (sku: string) => {
    if(sku==''){
      return of('');
    }
    const url = `${serverUrl}products/checksku/${sku}`;
    return this.http.get(url);
  }

  isUrlExist = (urlLink: string) => {
    const url = `${serverUrl}products/checkurl/${urlLink}`;
    return this.http.get(url);
  }

  isValueExist = (value: string, productId: number) => {
    const url = `${serverUrl}products/checkvalue?value=${value}&productId=${productId}`;
    return this.http.get(url);
  }

  updateImageDisplayOrder = (imageId1: number, imageId2: number, body: any) => {
    const url = `${serverUrl}products/display-order?imageId1=${imageId1}&imageId2=${imageId2}`;
    return this.http.post(url, body);
  }

  deleteImageProduct = (imageId: number, body: any) => {
    const url = `${serverUrl}products/delete-image?imageId=${imageId}`;
    return this.http.post(url, body);
  }

  addImageProduct = (body: any) => {
    const url = `${serverUrl}products/add-image`;
    return this.http.post(url, body);
  }

  deleteProductAttribute = (productAttributeId: number, body: any) => {
    const url = `${serverUrl}product-attribute/${productAttributeId}`;
    return this.http.delete(url, body);
  }

  addProductAttribue = (body: any) => {
    const url = `${serverUrl}products/product-attribute`;
    return this.http.post(url, body);
  }

  getClientProductInfo = (productUrl: string) => {
    const url = `${serverUrl}clients/products/${productUrl}`;
    return this.http.get(url);
  }

  getClientCategoryPageInfo = (categoryUrl: string) => {
    const url = `${serverUrl}clients/products/category/${categoryUrl}/manufacturer`;
    return this.http.get(url);
  }

  getRelatedProduct = (productId: number) => {
    const url = `${serverUrl}clients/products/related-product/${productId}`;
    return this.http.get(url);
  }
}
