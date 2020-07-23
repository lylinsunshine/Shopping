import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/service/order.service';
import { AuthService } from 'src/app/auth/auth.service';
import { serverUrl } from 'src/app/constant/constant';

@Component({
  selector: 'app-client-order-history',
  templateUrl: './client-order-history.component.html',
  styleUrls: ['./client-order-history.component.css']
})
export class ClientOrderHistoryComponent implements OnInit {

  public url = `${serverUrl}images/`;
  public orderHistory = [];
  public orderInfomation = []; 
  public selectedOrder;
  public isViewOrderInfo: boolean = false;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.getAllOrderHistory();
  }

  viewOrder = (orderId: number) => {
    this.isViewOrderInfo = true;
    this.orderHistory.forEach(element => {
      if (element.id == orderId)
        this.selectedOrder = Object.assign({}, element);       
    });
    
    let nameIndex = this.selectedOrder.address.indexOf(",");
    this.selectedOrder.name = this.selectedOrder.address.substring(0, nameIndex);
    this.selectedOrder.address = this.selectedOrder.address.substring(nameIndex + 2, this.selectedOrder.address.length);
    let phoneIndex = this.selectedOrder.address.indexOf(",");
    this.selectedOrder.phoneNumber = this.selectedOrder.address.substring(0, phoneIndex);
    this.selectedOrder.address = this.selectedOrder.address.substring(phoneIndex + 2, this.selectedOrder.address.length);
    this.orderService.getOrderDetail(orderId).subscribe(
      response => {
        this.orderInfomation = response['data'];
      }
    )
  }

  getAllOrderHistory = () => {
    let username = this.authService.getUserId();
    if (username != null) {
      this.orderService.getOrderHistory(username).subscribe(
        response => {
          this.orderHistory = response['data'];
        }
      )
    }
  }
}
