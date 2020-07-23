import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { serverUrl } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  getReviewByProductId = (productId: number): any => {
    const url = `${serverUrl}clients/reviews/${productId}`;
    return this.http.get(url);
  }

  addReview = (body: any): any => {
    const url = `${serverUrl}clients/reviews/add-review`;
    return this.http.post(url, body);
  }

  getAllReviews = (pageNumber: number, size: number, name: string, rating: number, content: string): any => {
    let url = `${serverUrl}reviews?page=${pageNumber}&size=${size}`;
    if (name != '') {
      url = url.concat(`&name=${name}`);
    }
    if (rating != 0) {
      url = url.concat(`&rating=${rating}`);
    }
    if (content != '') {
      url = url.concat(`&content=${content}`);
    }
    return this.http.get(url);
  }

  hideReviewAndCalculateProductReview = (reviewId: number) => {
    const url = `${serverUrl}reviews/${reviewId}`;
    return this.http.get(url);
  }
}
