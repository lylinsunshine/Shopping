import { Component, OnInit } from '@angular/core';
import { AttributeService } from 'src/app/service/attribute.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddAttributeComponent } from './add-attribute/add-attribute.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.css']
})
export class AttributeComponent implements OnInit {

  public attributes = [];

  constructor(
    private attributeService: AttributeService,
    private modalService: NgbModal,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.getAttributeInfo();
  }

  getAttributeInfo = () => {
    this.attributeService.getAllAttributes().subscribe(
      response => {
        // console.log(response);
        this.attributes = response;
      }
    )
  }

  openAddModal = () => {
    const modalRef = this.modalService.open(AddAttributeComponent);

    modalRef.result.then(
      result => {
        if(result){
         this.addAttribute(result);
        }

      }
    )
  }

  showSuccess() {
    this.toastr.success("Add Attribute Success", 'Notification', {
      closeButton: true,
      enableHtml: true,
    });
  }

  addAttribute = (attribute: any) => {
    this.attributeService.addAttibute(attribute).subscribe(
      response => {
        this.showSuccess();
        this.attributes = response;
      }
    )
  }



}
