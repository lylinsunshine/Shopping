import { Component, OnInit } from '@angular/core';
import { IndexService } from 'src/app/service/index.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { serverUrl } from 'src/app/constant/constant';
import { DecimalPipe } from '@angular/common';
//import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  public url = `${serverUrl}images/`;
  public stat;
  public promotion;
  public hotProducts = [];
  public featureProducts = [];
  public lastestProduct = [];
  public barChartDataOrderPerMonth: ChartDataSets[] = [{data:[], label: 'Total Order'}]; 

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['1', '2', '3', '4', '5', '6'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  //public barChartPlugins = [pluginDataLabels];

  // public barChartData: ChartDataSets[] = [
  //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  //   { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  // ];

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };


  public orderTypeLabels: Label[] = ['Cash on delivery', 'MoMo'];
  public orderTypeData: number[] = [];

  public pieChartLabels: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  //public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];
  public pieChartLabels1: Label[] = [];
  public pieChartColors1 = [
    {
      backgroundColor: [],
    },
  ];

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Profit' },
  ];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [{
        ticks: {
          callback: (dataLabel, index)=> {                  
            let decimalPipe = new DecimalPipe('en');
            return decimalPipe.transform(dataLabel, '1.0-0');
          }
      }
      }]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  constructor(
    private indexService: IndexService
  ) { }

  ngOnInit() {
    this.getStatBox();
    this.getChartInfo();
    this.getPromotionInfo();
    this.getLastestProduct();
    this.getHotProduct();
  }

  getStatBox = () => {
    this.indexService.getStatBox().subscribe(
      response => {
        this.stat = response['data']
      }
    )
  }


  createOrderTypeCharData = (data: any) => {
    data.forEach(element => {
        this.orderTypeData.push(element.total);
    });
  }

  createOrderPerMonthChartData = (data: any) => {
    data.forEach(element => {
      this.barChartDataOrderPerMonth[0].data.push(element.total);
    });
  }

  createProfitPerMonthChartData = (data: any) => {
    data.forEach(element => {
      this.lineChartData[0].data.push(element.total);
    });
  }

  createProductCategoryChartData = (data: any) => {
    data.forEach(element => {
      this.pieChartColors1[0].backgroundColor.push('#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6));
      this.pieChartLabels1.push(element.name);
      this.pieChartData.push(element.total);
    });
  }



  getChartInfo = () => {
    this.indexService.getChartInfo().subscribe(
      response => {
        this.createOrderPerMonthChartData(response['data'].orderPerMonthList);
        this.createOrderTypeCharData(response['data'].orderTypeList);
        this.createProfitPerMonthChartData(response['data'].profitList);
        this.createProductCategoryChartData(response['data'].totalProductList);
      }
    )
  }

  getPromotionInfo = () => {
    this.indexService.getPromotionInfo().subscribe(
      response => {
        this.promotion = response['data'];
      }
    )
  }

  getLastestProduct = () => {
    this.indexService.getLastestProduct().subscribe(
      response => {
        this.lastestProduct = response['data'];
      }
    )
  }

  getHotProduct = () => {
    this.indexService.getHotProduct().subscribe(
      response => {
        for (let index = 0; index < response['data'].length; index++) {
          const element = response['data'][index];
          if(index<3){
            this.featureProducts.push(element);
          } else {
            this.hotProducts.push(element);
          }
        }
      }
    )
  }

  



}
