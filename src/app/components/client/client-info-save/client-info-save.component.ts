import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientService} from '../../../_services/client.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-client-info-save',
  templateUrl: './client-info-save.component.html',
  styleUrls: ['./client-info-save.component.scss']
})

export class ClientInfoSaveComponent implements OnInit {
  public baseUrl = environment.apiurl.service;
  submitted = false;
  public pageTitle: string;
  public clientForm: FormGroup;
  public clientInfo: any;
  professionList: any = [];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private clientService: ClientService,
    public httpClient: HttpClient
  ) {
    this.clientForm = this.formBuilder.group({
      id: '',
      customerName: ['', Validators.required],
      companyName: ['', Validators.required],
      profession: {},
      address: ['', Validators.required],
      areaName: ['', Validators.required],
      divisionName: ['', Validators.required],
      contactNo: ['', Validators.required],
      emailAddress: ['', Validators.required],
    });
  }

  ngOnInit(): any {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Client';
      this.clientService.getClientInfoById(parseInt(id)).subscribe(
        (res: any) => {
          this.clientForm.patchValue({
            id: res.content.id,
            customerName: res.content.customerName,
            companyName: res.content.companyName,
            profession: res.content.profession.id,
            address: res.content.address,
            areaName: res.content.areaName,
            divisionName: res.content.divisionName,
            contactNo: res.content.contactNo,
            emailAddress: res.content.emailAddress,
          });
          this.clientInfo = res;
          console.log(this.clientInfo);
        }
      );
    } else {
      this.pageTitle = 'Create Client';
    }
    this.getProfessionList();
  }

  uploadSubmit(): void {
    this.submitted = true;
    if (this.clientForm.valid) {
      const formObj = this.clientForm.getRawValue();
      const serializedForm = JSON.stringify(formObj);
      console.log(serializedForm);
      this.httpClient.post(this.baseUrl + '/clients', serializedForm, this.httpOptions).subscribe((res): any => {
        if (res) {
          this.router.navigate(['client/list']);
        }
      });
    }
  }

  getProfessionList(): any {
    this.clientService.getProfessionList().subscribe(
      (data: any) => {
        this.professionList = data.content;
      }
    );
  }

  public getProfByClient(profOBJ): any {
    const prof = this.professionList.filter((el) => {
      if (profOBJ == el.id) {
        this.clientForm.get('profession').setValue(el);
        return el;
      }
    });
  }

  get emailAddress() {
    return this.clientForm.get('emailAddress');
  }

  get contactNo() {
    return this.clientForm.get('contactNo');
  }

  get divisionName() {
    return this.clientForm.get('divisionName');
  }

  get areaName() {
    return this.clientForm.get('areaName');
  }

  get address() {
    return this.clientForm.get('address');
  }

  get profession() {
    return this.clientForm.get('profession');
  }

  get companyName() {
    return this.clientForm.get('companyName');
  }

  get customerName() {
    return this.clientForm.get('customerName');
  }
}
