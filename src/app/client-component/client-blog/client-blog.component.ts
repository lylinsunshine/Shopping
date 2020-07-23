import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/service/blog.service';
import { serverUrl } from 'src/app/constant/constant';

@Component({
  selector: 'app-client-blog',
  templateUrl: './client-blog.component.html',
  styleUrls: ['./client-blog.component.css']
})
export class ClientBlogComponent implements OnInit {

  public blogs = [];
  public url = `${serverUrl}images/`;
  constructor(
    private blogService: BlogService
  ) { }

  ngOnInit() {
    this.getAllBlogs();
  }

  getAllBlogs = () => {
    this.blogService.getAllBlogs(0, 20, '').subscribe(
      response => {
        this.blogs = response.data.list;
      }
    )

  }

}
