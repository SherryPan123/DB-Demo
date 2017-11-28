import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';
import {PhotoService} from "../shared/photo/photo.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: [ './index.component.css' ]
})

export class IndexComponent implements OnInit {

  model: any;
  searching = false;
  searchFailed = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);

  constructor(private _service: PhotoService, private router: Router) {}

  typeahead = (text$: Observable<string>) =>
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.searching = true)
      .switchMap(term =>
        this._service.searchPhotos(term)
          .do(() => this.searchFailed = false)
          .catch(() => {
            this.searchFailed = true;
            return Observable.of([]);
          }))
      .do(() => this.searching = false)
      .merge(this.hideSearchingWhenUnsubscribed);

  ngOnInit() {}

  // Push a search term into the observable stream.
  search(term: string, type: string): void {
    if (type == "1") {
      this.router.navigateByUrl('/photos?term='+term);
    } else {
      this.router.navigateByUrl('/timeline?term='+term);
    }
  }

}
