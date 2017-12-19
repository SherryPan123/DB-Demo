import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {PhotosComponent} from "./photo-list/photos.component";
import {IndexComponent} from "./index/index.component";
import {StatisticComponent} from "./statistic/statistic.component";
import {TimelineComponent} from "./timeline/timeline.component";

const routes: Routes = [
  { path: 'photos', component: PhotosComponent },
  { path: '', component: IndexComponent },
  { path: 'index', component: IndexComponent },
  { path: 'timeline', component: TimelineComponent },
  { path: 'statistics', component: StatisticComponent }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
