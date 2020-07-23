import { Component, OnInit } from '@angular/core';
import { serverUrl } from 'src/app/constant/constant';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BlogService } from 'src/app/service/blog.service';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.css']
})
export class ShowPostComponent implements OnInit {

  public blogs = [];
  public columnsToDisplay: string[] = ['id', 'title', 'image', 'dateCreate', 'overview', 'action'];
  public totalPage: number;
  public currentPage: number;
  public currentPageDisplay: number = 1;
  public entries: number;
  public url = `${serverUrl}images/`;
  public collectionSize: number;
  public showSearchBar: boolean = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private blogService: BlogService,
  ) { }

  ngOnInit() {
    this.entries = 5;
    this.getAllPostsInit(1, 5, '');
  }

  postForm = this.fb.group({
    name: [''],
  })

  onChange = (value) => {
    this.entries = value;
    this.blogService.getAllBlogs(0, this.entries, this.postForm.value.name).subscribe(response => {
      this.blogs = response.data.list;
      this.totalPage = response.data.totalPage;
      this.currentPage = response.data.currentPage;
      this.currentPageDisplay = this.currentPage+1;
    });
  }

  onSubmit = (values) => {
    this.blogService.getAllBlogs(0, this.entries, this.postForm.value.name).subscribe(response => {
      this.blogs = response.data.list;
      this.totalPage = response.data.totalPage;
      this.currentPage = response.data.currentPage;
      this.currentPageDisplay = this.currentPage+1;
      this.collectionSize = this.entries * this.totalPage;
      //this.paginator.createListPage(0, this.totalPage);
    });
  }

  resetForm = () => {
    this.postForm.reset({
      name: [''],
    })
  }

  
  onPageChanged = (pageNumber: number) => {
    //console.log("gia tri la"+pageNumber);
    this.getAllPosts(pageNumber-1, this.entries, this.postForm.value.name);
  }

  getAllPosts = (pageNumber: number, size: number, name: string): any => {
    this.blogService.getAllBlogs(pageNumber, size, name).subscribe(response => {
      this.blogs = response.data.list;
      this.totalPage = response.data.totalPage;
      this.currentPage = response.data.currentPage;
    });
  }

  getAllPostsInit = (pageNumber: number, size: number, name: string): any => {
    this.blogService.getAllBlogs(pageNumber - 1, size, name).subscribe(response => {
      this.blogs = response.data.list;
      this.totalPage = response.data.totalPage;
      this.currentPage = response.data.currentPage;
      this.collectionSize = this.entries * this.totalPage;
      //this.paginator.createListPage(0, this.totalPage);
    });
  }


}
