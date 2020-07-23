import { Component, OnInit, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, AsyncValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { ProductService } from 'src/app/service/product.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-product-attribute',
  templateUrl: './product-attribute.component.html',
  styleUrls: ['./product-attribute.component.css']
})
export class ProductAttributeComponent implements OnInit {

  @Input() attributes: [];
  @Input() productId;
  @Input() productAttribute;

  private defaultName = '';

  private isNameExist = (service: ProductService): AsyncValidatorFn => {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return service.isValueExist(control.value, this.productId).pipe(
        map(res => {
          // if res is true, username exists, return true
          return control.value == this.defaultName ? null : (res['data'] ? { valueExist: true } : null);
          // NB: Return null if there is no error
        })
      );
    };
  }

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit() {
    
    this.productAttributeForm.patchValue({
      productEntity: {
        id: this.productId,
      },
    })
    if(this.productAttribute!=null){
      this.defaultName = this.productAttribute.value;
      this.productAttributeForm.patchValue({
        id: this.productAttribute.id,
        attributeEntity: {
          id: this.productAttribute.attributeId,
        },   
        price: this.productAttribute.price,
        value: this.productAttribute.value,
      })
    }
  }

  productAttributeForm = this.fb.group({
    id: 0,
    attributeEntity: this.fb.group({
      id: ['', Validators.required],
    }),
    productEntity: this.fb.group({
      id: [''],
    }),
    status: true,
    price: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
    value: ['', Validators.required, this.isNameExist(this.productService).bind(this)],
  });

  onSubmit = (values) => {
    
  };

  closeModal() {
    this.activeModal.close(this.productAttributeForm.value);
  }

}
