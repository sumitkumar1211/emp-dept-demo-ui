import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export abstract class GenericService<T> {
  private readonly baseUrl: string =
    environment.HOST_URL + this.getResourceUrl();

  constructor(protected http: HttpClient) {}

  abstract getResourceUrl(): string;

  public create(resource: T): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}`, resource);
  }

  public getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}`);
  }

  public get(id: number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`);
  }

  public update(resource: T): Observable<T> {
    return this.http
      .put<T>(`${this.baseUrl}`, resource)
      .pipe(catchError(this.handleError));
  }

  public delete(id: number): Observable<number> {
    return this.http.delete<number>(`${this.baseUrl}/${id}`);
  }

  private handleError(error: HttpErrorResponse) {
    // Handle the HTTP error here
    return throwError('Something wrong happened');
  }
}
