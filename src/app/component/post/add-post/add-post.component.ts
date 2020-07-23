import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/service/blog.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FileService } from 'src/app/service/file.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  private formData = new FormData();
  public imagePath;
  imgURL: any;

  constructor(
    private blogService: BlogService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private fileSerivce: FileService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  postForm = this.fb.group({
    id: 0,
    title: ['', Validators.required],
    overview: ['', Validators.required],
    body: ['', Validators.required],
    image: [''],
    dateCreated: [''],
  })

  onSubmit() {

    this.fileSerivce.uploadImage(this.formData).subscribe(
      response => {
        //console.log(response['data']);
        if (response['data'] != null) {
          this.postForm.patchValue({
            image: response['data'],
            //dateCreated: new Date(),
          });
        }
        //console.log(this.productForm.value);
        this.blogService.addPost(this.postForm.value).subscribe(response => {
          this.showSuccess();
          this.router.navigate(['/admin/blogs']);
        });
      }
    )
  }
  onFileSelect(event) {
    //this.selectedFile = event.target.files[0];
    this.previewImg(event.target.files[0]);
    //console.log(this.formData.get('file'));
    this.formData.set('file', event.target.files[0]);
    //console.log(this.formData.get('file'));
  }

  previewImg(file) {
    var reader = new FileReader();
    this.imagePath = file;
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  deleteImage() {
    this.imgURL = null;
    this.formData.set('file', null);
  }


  showSuccess() {
    this.toastr.success("Add Post Success", 'Notification', {
      closeButton: true,
      enableHtml: true,
    });
  }

  reset() {
    this.postForm.reset();
  }



}
