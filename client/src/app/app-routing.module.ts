import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {PhotosComponent} from "./photo-list/photos.component";
import {IndexComponent} from "./index/index.component";
import {StatisticComponent} from "./statistic/statistic.component";

const routes: Routes = [
  { path: 'photos', component: PhotosComponent },
  { path: '', component: IndexComponent },
  { path: 'index', component: IndexComponent },
  { path: 'statistic', component: StatisticComponent }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
