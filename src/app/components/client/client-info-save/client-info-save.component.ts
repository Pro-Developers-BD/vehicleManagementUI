import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ClientService} from "../../../_services/client.service";

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
  emailAddress: any;
  contactNo: any;
  divisionName: any;
  areaName: any;
  address: any;
  profession: any;
  companyName: any;
  customerName: any;
  professionList: any = [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private clientService: ClientService,
  ) {
    this.clientForm = this.formBuilder.group({
      id: '',
      customerName: ['', Validators.required],
      companyName: ['', Validators.required],
      profession: ['', Validators.required],
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
        (res: any ) => {
          this.clientForm.patchValue({
            id: res.content.id,
            customerName: res.content.customerName,
            companyName: res.content.companyName,
            profession: res.content.profession,
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
      const data = new FormData();
      data.append('id', this.clientForm.controls.id.value);
      data.append('customerName', this.clientForm.controls.customerName.value);
      data.append('companyName', this.clientForm.controls.companyName.value);
      data.append('profession', this.clientForm.controls.profession.value);
      data.append('address', this.clientForm.controls.address.value);
      data.append('areaName', this.clientForm.controls.areaName.value);
      data.append('divisionName', this.clientForm.controls.divisionName.value);
      data.append('contactNo', this.clientForm.controls.contactNo.value);
      data.append('emailAddress', this.clientForm.controls.emailAddress.value);
      this.clientService.saveClientInfo(data).subscribe(
        res => {
          if (res.status=='Created') {
            this.router.navigate(['client/list']);
          }
        });
    }
  }
  getProfessionList(): any{
    this.clientService.getProfessionList().subscribe(
      (data: any) => {
        this.professionList = data.content;
        console.log(this.professionList);
      }
    );
  }

}
