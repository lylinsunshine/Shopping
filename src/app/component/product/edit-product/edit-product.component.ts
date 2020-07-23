import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { FormBuilder, Validators, AsyncValidatorFn, AbstractControl, ValidationErrors, ValidatorFn, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ManufacturerService } from 'src/app/service/manufacturer.service';
import { CategoryService } from 'src/app/service/category.service';
import { manufacturer } from 'src/app/model/manufacturer';
import { category } from 'src/app/model/category';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { FileService } from 'src/app/service/file.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalSmComponent } from '../../modal-sm/modal-sm.component';
import { AttributeService } from 'src/app/service/attribute.service';
import { ProductAttributeComponent } from './product-attribute/product-attribute.component';
declare var $: any;

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  public manufacturers: manufacturer[];
  public categories: category[];
  public images = [];
  public mainImage;
  private formData = new FormData();
  public url = "http://localhost:8080/shopping/images/";
  public flagDuplicateName = false;
  public defaultName: string = "";
  public flagDuplicateSku = false;
  public defaultSku: string = "";
  public flagDuplicateUrl = false;
  public defaultUrl: string = "";
  public spinner = false;
  public imagePath;
  imgURL: any;
  public attributes = [];
  public productAttributes = [];

  private isNameExist = (service: ProductService): AsyncValidatorFn => {
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

  private isSkuExist = (service: ProductService): AsyncValidatorFn => {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return service.isSkuExist(control.value).pipe(
        map(res => {
          // if res is true, username exists, return true
          return control.value == this.defaultSku ? null : (res['data'] ? { skuExist: true } : null);
          // NB: Return null if there is no error
        })
        , catchError(() => of(null))
      );
    };
  }

  private isUrlExist = (service: ProductService): AsyncValidatorFn => {
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

  private validateUrl = (): ValidatorFn => {
    return (control: FormControl) => {
      if (control.value.startsWith('-') || control.value.endsWith('-')) {
        return { invalidUrl: true }
      } else {
        return (/^[A-Za-z0-9-]+$/.test(control.value)) ? null : { invalidUrl: true };
      }
    }
  };

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private manufacturerService: ManufacturerService,
    private categoryService: CategoryService,
    private attributeService: AttributeService,
    private fileService: FileService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.getProductInfo();
    this.getSelectBoxValue();
  }

  productInfoForm = this.fb.group({
    id: 0,
    name: ['', Validators.required, this.isNameExist(this.productService).bind(this)],
    shortDescription: [''],
    fullDescription: [''],
    sku: ['', , this.isSkuExist(this.productService).bind(this)],
    price: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
    manufacturerEntity: this.fb.group({
      id: ['', Validators.required]
    }),
    categoryEntity: this.fb.group({
      id: ['', Validators.required],
    }),

  }
  );

  productSeoForm = this.fb.group({
    id: 0,
    url: ['', [Validators.required, this.validateUrl()], this.isUrlExist(this.productService).bind(this)],
    metaTitle: [''],
    metaKeyword: [''],
    metaDescription: [''],
  });

  productImageForm = this.fb.group({
    id: 0,
    image: [''],
  });

  addImageForm = this.fb.group({
    id: 0,
    image: [''],
    productEntity: this.fb.group({
      id: ['']
    }),
    displayOrder: [''],
  });

  getSelectBoxValue = () => {
    this.manufacturerService.getManufacturerSelect().subscribe(response => {
      this.manufacturers = response;
    })
    this.categoryService.getCategorySelect().subscribe(response => {
      this.categories = response;
    })

    this.attributeService.getAllAttributes().subscribe(response => {
      this.attributes = response;
    })
  }

  onSubmitInfo(values) {
    this.productService.updateProduct(values).subscribe(response => {
      this.showSuccess();
    });
  }

  onSubmitSeo(values) {
    this.productService.updateProduct(values).subscribe(response => {
      this.showSuccess();
    });
  }

  onOptionsSelected(event) {
    let value = event.target.value;
    this.productInfoForm.patchValue({
      manufacturerEntity: {
        id: value,
      }
    });
    console.log(value);
  }



  onFileSelect(event) {
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

  deletePreviewImage() {
    this.imgURL = null;
    this.formData.set('file', null);
  }


  showSuccess() {
    this.toastr.success('Update Product Success!', 'Notification', {
      closeButton: true,
    });
  }

  reset = () => {
    this.productInfoForm.reset();
  }

  upDisplayOrder = (curentDisplayOrder: number, imageId: number) => {
    console.log(curentDisplayOrder);
    console.log(this.images);
    let imageId2;
    if (curentDisplayOrder == 1) {
      console.log('00000');
      return;
    }
    else {
      this.images.filter(item => item.displayOrder == curentDisplayOrder - 1)
        .forEach(item =>
          imageId2 = item.id
        );
      this.productService.updateImageDisplayOrder(imageId, imageId2, null).subscribe(
        response => {
          console.log('xin chao');
          this.showSuccess();
          this.images.filter(item => item.displayOrder == curentDisplayOrder)
            .forEach(item =>
              item.displayOrder = curentDisplayOrder - 1
            );
          this.images.filter(item => item.id == imageId2)
            .forEach(item =>
              item.displayOrder = curentDisplayOrder
            );
          console.log(this.images);
        }
      )
    }

  }

  downDisplayOrder = (curentDisplayOrder: number, imageId: number) => {
    let imageId2;
    if (curentDisplayOrder == this.images.length) {
      return;
    }
    else {
      this.images.filter(item => item.displayOrder == curentDisplayOrder + 1)
        .forEach(item =>
          imageId2 = item.id
        );
      this.productService.updateImageDisplayOrder(imageId, imageId2, null).subscribe(
        response => {
          console.log('xin chao');
          this.showSuccess();
          this.images.filter(item => item.displayOrder == curentDisplayOrder)
            .forEach(item =>
              item.displayOrder = curentDisplayOrder + 1
            );
          this.images.filter(item => item.id == imageId2)
            .forEach(item =>
              item.displayOrder = curentDisplayOrder
            );
          console.log(this.images);
        }
      )
    }

  }

  deleteImage = (imageId: number, displayOrder: number, name: string) => {
    const modalRef = this.modalService.open(ModalSmComponent);
    modalRef.componentInstance.title = `Do you want delete this image`;
    modalRef.componentInstance.content = 'This action cannot be undone';
    modalRef.result.then(
      result => {
        if (result) {
          if (name == this.mainImage) {
            this.toastr.error(`Can't delete, pls change main image and try again`, 'Error!', {
              closeButton: true,
              timeOut: 500000,
              enableHtml: true,
              disableTimeOut: true,
            });
          } else {
            if (displayOrder <= 4) {
              this.toastr.error(`Can't delete, pls use down button to move item out of display zone`, 'Error!', {
                closeButton: true,
                timeOut: 500000,
                enableHtml: true,
                disableTimeOut: true,
              });
            } else {
              this.productService.deleteImageProduct(imageId, null).subscribe(
                response => {
                  this.toastr.success(`Delete Success`, 'Notification!', {
                    closeButton: true,
                    timeOut: 500000,
                    enableHtml: true,
                    disableTimeOut: true,
                  });
                  this.images = response['data'];
                }
              )
            }
          }
        }
      }
    )


  }

  addImage = () => {

    this.fileService.uploadImage(this.formData).subscribe(
      response => {
        if (response['data'] != null) {
          this.addImageForm.patchValue({
            image: response['data'],
            displayOrder: this.images.length + 1,
          });
        }
        console.log(this.addImageForm.value)
        this.productService.addImageProduct(this.addImageForm.value).subscribe(
          response => {
            this.showSuccess();
            this.images = response['data'];
          }
        )
      }
    );


  }

  setMainImage = (imageName) => {
    this.productImageForm.patchValue({
      image: imageName,
    })
    this.productService.updateProduct(this.productImageForm.value).subscribe(
      response => {
        this.showSuccess();
        this.mainImage = imageName;
      }
    )
  }

  sortImage = () => {
    return this.images.sort((a, b) => a.displayOrder - b.displayOrder);
  }

  sortProductAttribute = () => {
    return this.productAttributes.sort((a, b) => a.attributeId - b.attributeId);
  }

  getAttributeName = (attributeId: number) => {
    for (let index = 0; index < this.attributes.length; index++) {
      if (this.attributes[index].id == attributeId) {
        return this.attributes[index].name;
      }
    }
  }

  deleteProductAttribute = (productAttributeId: number) => {
    console.log(productAttributeId);
    this.productService.deleteProductAttribute(productAttributeId, null).subscribe(
      response => {
        this.showSuccess();
        this.productAttributes = response['data'];
      }
    )
  }

  openProductAttributeFormModal = (productAttribute: any) => {
    const modalRef = this.modalService.open(ProductAttributeComponent);
    modalRef.componentInstance.attributes = this.attributes;
    modalRef.componentInstance.productId = this.productInfoForm.controls.id.value;
    modalRef.componentInstance.productAttribute = productAttribute;

    modalRef.result.then(
      result => {
        if (result) {
          console.log(result);
          this.productService.addProductAttribue(result).subscribe(
            response => {
              this.showSuccess();
              this.productAttributes = response['data']
            }
          )
        }
      }
    )
  }

  toggleProductAttribute = (productAttribute: any) => {
    productAttribute.status = !productAttribute.status;
    productAttribute = Object.assign(
      {
        attributeEntity: {
          id: productAttribute.attributeId
        },
        productEntity: {
          id: this.productInfoForm.controls.id.value
        }
      },
      productAttribute)
    delete productAttribute.attributeId;
    this.productService.addProductAttribue(productAttribute).subscribe(
      response => {
        this.showSuccess();
        this.productAttributes = response['data']
      }
    )
  }


  getProductInfo = () => {
    const productId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.productService.getOneProduct(productId).subscribe(response => {

      this.defaultName = response['data'].name;
      this.defaultSku = response['data'].sku;
      this.defaultUrl = response['data'].url;

      this.productInfoForm.patchValue({
        id: response['data'].id,
        name: response['data'].name,
        price: response['data'].price,
        sku: response['data'].sku,

        shortDescription: response['data'].shortDescription,
        fullDescription: response['data'].fullDescription,
        manufacturerEntity: {
          id: response['data'].manufacturerEntity.id
        },
        categoryEntity: {
          id: response['data'].categoryEntity.id
        },
      });

      this.productSeoForm.patchValue({
        id: response['data'].id,
        url: response['data'].url,
        metaTitle: response['data'].metaTitle,
        metaKeyword: response['data'].metaKeyword,
        metaDescription: response['data'].metaDescription,
      });

      this.productImageForm.patchValue({
        id: response['data'].id,
        image: response['data'].image,
      })

      this.addImageForm.patchValue({
        productEntity: {
          id: response['data'].id,
        },
      })

      this.images = response['data'].productImageSet;
      this.mainImage = response['data'].image;
      this.productAttributes = response['data'].productAttributeSet;
    });
  }





}


