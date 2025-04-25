import {Observable} from 'rxjs';

export abstract class BaseUseCase<D, C> {

 abstract save(body: C): Observable<D> | Promise<D>;

  abstract retrieve(resourceID: string): Observable<D> | Promise<D>;

  abstract findAll(): Observable<D[]> | Promise<D[]>;

}
