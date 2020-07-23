import { Injectable } from '@angular/core';
import { serverUrl } from '../constant/constant';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategorySelect = (): any => {
    const url = `${serverUrl}categories/select`;
    return this.http.get(url);
  }

  getAllCategories= (pageNumber: number, size: number, categoryName: string): any => {
    let url = `${serverUrl}categories/all?page=${pageNumber}&size=${size}`;
    if (categoryName != '') {
      url = url.concat(`&name=${categoryName}`);
    }
    return this.http.get(url);
  }

  getAllCategoriesNotHaveParent = (): any => {
    const url = `${serverUrl}categories/all-no-parent`;
    return this.http.get(url);
  }

  updateCategory = (body: any) => {
    const url = `${serverUrl}categories/update`;
    return this.http.post(url, body);
  }

  addCategory = (body: any) => {
    const url = `${serverUrl}categories/add`;
    return this.http.post(url, body);
  }

  isNameExist = (name: string) => {
    const url = `${serverUrl}categories/checkname/${name}`;
    return this.http.get(url);
  }

  isUrlExist = (urlString: string) => {
    const url = `${serverUrl}categories/checkurl/${urlString}`;
    return this.http.get(url);
  }

  isCategoryHaveChild = (id: number) => {
    const url = `${serverUrl}categories/check-have-child/${id}`;
    return this.http.get(url);
  }
}
