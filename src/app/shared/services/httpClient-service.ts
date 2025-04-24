import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class HttpClientService {

  httpClient = inject(HttpClient);

  public delete<T>(endpoint: string, params?: HttpParams, httpHeaders?: HttpHeaders): Observable<void> {
    return this.httpClient.delete<void>(endpoint, {
      headers: httpHeaders,
      context: undefined,
      observe: undefined,
      params: params
    });
  }

  public get<T>(endpoint: string, params?: HttpParams, httpHeaders?: HttpHeaders): Observable<T> {
    return this.httpClient.get<T>(endpoint, {
      headers: httpHeaders,
      context: undefined,
      observe: undefined,
      params: params
    });
  }

  public post<T>(endpoint: string, body: any, params?: HttpParams, httpHeaders?: HttpHeaders): Observable<T> {
    return this.httpClient.post<T>(endpoint, body, {
      headers: httpHeaders,
      context: undefined,
      observe: undefined,
      params: params
    });
  }

  public put<T>(endpoint: string, body: any, params?: HttpParams, httpHeaders?: HttpHeaders): Observable<T> {
    return this.httpClient.put<T>(endpoint, body, {
      headers: httpHeaders,
      context: undefined,
      observe: undefined,
      params: params
    });
  }

  public patch<T>(endpoint: string, body: any, params?: HttpParams, httpHeaders?: HttpHeaders): Observable<T> {
    return this.httpClient.patch<T>(endpoint, body, {
      headers: httpHeaders,
      context: undefined,
      observe: undefined,
      params: params
    });
  }
}
