import { Component, OnInit, Input } from '@angular/core';
import { PromotionService } from 'src/app/service/promotion.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { serverUrl } from 'src/app/constant/constant';
import { CategoryService } from 'src/app/service/category.service';
import { ManufacturerService } from 'src/app/service/manufacturer.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-view-promotion',
  templateUrl: './view-promotion.component.html',
  styleUrls: ['./view-promotion.component.css']
})
export class ViewPromotionComponent implements OnInit {

  @Input() promotionId;

  public manufacturers = [];
  public categories = [];
  public url = `${serverUrl}images/`;
  public promotion;
  public products = [];
  public typeName;

  constructor(
    private promotionService: PromotionService,
    public activeModal: NgbActiveModal,
    private categoryService: CategoryService,
    private manufacturerService: ManufacturerService,
  ) { }

  ngOnInit() {
    this.getPromotionInfo();
    this.getProductInfo();  
 
  }

  getPromotionInfo = () => {
    this.promotionService.getPromotionInfo(this.promotionId).subscribe(
      response => {
        this.promotion = response['data'];
        this.getTypeName();
      }
    )
  }

  getTypeName = () => {
    let id = this.promotion.typeId;
    if (this.promotion.type == "CATEGORY") {
      this.categoryService.getCategorySelect().subscribe(response => {
        this.categories = response;
        this.categories.forEach(element => {
          if (element.id == id){
            console.log('==');
            this.typeName = element.name;
          }
        });
      })
    } else {
      this.manufacturerService.getManufacturerSelect().subscribe(response => {
        this.manufacturers = response;
        this.manufacturers.forEach(element => {
          if (element.id == id){
            this.typeName = element.name;
          }
        });
      })
      
    }
  }

  getProductInfo = () => {
    this.promotionService.getProductByPromotionId(this.promotionId).subscribe(
      response => {
        this.products = response['data'];
      }
    )
  }


}
