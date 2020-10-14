import {Injectable} from '@angular/core';
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

  constructor(private http: HttpClient) {
  }

  getCarGardeById(id: number): any {
    return this.http.get(this.baseUrl + '/carGrades/' + id);
  }

  getCarGradeList(): any {
    return this.http.get(this.baseUrl + '/carGrades');
  }

  carCompanyById(id: number): any {
    return this.http.get(this.baseUrl + '/carCompany/' + id);
  }

  getCarCompanyList(): any {
    return this.http.get(this.baseUrl + '/carCompany');
  }

  carModelById(id: number): any {
    return this.http.get(this.baseUrl + '/carModel/' + id);
  }

  getCarModelList(): any {
    return this.http.get(this.baseUrl + '/carModel');
  }

  carStockDeatilsById(id: number): any {
    return this.http.get(this.baseUrl + '/carStock/' + id);
  }

  getCarStockInfoList(): any {
    return this.http.get(this.baseUrl + '/carStock');
  }

  getColorById(id: number): any {
    return this.http.get(this.baseUrl + '/colors/' + id);
  }

  getColorList(): any {
    return this.http.get(this.baseUrl + '/colors');
  }

  getCarByType(type): any {
    return this.http.get(this.baseUrl + '/carStock/getBycarType/' + type);
  }

  saveStock(data: any): any {
    return this.http.post(this.baseUrl + '/carStock', data);
  }
}
