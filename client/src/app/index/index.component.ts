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
import {UserService} from "../shared/user.service";
import {User} from "./User";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: [ './index.component.css' ]
})

export class IndexComponent implements OnInit {

  search_type: boolean;

  user: User;
  searching = false;
  searchFailed = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);
  searchContent = (user: {name: string}) => user.name;

  constructor(private _service: UserService, private router: Router) {}

  typeahead = (text$: Observable<string>) => (
        text$
          .debounceTime(300)
          .distinctUntilChanged()
          .do(() => this.searching = true)
          .switchMap(term =>
            this._service.searchUsers(term, this.search_type)
              .do(() => this.searchFailed = false)
              .catch(() => {
                this.searchFailed = true;
                return Observable.of([]);
              }))
          .do(() => this.searching = false)
          .merge(this.hideSearchingWhenUnsubscribed)

  );

  ngOnInit() {
    this.search_type = true;
  }

  // Push a search term into the observable stream.
  search(term: string, type: string): void {
    if (type == "1") {
      this.router.navigateByUrl('/photos?term='+term);
    } else {
      this.router.navigateByUrl('/timeline?term='+term);
    }
  }

  selectedItem(item) {
    this.router.navigateByUrl('/timeline?term='+item.item.id);
  }

  changeSearchType(type: string): void {
    if (type == "1") {
      this.search_type = true;
    } else {
      this.search_type = false;
    }
  }

}
