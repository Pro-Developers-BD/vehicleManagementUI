import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {VehicleService} from "../../../../_services/vehicle.service";

@Component({
  selector: 'app-car-model-save',
  templateUrl: './car-model-save.component.html',
  styleUrls: ['./car-model-save.component.scss']
})
export class CarModelSaveComponent implements OnInit {
  public baseUrl = environment.apiurl.service;
  submitted = false;
  public pageTitle: string;
  public carModelForm: FormGroup;
  public result: any;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    public httpClient: HttpClient
  ) {
    this.carModelForm = this.formBuilder.group({
      id: '',
      carModelName: ['', Validators.required],
    });
  }

  ngOnInit(): any {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Car Model';
      this.vehicleService.carModelById(parseInt(id)).subscribe(
        (res: any) => {
          console.log(res);
          this.carModelForm.patchValue({
            id: res.content.id,
            carModelName: res.content.carModelName,
          });
          this.result = res;
          console.log(this.result);
        }
      );
    } else {
      this.pageTitle = 'Create Car Model';
    }
  }

  uploadSubmit(): void {
    this.submitted = true;
    if (this.carModelForm.valid) {
      const modelForm = this.carModelForm.getRawValue();
      const serialForm = JSON.stringify(modelForm);
      console.log(serialForm);
      this.httpClient.post(this.baseUrl + '/carModel', serialForm, this.httpOptions).subscribe((res): any => {
        if (res) {
          this.router.navigate(['carModel/list']);
        }
      });
    }
  }

  get modelName() {
    return this.carModelForm.get('carModelName');
  }

}
