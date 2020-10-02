import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {VehicleService} from "../../../../_services/vehicle.service";
import {ClientService} from "../../../../_services/client.service";

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
  year: any;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  carCompanyList: any;
  carModelList: any;
  carGradeList: any;
/*  colorList: any;*/
  clientList: any;
  public config: {};
  private isChecked: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private clientService : ClientService,
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
      carStockDetails: this.formBuilder.group({
        id: '',
        client: {},
        carType: '',
        color: '',
        price: '',
        carAuction: '',
        availableStatus: ''
      })
    });
    this.config ={
      drops: 'down',
      format: 'YYYY',
      yearFormat: 'YYYY',

    }
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
            carStockDetails: {
              client: res.content.carStockDetails.client,
              carType: res.content.carStockDetails.carType,
              color: res.content.carStockDetails.color,
              price: res.content.carStockDetails.price,
              carAuction: res.content.carStockDetails.carAuction,
              availableStatus: res.content.carStockDetails.availableStatus,
            }
          });
          this.result = res;
          if(res.content.carStockDetails.availableStatus==true){
            this.isChecked=true;
          }else{
            this.isChecked=false;
          }
          console.log(this.result);
        }
      );
    } else {
      this.pageTitle = 'Add Car Stock Detail';
    }
    this.getCarCompanyList();
    this.getClients();
   /* this.getColors();*/
    this.year =new Date().getFullYear();
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

  getCarCompanyList(): any {
    this.vehicleService.getCarCompanyList().subscribe(
      (data): any => {
        this.carCompanyList = data.content;
      });
  }

  getCompanyByClient(e) {
    console.log(e.target.value);
    const prof = this.carCompanyList.filter((el) => {
      if (el.id == e.target.value) {
        this.carStockDeatilsForm.get('carCompany').setValue(el);
        this.vehicleService.carCompanyById(el.id).subscribe(
          (data):any=>{
            this.carModelList = data.content.carModelList;
          });
        return el.id == e.target.value;
      }
    });
  }

  getModelByCompany(e) {
    this.carModelList.filter((el)=>{
      if (el.id == e.target.value){
        this.carStockDeatilsForm.get('carModel').setValue(el);
        this.vehicleService.carModelById(el.id).subscribe(
          (modelData):any=>{
            this.carGradeList=modelData.content.carGradeList;
          });
        return el.id == e.target.value;
      }
    });
  }

  getGradeByModel(e) {
    this.carGradeList.filter((el)=>{
      if (el.id == e.target.value){
        this.carStockDeatilsForm.get('carGrade').setValue(el);
        return el.id == e.target.value;
      }
    });
  }

  getClients(): any{
    this.clientService.getClientList().subscribe(
      (data): any=>{
        this.clientList=data.content;
      });
  }

  getClientByCarId(value: any) {
    this.clientList.filter(
      (el):any=>{
        if (el.id == value){
          this.carStockDeatilsForm.controls.carStockDetails.get('client').setValue(el);
          console.log(this.carStockDeatilsForm.controls.carStockDetails.get('client').value);
          return el.id == value;
        }
      });
  }

  /*getColors(): any{
    this.vehicleService.getColorList().subscribe(
      (data): any=>{
        this.colorList=data.content;
      });
  }

  getColorByCar(value: any) {
    this.colorList.filter(
      (el):any=>{
        if (el.id == value){
          this.carStockDeatilsForm.controls.carStockDetails.get('color').setValue(el);
          console.log(this.carStockDeatilsForm.controls.carStockDetails.get('color').value);
          return el.id == value;
        }
      });
  }*/

  onChecked(e) {
    if(e.target.checked)
    {
      this.isChecked=true;
      this.carStockDeatilsForm.controls.carStockDetails.get('availableStatus').setValue(true);
      console.log(this.carStockDeatilsForm.controls.carStockDetails.get('availableStatus').value);
    }
    else
    {
      this.isChecked=false;
      this.carStockDeatilsForm.controls.carStockDetails.get('availableStatus').setValue(false);
      console.log(this.carStockDeatilsForm.controls.carStockDetails.get('availableStatus').value);
    }
  }


}
