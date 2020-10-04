import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {VehicleService} from "../../../../_services/vehicle.service";
import {ClientService} from "../../../../_services/client.service";
import {DatePipe, formatDate} from '@angular/common';

@Component({
  selector: 'app-car-stock-detail-save',
  templateUrl: './car-stock-detail-save.component.html',
  styleUrls: ['./car-stock-detail-save.component.scss'],
  providers: [DatePipe]
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
  isChecked: boolean;
  public yearModel: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private clientService: ClientService,
    public httpClient: HttpClient
  ) {
    this.carStockDeatilsForm = this.formBuilder.group({
      id: '',
      carCompany: this.formBuilder.group({
        id: ''
      }),
      carModel: this.formBuilder.group({
        id: ''
      }),
      carGrade: this.formBuilder.group({
        id: ''
      }),
      engineNo: '',
      chassisNo: '',
      yearOfModel: '',
      carStockDetails: this.formBuilder.group({
        id: '',
        client: this.formBuilder.group({
          id: ''
        }),
        carType: '',
        color: '',
        price: '',
        carAuction: '',
        availableStatus: ''
      })
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
            carCompany: {
              id: res.content.carCompany.id
            },
            carModel: {
              id: res.content.carModel.id
            },
            carGrade: {
              id: res.content.carGrade.id
            },
            engineNo: res.content.engineNo,
            chassisNo: res.content.chassisNo,
            yearOfModel: formatDate(res.content.yearOfModel,'yyyy-MM-dd','en-US'),
            carStockDetails: {
              client: {
                id: res.content.carStockDetails.client.id
              },
              carType: res.content.carStockDetails.carType,
              color: res.content.carStockDetails.color,
              price: res.content.carStockDetails.price,
              carAuction: res.content.carStockDetails.carAuction,
              availableStatus: res.content.carStockDetails.availableStatus,
            }
          });
          this.result = res;
          console.log(this.result);
          this.isChecked = res.content.carStockDetails.availableStatus;
        }
      );
    } else {
      this.pageTitle = 'Add Car Stock Detail';
    }
    this.getCarCompanyList();
    this.getClients();
    /* this.getColors();*/
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
    if (e.target.value) {
      this.vehicleService.carCompanyById(e.target.value).subscribe(
        (data): any => {
          this.carModelList = data.content.carModelList;
        });
    }
    return e.target.value;
  }

  getModelByCompany(e) {
    if(e.target.value) {
      this.vehicleService.carModelById(e.target.value).subscribe(
        (modelData): any => {
          this.carGradeList = modelData.content.carGradeList;
        });
    }
    return e.target.value;
  }


  getClients(): any {
    this.clientService.getClientList().subscribe(
      (data): any => {
        this.clientList = data.content;
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
    if (e.target.checked) {
      this.isChecked = true;
      this.carStockDeatilsForm.controls.carStockDetails.get('availableStatus').setValue(true);
      console.log(this.carStockDeatilsForm.controls.carStockDetails.get('availableStatus').value);
    } else {
      this.isChecked = false;
      this.carStockDeatilsForm.controls.carStockDetails.get('availableStatus').setValue(false);
      console.log(this.carStockDeatilsForm.controls.carStockDetails.get('availableStatus').value);
    }
  }


}
