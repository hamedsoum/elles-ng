import {Observable} from 'rxjs';
import {AuthenticationResponse} from '../domain/authentication';

export abstract class AuthenticationUseCase {

   abstract login(username: string, password: string): Observable<AuthenticationResponse>;

  abstract getToken(): string | null;

  abstract setToken(token: string): void;

  abstract isAuthenticated(): Observable<boolean> | Promise<boolean> | boolean;
}
