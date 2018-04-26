import { catchError, filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/observable/throw';

export abstract class Verification<T> {

  protected abstract endPoint;

  // http options with headers
  protected httpOptions  = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : 'jbrachle'
    })
  };


  constructor(protected httpClient: HttpClient) {}

  public get(): Observable<T[]> {
    return this.httpClient.get(`${this.endPoint}`, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }


  public loginUser(u: string, p: string): Observable<T[]> {
    return this.httpClient.post(`${this.endPoint}/login`, {'username' : u, 'password' : p}, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }


  public getById(id: number): Observable<T> {
    return this.httpClient.get(`${this.endPoint}/${id}`, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }

  public update(id: number, item: T): Observable<T> {
    return this.httpClient.put(`${this.endPoint}/${id}`, item, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }

  public delete(id: number): Observable<T> {
    return this.httpClient.delete(`${this.endPoint}/${id}`, this.httpOptions).pipe(
      catchError(this.handleException)
    );
  }

  protected handleException(exception: any) {
    const message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
    alert(message);
    return Observable.throw(exception);
  }
}
