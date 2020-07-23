import { Component, OnInit } from '@angular/core';
import { serverUrl } from 'src/app/constant/constant';
import { FormBuilder } from '@angular/forms';
import { PromotionService } from 'src/app/service/promotion.service';
import { NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewPromotionComponent } from '../view-promotion/view-promotion.component';

@Component({
  selector: 'app-show-promotion',
  templateUrl: './show-promotion.component.html',
  styleUrls: ['./show-promotion.component.css']
})
export class ShowPromotionComponent implements OnInit {

  public promotions;
  public columnsToDisplay: string[] = ['id', 'name', 'startDate', 'endDate' ,'image', 'action'];
  public totalPage: number;
  public currentPage: number;
  public currentPageDisplay: number = 1;
  public entries: number;
  public url = `${serverUrl}images/`;
  public collectionSize: number;
  public showSearchBar: boolean = false;
  public startDate = "";
  public endDate = "";

  constructor(
    private fb: FormBuilder, 
    private promotionService: PromotionService,
    private parserFormatter: NgbDateParserFormatter,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.getAllPromotionsInit(1, 5, '', '', '', '');
    this.entries = 5;
  }

  promotionForm = this.fb.group({
    name: [''],
    startDate: [''],
    endDate: [''],
    type: [''],
  });

  onSubmit = () => {
    //console.log(this.endDate);
    this.promotionService.getAllPromotions(0, this.entries, this.promotionForm.value.name, this.startDate, this.endDate, this.promotionForm.value.type).subscribe(response => {
      this.promotions = response.data.list;
      this.totalPage = response.data.totalPage;
      this.currentPage = response.data.currentPage;
      this.currentPageDisplay = this.currentPage+1;
      this.collectionSize = this.entries * this.totalPage;
      //this.paginator.createListPage(0, this.totalPage);
    });
  }

  openViewPromotionModal = (promotionId: number) => {
    const modalRef = this.modalService.open(ViewPromotionComponent, { size: 'xl' });
    modalRef.componentInstance.promotionId = promotionId;
    //modalRef.componentInstance.selectedOrder = this.selectedOrder;

    // modalRef.result.then(
    //   result => {
    //     if(result){
    //       this.selectedOrder = Object.assign({}, result);
    //       this.orders.forEach(element => {
    //         if (element.id == this.selectedOrder.id){
    //           element.deliveryStatus = this.selectedOrder.deliveryStatus;
    //           element.paymentStatus = this.selectedOrder.paymentStatus;
    //         }               
    //       });
    //     }

    //   }
    // )
  }

  resetForm = () => {
    this.promotionForm.reset({
      name: [''],
      startDate: [''],
      endDate: [''],
      type: [0],
    })

    this.startDate = "";
    this.endDate = "";

    this.getAllPromotionsInit(1, this.entries, '', '', '', '');
  }

  onChange = (value) => {
    this.entries = value;
    this.promotionService.getAllPromotions(0, this.entries, this.promotionForm.value.name, this.startDate, this.endDate, this.promotionForm.value.type).subscribe(response => {
      this.promotions = response.data.list;
      this.totalPage = response.data.totalPage;
      this.currentPage = response.data.currentPage;
      this.currentPageDisplay = this.currentPage+1;
    });
  }

  onStartDateChange = ($event) => {
    this.startDate = $event.target.value;
  }

  onStartDateSelect = ($event) => {
    let date = this.parserFormatter.format(this.promotionForm.value.startDate);
    this.startDate = date;
  }

  onEndDateSelect = ($event) => {
    let date = this.parserFormatter.format(this.promotionForm.value.endDate);
    this.endDate = date;
  }

  onPageChanged = (pageNumber: number) => {
    //console.log("gia tri la"+pageNumber);
    this.getAllPromotions(pageNumber-1, this.entries, this.promotionForm.value.name, this.startDate, this.endDate, this.promotionForm.value.type);
  }

  getAllPromotions = (pageNumber: number, size: number, promotionName: string, startDate: string, endDate: string, type: string): any => {
    this.promotionService.getAllPromotions(pageNumber, size, promotionName, startDate, endDate, type).subscribe(response => {
      this.promotions = response.data.list;
      this.totalPage = response.data.totalPage;
      this.currentPage = response.data.currentPage;
    });
  }

  getAllPromotionsInit = (pageNumber: number, size: number, promotionName: string, startDate: string, endDate: string, type: string): any => {
    this.promotionService.getAllPromotions(pageNumber - 1, size, promotionName, startDate, endDate, type).subscribe(response => {
      this.promotions = response.data.list;
      this.totalPage = response.data.totalPage;
      this.currentPage = response.data.currentPage;
      this.collectionSize = this.entries * this.totalPage;
      //this.paginator.createListPage(0, this.totalPage);
    });
  }


}
