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

  getCarGardeById(id): any {
    return this.http.get(this.baseUrl + '/carGrades/' + id);
  }

  saveCarGrade(data: any): any {
    return this.http.post(this.baseUrl + '/carGrades', data);
  }

  getCarGradeList(): any{
    return this.http.get(this.baseUrl + '/carGrades' );
  }
}
