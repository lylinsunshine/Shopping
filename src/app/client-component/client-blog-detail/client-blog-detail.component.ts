import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/service/blog.service';
import { ActivatedRoute } from '@angular/router';
import { serverUrl } from 'src/app/constant/constant';

@Component({
  selector: 'app-client-blog-detail',
  templateUrl: './client-blog-detail.component.html',
  styleUrls: ['./client-blog-detail.component.css']
})
export class ClientBlogDetailComponent implements OnInit {

  public post;
  public url = `${serverUrl}images/`;
  constructor(
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getPostInfo();
  }

  getPostInfo = () => {
    const postId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.blogService.getOneBlog(postId).subscribe(response => {
      this.post = response['data'];
    });
  }

}
