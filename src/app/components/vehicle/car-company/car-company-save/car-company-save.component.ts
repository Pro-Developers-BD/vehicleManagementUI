import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {VehicleService} from "../../../../_services/vehicle.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-car-company-save',
  templateUrl: './car-company-save.component.html',
  styleUrls: ['./car-company-save.component.scss']
})
export class CarCompanySaveComponent implements OnInit {
  public baseUrl = environment.apiurl.service;
  submitted = false;
  public pageTitle: string;
  public carCompanyForm: FormGroup;
  public result: any;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  public modelList: any;
  checked: boolean=false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    public httpClient: HttpClient
  ) {
    this.carCompanyForm = this.formBuilder.group({
      id: '',
      carCompanyName: ['', Validators.required],
      carModelList: new FormControl([])
    });
  }

  ngOnInit(): any {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Car Company';
      this.vehicleService.carCompanyById(parseInt(id)).subscribe(
        (res: any) => {
          console.log(res);
          this.carCompanyForm.patchValue({
            id: res.content.id,
            carCompanyName: res.content.carCompanyName,
            carModelList: res.content.carModelList
          });
          this.result = res;
          for (let key in res.content.carModelList) {
            if(res.content.carModelList[key].carModelName != ''){
              this.checked=true;
            }
          }
        }
      );
    } else {
      this.pageTitle = 'Add Car Company';
    }
    this.getCarModels();
    console.log(this.carCompanyForm.controls.carModelList.value);
  }

  uploadSubmit(): void {
    this.submitted = true;
    if (this.carCompanyForm.valid) {
      const carForm = this.carCompanyForm.getRawValue();
      const serialForm = JSON.stringify(carForm);
      console.log(serialForm);
      this.httpClient.post(this.baseUrl + '/carCompany', serialForm, this.httpOptions).subscribe((res): any => {
        if (res) {
          this.router.navigate(['carCompany/list']);
        }
      });
    }
  }

  getCarModels() {
    this.vehicleService.getCarModelList().subscribe(
      (models): any => {
        this.modelList = models.content;
        console.log(this.modelList);
      });
  }

  getModelDataByCompany(e, data) {
    if (e.target.checked) {
      this.carCompanyForm.controls.carModelList.value.push(data);
    } else {
      const index = this.carCompanyForm.controls.carModelList.value.indexOf(data);
      this.carCompanyForm.controls.carModelList.value.splice(index, 1);
    }
    console.log(this.carCompanyForm.controls.carModelList.value);
  }

  get carCompanyName() {
    return this.carCompanyForm.get('carCompanyName');
  }

}
