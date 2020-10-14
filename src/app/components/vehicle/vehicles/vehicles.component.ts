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

  constructor(
    private vehicleService: VehicleService
  ) {
  }

  ngOnInit(): void {
    this.getCars(this.carType);
  }

  getCars(type) {
    console.log(this.carType);
    this.vehicleService.getCarByType(this.carType).subscribe(
      (res: any) => {
        this.allCars = res.content;
        for (let x in this.allCars) {
          console.log(this.allCars[x].carModelId);
          this.getModelName(this.allCars[x].carModelId);
        }
        console.log(this.allCars);
      });
  }

  setCarType(event: any) {
    this.carType = event.target.value;
    this.getCars(this.carType);
  }

  getModelName(id) {
    this.vehicleService.carModelById(id).subscribe((res):any=>{
      this.models.push(res.content);
      console.log(this.models);
    });
  }
}
