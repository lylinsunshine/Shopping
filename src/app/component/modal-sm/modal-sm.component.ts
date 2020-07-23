import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-sm',
  templateUrl: './modal-sm.component.html',
  styleUrls: ['./modal-sm.component.css']
})
export class ModalSmComponent implements OnInit {

  @Input() title;
  @Input() content;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
