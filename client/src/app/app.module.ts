import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { IndexComponent } from "./index/index.component";
import { PhotosComponent } from "./photo-list/photos.component";
import { StatisticComponent } from "./statistic/statistic.component";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { PhotoService } from "./shared/photo/photo.service";
import { AppRoutingModule } from "./app-routing.module";
import { MdCardModule } from '@angular2-material/card';
import { MasonryModule } from 'angular2-masonry';
import { ChartModule } from "angular2-highcharts";
import { HighchartsStatic } from "angular2-highcharts/dist/HighchartsService";
import {StatisticService} from "./shared/statistic.service";
import {MultiselectDropdownModule} from "angular-2-dropdown-multiselect";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule, MatCheckboxModule, MatSliderModule, MatTabsModule} from "@angular/material";

export function highchartsFactory() {
  return require('highcharts');
}

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    PhotosComponent,
    StatisticComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MdCardModule,
    MasonryModule,
    ChartModule,
    MultiselectDropdownModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSliderModule,
    MatTabsModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatSliderModule,
    MatTabsModule
  ],
  providers: [
    PhotoService,
    StatisticService,
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
