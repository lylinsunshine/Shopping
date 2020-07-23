import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { manufacturer } from '../model/manufacturer';
import { serverUrl } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {

  constructor(private http: HttpClient) { }

  getManufacturerSelect = (): Observable<manufacturer[]> => {
    const url = `${serverUrl}manufacturers/select`;
    return this.http.get<manufacturer[]>(url);
  }

  getAllManufacturers = (pageNumber: number, size: number, manufacturerName: string, manufacturerAddress: string): any => {
    let url = `${serverUrl}manufacturers?page=${pageNumber}&size=${size}`;
    if (manufacturerName != '') {
      url = url.concat(`&name=${manufacturerName}`);
    }
    if (manufacturerAddress != '') {
      url = url.concat(`&address=${manufacturerAddress}`);
    }
    return this.http.get(url);
  }



  addManufacturer = (body: any): any => {
    const url = `${serverUrl}manufacturers`;
    return this.http.post(url, body);
  }

  updateManufacturer = (body: any): any => {
    const url = `${serverUrl}manufacturers`;
    return this.http.put(url, body);
  }

  deleteManufacturer = (id: number): any => {
    const url = `${serverUrl}manufacturers/${id}`;
    return this.http.delete(url);
  }

  getOneManufacturer = (id: number): Observable<manufacturer> => {
    const url = `${serverUrl}manufacturers/${id}`;
    return this.http.get<manufacturer>(url);
  }


}
