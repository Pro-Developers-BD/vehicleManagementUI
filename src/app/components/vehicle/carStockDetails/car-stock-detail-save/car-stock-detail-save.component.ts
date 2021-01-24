import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {VehicleService} from '../../../../_services/vehicle.service';
import {ClientService} from '../../../../_services/client.service';
import {DatePipe} from '@angular/common';
import {FileUploader} from 'ng2-file-upload';

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
  public stock: any;
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
  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });
  public imageRequired: string;
  public imgURL: string | ArrayBuffer;
  public name: any;
  public message: string;
  public year: Number = new Date().getFullYear();
  public carTypeArr = [
    { id: 1, value: 'New' },
    { id: 2, value: 'Old' },
    { id: 3, value: 'Own' },
    { id: 4, value: 'Imported' },
  ];
  images: string[] = [];
  private fileList: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private clientService: ClientService,
    public httpClient: HttpClient
  ) {
    this.carStockDeatilsForm = this.formBuilder.group({
      id: [''],
      carCompanyId: [''],
      carModelId: [''],
      carGradeId: [''],
      engineNo: [''],
      chassisNo: [''],
      yearOfModel: [''],
      clientId: [''],
      carType: [''],
      color: [''],
      price: [''],
      carAuction: [''],
      availableStatus: [''],
      images: []
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
            carCompanyId: res.content.carCompanyId,
            carModelId: res.content.carModelId,
            carGradeId: res.content.carGradeId,
            engineNo: res.content.engineNo,
            chassisNo: res.content.chassisNo,
            yearOfModel: res.content.yearOfModel,
            clientId: res.content.clientId,
            carType: res.content.carType,
            color: res.content.color,
            price: res.content.price,
            carAuction: res.content.carAuction,
            availableStatus: res.content.availableStatus,
            images: res.content.images
          });
          let images = res.content.images;
          images.forEach(obj => {
            if (obj) {
              console.log(obj.split('id=')[1].split(',')[0]);
              this.images.push(obj.split('id=')[1].split(',')[0]);
            }
          });
          this.isChecked = res.content.availableStatus;
          this.stock = res.content;
          console.log(this.stock);
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
    this.carStockDeatilsForm.value.images = this.images;
    /* if (typeof this.uploader.queue[0] === 'undefined' && this.carStockDeatilsForm.controls.images.value === null) {
       this.imageRequired = 'Image is required';
     }
     if (typeof this.uploader.queue[0] !== 'undefined') {
       this.imageRequired = '';
     }*/
    if (this.carStockDeatilsForm.valid) {
      const data = new FormData();
      data.append('id', this.carStockDeatilsForm.controls.id.value);
      data.append('carCompanyId', this.carStockDeatilsForm.controls.carCompanyId.value);
      data.append('carModelId', this.carStockDeatilsForm.controls.carModelId.value);
      data.append('carGradeId', this.carStockDeatilsForm.controls.carGradeId.value);
      data.append('engineNo', this.carStockDeatilsForm.controls.engineNo.value);
      data.append('chassisNo', this.carStockDeatilsForm.controls.chassisNo.value);
      data.append('yearOfModel', this.carStockDeatilsForm.controls.yearOfModel.value);
      data.append('clientId', this.carStockDeatilsForm.controls.clientId.value);
      data.append('carType', this.carStockDeatilsForm.controls.carType.value);
      data.append('color', this.carStockDeatilsForm.controls.color.value);
      data.append('price', this.carStockDeatilsForm.controls.price.value);
      data.append('carAuction', this.carStockDeatilsForm.controls.carAuction.value);
      data.append('availableStatus', this.carStockDeatilsForm.controls.availableStatus.value);
      data.append('images', this.carStockDeatilsForm.value.images);
      console.log(data);
      /*const stockForm = this.carStockDeatilsForm.getRawValue();
      const serialForm = JSON.stringify(stockForm);
      console.log(serialForm);
      this.httpClient.post(this.baseUrl + '/carStock', serialForm, this.httpOptions).subscribe((res): any => {
        if (res) {
          this.router.navigate(['carStockDetails/list']);
        }
      });*/
      this.vehicleService.saveStock(data).subscribe(
        (res): any => {
          console.log(res);
          if (res) {
            this.router.navigate(['carStockDetails/list']);
          }
        });
      this.uploader.clearQueue();
    }
  }

  /*preview(files) {
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    this.name = files[0].name;
    this.imageRequired = '';
    if (mimeType.match(/image\/!*!/) == null) {
      this.message = 'Only images are supported.';
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      this.imgURL = reader.result;
    };
  }*/

  getCarCompanyList(): any {
    this.vehicleService.getCarCompanyList().subscribe(
      (data): any => {
        this.carCompanyList = data.content;
        console.log(this.carCompanyList);
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
    if (e.target.value) {
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
      this.carStockDeatilsForm.get('availableStatus').setValue(true);
      console.log(this.carStockDeatilsForm.get('availableStatus').value);
    } else {
      this.isChecked = false;
      this.carStockDeatilsForm.get('availableStatus').setValue(false);
      console.log(this.carStockDeatilsForm.get('availableStatus').value);
    }
  }

  public onFileSelected(event: File[]) {
    for (let i = 0; i < this.uploader.queue.length; i++) {
      let fileItem = this.uploader.queue[i]._file;
      if (fileItem.size > 10000000) {
        console.log("Each File should be less than 10 MB of size.");
        return;
      }
    }
    this.uploader.clearQueue();
    for (let j = 0; j < event["length"]; j++) {
      let data = new FormData();
      const file: File = event[j];
      data.append('files', file);
      this.clientService.saveVehicleImages(data)
        .subscribe((res: any) => {
          console.log(res);
          this.images.push(res.id);
        });
    }
  }

  public onRemoveImage(item: any) {
    if (item > -1) {
      this.images.splice(item, 1);
    }
  }
}
