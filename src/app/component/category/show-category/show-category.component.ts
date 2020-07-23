import { Component, OnInit, ViewChild } from '@angular/core';
import { PaginatorComponent } from '../../paginator/paginator.component';
import { manufacturer } from 'src/app/model/manufacturer';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManufacturerService } from 'src/app/service/manufacturer.service';
import { FormBuilder } from '@angular/forms';
import { ModalSmComponent } from '../../modal-sm/modal-sm.component';
import { CategoryService } from 'src/app/service/category.service';
import { AddCategoryComponent } from './add-category/add-category.component';

@Component({
  selector: 'app-show-category',
  templateUrl: './show-category.component.html',
  styleUrls: ['./show-category.component.css']
})
export class ShowCategoryComponent implements OnInit {

  @ViewChild(PaginatorComponent, {static: true}) paginator: PaginatorComponent;

  public categories = [];
  public columnsToDisplay: string[] = ['id', 'name', 'description', 'url', 'parent', 'action'];
  public totalPage: number;
  public currentPage: number;
  public entries: number;
  public currentPageDisplay: number = 1;
  public collectionSize: number;
  public showSearchBar: boolean = false;

  public selectedCategory;

  constructor(
    private fb: FormBuilder, 
    private toastr: ToastrService, 
    private modalService: NgbModal,
    private categoryService: CategoryService,
    ) { }

  ngOnInit() {
    this.getAllCategoriesInit(1, 5, '');
    this.entries = 5;
  }

  categoryForm = this.fb.group({
    name: [''],
  })

  onSubmit = (values) => {
    this.categoryService.getAllCategories(0, this.entries, this.categoryForm.value.name).subscribe(response => {
      this.categories = response.data.list;
      this.totalPage = response.data.totalPage;
      this.currentPage = response.data.currentPage;
      this.currentPageDisplay = this.currentPage+1;
      this.collectionSize = this.entries * this.totalPage;
      //this.paginator.createListPage(0, this.totalPage);
    });
  }

  onChange = (value) => {
    this.entries=value;
    this.categoryService.getAllCategories(0, this.entries, this.categoryForm.value.name).subscribe(response => {
      this.categories = response.data.list;
      this.totalPage = response.data.totalPage;
      this.currentPage = response.data.currentPage;
      this.currentPageDisplay = this.currentPage+1;
      //this.paginator.createListPage(0, this.totalPage);
    });
  }

  onPageChanged = (pageNumber: number) => {
    this.getAllCategories(pageNumber -1, this.entries, this.categoryForm.value.name);
  }

  showSuccess() {
    this.toastr.success('Delete Success!', 'Notification', {
      closeButton: true,
      timeOut: 500000,
      enableHtml: true,
      disableTimeOut: true,
    });
  }

  resetForm = () => {
    this.categoryForm.reset({
      name: [''],
    })
  }

  getAllCategories = (pageNumber: number, size: number, categoryName: string): any => {
    this.categoryService.getAllCategories(pageNumber, size, categoryName).subscribe(response => {
      this.categories = response.data.list;
      this.totalPage = response.data.totalPage;
      this.currentPage = response.data.currentPage;
    });
  }

  getAllCategoriesInit = (pageNumber: number, size: number, manufacturerName: string): any => {
    this.categoryService.getAllCategories(pageNumber-1, size, manufacturerName).subscribe(response => {
      this.categories = response.data.list;
      this.totalPage = response.data.totalPage;
      this.currentPage = response.data.currentPage;
      this.collectionSize = this.entries * this.totalPage;
      //this.paginator.createListPage(0, this.totalPage);
    });
  }

  openModal = (categoryId: number) => {
    if(categoryId !=0){
      this.categories.forEach(element => {
        if (element.id == categoryId)
          this.selectedCategory = Object.assign({}, element);       
      });
    } else {
      this.selectedCategory = {}
    }
    
    const modalRef = this.modalService.open(AddCategoryComponent);
    //modalRef.componentInstance.categoryId = orderId;
    modalRef.componentInstance.selectedCategory = this.selectedCategory;
    modalRef.componentInstance.categoryId = categoryId;

    modalRef.result.then(
      result => {
        this.categoryService.getAllCategories(this.currentPage, this.entries, this.categoryForm.value.name).subscribe(response => {
          this.categories = response.data.list;
          this.totalPage = response.data.totalPage;
          this.currentPage = response.data.currentPage;
        });
      }
    )
  }
}
