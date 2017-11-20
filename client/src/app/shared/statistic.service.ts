import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";
import { catchError } from "rxjs/operators";
import { Query } from "../statistic/query";

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
  searchStatistic(query: Query): Observable<string[]> {
    console.log(this.serverUrl+`/statistic`);
    return this.http.get<string[]>(this.serverUrl+`/statistic`).pipe(
      catchError(this.handleError<string[]>('searchStatistic', []))
    );
  }

  searchPhotos(query: Query): Observable<string[]> {
    return this.http.get<string[]>(this.serverUrl+`/statistic/photos?year=${query.year}&cameras=${query.cameras}`).pipe(
      catchError(this.handleError<string[]>('searchPhotos', []))
    );
  }

  searchCameras(query: Query): Observable<string[]> {
    console.log(query.cameras);
    return this.http.get<string[]>(this.serverUrl+`/statistic/cameras?year=${query.year}&cameras=${query.cameras}`).pipe(
      catchError(this.handleError<string[]>('searchCameras', []))
    );
  }

  searchPhotosOfCities(query: Query): Observable<string[]> {
    return this.http.get<string[]>(this.serverUrl+`/statistic/photosOfCities?year=${query.year}&cities=${query.cities}`).pipe(
      catchError(this.handleError<string[]>('searchPhotosOfCities', []))
    );
  }

}
