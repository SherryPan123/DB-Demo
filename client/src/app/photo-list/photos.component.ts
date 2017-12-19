import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { Photo } from "./photo";
import { PhotoService } from "../shared/photo/photo.service";
import { ActivatedRoute, Params } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { AngularMasonry, MasonryOptions } from 'angular2-masonry';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})

export class PhotosComponent implements OnInit, AfterViewInit {

  @ViewChild(AngularMasonry) masonry: AngularMasonry;

  photos$: Observable<Photo[]>;
  term: "";

  // Options
  options: MasonryOptions = {
    transitionDuration: '0.3s',
    columnWidth: 15,
    itemSelector: '.card',
    resize: false,
    // percentPosition: true,
    fitWidth: true,
    gutter: 6
  };

  ngAfterViewInit() {
    this.masonry.layoutComplete.subscribe(() => {
      console.log('layout');
    });
  }

  constructor(private photoService: PhotoService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.term = params['term'];
    });
    this.photos$ = this.photoService.searchPhotos(this.term);
  }

}
