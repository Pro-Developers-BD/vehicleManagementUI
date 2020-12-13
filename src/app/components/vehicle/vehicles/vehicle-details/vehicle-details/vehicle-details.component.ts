import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {VehicleService} from "../../../../../_services/vehicle.service";
import {environment} from "../../../../../../environments/environment";

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss']
})
export class VehicleDetailsComponent implements OnInit {
  public baseUrl = environment.apiurl.service;
  public vehicleDetails: any;
  public carCompanyName: any;
  public carBrandName: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vehicleService: VehicleService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.vehicleService.carStockDeatilsById(parseInt(id)).subscribe(
        (res: any) => {
          this.vehicleDetails = res.content;
          this.getCarCompany(this.vehicleDetails.carCompanyId);
          this.getCarBrand(this.vehicleDetails.carModelId);
        });
    }
  }

  public getCarCompany(number){
    this.vehicleService.carCompanyById(parseInt(number)).subscribe(
      (res: any) => {
        this.carCompanyName = res.content.carCompanyName;
      });
  }

  public getCarBrand(number){
    this.vehicleService.carModelById(parseInt(number)).subscribe(
      (res: any) => {
        this.carBrandName = res.content.carModelName;
      });
  }

}
