import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { serverUrl } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  getAllBlogs = (pageNumber: number, size: number, title: string): any => {
    let url = `${serverUrl}posts?page=${pageNumber}&size=${size}`;
    if (title != '') {
      url = url.concat(`&name=${title}`);
    }
    return this.http.get(url);
  }

  addPost = (body: any): any => {
    const url = `${serverUrl}posts`;
    return this.http.post(url, body);
  }

  getOneBlog= (id: number): any => {
    const url = `${serverUrl}posts/${id}`;
    return this.http.get(url);
  }
}
