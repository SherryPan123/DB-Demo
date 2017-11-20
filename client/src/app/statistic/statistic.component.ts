import {Component, OnInit} from "@angular/core";
import {StatisticService} from "../shared/statistic.service";
import { ActivatedRoute } from "@angular/router";
import {ChartComponent} from 'angular2-highcharts'

@Component({
  selector: 'app-statistic',
  styleUrls: [ './statistic.component.css' ],
  template: `
    <h1>
      <chart [options]="options" (load)="saveInstance($event.context)"></chart>
    </h1>
  `
})
export class StatisticComponent implements OnInit {

  options: Object;
  chart : ChartComponent;

  saveInstance(chartInstance) {
    this.chart = chartInstance;
  }

  constructor(private statisticService: StatisticService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.options = {
      chart: { type: 'spline' },
      title: { text : 'dynamic data example'},
      series: [{ data: [] }]
    };
    this.statisticService.searchStatistic().subscribe(
      data => this.chart.series[0].setData(data['results'])
    );
  }

}
