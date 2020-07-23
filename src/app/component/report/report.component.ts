import { Component, OnInit } from '@angular/core';
import { IndexService } from 'src/app/service/index.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  public profitPerMonth = [];
  public orderType = [];
  public orderPerMonth = [];
  public productCategory = [];

  constructor(
    private indexService: IndexService,
  ) { }

  ngOnInit() {
    this.getReportInfo();
  }

  getReportInfo = () => {
    this.indexService.getChartInfo().subscribe(
      response => {
        this.orderPerMonth = response['data'].orderPerMonthList;
        this.orderType = response['data'].orderTypeList;
        this.profitPerMonth =response['data'].profitList;
        this.productCategory = response['data'].totalProductList;
      }
    )
  }

}
