import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/service/order.service';
import { serverUrl } from 'src/app/constant/constant';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewOrderComponent } from './view-order/view-order.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  public orders = [];
  public selectedOrder;
  public orderInfomation = []; 
  public entries: number;
  public url = `${serverUrl}images/`;
  public columnsToDisplay: string[] = ['id', 'deliveryAddress','deliveryStatus', 'paymentMethod', 'paymentStatus', 'action'];
  public totalPage: number;
  public currentPage: number;
  public currentPageDisplay: number = 1;
  public collectionSize: number;

  public showSearchBar: boolean = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private orderService: OrderService,
    private modalService: NgbModal,
    ) { }

  ngOnInit() {
    this.getAllOrderInit(1, 5, '', '', '', '');
    this.entries = 5;
  }

  searchOrderForm = this.fb.group({
    address: [''],
    paymentMethod: [''],
    paymentStatus: [''],
    deliveryStatus: [''],
  })

  onSubmit = (values) => {
    this.orderService.getAllOrders(0, this.entries, this.searchOrderForm.value.address, this.searchOrderForm.value.paymentMethod, this.searchOrderForm.value.deliveryStatus, this.searchOrderForm.value.paymentStatus).subscribe(response => {
      this.orders = response.data.list;
      this.totalPage = response.data.totalPage;
      this.currentPage = response.data.currentPage;
      this.currentPageDisplay = this.currentPage+1;
      this.collectionSize = this.entries * this.totalPage;
      //this.paginator.createListPage(0, this.totalPage);
    });
  }

  onChange = (value) => {
    this.entries = value;
    this.orderService.getAllOrders(0, this.entries, this.searchOrderForm.value.address, this.searchOrderForm.value.paymentMethod, this.searchOrderForm.value.deliveryStatus, this.searchOrderForm.value.paymentStatus).subscribe(response => {
      this.orders = response.data.list;
      this.totalPage = response.data.totalPage;
      this.currentPage = response.data.currentPage;
      this.currentPageDisplay = this.currentPage+1;
      this.collectionSize = this.entries * this.totalPage;
    });
  }

  showSuccess() {
    this.toastr.success('Update Info Success!', 'Notification', {
      closeButton: true,
      timeOut: 500000,
      enableHtml: true,
      disableTimeOut: true,
    });
  }

  onPageChanged = (pageNumber: number) => {
    //console.log("gia tri la"+pageNumber);
    this.getAllOrder(pageNumber-1, this.entries, this.searchOrderForm.value.address, this.searchOrderForm.value.paymentMethod, this.searchOrderForm.value.deliveryStatus, this.searchOrderForm.value.paymentStatus);
  }

  openViewOrderInfoModal = (orderId: number) => {
    this.orders.forEach(element => {
      if (element.id == orderId)
        this.selectedOrder = Object.assign({}, element);       
    });
    
    let nameIndex = this.selectedOrder.address.indexOf(",");
    this.selectedOrder.name = this.selectedOrder.address.substring(0, nameIndex);
    this.selectedOrder.address = this.selectedOrder.address.substring(nameIndex + 2, this.selectedOrder.address.length);
    let phoneIndex = this.selectedOrder.address.indexOf(",");
    this.selectedOrder.phoneNumber = this.selectedOrder.address.substring(0, phoneIndex);
    this.selectedOrder.address = this.selectedOrder.address.substring(phoneIndex + 2, this.selectedOrder.address.length);

    const modalRef = this.modalService.open(ViewOrderComponent, { size: 'xl' });
    modalRef.componentInstance.orderId = orderId;
    modalRef.componentInstance.selectedOrder = this.selectedOrder;

    modalRef.result.then(
      result => {
        if(result){
          this.selectedOrder = Object.assign({}, result);
          this.orders.forEach(element => {
            if (element.id == this.selectedOrder.id){
              element.deliveryStatus = this.selectedOrder.deliveryStatus;
              element.paymentStatus = this.selectedOrder.paymentStatus;
            }               
          });
        }

      }
    )
  }

  resetForm = () => {
    this.searchOrderForm.reset({
      address: [''],
      paymentMethod: [''],
      paymentStatus: [''],
      deliveryStatus: [''],
    })
  }

  getAllOrder = (pageNumber: number, size: number, address: string, paymentMethod: string, deliveryStatus: string, paymentStatus: string): any => {
    this.orderService.getAllOrders(pageNumber, size, address, paymentMethod, deliveryStatus, paymentStatus).subscribe(response => {
      this.orders = response.data.list;
      this.totalPage = response.data.totalPage;
      this.currentPage = response.data.currentPage;
    });
  }

  getAllOrderInit = (pageNumber: number, size: number, address: string, paymentMethod: string, deliveryStatus: string, paymentStatus: string): any => {
    this.orderService.getAllOrders(pageNumber -1 , size, address, paymentMethod, deliveryStatus, paymentStatus).subscribe(response => {
      this.orders = response.data.list;
      this.totalPage = response.data.totalPage;
      this.currentPage = response.data.currentPage;
      this.collectionSize = this.entries * this.totalPage;
    });
  }

}
