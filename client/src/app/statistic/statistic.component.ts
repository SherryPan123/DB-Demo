import { Component, OnInit } from "@angular/core";
import { StatisticService } from "../shared/statistic.service";
import { ActivatedRoute } from "@angular/router";
import { ChartObject } from "highcharts";
import { Query } from "./query";
import {IMultiSelectOption} from "angular-2-dropdown-multiselect";
import {ChartComponent} from "angular2-highcharts";

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: [ './statistic.component.css' ]
})
export class StatisticComponent implements OnInit {

  options1: Object;
  chart1 : ChartObject;
  options2: Object;
  chart2 : ChartComponent;
  options3: Object;
  chart3 : ChartObject;

  query: Query;

  // cameras: string;
  cities: IMultiSelectOption[];
  cameras: IMultiSelectOption[];

  saveInstance1(chartInstance) {
    this.chart1 = chartInstance;
  }

  saveInstance2(chartInstance) {
    this.chart2 = chartInstance;
  }

  saveInstance3(chartInstance) {
    this.chart3 = chartInstance;
  }

  search() {
    this.drawCharts();
  }

  constructor(private statisticService: StatisticService, private activatedRoute: ActivatedRoute) {
    this.query = new Query();
    this.cities = [
      { id: 'Shanghai', name: 'Shanghai' },
      { id: 'NewYork', name: 'NewYork' },
      { id: 'Beijing', name: 'Beijing' },
      { id: 'Chicago', name: 'Chicago' },
      { id: 'Singapore', name: 'Singapore' }
    ];
    this.cameras = [
      { id: 'IPhone', name: 'IPhone' },
      { id: 'Samsung', name: 'Samsung' },
      { id: 'Mi', name: 'Mi' },
      { id: 'Huawei', name: 'Huawei' },
      { id: 'Canon', name: 'Canon' },
      { id: 'Nokia', name: 'Nokia' },
      { id: 'CHASE', name: 'CHASE' },
      { id: 'DENSO', name: 'DENSO' },
      { id: 'Acer', name: 'Acer' },
      { id: 'Panasonnic', name: 'Panasonnic' }
    ]
  }

  ngOnInit() {
    this.drawCharts();
  }

  private drawLine() {
    this.options1 = {
      chart: { type: 'line' },
      title: { text : '各品牌相机拍摄照片数'},
      xAxis: {
        title: {
          text: '月份'
        },
        categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
      },
      yAxis: {
        title: {
          text: '照片数'
        }
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true
          },
          enableMouseTracking: false
        }
      },
      series: []
    };
    this.statisticService.searchPhotos(this.query).subscribe(
      data => {
        data.forEach(
          adata => {
            var series = {name:adata['name'], data:adata['data']};
            this.chart1.addSeries(series);
          }
        )
      }
    );
  }

  private drawPie() {
    this.options2 = {
      chart: { type: 'pie' },
      title: { text : '各品牌相机拍摄照片比例'},
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true
          },
          enableMouseTracking: false
        }
      },
      series: [{
        type: 'pie',
        allowPointSelect: true,
        keys: ['name', 'y', 'selected', 'sliced'],
        showInLegend: true,
        data: []
      }]

    };
    this.statisticService.searchCameras(this.query).subscribe(
      data => {
        data.forEach(
          adata => {
            this.chart2.series[0].addPoint([adata['name'], adata['y'], false]);
          }
        )
      }
    );
  }

  private drawBar() {
    this.options3 = {
      chart: { type: 'column' },
      title: { text : '各城市发布照片数'},
      xAxis: {
        title: {
          text: '月份'
        },
        categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
      },
      yAxis: {
        title: {
          text: '照片数'
        }
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true
          },
          enableMouseTracking: false
        }
      },
      series: []
    };
    this.statisticService.searchPhotosOfCities(this.query).subscribe(
      data => {
        data.forEach(
          adata => {
            var series = {name:adata['name'], data:adata['data']};
            this.chart3.addSeries(series);
          }
        )
      }
    );
  }

  private drawCharts() {
    this.drawLine();
    this.drawPie();
    this.drawBar();
  }

}
