import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { serverUrl } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  uploadImage = (body: any) => {
    const url = `${serverUrl}files`;
    return this.http.post(url, body);
  }
}
