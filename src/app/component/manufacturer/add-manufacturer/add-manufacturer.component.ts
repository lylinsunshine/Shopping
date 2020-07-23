import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { manufacturer } from 'src/app/model/manufacturer';
import { ManufacturerService } from 'src/app/service/manufacturer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-manufacturer',
  templateUrl: './add-manufacturer.component.html',
  styleUrls: ['./add-manufacturer.component.css']
})
export class AddManufacturerComponent implements OnInit {

  constructor(private fb: FormBuilder, private manufacturerService: ManufacturerService, private toastr: ToastrService) { }

  ngOnInit() {
    //this.showSuccess();
  }

  manufacturerForm = this.fb.group({
    id: -1,
    name: [''],
    description: [''],
    address: [''],
    image: ['img'],    
  }) 

  onSubmit(values){
    this.manufacturerService.addManufacturer(values).subscribe(response => {
      this.showSuccess();
      this.reset();
    });
  }

  showSuccess() {
    this.toastr.success('Add Success!', 'Notifi', {
      closeButton: true,
      timeOut: 500000,
      enableHtml: true,
      disableTimeOut: true,
    });
  }

  reset() {
    this.manufacturerForm.reset();
  }

}
