import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from 'src/app/service/order.service';
import { serverUrl } from 'src/app/constant/constant';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {

  @Input() orderId;
  @Input() selectedOrder;

  public orderInfomation = [];
  public url = `${serverUrl}images/`;

  constructor(
    public activeModal: NgbActiveModal,
    public orderService: OrderService,
  ) { }

  ngOnInit() {
    this.viewOrder(this.orderId);
  }

  closeModal() {
    this.activeModal.close(this.selectedOrder);
  }

  viewOrder = (orderId: number) => {
    this.orderService.getOrderDetail(orderId).subscribe(
      response => {
        this.orderInfomation = response['data'];
      }
    )
  }

  confirmPayment = (orderId: number) => {
    this.orderService.confirmPayment(orderId).subscribe(
      response => {
        this.selectedOrder.deliveryStatus = response['data'].deliveryStatus;
        this.selectedOrder.paymentStatus = response['data'].paymentStatus;
      }
    )
  }

  cancelOrder = (orderId: number) => {
    this.orderService.cancelOrder(orderId).subscribe(
      response => {
        this.selectedOrder.deliveryStatus = response['data'].deliveryStatus;
        this.selectedOrder.paymentStatus = response['data'].paymentStatus;
      }
    )
  }



}
