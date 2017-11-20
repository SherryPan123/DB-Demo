import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {PhotosComponent} from "./photo-list/photos.component";
import {IndexComponent} from "./index/index.component";
import {StatisticComponent} from "./statistic/statistic.component";

const routes: Routes = [
  { path: 'photos', component: PhotosComponent },
  { path: 'index', component: IndexComponent },
  { path: 'statistic', component: StatisticComponent },
  { path: '', redirectTo: '/index', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
