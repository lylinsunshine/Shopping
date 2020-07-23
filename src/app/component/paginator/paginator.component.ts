import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { maxPageDisplay } from 'src/app/constant/constant';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  @Input() currentPage: number;
  @Input() totalPage: number;
  @Input() pageSize: number;

  @Output() pageChanged = new EventEmitter<number>();

  public pageNumberList = [];

  constructor() { }
  // ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
  //   this.createListPage(changes['currentPage'].currentValue, changes['totalPage'].currentValue);
  // }

  ngOnInit() {
    // console.log("hello");
    this.createListPage(this.currentPage, this.totalPage);
    // console.log(this.pageNumberList);
  }

  totalPageArray(number: number): any[] {
    return Array(number);
  }

  selectPage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.createListPage(pageNumber, this.totalPage);
    this.pageChanged.emit(pageNumber);
    // console.log("tham so nhan "+pageNumber);
    // console.log("ds trang "+this.pageNumberList);
    // console.log("trang hien tai "+this.currentPage);
    // console.log("tong trang  "+this.totalPage);
  }

  createListPage(currentPage: number, totalPage: number) {
    this.pageNumberList = [];
    let pageMin: number;
    let pageMax: number;
    pageMin = currentPage - (maxPageDisplay - 1) / 2;
    pageMax = currentPage + (maxPageDisplay - 1) / 2;
    // console.log("page min ban dau "+ pageMin);
    // console.log("page max ban dau "+ pageMax);

    if (pageMin <= 0) {
      pageMin = 1;
      pageMax = maxPageDisplay;
    }

    if (pageMax > totalPage) {
      pageMax = totalPage;
      pageMin = totalPage - maxPageDisplay + 1;
    }

    // console.log("page min sau "+ pageMin);
    // console.log("page max sau "+ pageMax);

    for (let i = pageMin; i <= pageMax; i++) {
      if (i > 0) {
        this.pageNumberList.push(i);
      }
    }

    // console.log("ds trang "+this.pageNumberList);

    // let startPage: number, endPage: number;
    //     if (totalPage <= 4) {
    //         // less than 10 total pages so show all
    //         startPage = 1;
    //         endPage = totalPage;
    //     } else {
    //         // more than 10 total pages so calculate start and end pages
    //         if (currentPage <= 3) {
    //             startPage = 1;
    //             endPage = 3;
    //         } else if (currentPage + 3 >= totalPage) {
    //             startPage = totalPage - 3;
    //             endPage = totalPage-1;
    //         } else {
    //             startPage = currentPage - 5;
    //             endPage = currentPage + 4;
    //         }
    //     }


  }


}
