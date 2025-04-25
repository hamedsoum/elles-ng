import {inject, Injectable} from '@angular/core';
import {AuthenticationUseCase} from '../../core/use-case/authentication.use-case';
import {Observable, of} from 'rxjs';
import {HttpClientService} from './http-client-service';
import {environment} from '../../../environments/environment';
import {END_POINT} from '../../core/constants/endpoint';
import {Utils} from '../../core/utils';
import {STORAGE_KEY_AUTHENTICATION, STORAGE_KEY_USER} from '../../core/constants/constants';
import {AuthenticationResponse} from '../../core/domain/authentication';
import {User} from '../../core/domain/user';

@Injectable({providedIn: 'root'})
export class AuthenticationService implements AuthenticationUseCase {

  httpClient = inject(HttpClientService);

  getToken(): string | null {
    return localStorage.getItem(STORAGE_KEY_AUTHENTICATION);
  }

  isAuthenticated(): boolean {
    return !Utils.isNull(this.getToken());
  }

  login(username: string, password: string): Observable<AuthenticationResponse> {
    Utils.assert(username, "username");
    Utils.assert(password, "password");
    return this.httpClient.post(environment.apiBaseUrl + '/' + END_POINT.login, {username: username.trim(), password: password.trim()});
  }

  logOut(): void {
    localStorage.removeItem(STORAGE_KEY_AUTHENTICATION);
    localStorage.clear();
  }

  setToken(token: string): void {
    return localStorage.setItem(STORAGE_KEY_AUTHENTICATION, token);
  }

  setUser(user: User): void {
    return localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
  }

  getUser(): User | null {
   const userGet =  localStorage.getItem(STORAGE_KEY_USER);
    return JSON.parse(userGet!);
  }

}
