import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ManufacturerService } from 'src/app/service/manufacturer.service';
import { ToastrService } from 'ngx-toastr';
import { manufacturer } from 'src/app/model/manufacturer';
import { ProductService } from 'src/app/service/product.service';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { category } from 'src/app/model/category';
import { FileService } from 'src/app/service/file.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  public manufacturers: manufacturer[];
  public categories = [];
  public selectedFile;
  private formData = new FormData();
  private params = new HttpParams();
  public manufacturerId: number = 0;
  public imagePath;
  imgURL: any;

  constructor(
    private fb: FormBuilder,
    private manufacturerService: ManufacturerService,
    private toastr: ToastrService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private fileSerivce: FileService,
    private router: Router) { }

  ngOnInit() {
    this.getSelectBoxValue();
    //this.formData.append('file', 'thang');
  }

  productForm = this.fb.group({
    // id: 0,
    name: ['', Validators.required],
    shortDescription: [''],
    fullDescription: [''],
    price: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
    image: [null],
    manufacturerEntity: this.fb.group({
      id: ['', Validators.required],
    }),
    categoryEntity: this.fb.group({
      id: ['', Validators.required],
    })
  })

  onSubmit() {

    this.fileSerivce.uploadImage(this.formData).subscribe(
      response => {
        //console.log(response['data']);
        if (response['data'] != null) {
          this.productForm.patchValue({
            image: response['data'],
          });
        }
        //console.log(this.productForm.value);
        this.productService.addProduct(this.productForm.value).subscribe(response => {
          this.showSuccess();
          this.router.navigate(['products']);
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
    this.toastr.success("Add Product Success", 'Notification', {
      closeButton: true,
      enableHtml: true,
    });
  }

  reset() {
    this.productForm.reset();
  }

  getSelectBoxValue = () => {
    this.manufacturerService.getManufacturerSelect().subscribe(response => {
      this.manufacturers = response;
    })
    this.categoryService.getCategorySelect().subscribe(response => {
      this.categories = response;
    })
  }

}
