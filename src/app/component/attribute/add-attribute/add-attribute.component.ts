import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AsyncValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AttributeService } from 'src/app/service/attribute.service';

@Component({
  selector: 'app-add-attribute',
  templateUrl: './add-attribute.component.html',
  styleUrls: ['./add-attribute.component.css']
})
export class AddAttributeComponent implements OnInit {

  private isNameExist = (service: AttributeService): AsyncValidatorFn => {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return service.isNameExist(control.value).pipe(
        map(res => {
          // if res is true, username exists, return true
          return (res['data'] ? { nameExist: true } : null);
          // NB: Return null if there is no error
        })
      );
    };
  }

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private attributeService: AttributeService,
  ) { }

  ngOnInit() {
  }

  attributeForm = this.fb.group({
    id: [0],
    name: ['', Validators.required, this.isNameExist(this.attributeService).bind(this)],
  })

  addAttribute = () => {
    this.activeModal.close(this.attributeForm.value);
  }

}
