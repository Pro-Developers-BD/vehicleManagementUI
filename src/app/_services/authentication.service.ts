import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import {User} from '../_models';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public permissions: any[];

  private url = environment.apiurl.service;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {
    if (this.cookieService.get('currentUser')) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(this.cookieService.get('currentUser')));
      try {
        this.permissions = jwt_decode(this.currentUserSubject.value.accessToken).permission;
      } catch (Error) {
        this.permissions = [];
      }
    } else {
      this.currentUserSubject = new BehaviorSubject<User>(null);
    }
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  // tslint:disable-next-line:typedef
  private checkAvailability(arr, val) {
    return arr.some(function(arrVal) {
      return val === arrVal.authority;
    });
  }

  // tslint:disable-next-line:typedef
  login(username: string, password: string) {
    return this.http.post<any>(`http://localhost:1234/v1/api/auth/login`, {username, password})
      .pipe(map(user => {
        if (user && user.content.token) {
          this.cookieService.set('currentUser', JSON.stringify(user));
          // this.getuserPermissions();
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }
  logout(): void {
    this.cookieService.delete('currentUser');
    this.currentUserSubject.next(null);
  }
  public getVerificationToken(token: string): any {
    return this.http.get(this.url + '/auth' + token);
  }

}
