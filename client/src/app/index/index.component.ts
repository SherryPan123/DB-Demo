import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: [ './index.component.css' ]
})

export class IndexComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {}

  // Push a search term into the observable stream.
  search(term: string): void {
    console.log("search the word: "+term);
    this.router.navigateByUrl('/photos?term='+term);
  }

}
