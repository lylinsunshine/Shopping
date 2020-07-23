import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ManufacturerService } from 'src/app/service/manufacturer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-manufacturer',
  templateUrl: './edit-manufacturer.component.html',
  styleUrls: ['./edit-manufacturer.component.css']
})
export class EditManufacturerComponent implements OnInit {

  constructor(private fb: FormBuilder, private manufacturerService: ManufacturerService, private activatedRoute: ActivatedRoute,
    private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.getManufacturerInfo();
    //this.showSuccess();
  }

  manufacturerForm = this.fb.group({
    id: -1,
    name: [''],
    description: [''],
    address: [''],
    image: ['img'],
  })

  onSubmit = (values) => {
    this.manufacturerService.updateManufacturer(values).subscribe(response => {
      this.showSuccess();
      this.router.navigate(['/admin/manufacturers']);
    });
  }

  showSuccess() {
    this.toastr.success('Update Manufacturer Success!', 'Notification', {
      closeButton: true,
    });
  }

  reset = () => {
    this.manufacturerForm.reset();
  }

  getManufacturerInfo = () => {
    const manufacturerId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.manufacturerService.getOneManufacturer(manufacturerId).subscribe(response => {
      this.manufacturerForm.setValue(response['data']);
    });
  }

}
