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
import { MasonryModule } from 'angular2-masonry';
import { ChartModule } from "angular2-highcharts";
import { HighchartsStatic } from "angular2-highcharts/dist/HighchartsService";
import { StatisticService } from "./shared/statistic.service";
import { MultiselectDropdownModule } from "angular-2-dropdown-multiselect";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {TimelineComponent} from "./timeline/timeline.component";
import {TimelineService} from "./shared/timeline.service";
import {UserService} from "./shared/user.service";
// import {
//   MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatGridListModule, MatIconModule,
//   MatMenuModule, MatOptionModule, MatSelectModule, MatSliderModule,
//   MatTabsModule, MatToolbarModule
// } from "@angular/material";
// import {MdCardModule} from "@angular2-material/card";

export function highchartsFactory() {
  return require('highcharts');
}

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    PhotosComponent,
    StatisticComponent,
    TimelineComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    // MdCardModule,
    MasonryModule,
    ChartModule,
    MultiselectDropdownModule,
    BrowserAnimationsModule,
    NgbModule.forRoot()
    // MatButtonModule,
    // MatCheckboxModule,
    // MatSliderModule,
    // MatTabsModule,
    // MatGridListModule,
    // MatIconModule,
    // MatToolbarModule,
    // MatCardModule,
    // MatMenuModule,
    // MatFormFieldModule,
    // MatOptionModule,
    // MatSelectModule,
  ],
  exports: [
    // MatButtonModule,
    // MatCheckboxModule,
    // MatSliderModule,
    // MatTabsModule,
    // MatGridListModule,
    // MatIconModule,
    // MatToolbarModule,
    // MatCardModule,
    // MatMenuModule,
    // MatFormFieldModule,
    // MatOptionModule,
    // MatSelectModule
  ],
  providers: [
    PhotoService,
    StatisticService,
    TimelineService,
    UserService,
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
