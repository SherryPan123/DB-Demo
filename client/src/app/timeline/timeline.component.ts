import {Component, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {TimelineService} from "../shared/timeline.service";
import {PhotoDetail} from "./photoDetail";
import {Observable} from "rxjs/Observable";
import {UserDetail} from "./userDetail";
import { AngularMasonry, MasonryOptions } from 'angular2-masonry';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})

export class TimelineComponent implements OnInit {

  @ViewChild(AngularMasonry) masonry: AngularMasonry;

  photosDetail$: Observable<PhotoDetail[]>;
  userDetail$: Observable<UserDetail[]>;

  // Options
  options: MasonryOptions = {
    transitionDuration: '0.3s',
    columnWidth: 10,
    itemSelector: '.card',
    resize: true,
    // percentPosition: true,
    fitWidth: true,
    gutter: 10
  };

  constructor(private timelineService: TimelineService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    let term = 0;
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      term = params['term'];
    });
    this.userDetail$ = this.timelineService.searchUser(term);
    this.photosDetail$ = this.timelineService.searchPhotosByUser(term);
  }

}
