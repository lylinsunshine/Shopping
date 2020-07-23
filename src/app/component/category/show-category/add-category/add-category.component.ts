import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from 'src/app/service/category.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  @Input() selectedCategory;
  @Input() categoryId;

  public defaultName: string = "";
  public defaultUrl: string = "";
  public categories = [];
  public isUpdate: boolean = false;
  public isParent: boolean = false;

  public isHaveChild: number = 0;

  private isNameExist = (service: CategoryService): AsyncValidatorFn => {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return service.isNameExist(control.value).pipe(
        map(res => {
          // if res is true, username exists, return true
          return control.value == this.defaultName ? null : (res['data'] ? { nameExist: true } : null);
          // NB: Return null if there is no error
        })
      );
    };
  }

  private isUrlExist = (service: CategoryService): AsyncValidatorFn => {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return service.isUrlExist(control.value).pipe(
        map(res => {
          // if res is true, username exists, return true
          return control.value == this.defaultUrl ? null : (res['data'] ? { urlExist: true } : null);
          // NB: Return null if there is no error
        })
      );
    };
  }

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal,
    private categoryService: CategoryService,
  ) { }

  ngOnInit() {
    this.updateFormValueInit();
    this.getCategorySelect();
  }

  categoryForm = this.fb.group({
    id: [''],
    name: ['', Validators.required, this.isNameExist(this.categoryService).bind(this)],
    description: [''],
    url: [''],
    parent: this.fb.group({
      id: ['']
    })
  });

  showSuccess() {
    this.toastr.success("Add Category Success", 'Notification', {
      closeButton: true,
      enableHtml: true,
    });
  }

  onSubmit = () => {

  }
  checkIsParent = ($event) => {
    if($event.target.value==""){
      //console.log('xinchao');
      this.isParent = true;
      this.categoryForm.controls.url.setValidators([Validators.required, Validators.pattern('^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$')]);
      this.categoryForm.controls.url.setAsyncValidators([this.isUrlExist(this.categoryService)]);
      this.categoryForm.controls.url.updateValueAndValidity();
    } else {
      this.isParent = false;
      this.categoryForm.controls.url.clearValidators();
      this.categoryForm.controls.url.updateValueAndValidity();
    }
  }

  updateFormValueInit = () => {
    if (this.categoryId!=0) {
      this.categoryForm.patchValue({
        id: this.selectedCategory.id,
        name: this.selectedCategory.name,     
      });
      this.defaultName = this.selectedCategory.name;
      if(this.selectedCategory.description !=null){
        this.categoryForm.patchValue({
          description: this.selectedCategory.description,
        });
      }
      if(this.selectedCategory.url !=null){
        this.isParent = true;
        this.categoryForm.patchValue({
          url: this.selectedCategory.url,
        });
        this.defaultUrl= this.selectedCategory.url;
      }
      if (this.selectedCategory.parent) {
        this.categoryForm.patchValue({
          parent: {
            id: this.selectedCategory.parent.id,
          }
        });
      }

      this.categoryService.isCategoryHaveChild(this.categoryId).subscribe(
        response => {
          console.log(response['data']);
          this.isHaveChild = response['data'];
        }
      )
      this.isUpdate = true;
    } else {
      this.isUpdate = false;
    }
  }

  updateCategory = () => {
    let categoryObject = 
    {
      id: this.categoryForm.get('id').value,
      name: this.categoryForm.get('name').value,
      description: this.categoryForm.get('description').value,
    }

    if(this.categoryForm.get('parent.id').value != ""){
      let id = { id: this.categoryForm.get('parent.id').value};
      categoryObject['parent'] = id;     
    } else {
      categoryObject['url'] = this.categoryForm.get('url').value;
    }

    //console.log(categoryObject);
    this.categoryService.updateCategory(categoryObject).subscribe(
      response => {
        this.showSuccess();
        this.activeModal.close();
      }
    )
  }

  addCategory = () => {
    //this.categoryService.addCategory()
    let categoryObject = 
    {
      id: 0,
      name: this.categoryForm.get('name').value,
      description: this.categoryForm.get('description').value,
    }

    if(this.categoryForm.get('parent.id').value != ""){
      let id = { id: this.categoryForm.get('parent.id').value};
      categoryObject['parent'] = id;
    }else {
      categoryObject['url'] = this.categoryForm.get('url').value;
    }

    //console.log(categoryObject);
    this.categoryService.addCategory(categoryObject).subscribe(
      response => {
        this.showSuccess();
        this.activeModal.close();
      }
    )
  }

  getCategorySelect = () => {
    this.categoryService.getAllCategoriesNotHaveParent().subscribe(response => {
      this.categories = response;
    })
  }

  // getCategoryInfo = (categoryId:number) => {
  //   this.categoryService.
  // }

}
