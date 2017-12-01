import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";
import {catchError} from "rxjs/operators";
import {User} from "../index/User";

@Injectable()
export class UserService {
  constructor(
    private http: HttpClient,
  ) {}

  private serverUrl = 'http://localhost:8080';

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };

  }

  /* GET photos whose name contains search term */
  searchUsers(term: string, type: boolean): Observable<User[]> {
    if (type || (!term.trim())) {
      // if not search term, return empty photo array.
      return of([]);
    }
    const url = this.serverUrl+`/users?term=${term}`;
    return this.http.get<User[]>(this.serverUrl+`/users?term=${term}`).pipe(
      catchError(this.handleError<User[]>('searchUsers', []))
    );
  }

}
