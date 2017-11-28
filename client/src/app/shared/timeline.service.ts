import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";
import {catchError} from "rxjs/operators";
import {PhotoDetail} from "../timeline/photoDetail";
import {UserDetail} from "../timeline/userDetail";

@Injectable()
export class TimelineService {
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

  searchUser(id: number): Observable<UserDetail[]> {
    return this.http.get<UserDetail[]>(this.serverUrl+`/timeline?userId=${id}`).pipe(
      catchError(this.handleError<UserDetail[]>('searchUser', null))
    );
  }

  searchPhotosByUser(id: number): Observable<PhotoDetail[]> {
    return this.http.get<PhotoDetail[]>(this.serverUrl+`/timeline_photos?userId=${id}`).pipe(
      catchError(this.handleError<PhotoDetail[]>('searchPhotosByUser', null))
    );
  }


}
