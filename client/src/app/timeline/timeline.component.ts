import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {TimelineService} from "../shared/timeline.service";
import {PhotoDetail} from "./photoDetail";
import {Observable} from "rxjs/Observable";
import {UserDetail} from "./userDetail";
import { AngularMasonry, MasonryOptions } from 'angular2-masonry';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Photo #{{photoDetail.id}}</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <img style="width: 100%;" src="{{photoDetail.image}}">
      <!--<p>{{photoDetail.description}}</p>-->
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class PhotoModalContent {
  @Input() photoDetail;

  constructor(public activeModal: NgbActiveModal) {}
}

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
  options$: MasonryOptions = {
    //transitionDuration: '0.3s',
    columnWidth: 33.333333,
    itemSelector: '.card',
    percentPosition: true,
    fitWidth: true,
    gutter: 10
  };

  constructor(private timelineService: TimelineService, private activatedRoute: ActivatedRoute, private modalService: NgbModal) {}

  ngOnInit(): void {
    let term = 0;
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      term = params['term'];
    });
    this.userDetail$ = this.timelineService.searchUser(term);
    this.photosDetail$ = this.timelineService.searchPhotosByUser(term);
  }

  open(photoDetail) {
    const modalRef = this.modalService.open(PhotoModalContent);
    modalRef.componentInstance.photoDetail = photoDetail;
  }
}
