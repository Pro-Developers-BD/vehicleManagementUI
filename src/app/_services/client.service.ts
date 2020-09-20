import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = environment.apiurl.service;

  constructor(private http: HttpClient) { }

  getProfessionById(id): any {
    return this.http.get(this.baseUrl + '/professions/' + id);
  }

  saveProfession(data: any): any {
    return this.http.post(this.baseUrl + '/professions', data);
  }

  getProfessionList(): any{
    return this.http.get(this.baseUrl + '/professions' );
  }
}
