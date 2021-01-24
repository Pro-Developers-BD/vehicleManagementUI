import {Component, OnInit} from '@angular/core';
import {VehicleService} from "../../../_services/vehicle.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  public baseUrl = environment.apiurl.service;
  public allCars: any;
  public carType: any = 'New';
  private models: any =[];
  private images: any = [];

  constructor(
    private vehicleService: VehicleService
  ) {
  }

  ngOnInit(): void {
    this.getCars(this.carType);
  }

  getCars(type) {
    this.vehicleService.getCarByType(this.carType).subscribe(
      (res: any) => {
        this.allCars = res.content;
        for (let x in this.allCars) {
          let image = this.allCars[x].images;
          image.forEach(obj => {
            if (obj) {
              console.log(obj.split('id=')[1].split(',')[0]);
              this.images.push(obj.split('id=')[1].split(',')[0]);
            }
          });
        }
        this.getModelName();
        console.log(this.allCars);
      });
  }

  setCarType(event: any) {
    this.carType = event.target.value;
    this.getCars(this.carType);
  }

  getModelName() {
    this.vehicleService.getCarModelList().subscribe((res):any=>{
      this.models=res.content;
      console.log(this.models);
    });
  }
}
