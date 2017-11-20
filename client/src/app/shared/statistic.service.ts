import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";
import { catchError } from "rxjs/operators";

@Injectable()
export class StatisticService {

  results:string[];

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
  searchStatistic(): Observable<string[]> {
    console.log(this.serverUrl+`/statistic`);
    return this.http.get<string[]>(this.serverUrl+`/statistic`).pipe(
      catchError(this.handleError<string[]>('searchStatistic', []))
    );
  }

}
