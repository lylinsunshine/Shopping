import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ReviewService } from 'src/app/service/review.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  public showSearchBar: boolean = false;
  public reviews;
  public totalPage: number;
  public currentPage: number;
  public currentPageDisplay: number = 1;
  public entries: number;
  public collectionSize: number;

  public columnsToDisplay: string[] = ['id', 'name', 'rating', 'content', 'status' ,'action'];

  constructor(
    private fb: FormBuilder,
    private reviewService: ReviewService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.getAllReviewsInit(1, 5, '', 0, '');
    this.entries = 5;
  }

  reviewForm = this.fb.group({
    name: [''],
    rating: [''],
    content: [''],
  })

  showSuccess() {
    this.toastr.success('Update Review Success!', 'Notification', {
      closeButton: true,
      timeOut: 5000,
      enableHtml: true,
      disableTimeOut: true,
    });
  }

  resetForm = () => {
    this.reviewForm.reset({
      name: [''],
      rating: [''],
      content: [''],
    })
  }

  toggleReview = (reviewId: number) => {
    this.reviewService.hideReviewAndCalculateProductReview(reviewId).subscribe(
      response => {
        this.showSuccess();
        this.getAllReviews(this.currentPage, this.entries, this.reviewForm.value.name, this.reviewForm.value.rating, this.reviewForm.value.content);
      }
    )
  }

  onSubmit = (values) => {
    this.reviewService.getAllReviews(0, this.entries, this.reviewForm.value.name, this.reviewForm.value.rating, this.reviewForm.value.content).subscribe(response => {
      this.reviews = response.data.list;
      this.totalPage = response.data.totalPage;
      this.currentPage = response.data.currentPage;
      this.currentPageDisplay = this.currentPage+1;
      this.collectionSize = this.entries * this.totalPage;
      //this.paginator.createListPage(0, this.totalPage);
    });
  }

  onChange = (value) => {
    this.entries = value;
    this.reviewService.getAllReviews(0, this.entries, this.reviewForm.value.name, this.reviewForm.value.rating, this.reviewForm.value.content).subscribe(response => {
      this.reviews = response.data.list;
      this.totalPage = response.data.totalPage;
      this.currentPage = response.data.currentPage;
      this.currentPageDisplay = this.currentPage+1;

    });
  }

  onPageChanged = (pageNumber: number) => {
    //console.log("gia tri la"+pageNumber);
    this.getAllReviews(pageNumber-1, this.entries, this.reviewForm.value.name, this.reviewForm.value.rating, this.reviewForm.value.content);
  }

  getAllReviews = (pageNumber: number, size: number, name: string, rating: number, content: string): any => {
    this.reviewService.getAllReviews(pageNumber, size, name, rating, content).subscribe(response => {
      this.reviews = response.data.list;
      this.totalPage = response.data.totalPage;
      this.currentPage = response.data.currentPage;
    });
  }

  getAllReviewsInit = (pageNumber: number, size: number, name: string, rating: number, content: string): any => {
    this.reviewService.getAllReviews(pageNumber - 1, size, name, rating, content).subscribe(response => {
      this.reviews = response.data.list;
      this.totalPage = response.data.totalPage;
      this.currentPage = response.data.currentPage;
      this.collectionSize = this.entries * this.totalPage;
      //this.paginator.createListPage(0, this.totalPage);
    });
  }

}
