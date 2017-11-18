import { Injectable } from "@angular/core";
import { Photo } from "../../photo-list/photo";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";

@Injectable()
export class PhotoService {
  constructor(
    private http: HttpClient,
  ) {}

  private photosUrl = 'api/photos';  // URL to web api
  private serverUrl = 'http://localhost:8080';

  getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.photosUrl)
      .pipe(
        catchError(this.handleError(`getPhotos`, []))
      );
  }

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

  /** GET photo by id. Will 404 if id not found */
  getPhoto(id: number): Observable<Photo> {
    const url = `${this.photosUrl}/${id}`;
    return this.http.get<Photo>(url).pipe(
      catchError(this.handleError<Photo>(`getPhoto id=${id}`))
    );
  }

  /* GET photos whose name contains search term */
  searchPhotos(term: string): Observable<Photo[]> {
    if (!term.trim()) {
      // if not search term, return empty photo array.
      return of([]);
    }
    const url = this.serverUrl+`/photos?term=${term}`;
    return this.http.get<Photo[]>(this.serverUrl+`/photos?term=${term}`).pipe(
      catchError(this.handleError<Photo[]>('searchPhotos', []))
    );
  }

}
