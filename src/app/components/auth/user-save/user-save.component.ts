import { Component, OnInit } from '@angular/core';
import {HomeService} from "../../../_services/home.service";
import {AuthenticationService} from "../../../_services/authentication.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-user-save',
  templateUrl: './user-save.component.html',
  styleUrls: ['./user-save.component.scss']
})
export class UserSaveComponent implements OnInit {
  public baseUrl = environment.apiurl.service;
  userRegistrationForm: FormGroup;
  public uniqueCheckEmail: any;
  public submited = false;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userManagerService: HomeService,
    public httpClient: HttpClient,
    public auth: AuthenticationService) {
    this.userRegistrationForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  setRequired() {
    if(this.auth.currentUserValue) {
      return [];
    } else {
      return [Validators.required];
    }
  }

  saveUser() {
    this.submited = true;
    if(this.userRegistrationForm.valid) {
      const stockForm = this.userRegistrationForm.getRawValue();
      const serialForm = JSON.stringify(stockForm);
      console.log(serialForm);
      this.httpClient.post(this.baseUrl + '/users', serialForm, this.httpOptions).subscribe((res): any => {
        if (res) {
          this.router.navigate(['login']);
        }
      });
    }

  }

  get username() { return this.userRegistrationForm.get('userName'); }
  get firstName() { return this.userRegistrationForm.get('email'); }
  get lastName() { return this.userRegistrationForm.get('password'); }

  /*public checkUniqueEmail(email: string) {
    if(email){
      this.userManagerService.getUserByEmail(email).subscribe((response: any) => {
        if (response === 'OK') {
          this.uniqueCheckEmail = '';
        } else {
          this.uniqueCheckEmail = 'Email already exists';
        }
      });
    }
  }*/

}
