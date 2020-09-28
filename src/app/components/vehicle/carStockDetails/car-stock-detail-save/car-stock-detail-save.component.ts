import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {VehicleService} from "../../../../_services/vehicle.service";

@Component({
  selector: 'app-car-stock-detail-save',
  templateUrl: './car-stock-detail-save.component.html',
  styleUrls: ['./car-stock-detail-save.component.scss']
})
export class CarStockDetailSaveComponent implements OnInit {

  public baseUrl = environment.apiurl.service;
  submitted = false;
  public pageTitle: string;
  public carStockDeatilsForm: FormGroup;
  public result: any;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  carCompanyList: any;
  carModelList: any;
  carGradeList: any;
  colorList: any;
  clientList: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    public httpClient: HttpClient
  ) {
    this.carStockDeatilsForm = this.formBuilder.group({
      id: '',
      carCompany: {},
      carModel: {},
      carGrade: {},
      engineNo: '',
      chassisNo: '',
      yearOfModel: '',
      carStockDetails: {
        id: '',
        client: {},
        carType: '',
        color: {},
        price: '',
        carAuction: '',
        availableStatus: ''
      }
    });
  }

  ngOnInit(): any {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Car Stock Detail';
      this.vehicleService.carStockDeatilsById(parseInt(id)).subscribe(
        (res: any) => {
          console.log(res);
          this.carStockDeatilsForm.patchValue({
            id: res.content.id,
            carCompany: res.content.carCompany,
            carModel: res.content.carModel,
            carGrade: res.content.carGrade,
            engineNo: res.content.engineNo,
            chassisNo: res.content.chassisNo,
            yearOfModel: res.content.yearOfModel,
            client: res.content.carStockDetails.client,
            carType: res.content.carStockDetails.carType,
            color: res.content.carStockDetails.color,
            price: res.content.carStockDetails.price,
            carAuction: res.content.carStockDetails.carAuction,
            availableStatus: res.content.carStockDetails.availableStatus,
          });
          this.result = res;
          console.log(this.result);
        }
      );
    } else {
      this.pageTitle = 'Add Car Stock Detail';
    }
    this.getCarCompanyList();
  }

  uploadSubmit(): void {
    this.submitted = true;
    if (this.carStockDeatilsForm.valid) {
      const stockForm = this.carStockDeatilsForm.getRawValue();
      const serialForm = JSON.stringify(stockForm);
      console.log(serialForm);
      this.httpClient.post(this.baseUrl + '/carStock', serialForm, this.httpOptions).subscribe((res): any => {
        if (res) {
          this.router.navigate(['carStockDetails/list']);
        }
      });
    }
  }

  getCarCompanyList(): any{
    this.vehicleService.getCarCompanyList().subscribe(
      (data):any=>{
        this.carCompanyList=data.content;
      console.log(this.carCompanyList);
    });
  }

  getCompanyByClient(value: any) {
    const prof = this.carCompanyList.filter((el) => {
      if (el.id == value) {
        this.carStockDeatilsForm.get('profession').setValue(el);
        return el.id == value;
      }
    });
  }

  getModelByCompany(value: any) {

  }

  getGradeByClient(value: any) {

  }

  getColorByClient(value: any) {

  }

  getClientByCarId(value: any) {

  }
}
