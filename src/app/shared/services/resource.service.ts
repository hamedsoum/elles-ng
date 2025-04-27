import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {inject} from '@angular/core';
import {Utils} from '../../core/utils';
import {HttpClientService} from './http-client-service';
import {BaseUseCase} from '../../core/use-case/base.use-case';

export abstract class EDOResourceService<D, C> implements BaseUseCase<D, C> {

  httpClientService = inject(HttpClientService);

  private readonly resourceURLIndex: string
  protected constructor(resourceURLIndex: string) {
 this.resourceURLIndex = resourceURLIndex;
  }

  findAll(): Observable<D[]> {
    return this.httpClientService.get<D[]>(this.buildEndpoint());
  }

  retrieve(resourceID: string): Observable<D> {
    return this.httpClientService.get<D>(this.buildEndpoint() + "/" + resourceID);
  }

  save(body: C): Observable<D> {
    return this.httpClientService.post<D>(this.buildEndpoint(), body);
  }

  private buildEndpoint(endpoint?: string): string {
    if (!Utils.isNull(endpoint)) return environment.apiBaseUrl + '/' + endpoint;
    else return (environment.apiBaseUrl + '/' + this.resourceURLIndex);
  }
}
