import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { serverUrl } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  constructor(private http: HttpClient) { }

  getAllAttributes = (): any => {
    const url = `${serverUrl}attributes/select`;
    return this.http.get(url);
  }

  isNameExist = (name: string) => {
    const url = `${serverUrl}attributes/checkname/${name}`;
    return this.http.get(url);
  }

  addAttibute = (body: any): any => {
    const url = `${serverUrl}attributes/add`;
    return this.http.post(url, body);
  }
}
