import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private baseUrl = environment.apiurl.service;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getCarGardeById(id : number): any {
    return this.http.get(this.baseUrl + '/carGrades/' + id);
  }

  getCarGradeList(): any{
    return this.http.get(this.baseUrl + '/carGrades' );
  }

  carCompanyById(id : number):any {
    return this.http.get(this.baseUrl + '/carCompany/' + id);
  }

  getCarCompanyList(): any {
    return this.http.get(this.baseUrl + '/carCompany' );
  }

  carModelById(id: number) {
    return this.http.get(this.baseUrl + '/carModel/' + id);
  }

  getCarModelList() {
    return this.http.get(this.baseUrl + '/carModel' );
  }
}
