import {Component, OnInit} from '@angular/core';
import {VehicleService} from "../../../_services/vehicle.service";

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  public allCars: any;
  public carType: any = 'New';

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
        console.log(this.allCars);
      });
  }

  setCarType(event: any) {
    this.carType = event.target.value;
    this.getCars(this.carType);
  }
}
