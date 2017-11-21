import { Component, OnInit } from "@angular/core";
import { StatisticService } from "../shared/statistic.service";
import { ActivatedRoute } from "@angular/router";
import { Query } from "./query";
import { IMultiSelectOption } from "angular-2-dropdown-multiselect";
import { ChartComponent } from "angular2-highcharts";
import { ChartObject } from "highcharts";
import {NgbTabChangeEvent, NgbTabset} from "@ng-bootstrap/ng-bootstrap";

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
  // cities: IMultiSelectOption[];
  // cameras: IMultiSelectOption[];
  cities: Object;
  cameras: Object;

  saveInstance1(chartInstance) {
    this.chart1 = chartInstance;
  }

  saveInstance2(chartInstance) {
    this.chart2 = chartInstance;
  }

  saveInstance3(chartInstance) {
    this.chart3 = chartInstance;
  }

  constructor(private statisticService: StatisticService) {
    this.query = new Query();
    this.cities = [
      { id: 'shanghai', name: 'Shanghai', status: false },
      { id: 'newyork', name: 'New York', status: false },
      { id: 'beijing', name: 'Beijing', status: false },
      { id: 'chicago', name: 'Chicago', status: false },
      { id: 'singapore', name: 'Singapore', status: false }
    ];
    this.cameras = [
      { id: 'iphone', name: 'iPhone', status: false },
      { id: 'samsung', name: 'Samsung', status: false },
      { id: 'mi', name: 'Mi', status: false },
      { id: 'huawei', name: 'Huawei', status: false },
      { id: 'canon', name: 'Canon', status: false },
      { id: 'nokia', name: 'Nokia', status: false },
      { id: 'chase', name: 'CHASE', status: false },
      { id: 'denso', name: 'DENSO', status: false },
      { id: 'acer', name: 'Acer', status: false },
      { id: 'panasonnic', name: 'Panasonnic', status: false }
    ]
  }

  ngOnInit() {
    this.drawLine();
    //this.drawCharts();
  }

  search(t: NgbTabset) {
    console.log(this.cameras);
    console.log(this.cities);
    this.query.cities = "";
    this.query.cameras = "";
    for(var k in this.cameras) {
      if (this.cameras[k].status) {
        this.query.cameras = this.query.cameras + this.cameras[k].id +",";
      }
    }
    for(var k in this.cities) {
      if (this.cities[k].status) {
        this.query.cities = this.query.cities + this.cities[k].id +",";
      }
    }
    console.log(this.query.year);
    console.log(this.query.cities);
    console.log(this.query.cameras);
    if (t.activeId === 'tab-1') {
      this.drawLine();
    } else if (t.activeId === 'tab-2') {
      this.drawPie();
    } else if (t.activeId === 'tab-3') {
      this.drawBar();
    }

  }

  changeQueryYear(year:number) {
    console.log(year);
    this.query.year = year;
  }

  public beforeChange($event: NgbTabChangeEvent) {
    if ($event.nextId === 'tab-1') {
      //if (this.chart1) this.chart1.destroy();
      //if (this.chart2) this.chart2.destroy();
      //if (this.chart3) this.chart3.destroy();
      this.drawLine();
    } else if ($event.nextId === 'tab-2') {
      //if (this.chart1) this.chart1.destroy();
      //if (this.chart2) this.chart2.destroy();
      //if (this.chart3) this.chart3.destroy();
      this.drawPie();
    } else if ($event.nextId === 'tab-3') {
      //if (this.chart1) this.chart1.destroy();
      //if (this.chart2) this.chart2.destroy();
      //if (this.chart3) this.chart3.destroy();
      this.drawBar();
    } else {
      //if (this.chart1) this.chart1.destroy();
      //if (this.chart2) this.chart2.destroy();
      //if (this.chart3) this.chart3.destroy();
      $event.preventDefault();
    }
  };

  private drawLine() {
    this.options1 = {
      chart: { type: 'line' },
      title: "",
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
      series: [{}]
    };
    this.statisticService.searchPhotos(this.query).subscribe(
      data => {
        data.forEach(
          adata => {
            this.chart1.addSeries({name:adata['name'], data:adata['data']});
          }
        )
      }
    );
  }

  private drawPie() {
    this.options2 = {
      chart: { type: 'pie' },
      title: "",
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
          _ => {
            this.chart2.series[0].addPoint([_['name'], _['y'], false]);
          }
        )
      }
    );
  }

  private drawBar() {
    this.options3 = {
      chart: { type: 'column' },
      title: "",//{ text : '各城市发布照片数'},
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
            this.chart3.addSeries({name:adata['name'], data:adata['data']});
          }
        )
      }
    );
  }

}
