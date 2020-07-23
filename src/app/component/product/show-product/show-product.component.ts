import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, ValidationErrors, FormGroup, ValidatorFn } from '@angular/forms';
import { ProductService } from 'src/app/service/product.service';
import { product } from 'src/app/model/product';
import { ManufacturerService } from 'src/app/service/manufacturer.service';
import { manufacturer } from 'src/app/model/manufacturer';
import { ToastrService } from 'ngx-toastr';
import { PaginatorComponent } from '../../paginator/paginator.component';
import { PaginationInstance } from 'ngx-pagination';
import { serverUrl } from 'src/app/constant/constant';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {

  @ViewChild(PaginatorComponent, {static: true}) paginator: PaginatorComponent;

  public products: product[];
  public manufacturers: manufacturer[];
  public columnsToDisplay: string[] = ['id', 'name', 'price', 'image', 'action'];
  public totalPage: number;
  public currentPage: number;
  public currentPageDisplay: number = 1;
  public entries: number;
  public url = `${serverUrl}images/`;
  public collectionSize: number;
  public showSearchBar: boolean = false;

  constructor(private productService: ProductService, private fb: FormBuilder, private manufacturerService: ManufacturerService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getAllProductsInit(1, 5, '', 0, 0, 0);
    this.getManufacturerSelect();
    this.entries = 5;
  }

  productForm = this.fb.group({
    name: [''],
    priceFrom: [''],
    priceTo: [''],
    manufacturerId: [0],
  }, {
    validator: validatePrice
  })


  onSubmit = (values) => {
    this.productService.getAllProducts(0, this.entries, this.productForm.value.name, this.productForm.value.priceFrom, this.productForm.value.priceTo, this.productForm.value.manufacturerId).subscribe(response => {
      this.products = response.data.list;
      this.totalPage = response.data.totalPage;
      this.currentPage = response.data.currentPage;
      this.currentPageDisplay = this.currentPage+1;
      this.collectionSize = this.entries * this.totalPage;
      //this.paginator.createListPage(0, this.totalPage);
    });
  }

  onChange = (value) => {
    this.entries = value;
    this.productService.getAllProducts(0, this.entries, this.productForm.value.name, this.productForm.value.priceFrom, this.productForm.value.priceTo, this.productForm.value.manufacturerId).subscribe(response => {
      this.products = response.data.list;
      this.totalPage = response.data.totalPage;
      this.currentPage = response.data.currentPage;
      this.currentPageDisplay = this.currentPage+1;
      //this.paginator.createListPage(0, this.totalPage);
    });
  }

  showSuccess() {
    this.toastr.success('Delete Success!', 'Notification', {
      closeButton: true,
      timeOut: 500000,
      enableHtml: true,
      disableTimeOut: true,
    });
  }

  onPageChanged = (pageNumber: number) => {
    //console.log("gia tri la"+pageNumber);
    this.getAllProducts(pageNumber-1, this.entries, this.productForm.value.name, this.productForm.value.priceFrom, this.productForm.value.priceTo, this.productForm.value.manufacturerId);
  }

  delete = (productId: number) => {
    let isDelete = confirm("Do you want delete this item");
    if (isDelete == true) {
      //console.log("true");
      this.productService.deleteProduct(productId).subscribe(
        response => {
          this.showSuccess();
          this.productService.getAllProducts(0, this.entries, this.productForm.value.name, this.productForm.value.priceFrom, this.productForm.value.priceTo, this.productForm.value.manufacturerId).subscribe(response => {
            this.products = response.data.list;
            this.totalPage = response.data.totalPage;
            this.currentPage = response.data.currentPage;
          });
        },
        error => {
          alert("Can't delete")
        });
      ;

    }
  }

  resetForm = () => {
    this.productForm.reset({
      name: [''],
      priceFrom: [''],
      priceTo: [''],
      manufacturerId: [0],
    })
  }

  // chooseManufacturer = (e) => {
  //   this.productForm.controls['manufacturerId'].setValue(e.target.value, {
  //     onlySelf: true
  //   })
  // }

  getManufacturerSelect = () => {
    this.manufacturerService.getManufacturerSelect().subscribe(response => {
      this.manufacturers = response;
    })
  }

  getAllProducts = (pageNumber: number, size: number, productName: string, priceFrom: number, priceTo: number, manufacturerId: number): any => {
    this.productService.getAllProducts(pageNumber, size, productName, priceFrom, priceTo, manufacturerId).subscribe(response => {
      this.products = response.data.list;
      this.totalPage = response.data.totalPage;
      this.currentPage = response.data.currentPage;
    });
  }

  getAllProductsInit = (pageNumber: number, size: number, productName: string, priceFrom: number, priceTo: number, manufacturerId: number): any => {
    this.productService.getAllProducts(pageNumber - 1, size, productName, priceFrom, priceTo, manufacturerId).subscribe(response => {
      this.products = response.data.list;
      this.totalPage = response.data.totalPage;
      this.currentPage = response.data.currentPage;
      this.collectionSize = this.entries * this.totalPage;
      //this.paginator.createListPage(0, this.totalPage);
    });
  }

  totalPageArray(number: number): any[] {
    return Array(number);
  }

}

const validatePrice: ValidatorFn = (fg: FormGroup) => {
  let start = fg.get('priceFrom').value;
  let end = fg.get('priceTo').value;
  if ((start === '' && end === '') || (start !== '' && end === '') || (start === '' && end !== ''))
    return null;
  if ((start !== '' && end !== '') && (+start > +end))
    return { invalidPrice: true }
};
