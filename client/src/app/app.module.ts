import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { IndexComponent } from "./index/index.component";
import { PhotosComponent } from "./photo-list/photos.component";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { PhotoService } from "./shared/photo/photo.service";
import { AppRoutingModule } from "./app-routing.module";
import { MdCardModule } from '@angular2-material/card';
import { MasonryModule } from 'angular2-masonry';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    PhotosComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MdCardModule,
    MasonryModule
  ],
  providers: [ PhotoService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
